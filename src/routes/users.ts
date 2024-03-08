import { Router } from 'express';

import {
  getUsers, getUserById, updateUser, updateAvatar, getCurrentUser,
} from '../controllers/users';
import { updateAvatarValidation, updateUserValidation, userIdValidation } from '../validation/request-validation';

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);
router.patch('/me', updateUserValidation, updateUser);
router.get('/:userId', userIdValidation, getUserById);

export default router;
