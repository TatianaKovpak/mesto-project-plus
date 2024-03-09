import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { RequestWithUser } from '../types/types';
import NotFoundError from '../errors/not-found-err';
import EmailError from '../errors/email-err';

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(next);

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findOne({ _id: req.params.userId })
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.send({ data: user });
  })
  .catch(next);

export const createUser = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const userWithoutPassword = {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      };
      res.status(201).send({ data: userWithoutPassword });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new EmailError('Пользователь с таким Email уже существует'));
      }
      next(err);
    });
};

export const updateUser = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  return User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const updateAvatar = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  return User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const login = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

export const getCurrentUser = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const userId = req.user._id;
  if (!userId) {
    throw new NotFoundError('Пользователь не найден');
  }
  return User.findOne({ _id: userId })
    .then((user) => res.send({ data: user }))
    .catch((next));
};
