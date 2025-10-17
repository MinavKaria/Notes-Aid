import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongoose";
import { ReviewRequestBody } from "@/types/api";

/*
Approve / Reject endpoint (POST)
Query params:
  - id (proposal id) required
Body:
  - action: 'approve' | 'reject'
  - reviewer?: string
  - note?: string
Behavior when approving:
  - Applies proposal.changes to the subject's single-document collection in MAIN_SUBJECT_DB
  - mode === 'merge' => run findOneAndUpdate({}, { $set: changes }, { upsert: true })
  - mode === 'replace' => replaceOne({}, changes, { upsert: true })
Environment:
  - Uses process.env.MAIN_SUBJECT_DB || 'subjects_db' as target DB name
*/

export async function POST(request: NextRequest) {
  try {
    const pathSegments = request.nextUrl.pathname.split("/").filter(Boolean);
    const subjIndex = pathSegments.indexOf("subject");
    const subjectName = subjIndex >= 0 ? pathSegments[subjIndex + 1] : null;
    if (!subjectName) return NextResponse.json({ error: "Missing subject in path" }, { status: 400 });

    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing proposal id" }, { status: 400 });

    const body = (await request.json()) as ReviewRequestBody;
    const action = body?.action;
    if (!action || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // connect to updates DB to fetch proposal
    const updatesConn = await dbConnect("updates");
    const ProposalSchema = new mongoose.Schema({}, { strict: false });
    const ProposalModel = updatesConn.models.proposal || updatesConn.model("proposal", ProposalSchema, "proposals");
    const proposal = await ProposalModel.findById(id).lean() as Record<string, unknown> | null;
    if (!proposal) return NextResponse.json({ error: "Proposal not found" }, { status: 404 });

    if (proposal.status !== "pending") {
      return NextResponse.json({ error: "Proposal not pending" }, { status: 400 });
    }

    if (action === "reject") {
      await ProposalModel.updateOne({ _id: id }, { $set: { status: "rejected", reviewer: body.reviewer || "admin", reviewNote: body.note || null, reviewedAt: new Date() } });
      return NextResponse.json({ success: true, message: "Proposal rejected" });
    }


    const targetDbName = process.env.MAIN_SUBJECT_DB || "subjects_db";
    const mainConn = await dbConnect(targetDbName);

    const SubjectSchema = new mongoose.Schema({}, { strict: false });
    const SubjectModel = mainConn.models[subjectName] || mainConn.model(subjectName, SubjectSchema, subjectName);

    if (proposal.mode === "replace") {
      await SubjectModel.replaceOne({}, proposal.changes as Record<string, unknown>, { upsert: true });
    } else {
      await SubjectModel.findOneAndUpdate({}, { $set: proposal.changes as Record<string, unknown> }, { upsert: true });
    }

    await ProposalModel.updateOne({ _id: id }, { $set: { status: "approved", reviewer: body.reviewer || "admin", reviewNote: body.note || null, reviewedAt: new Date() } });

    return NextResponse.json({ success: true, message: "Proposal approved and applied" });
  } catch (err: unknown) {
    console.error("Review API error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}