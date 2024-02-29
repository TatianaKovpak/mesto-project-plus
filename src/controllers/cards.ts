import { Request, Response } from 'express';
import Card from '../models/card';

export const getCards = (req: Request, res: Response) => Card.find({})
  .then((cards) => res.send({ data: cards }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

export const postCard = (req: Request, res: Response) => {
  const { name, link } = req.body;

  if (req.user) {
    const owner = req.user._id;
    return Card.create({ name, link, owner })
      .then((card) => res.send({ data: card }))
      .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
  }
  return Promise.reject(new Error('Произошла ошибка'));
};

export const deleteCard = (req: Request, res: Response) => Card.findById(req.params.cardId)
  .then((card) => {
    if (!card) {
      return Promise.reject(new Error('Карточка не найдена'));
    }
    return Card.deleteOne()
      .then(() => res.send({ message: 'success' }))
      .catch(() => res.status(404).send({ message: 'Карточка не найдена' }));
  });

export const likeCard = (req: Request, res: Response) => {
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
      .catch(() => res.status(404).send({ message: 'Карточка не найдена' }));
  }
  return Promise.reject(new Error('Произошла ошибка'));
};

export const dislikeCard = (req: Request, res: Response) => {
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
      .catch(() => res.status(404).send({ message: 'Карточка не найдена' }));
  }
  return Promise.reject(new Error('Произошла ошибка'));
};
