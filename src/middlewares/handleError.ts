import { NextFunction, Response } from 'express';
import { CustomError, RequestWithUser } from '../types/types';
import { SERVER_ERROR } from '../constans/errors';

export default function handleError(
  err: CustomError,
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) {
  const { statusCode = SERVER_ERROR } = err;
  let { message } = err;

  if (statusCode === SERVER_ERROR) {
    message = 'На сервере произошла ошибка';
  }

  res.status(statusCode).send({ message });
}
