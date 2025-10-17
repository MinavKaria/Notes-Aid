import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongoose';
import { getQuickLinkModel } from '@/lib/models/QuickLink';
import redis from '@/lib/redis';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const subjectCollection = searchParams.get('subject');

    // Build cache key
    const cacheKey = subjectCollection 
      ? `admin:quick-links:${subjectCollection}`
      : 'admin:quick-links:all';

    // Try to get from cache first
    try {
      if (redis) {
        const cached = await redis.get(cacheKey);
        if (cached) {
          return NextResponse.json(JSON.parse(cached));
        }
      }
    } catch (err) {
      console.error('Redis get error:', err);
    }

    const conn = await dbConnect('notesaid_admin');
    const QuickLink = getQuickLinkModel(conn);

    let query = {};
    if (subjectCollection) {
      query = { subjectCollections: subjectCollection }; // Query array field
    }

    const quickLinks = await QuickLink.find(query).sort({ createdAt: -1 });

    const response = { quickLinks };

    // Cache the result for 1 hour
    try {
      if (redis) {
        await redis.set(cacheKey, JSON.stringify(response), 'EX', 3600);
      }
    } catch (err) {
      console.error('Redis set error:', err);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching quick links:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to fetch quick links', details: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { templateName, subjectCollections, linkType, links } = body;

    if (!templateName || !subjectCollections || !Array.isArray(subjectCollections) || subjectCollections.length === 0 || !linkType) {
      return NextResponse.json(
        { error: 'Missing required fields: templateName, subjectCollections (array), linkType' },
        { status: 400 }
      );
    }

    const conn = await dbConnect('notesaid_admin');
    const QuickLink = getQuickLinkModel(conn);

    const newQuickLink = new QuickLink({
      templateName,
      subjectCollections,
      linkType,
      links: links || [],
      createdBy: session.user.email || session.user.githubUsername || 'unknown',
    });

    await newQuickLink.save();

    // Invalidate relevant caches for all subjects
    try {
      if (redis) {
        const keysToDelete = ['admin:quick-links:all'];
        // Add cache keys for each subject
        subjectCollections.forEach((subject: string) => {
          keysToDelete.push(`admin:quick-links:${subject}`);
          keysToDelete.push(`quick-links:${subject}`);
        });
        await redis.del(...keysToDelete);
      }
    } catch (err) {
      console.error('Redis cache invalidation error:', err);
    }

    return NextResponse.json({ quickLink: newQuickLink }, { status: 201 });
  } catch (error) {
    console.error('Error creating quick link:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to create quick link', details: errorMessage },
      { status: 500 }
    );
  }
}
