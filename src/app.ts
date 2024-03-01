import express, { Response } from 'express';
import mongoose from 'mongoose';
import { RequestWithUser } from './types/types';
import userRouter from './routes/users';
import cardRouter from './routes/cards';

const { PORT = 3000 } = process.env;

const app = express();
app.use((req: RequestWithUser, res: Response, next) => {
  req.user = {
    _id: '65de03907f41d35ab0b93034', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/cards', cardRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
