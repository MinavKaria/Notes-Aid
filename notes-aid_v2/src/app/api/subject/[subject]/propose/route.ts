import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongoose";
import { ProposeRequestBody } from "@/types/api";

/*
Request (POST):
  - body: { proposer?: string, changes: object, mode?: 'merge' | 'replace' }
Response:
  - 201 created with proposal id
Notes:
  - Stores proposals in a separate DB "updates" -> collection "proposals"
  - Subject name is extracted from the URL segment
*/

export async function POST(request: NextRequest) {
  try {
    const pathSegments = request.nextUrl.pathname.split("/").filter(Boolean);
    const subjIndex = pathSegments.indexOf("subject");
    const subjectName = subjIndex >= 0 ? pathSegments[subjIndex + 1] : null;
    if (!subjectName) return NextResponse.json({ error: "Missing subject in path" }, { status: 400 });

    const body = (await request.json()) as ProposeRequestBody;
    if (!body?.changes) return NextResponse.json({ error: "Missing changes payload" }, { status: 400 });

    const conn = await dbConnect("updates"); // separate DB for proposals
    const ProposalSchema = new mongoose.Schema(
      {
        subject: String,
        proposer: String,
        mode: { type: String, enum: ["merge", "replace"], default: "merge" },
        changes: { type: mongoose.Schema.Types.Mixed },
        status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
        createdAt: { type: Date, default: Date.now },
        reviewedAt: Date,
        reviewer: String,
        reviewNote: String,
      },
      { strict: false }
    );

    const ProposalModel = conn.models.proposal || conn.model("proposal", ProposalSchema, "proposals");
    const doc = await ProposalModel.create({
      subject: subjectName,
      proposer: body.proposer || "anonymous",
      mode: body.mode || "merge",
      changes: body.changes,
    });

    return NextResponse.json({ success: true, proposalId: doc._id }, { status: 201 });
  } catch (err: unknown) {
    console.error("Propose API error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}