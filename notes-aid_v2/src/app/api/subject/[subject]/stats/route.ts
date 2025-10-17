import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { cache, CacheKeys, CacheTTL } from "@/lib/cache";

/**
 * GET /api/subject/:subject/stats
 * Returns per-module stats: module key, notesCount, videosCount
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ subject: string }> }
) {
  const subjectParam = (await params).subject;
  if (!subjectParam) {
    return NextResponse.json({ error: "Subject is required" }, { status: 400 });
  }

  // Try to get from cache first
  const cacheKey = CacheKeys.stats(subjectParam);
  const cached = await cache.get(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  try {
    const conn = await dbConnect("notesdb");
    if (!conn?.db) {
      throw new Error("DB connection failed");
    }

    const pipeline = [
      {
        $project: {
          moduleKeys: { $objectToArray: "$modules" },
        },
      },
      {
        $project: {
          moduleStats: {
            $map: {
              input: "$moduleKeys",
              as: "m",
              in: {
                key: "$$m.k",
                notesCount: { $size: { $ifNull: ["$$m.v.notesLink", []] } },
                videosCount: {
                  $sum: {
                    $map: {
                      input: { $ifNull: ["$$m.v.topics", []] },
                      as: "t",
                      in: { $size: { $ifNull: ["$$t.videos", []] } },
                    },
                  },
                },
              },
            },
          },
        },
      },
      // unwind moduleStats so we return a flat array of modules (optional)
      { $unwind: "$moduleStats" },
      { $replaceRoot: { newRoot: "$moduleStats" } },
      { $sort: { key: 1 } },
    ];

    // run aggregation on the subject collection
    const coll = conn.db.collection(subjectParam);
    const cursor = coll.aggregate(pipeline);
    const results = await cursor.toArray();

    const response = { subject: subjectParam, modules: results };

    // Cache the result for 30 minutes - stats change less frequently
    await cache.set(cacheKey, response, { ttl: CacheTTL.MEDIUM });

    return NextResponse.json(response);
  } catch (err) {
    console.error("Subject stats error:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
