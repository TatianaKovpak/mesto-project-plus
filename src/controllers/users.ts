import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = (req: Request, res: Response) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(() => res.status(404).send({ message: 'Произошла ошибка' }));

export const getUserById = (req: Request, res: Response) => User.findOne({ _id: req.params.userId })
  .then((user) => {
    if (!user) {
      return Promise.reject(new Error('Пользователь не найден'));
    }
    return res.send({ data: user });
  })
  .catch(() => res.status(404).send({ message: 'Пользователь не найден' }));

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const updateUser = (req: Request, res: Response) => {
  const { name, about } = req.body;
  if (req.user) {
    const userId = req.user._id;
    return User.findByIdAndUpdate(userId, { name, about }, { new: true })
      .then((user) => res.send({ data: user }))
      .catch(() => res.status(404).send({ message: 'Пользователь не найден' }));
  }
  return Promise.reject(new Error('Произошла ошибка'));
};

export const updateAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;
  if (req.user) {
    const userId = req.user._id;
    return User.findByIdAndUpdate(userId, { avatar }, { new: true })
      .then((user) => res.send({ data: user }))
      .catch(() => res.status(404).send({ message: 'Пользователь не найден' }));
  }
  return Promise.reject(new Error('Произошла ошибка'));
};
