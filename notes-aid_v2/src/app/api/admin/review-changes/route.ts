import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongoose';
import { getPendingChangeModel } from '@/lib/models/PendingChange';
import { isSuperAdmin } from '@/lib/permissions';
import mongoose from 'mongoose';
import { cache } from '@/lib/cache';

// GET - List all pending changes (super admin only)
export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const username = session.user.githubUsername || session.user.email?.split('@')[0] || session.user.name || '';
  
  if (!isSuperAdmin(username)) {
    return NextResponse.json({ error: 'Forbidden - Super admin only' }, { status: 403 });
  }

  try {
    const adminConn = await dbConnect('notesaid_admin');
    const PendingChange = getPendingChangeModel(adminConn);
    const changes = await PendingChange.find({}).sort({ submittedAt: -1 }).lean();
    
    // Fetch original data for each pending change
    const notesConn = await dbConnect('notesdb');
    const changesWithOriginal = await Promise.all(
      changes.map(async (change) => {
        try {
          const schema = new mongoose.Schema({}, { strict: false });
          const SubjectModel = (notesConn.models && notesConn.models[change.subjectCollection]) ||
                               notesConn.model(change.subjectCollection, schema, change.subjectCollection);

          const originalData = await SubjectModel.find({}).lean();
          return {
            ...change,
            originalData: originalData[0] || null,
          };
        } catch (error) {
          console.error(`Error fetching original data for ${change.subjectCollection}:`, error);
          return {
            ...change,
            originalData: null,
          };
        }
      })
    );

    return NextResponse.json({ changes: changesWithOriginal });
  } catch (error) {
    console.error('Error fetching pending changes:', error);
    return NextResponse.json({ error: 'Failed to fetch pending changes' }, { status: 500 });
  }
}

// POST - Approve or reject a change (super admin only)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const username = session.user.githubUsername || session.user.email?.split('@')[0] || session.user.name || '';
  
  if (!isSuperAdmin(username)) {
    return NextResponse.json({ error: 'Forbidden - Super admin only' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { changeId, action, reviewNotes } = body;

    if (!changeId || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const adminConn = await dbConnect('notesaid_admin');
    const PendingChange = getPendingChangeModel(adminConn);
    const change = await PendingChange.findById(changeId);

    if (!change) {
      return NextResponse.json({ error: 'Change not found' }, { status: 404 });
    }

    if (change.status !== 'pending') {
      return NextResponse.json({ error: 'Change already reviewed' }, { status: 400 });
    }

    if (action === 'approve') {
      // Apply changes to the actual database
      const notesConn = await dbConnect('notesdb');
      const schema = new mongoose.Schema({}, { strict: false });
      const SubjectModel = (notesConn.models && notesConn.models[change.subjectCollection]) || 
                           notesConn.model(change.subjectCollection, schema, change.subjectCollection);
      
      // Update the subject with new data
      await SubjectModel.deleteMany({});
      await SubjectModel.create(change.changeData);

      // Invalidate cache for this subject
      await cache.delPattern(`subject:${change.subjectCollection}*`);
      await cache.delPattern(`stats:${change.subjectCollection}*`);

      // Update pending change status
      change.status = 'approved';
      change.reviewedAt = new Date();
      change.reviewedBy = username;
      change.reviewNotes = reviewNotes || '';
      await change.save();

      return NextResponse.json({
        success: true,
        message: 'Changes approved and applied',
      });
    } else {
      // Reject changes
      change.status = 'rejected';
      change.reviewedAt = new Date();
      change.reviewedBy = username;
      change.reviewNotes = reviewNotes || '';
      await change.save();

      return NextResponse.json({
        success: true,
        message: 'Changes rejected',
      });
    }
  } catch (error) {
    console.error('Error reviewing change:', error);
    return NextResponse.json({ error: 'Failed to review change' }, { status: 500 });
  }
}
