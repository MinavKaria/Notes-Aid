import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { getQuickLinkModel } from '@/lib/models/QuickLink';
import { cache, CacheKeys, CacheTTL } from '@/lib/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ subject: string }> }
) {
  try {
    const { subject } = await params;

    if (!subject) {
      return NextResponse.json({ error: 'Subject is required' }, { status: 400 });
    }

    // Try to get from cache first
    const cacheKey = CacheKeys.quickLinks(subject);
    const cached = await cache.get(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    const conn = await dbConnect('notesaid_admin');
    const QuickLink = getQuickLinkModel(conn);

    const quickLinks = await QuickLink.find({ subjectCollections: subject }).sort({ linkType: 1, createdAt: -1 });

    const response = { quickLinks };

    // Cache the result for 1 hour
    await cache.set(cacheKey, response, { ttl: CacheTTL.LONG });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching quick links for subject:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to fetch quick links', details: errorMessage },
      { status: 500 }
    );
  }
}
