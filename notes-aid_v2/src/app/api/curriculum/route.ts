import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongoose";
import { cache, CacheKeys, CacheTTL } from "@/lib/cache";
import { CurriculumFilter, CurriculumPostBody } from "@/types/api";

/**
 * Handles GET requests to retrieve curriculum data from the database.
 *
 * Connects to the "metadata" database, dynamically defines a Mongoose model for the "curriculum" collection,
 * and applies optional filters for `year` and `branch` based on query parameters.
 *
 * @param request - The incoming Next.js request object, used to extract query parameters.
 * @returns A JSON response containing the filtered curriculum documents or an error message.
 *
 * @throws Returns a 500 status JSON response if a database or server error occurs.
 */

export async function GET(request: NextRequest) {
  try {
    const year = request.nextUrl.searchParams.get("year");
    const branch = request.nextUrl.searchParams.get("branch");
    
    // Create cache key and try to get cached data
    const cacheKey = CacheKeys.curriculum(year || undefined, branch || undefined);
    const cached = await cache.get(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    // If not cached, fetch from database
    const conn = await dbConnect("metadata");
    const Schema = new mongoose.Schema({}, { strict: false });
    const Model = conn.models.curriculum || conn.model("curriculum", Schema, "curriculum");

    const filter: CurriculumFilter = {};
    if (year) filter.year = Number(year);
    if (branch) filter.branch = branch;

    const docs = await Model.find(filter).lean();
    const response = { data: docs };

    // Cache the result for 1 hour
    await cache.set(cacheKey, response, { ttl: CacheTTL.LONG });

    return NextResponse.json(response);
  } catch (err: unknown) {
    console.error("Curriculum GET error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * Handles POST requests to create or update a curriculum document in the database.
 *
 * Expects a JSON body with the following properties:
 * - `year`: The academic year (required).
 * - `branch`: The branch or department (required).
 * - `subjects`: An array of subjects (required).
 *
 * If a curriculum document matching the provided `year` and `branch` exists, it updates the `subjects` and `updatedAt` fields.
 * If not, it creates a new document with the provided data.
 *
 * Returns a JSON response with the updated or created document on success.
 * Returns a 400 error if required fields are missing.
 * Returns a 500 error if an unexpected error occurs.
 *
 * @param request - The incoming Next.js request object.
 * @returns A Next.js JSON response containing the result or error information.
 */


export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CurriculumPostBody;
    if (!body?.year || !body?.branch || !Array.isArray(body.subjects)) {
      return NextResponse.json({ error: "year, branch and subjects[] required" }, { status: 400 });
    }

    const conn = await dbConnect("metadata");
    const Schema = new mongoose.Schema({}, { strict: false });
    const Model = conn.models.curriculum || conn.model("curriculum", Schema, "curriculum");

    const doc = await Model.findOneAndUpdate(
      { year: Number(body.year), branch: body.branch },
      { $set: { subjects: body.subjects, updatedAt: new Date() } },
      { upsert: true, new: true }
    );

    // Invalidate related cache entries
    const cacheKeysToInvalidate = [
      CacheKeys.curriculum(), // all:all
      CacheKeys.curriculum(body.year.toString()), // year:all
      CacheKeys.curriculum(undefined, body.branch), // all:branch
      CacheKeys.curriculum(body.year.toString(), body.branch) // year:branch
    ];
    
    await cache.del(cacheKeysToInvalidate);

    return NextResponse.json({ success: true, data: doc });
  } catch (err: unknown) {
    console.error("Curriculum POST error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}