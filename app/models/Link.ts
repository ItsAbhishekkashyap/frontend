import { Schema, model, models } from 'mongoose';

const linkSchema = new Schema({
  originalUrl: { type: String, required: true },
  alias: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  // optionally add expiryDate, clicks etc.
});

const Link = models.Link || model('Link', linkSchema);
export default Link;
