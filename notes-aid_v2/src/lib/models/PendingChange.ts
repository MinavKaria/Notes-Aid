import mongoose, { Document, Model, Connection } from 'mongoose';

export interface IPendingChange extends Document {
  linkId: string;
  subjectCollection: string;
  editorName: string;
  changeData: unknown;
  changeType: 'full_update' | 'partial_update';
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  reviewNotes?: string;
}

const PendingChangeSchema = new mongoose.Schema({
  linkId: {
    type: String,
    required: true,
    index: true,
  },
  subjectCollection: {
    type: String,
    required: true,
  },
  editorName: {
    type: String,
    required: true,
  },
  changeData: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  changeType: {
    type: String,
    enum: ['full_update', 'partial_update'],
    default: 'full_update',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  reviewedAt: {
    type: Date,
  },
  reviewedBy: {
    type: String,
  },
  reviewNotes: {
    type: String,
  },
});

// Export getter function that works with a specific connection
export function getPendingChangeModel(connection: Connection): Model<IPendingChange> {
  // Check if model already exists on this connection
  const existingModel = connection.models['PendingChange'];
  if (existingModel) {
    return existingModel as Model<IPendingChange>;
  }
  // Create and return the model on this specific connection
  return connection.model<IPendingChange>('PendingChange', PendingChangeSchema, 'pending_changes');
}
