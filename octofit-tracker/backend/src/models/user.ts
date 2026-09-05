import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, required: true },
    level: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
