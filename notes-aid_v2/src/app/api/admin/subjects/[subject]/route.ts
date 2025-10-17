import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongoose"
import mongoose from "mongoose"
import { cache } from "@/lib/cache"
import { canEditSubject } from "@/lib/permissions"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

async function checkSubjectEditPermission(subjectCollection: string) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.githubUsername) {
      return { authorized: false, username: null }
    }
    
    const canEdit = await canEditSubject(session.user.githubUsername, subjectCollection)
    return { authorized: canEdit, username: session.user.githubUsername }
  } catch (error) {
    console.error("Error checking permissions:", error)
    return { authorized: false, username: null }
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ subject: string }> }
) {
  try {
    const subjectParam = (await params).subject
    if (!subjectParam) {
      return NextResponse.json(
        { error: "Subject parameter is required" },
        { status: 400 }
      )
    }

    // Check if user has permission to edit this subject
    const { authorized } = await checkSubjectEditPermission(subjectParam)
    if (!authorized) {
      return NextResponse.json(
        { error: "Unauthorized. You don't have permission to edit this subject." },
        { status: 403 }
      )
    }

    const body = await request.json()
    
    // Connect to the notesdb database
    const conn = await dbConnect("notesdb")
    if (!conn?.db) {
      throw new Error("Database connection failed")
    }

    // Create the schema for the collection
    const subjectSchema = new mongoose.Schema({}, { strict: false })
    const SubjectModel = conn.models[subjectParam] || conn.model(subjectParam, subjectSchema, subjectParam)

    // Update the document (assuming single document per collection)
    const updatedDoc = await SubjectModel.findOneAndUpdate(
      {}, // Find the first document
      { $set: body }, // Update with the new data
      { 
        new: true, // Return the updated document
        upsert: true // Create if doesn't exist
      }
    )

    // Invalidate cache for this subject
    await cache.delPattern(`subject:${subjectParam}*`)
    await cache.delPattern(`stats:${subjectParam}*`)
    console.log(`Cache invalidated for subject: ${subjectParam}`)

    return NextResponse.json({
      success: true,
      data: updatedDoc
    })

  } catch (error) {
    console.error("Error updating subject:", error)
    return NextResponse.json(
      { error: "Failed to update subject", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ subject: string }> }
) {
  try {
    const subjectParam = (await params).subject
    if (!subjectParam) {
      return NextResponse.json(
        { error: "Subject parameter is required" },
        { status: 400 }
      )
    }

    // Check if user has permission to edit (and therefore delete) this subject
    const { authorized } = await checkSubjectEditPermission(subjectParam)
    if (!authorized) {
      return NextResponse.json(
        { error: "Unauthorized. You don't have permission to delete this subject." },
        { status: 403 }
      )
    }

    // Connect to the notesdb database
    const conn = await dbConnect("notesdb")
    if (!conn?.db) {
      throw new Error("Database connection failed")
    }

    // Drop the entire collection
    await conn.db.dropCollection(subjectParam)

    return NextResponse.json({
      success: true,
      message: `Subject collection '${subjectParam}' has been deleted`
    })

  } catch (error) {
    console.error("Error deleting subject:", error)
    return NextResponse.json(
      { error: "Failed to delete subject", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}