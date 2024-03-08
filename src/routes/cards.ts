import { Router } from 'express';

import {
  deleteCard, dislikeCard, getCards, likeCard, postCard,
} from '../controllers/cards';
import { cardIdValidation, postCardValidation } from '../validation/request-validation';

const router = Router();

router.post('/', postCardValidation, postCard);
router.get('/', getCards);
router.delete('/:cardId/likes', cardIdValidation, dislikeCard);
router.put('/:cardId/likes', cardIdValidation, likeCard);
router.delete('/:cardId', cardIdValidation, deleteCard);

export default router;
