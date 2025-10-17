import mongoose, { Document, Model, Connection } from 'mongoose';

export interface IQuickLinkItem {
  name: string;
  url: string;
}

export interface IQuickLink extends Document {
  templateName: string;
  subjectCollections: string[]; // Changed from single string to array
  linkType: 'books' | 'pyqs' | 'other';
  links: IQuickLinkItem[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuickLinkItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
}, { _id: false });

const QuickLinkSchema = new mongoose.Schema({
  templateName: {
    type: String,
    required: true,
  },
  subjectCollections: {
    type: [String],
    required: true,
    index: true,
  },
  linkType: {
    type: String,
    enum: ['books', 'pyqs', 'other'],
    required: true,
  },
  links: {
    type: [QuickLinkItemSchema],
    default: [],
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp on save
QuickLinkSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Export getter function that works with a specific connection
export function getQuickLinkModel(connection: Connection): Model<IQuickLink> {
  // Check if model already exists on this connection
  const existingModel = connection.models['QuickLink'];
  if (existingModel) {
    return existingModel as Model<IQuickLink>;
  }
  // Create and return the model on this specific connection
  return connection.model<IQuickLink>('QuickLink', QuickLinkSchema, 'quick_links');
}
