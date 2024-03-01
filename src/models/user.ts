import mongoose from 'mongoose';

interface IUser {
    name: string;
    about: string;
    avatar: string
  }

export const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>('user', userSchema);
