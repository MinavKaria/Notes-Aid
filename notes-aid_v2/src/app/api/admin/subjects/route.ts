import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongoose"
import mongoose from "mongoose"

const authOptions = {
  providers: [],
  callbacks: {
    async jwt({ token, account, profile }: {token: unknown, account?: unknown, profile?: {login?: string}}) {
      if (account && profile) {
        const adminGitHubUsernames = ['MinavKaria']
        const typedToken = token as {isAdmin?: boolean, githubUsername?: string}
        typedToken.isAdmin = adminGitHubUsernames.includes(profile.login || '')
        typedToken.githubUsername = profile.login
        return typedToken
      }
      return token
    },
    async session({ session, token }: {session: {user?: {isAdmin?: boolean, githubUsername?: string}}, token: {isAdmin?: boolean, githubUsername?: string}}) {
      if (!session.user) session.user = {}
      session.user.isAdmin = !!token.isAdmin
      session.user.githubUsername = token.githubUsername
      return session
    },
  },
}

async function checkAdminAuth() {
  try {
    const session = await getServerSession(authOptions)
    return session?.user?.isAdmin === true
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const isAdmin = await checkAdminAuth()
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, color, collectionName } = body

    if (!name || !collectionName) {
      return NextResponse.json(
        { error: "Name and collection name are required" },
        { status: 400 }
      )
    }

    // Connect to the notesdb database
    const conn = await dbConnect("notesdb")
    if (!conn?.db) {
      throw new Error("Database connection failed")
    }

    // Check if collection already exists
    const collections = await conn.db.listCollections({ name: collectionName }).toArray()
    if (collections.length > 0) {
      return NextResponse.json(
        { error: "A subject with this collection name already exists" },
        { status: 409 }
      )
    }

    // Create the schema for the new collection
    const subjectSchema = new mongoose.Schema({}, { strict: false })
    const SubjectModel = conn.models[collectionName] || conn.model(collectionName, subjectSchema, collectionName)

    // Create the initial document with the structure from the problem statement
    const initialData = {
      name: name,
      color: color || "blue",
      modules: {
        "1": {
          notesLink: [],
          topics: [],
          _id: new mongoose.Types.ObjectId()
        }
      },
      __v: 0
    }

    const newDoc = await SubjectModel.create(initialData)

    return NextResponse.json({
      success: true,
      data: {
        id: newDoc._id,
        name: name,
        collectionName: collectionName,
        color: color || "blue"
      }
    }, { status: 201 })

  } catch (error) {
    console.error("Error creating subject:", error)
    return NextResponse.json(
      { error: "Failed to create subject", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Check admin authentication
    const isAdmin = await checkAdminAuth()
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 401 }
      )
    }

    // Connect to the notesdb database
    const conn = await dbConnect("notesdb")
    if (!conn?.db) {
      throw new Error("Database connection failed")
    }

    // Get all collections (subjects)
    const collections = await conn.db.listCollections().toArray()
    const subjectCollections = collections
      .filter(c => !c.name.startsWith("system."))
      .map(c => ({ name: c.name }))

    return NextResponse.json({
      success: true,
      subjects: subjectCollections
    })

  } catch (error) {
    console.error("Error fetching subjects:", error)
    return NextResponse.json(
      { error: "Failed to fetch subjects", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}