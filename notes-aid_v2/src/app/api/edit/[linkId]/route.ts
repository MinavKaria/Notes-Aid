import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { getEditLinkModel, IEditLink } from '@/lib/models/EditLink';
import { getPendingChangeModel, IPendingChange } from '@/lib/models/PendingChange';
import mongoose, { Model } from 'mongoose';

interface EditLinkDoc {
  linkId: string;
  subjectCollection: string;
  password: string;
  editorName: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  lastAccessedAt?: Date;
}

// GET - Authenticate and fetch subject data for editing
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ linkId: string }> }
) {
  const linkId = (await params).linkId;
  
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 401 });
    }

    const adminConn = await dbConnect('notesaid_admin');
    const EditLink: Model<IEditLink> = getEditLinkModel(adminConn);
    const editLink = await EditLink.findOne({ linkId }).lean() as unknown as EditLinkDoc | null;

    if (!editLink) {
      return NextResponse.json({ error: 'Invalid link' }, { status: 404 });
    }

    if (!editLink.isActive) {
      return NextResponse.json({ error: 'This link has been revoked' }, { status: 403 });
    }

    if (editLink.password !== password) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Update last accessed time
    await EditLink.updateOne({ linkId }, { lastAccessedAt: new Date() });

    // Fetch subject data from notesdb
    const notesConn = await dbConnect('notesdb');
    const schema = new mongoose.Schema({}, { strict: false });
    const SubjectModel = (notesConn.models && notesConn.models[editLink.subjectCollection]) || 
                         notesConn.model(editLink.subjectCollection, schema, editLink.subjectCollection);
    
    const subjectData = await SubjectModel.find({}).lean();

    return NextResponse.json({
      success: true,
      editorName: editLink.editorName,
      subjectCollection: editLink.subjectCollection,
      subjectData: subjectData[0] || {},
    });
  } catch (error) {
    console.error('Error in edit link GET:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}

// POST - Submit changes for review
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ linkId: string }> }
) {
  const linkId = (await params).linkId;
  
  try {
    const body = await request.json();
    const { password, changeData } = body;

    if (!password || !changeData) {
      return NextResponse.json({ error: 'Password and change data required' }, { status: 400 });
    }

    const adminConn = await dbConnect('notesaid_admin');
    const EditLink: Model<IEditLink> = getEditLinkModel(adminConn);
    const editLink = await EditLink.findOne({ linkId }).lean() as unknown as EditLinkDoc | null;

    if (!editLink) {
      return NextResponse.json({ error: 'Invalid link' }, { status: 404 });
    }

    if (!editLink.isActive) {
      return NextResponse.json({ error: 'This link has been revoked' }, { status: 403 });
    }

    if (editLink.password !== password) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Create pending change record
    const PendingChange: Model<IPendingChange> = getPendingChangeModel(adminConn);
    const pendingChange = await PendingChange.create({
      linkId,
      subjectCollection: editLink.subjectCollection,
      editorName: editLink.editorName,
      changeData,
      changeType: 'full_update',
      status: 'pending',
    });

    return NextResponse.json({
      success: true,
      message: 'Changes submitted for review',
      changeId: pendingChange._id,
    });
  } catch (error) {
    console.error('Error submitting changes:', error);
    return NextResponse.json({ error: 'Failed to submit changes' }, { status: 500 });
  }
}
