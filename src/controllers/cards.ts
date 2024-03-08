import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../types/types';
import Card from '../models/card';
import NotFoundError from '../errors/not-found-err';
import DeleteError from '../errors/server-err';

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards) => res.send({ data: cards }))
  .catch(next);

export const postCard = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

export const deleteCard = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => Card.findById(req.params.cardId)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    const owner = req.user._id;
    if (String(card.owner) === owner) {
      Card.deleteOne()
        .then(() => res.send({ message: 'success' }))
        .catch(next);
    } else {
      throw new DeleteError('Нельзя удалить чужую карточку');
    }
  })
  .catch(next);

export const likeCard = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const owner = req.user._id;
  const card = req.params.cardId;
  return Card.findByIdAndUpdate(card, { $addToSet: { likes: owner } }, { new: true })
    .then((chandedCard) => {
      if (!chandedCard) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.send(chandedCard);
    })
    .catch(next);
};

export const dislikeCard = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const owner = req.user._id;
  const card = req.params.cardId;
  return Card.findByIdAndUpdate(card, { $pull: { likes: owner } }, { new: true })
    .then((chandedCard) => {
      if (!chandedCard) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.send(chandedCard);
    })
    .catch(next);
};
