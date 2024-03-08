import mongoose, { Model, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { linkRegexp } from '../validation/request-validation';

interface IUser {
    name: string;
    about: string;
    avatar: string;
    email: string,
    password: string,
  }

  interface UserModel extends Model<IUser> {
    findUserByCredentials:
    (email: string, password: string) => Promise<Document<unknown, any, IUser>>
  }

export const userSchema = new mongoose.Schema<IUser, UserModel>({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: false,
    default: 'Исследователь',
  },

  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (e: string) => linkRegexp.test(e),
      message: 'Неправильный формат ссылки',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new Error('Неправильные почта или пароль'));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return user;
    });
  });
});

export default mongoose.model<IUser, UserModel>('user', userSchema);
