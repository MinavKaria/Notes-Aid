import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import mongoose from 'mongoose';
import redis from '@/lib/redis';

export async function GET(
  req: NextRequest,
  context: { params: { subject: string } }
) {
  const { subject } = await context.params;
  console.log("Subject:", subject);

  if (!subject) {
    return NextResponse.json({ error: 'Subject is required' }, { status: 400 });
  }

  const cacheKey = `subject:${subject}`;
  try {
    if (redis) {
      const cached = await redis.get(cacheKey);
      if (cached) {
        return NextResponse.json(JSON.parse(cached));
      }
    }
  } catch (err) {
    console.error('Redis error:', err);
  }

  await dbConnect();

  try {
    const schema = new mongoose.Schema({}, { strict: false });
    const DynamicModel = mongoose.models[subject] || mongoose.model(subject, schema, subject);

    const data = await DynamicModel.find({});
    const response = { subject, data };

    try {
      if (redis) {
        await redis.set(cacheKey, JSON.stringify(response), 'EX', 3600);
      }
    } catch (err) {
      console.error('Redis set error:', err);
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch data', details: error.message },
      { status: 500 }
    );
  }
}
