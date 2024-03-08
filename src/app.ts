import express from 'express';
import mongoose from 'mongoose';
import { login, createUser } from './controllers/users';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import handleError from './middlewares/handleError';
import { loginValidation, registrationValidation } from './validation/request-validation';

const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(requestLogger);

app.post('/signin', loginValidation, login);
app.post('/signup', registrationValidation, createUser);

app.use(auth);

app.use('/cards', cardRouter);
app.use('/users', userRouter);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
