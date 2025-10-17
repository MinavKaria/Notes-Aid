import mongoose, { Document, Model, Connection } from 'mongoose';

export interface IEditLink extends Document {
  linkId: string;
  subjectCollection: string;
  password: string;
  editorName: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  lastAccessedAt?: Date | null;
}

const EditLinkSchema = new mongoose.Schema({
  linkId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  subjectCollection: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  editorName: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastAccessedAt: {
    type: Date,
  },
});

// Export getter function that works with a specific connection
export function getEditLinkModel(connection: Connection): Model<IEditLink> {
  // Check if model already exists on this connection
  const existingModel = connection.models['EditLink'];
  if (existingModel) {
    return existingModel as Model<IEditLink>;
  }
  // Create and return the model on this specific connection
  return connection.model<IEditLink>('EditLink', EditLinkSchema, 'edit_links');
}
