import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  name: string;
  image?: string;
  googleId: string;
  hasPremiumAccess: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    googleId: { type: String, required: true, unique: true },
    hasPremiumAccess: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>('User', UserSchema);
