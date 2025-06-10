import { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string; // Now optional
  createdAt: Date;
  resetToken?: string;
  resetTokenExpiry?: number;
  premium: boolean;
  name?: string;      // Google provides name
  picture?: string;   // Google provides picture
  provider?: string;  // 'google' or 'credentials'
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Not required anymore
    createdAt: { type: Date, default: Date.now },
    premium: {
      type: Boolean,
      default: false,
    },
    name: { type: String },       // Optional for Google
    picture: { type: String },    // Optional for Google
    provider: { type: String },   // 'google' or 'credentials'
  },
  { collection: "users" }
);

export const User = models.User || model<IUser>("User", UserSchema);
