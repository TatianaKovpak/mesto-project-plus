import { Request, Response } from 'express';
import User from '../models/user';
import { NOT_FOUND_ERROR, SERVER_ERROR } from '../constans/errors';
import { RequestWithUser } from '../types/types';

export const getUsers = (req: Request, res: Response) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(() => res.status(NOT_FOUND_ERROR).send({ message: 'На сервере произошла ошибка' }));

export const getUserById = (req: Request, res: Response) => User.findOne({ _id: req.params.userId })
  .then((user) => {
    if (!user) {
      return Promise.reject(new Error('Пользователь не найден'));
    }
    return res.send({ data: user });
  })
  .catch(() => res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' }));

export const createUser = (req: RequestWithUser, res: Response) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

export const updateUser = (req: RequestWithUser, res: Response) => {
  const { name, about } = req.body;
  if (req.user) {
    const userId = req.user._id;
    return User.findByIdAndUpdate(userId, { name, about }, { new: true })
      .then((user) => res.send({ data: user }))
      .catch(() => res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' }));
  }
  return Promise.reject(new Error('На сервере произошла ошибка'));
};

export const updateAvatar = (req: RequestWithUser, res: Response) => {
  const { avatar } = req.body;
  if (req.user) {
    const userId = req.user._id;
    return User.findByIdAndUpdate(userId, { avatar }, { new: true })
      .then((user) => res.send({ data: user }))
      .catch(() => res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' }));
  }
  return Promise.reject(new Error('На сервере произошла ошибка'));
};
