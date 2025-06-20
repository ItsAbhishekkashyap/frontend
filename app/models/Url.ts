
import { Schema, Document, model, models } from 'mongoose';

export interface IClickDetail {
  timestamp: Date;
  country?: string;    // Location info (optional)
  region?: string;
  city?: string;
  device?: string;     // Device info (optional)
  ip?: string;         // For debugging/future use (optional)
}

export interface IUrl extends Document {
  alias: string;           // renamed from slug to alias
  originalUrl: string;
  createdBy: Schema.Types.ObjectId | null;
  createdAt: Date;
  clicks: number;
  lastAccessed: Date | null;
  clickHistory: Date[];          // old click timestamps
  clickDetails: IClickDetail[];  // new detailed click info
  domainUsed: string;
}

const ClickDetailSchema = new Schema<IClickDetail>(
  {
    timestamp: { type: Date, required: true },
    country: { type: String },
    region: { type: String },
    city: { type: String },
    device: { type: String },
    ip: { type: String },
  },
  { _id: false } // prevent creating _id for subdocuments
);

const UrlSchema = new Schema<IUrl>(
  {
    alias: { type: String, required: true, unique: true },  // renamed here
    originalUrl: { type: String, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
    },
    createdAt: { type: Date, default: Date.now },
    clicks: { type: Number, default: 0 },
    lastAccessed: { type: Date, default: null },
    clickHistory: { type: [Date], default: [] }, // old, keep for compatibility
    clickDetails: { type: [ClickDetailSchema], default: [] }, // new detailed info

     // 🔥 NEW FIELD
    domainUsed: { type: String, default: 'branqly.xyz' } // custom or default domain
  },
  {
    collection: 'urls',
    versionKey: false,
  }
);

export const Url = models.Url || model<IUrl>('Url', UrlSchema);
