import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongoose';
import { getQuickLinkModel } from '@/lib/models/QuickLink';
import redis from '@/lib/redis';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { templateName, subjectCollections, linkType, links } = body;

    const conn = await dbConnect('notesaid_admin');
    const QuickLink = getQuickLinkModel(conn);

    // Get the existing quick link to know which subjects to invalidate
    const existingQuickLink = await QuickLink.findById(id);
    if (!existingQuickLink) {
      return NextResponse.json({ error: 'Quick link not found' }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};
    if (templateName !== undefined) updateData.templateName = templateName;
    if (subjectCollections !== undefined) updateData.subjectCollections = subjectCollections;
    if (linkType !== undefined) updateData.linkType = linkType;
    if (links !== undefined) updateData.links = links;
    updateData.updatedAt = new Date();

    const quickLink = await QuickLink.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!quickLink) {
      return NextResponse.json({ error: 'Quick link not found' }, { status: 404 });
    }

    // Invalidate relevant caches for all affected subjects
    try {
      if (redis) {
        const keysToDelete = ['admin:quick-links:all'];
        
        // Add cache keys for old subjects
        existingQuickLink.subjectCollections.forEach((subject: string) => {
          keysToDelete.push(`admin:quick-links:${subject}`);
          keysToDelete.push(`quick-links:${subject}`);
        });
        
        // If subjects changed, also invalidate new subject caches
        if (subjectCollections && Array.isArray(subjectCollections)) {
          subjectCollections.forEach((subject: string) => {
            if (!existingQuickLink.subjectCollections.includes(subject)) {
              keysToDelete.push(`admin:quick-links:${subject}`);
              keysToDelete.push(`quick-links:${subject}`);
            }
          });
        }
        
        await redis.del(...keysToDelete);
      }
    } catch (err) {
      console.error('Redis cache invalidation error:', err);
    }

    return NextResponse.json({ quickLink });
  } catch (error) {
    console.error('Error updating quick link:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to update quick link', details: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const conn = await dbConnect('notesaid_admin');
    const QuickLink = getQuickLinkModel(conn);

    const quickLink = await QuickLink.findByIdAndDelete(id);

    if (!quickLink) {
      return NextResponse.json({ error: 'Quick link not found' }, { status: 404 });
    }

    // Invalidate relevant caches for all subjects
    try {
      if (redis) {
        const keysToDelete = ['admin:quick-links:all'];
        // Add cache keys for each subject
        quickLink.subjectCollections.forEach((subject: string) => {
          keysToDelete.push(`admin:quick-links:${subject}`);
          keysToDelete.push(`quick-links:${subject}`);
        });
        await redis.del(...keysToDelete);
      }
    } catch (err) {
      console.error('Redis cache invalidation error:', err);
    }

    return NextResponse.json({ success: true, message: 'Quick link deleted' });
  } catch (error) {
    console.error('Error deleting quick link:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to delete quick link', details: errorMessage },
      { status: 500 }
    );
  }
}
