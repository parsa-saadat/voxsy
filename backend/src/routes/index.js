import { Router } from 'express';

import errorHandler from '../middlewares/safety/errorHandler.middleware.js';
import authRoutes from '../routes/auth/auth.routes.js';

const router = Router();

router.use(errorHandler);

router.use('/auth' , authRoutes)

export default router;

