import { Schema, Document, model, models } from 'mongoose';

export interface IUrl extends Document {
  slug: string;
  originalUrl: string;
  createdAt: Date;
  createdBy?: string; // Optional: for user-based shortening
}

const UrlSchema = new Schema<IUrl>(
  {
    slug: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    createdBy: { type: String }, // Optional: User ID/email
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'urls' }
);

export const Url = models.Url || model<IUrl>('Url', UrlSchema);
