import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import mongoose from 'mongoose';
import redis from '@/lib/redis';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ subject: string }> }
) {
  const subjectParam = (await params).subject;
  if (!subjectParam) {
    return NextResponse.json({ error: 'Subject is required' }, { status: 400 });
  }

  console.log("Subject:", subjectParam);
  const cacheKey = `subject:${subjectParam}`;
  try {
    if (redis) {
      const cached = await redis.get(cacheKey);
      if (cached) {
        console.log('Cache hit for', cacheKey);
        return NextResponse.json(JSON.parse(cached));
      }
    }
  } catch (err) {
    console.error('Redis error:', err);
  }

  await dbConnect();

  try {
    const schema = new mongoose.Schema({}, { strict: false });
    const DynamicModel = mongoose.models[subjectParam] || mongoose.model(subjectParam, schema, subjectParam);

    const data = await DynamicModel.find({});
    const response = { subject: subjectParam, data };

    try {
      if (redis) {
        await redis.set(cacheKey, JSON.stringify(response), 'EX', 3600);
      }
    } catch (err) {
      console.error('Redis set error:', err);
    }

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
