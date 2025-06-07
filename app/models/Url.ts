import { Schema, Document, model, models } from 'mongoose';

export interface IUrl extends Document {
  slug: string;
  originalUrl: string;
  createdBy: Schema.Types.ObjectId;  // ✅ changed from `user`
  createdAt: Date;
  clicks: number;
  lastAccessed: Date | null;
  clickHistory: Date[];
}

const UrlSchema = new Schema<IUrl>(
  {
    slug: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    createdBy: {                                // ✅ changed from `user`
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    clicks: { type: Number, default: 0 },
    lastAccessed: { type: Date, default: null },
    clickHistory: { type: [Date], default: [] },
  },
  {
    collection: 'urls',
    versionKey: false,
  }
);

export const Url = models.Url || model<IUrl>('Url', UrlSchema);



