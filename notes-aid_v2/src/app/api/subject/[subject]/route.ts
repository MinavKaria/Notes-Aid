import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import mongoose from 'mongoose';
import { cache, CacheKeys, CacheTTL } from '@/lib/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ subject: string }> }
) {
  const subjectParam = (await params).subject;
  if (!subjectParam) {
    return NextResponse.json({ error: 'Subject is required' }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const moduleParam = searchParams.get('module');

  console.log("Subject:", subjectParam);
  
  // Try to get from cache first
  const cacheKey = CacheKeys.subject(subjectParam, moduleParam || undefined);
  const cached = await cache.get(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  const conn = await dbConnect('notesdb');
  
  try {
    const schema = new mongoose.Schema({}, { strict: false });
    const DynamicModel = (conn.models && conn.models[subjectParam]) || conn.model(subjectParam, schema, subjectParam);

    let data;
    if (moduleParam) {
      // Fetch only that module
      data = await DynamicModel.find({}, { [`modules.${moduleParam}`]: 1,  });
    } else {
      // Fetch everything
      data = await DynamicModel.find({});
    }
    const response = { subject: subjectParam, data };

    // Cache the result for 1 hour
    await cache.set(cacheKey, response, { ttl: CacheTTL.LONG });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to fetch data', details: errorMessage },
      { status: 500 }
    );
  }
}