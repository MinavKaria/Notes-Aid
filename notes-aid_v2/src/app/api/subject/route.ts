import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import redis from "@/lib/redis";
import { MongoCollection } from "@/types/api";

/**
 * GET /api/subject
 * Returns list of collection names in the `notesdb` database (used as subject names).
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  const cacheKey = "subjects:all";
  try {
    // try cache
    if (redis) {
      const cached = await redis.get(cacheKey);
      if (cached) {
        return NextResponse.json({ subjects: JSON.parse(cached) });
      }
    }
  } catch (err) {
    console.error("Redis get error:", err);
  }

  try {
  const conn = await dbConnect("notesdb");
  if (!conn?.db) {
    throw new Error("Database connection failed");
  }
  
  const collections = await conn.db.listCollections().toArray();

  console.log("Collections found:", collections.map((c: MongoCollection) => c.name));

    const names = collections
      .map((c: MongoCollection) => c.name)
      .filter((n: string) => !n.startsWith("system."))
      .sort();

    try {
      if (redis) {
        await redis.set(cacheKey, JSON.stringify(names), "EX", 3600); // cache 1 hour
      }
    } catch (err) {
      console.error("Redis set error:", err);
    }

    return NextResponse.json({ subjects: names });
  } catch (error) {
    console.error("Failed to list subject collections:", error);
    return NextResponse.json(
      { error: "Failed to fetch subject list", details: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
