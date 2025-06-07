import  { Schema, Document, model, models } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  resetToken?: string;
resetTokenExpiry?: number;
premium: boolean;

}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
     premium: {
    type: Boolean,
    default: false,      // default false so new users are not premium by default
  },
  },
  { collection: 'users' }
);

export const User = models.User || model<IUser>('User', UserSchema);
