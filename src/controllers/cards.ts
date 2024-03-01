import { Request, Response } from 'express';
import { NOT_FOUND_ERROR, SERVER_ERROR } from '../constans/errors';
import { RequestWithUser } from '../types/types';
import Card from '../models/card';

export const getCards = (req: Request, res: Response) => Card.find({})
  .then((cards) => res.send({ data: cards }))
  .catch(() => res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));

export const postCard = (req: RequestWithUser, res: Response) => {
  const { name, link } = req.body;

  if (req.user) {
    const owner = req.user._id;
    return Card.create({ name, link, owner })
      .then((card) => res.send({ data: card }))
      .catch(() => res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
  }
  return Promise.reject(new Error('На сервере произошла ошибка'));
};

export const deleteCard = (req: Request, res: Response) => Card.findById(req.params.cardId)
  .then((card) => {
    if (!card) {
      return Promise.reject(new Error('Карточка не найдена'));
    }
    return Card.deleteOne()
      .then(() => res.send({ message: 'success' }))
      .catch(() => res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' }));
  });

export const likeCard = (req: RequestWithUser, res: Response) => {
  if (req.user) {
    const owner = req.user._id;
    const card = req.params.cardId;
    return Card.findByIdAndUpdate(card, { $addToSet: { likes: owner } }, { new: true })
      .then((chandedCard) => {
        if (!chandedCard) {
          return Promise.reject(new Error('Карточка не найдена'));
        }
        return res.send(chandedCard);
      })
      .catch(() => res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' }));
  }
  return Promise.reject(new Error('На сервере произошла ошибка'));
};

export const dislikeCard = (req: RequestWithUser, res: Response) => {
  if (req.user) {
    const owner = req.user._id;
    const card = req.params.cardId;
    return Card.findByIdAndUpdate(card, { $pull: { likes: owner } }, { new: true })
      .then((chandedCard) => {
        if (!chandedCard) {
          return Promise.reject(new Error('Карточка не найдена'));
        }
        return res.send(chandedCard);
      })
      .catch(() => res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' }));
  }
  return Promise.reject(new Error('На сервере произошла ошибка'));
};
