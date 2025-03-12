// File: app/api/github-commits/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // GitHub API endpoint for your repository
    const repoUrl = "https://api.github.com/repos/MinavKaria/Notes-Aid/commits"

    // Make the request to GitHub API
    const response = await fetch(repoUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        // Optional: Add your GitHub token for higher rate limits
        // "Authorization": `token ${process.env.GITHUB_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`)
    }

    const commits = await response.json()

    // Process the commits to the format your frontend expects
    const notifications = commits.map((commit: any) => ({
      id: commit.sha,
      message: commit.commit.message,
      date: commit.commit.author.date,
      read: false,
    }))

    // Return the processed data
    return NextResponse.json(notifications, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    })
  } catch (error) {
    console.error("Error fetching GitHub commits:", error)
    return NextResponse.json(
      { error: "Failed to fetch commits" },
      { status: 500 }
    )
  }
}
