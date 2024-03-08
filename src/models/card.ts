import { model, Schema } from 'mongoose';
import { linkRegexp } from '../validation/request-validation';

interface ICard {
    name: string,
    link: string,
    owner: Schema.Types.ObjectId,
    likes: Schema.Types.ObjectId[],
    createdAt: Schema.Types.Date
  }

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator: (e: string) => linkRegexp.test(e),
      message: 'Неправильный формат ссылки',
    },
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

export default model<ICard>('card', cardSchema);
