import { Router } from 'express';

import {
  deleteCard, dislikeCard, getCards, likeCard, postCard,
} from '../controllers/cards';

const router = Router();

router.post('/', postCard);
router.get('/', getCards);
router.delete('/:cardId/likes', dislikeCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId', deleteCard);

export default router;
