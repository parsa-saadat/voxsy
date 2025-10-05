import { Router } from 'express';

import errorHandler from '../middlewares/safety/errorHandler.middleware.js';
import authRoutes from '../routes/auth/auth.routes.js';
import storageRoutes from '../routes/storage/storage.routes.js';
import usersRoutes from '../routes/users/users.route.js';
import messageRoutes from '../routes/messages/messages.routes.js';
import chatsRoutes from '../routes/chats/chats.routes.js';

const router = Router();

router.use(errorHandler);

router.use('/auth', authRoutes)
router.use('/storage', storageRoutes)
router.use('/users', usersRoutes)
router.use('/message', messageRoutes)
router.use('/chats', chatsRoutes)

export default router;

