import { Router } from 'express';

import {
  getUsers, getUserById, createUser, updateUser, updateAvatar,
} from '../controllers/users';

const router = Router();

router.patch('/me/avatar', updateAvatar);
router.patch('/me', updateUser);
router.get('/:userId', getUserById);
router.get('/', getUsers);
router.post('/', createUser);

export default router;
