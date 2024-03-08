import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../types/types';
import LoginError from '../errors/login-err';

export default (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new LoginError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new LoginError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
