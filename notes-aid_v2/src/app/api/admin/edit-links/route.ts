import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongoose';
import { getEditLinkModel } from '@/lib/models/EditLink';
import { isSuperAdmin } from '@/lib/permissions';

// Generate random link ID
function generateLinkId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// GET - List all edit links (super admin only)
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
    const conn = await dbConnect('notesaid_admin');
    const EditLink = getEditLinkModel(conn);
    let links = await EditLink.find({}).sort({ createdAt: -1 }).lean();

    // If collection is empty, insert a dummy document to trigger creation
    if (links.length === 0) {
      const dummy = await EditLink.create({
        linkId: 'dummy',
        subjectCollection: 'dummySubject',
        password: 'dummyPassword',
        editorName: 'dummyEditor',
        createdBy: 'system',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // Remove the dummy document immediately
      await EditLink.deleteOne({ _id: dummy._id });
      links = [];
    }

    return NextResponse.json({ links });
  } catch (error) {
    console.error('Error fetching edit links:', error);
    return NextResponse.json({ error: 'Failed to fetch edit links' }, { status: 500 });
  }
}

// POST - Create new edit link (super admin only)
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
    const { subjectCollection, password, editorName } = body;

    if (!subjectCollection || !password || !editorName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const conn = await dbConnect('notesaid_admin');
    const EditLink = getEditLinkModel(conn);
    const linkId = generateLinkId();

    const newLink = await EditLink.create({
      linkId,
      subjectCollection,
      password,
      editorName,
      createdBy: username,
    });

    return NextResponse.json({ 
      success: true, 
      link: newLink,
      editUrl: `/edit/${linkId}`
    });
  } catch (error) {
    console.error('Error creating edit link:', error);
    return NextResponse.json({ error: 'Failed to create edit link' }, { status: 500 });
  }
}

// DELETE - Revoke edit link (super admin only)
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const username = session.user.githubUsername || session.user.email?.split('@')[0] || session.user.name || '';
  
  if (!isSuperAdmin(username)) {
    return NextResponse.json({ error: 'Forbidden - Super admin only' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const linkId = searchParams.get('linkId');

    if (!linkId) {
      return NextResponse.json({ error: 'Link ID required' }, { status: 400 });
    }

    const conn = await dbConnect('notesaid_admin');
    const EditLink = getEditLinkModel(conn);
    await EditLink.updateOne({ linkId }, { isActive: false });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error revoking edit link:', error);
    return NextResponse.json({ error: 'Failed to revoke edit link' }, { status: 500 });
  }
}
