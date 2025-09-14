import express from 'express';

import { preMiddleware } from '../../modules/auth/users/auth.middleware.js';
import { loginController, sendCodeController, validateTokenController } from '../../modules/auth/users/aurh.controller.js';
import createLimiter from '../../middlewares/safety/ratelimiter.middleware.js';

const router = express.Router();
const rateLimiter = createLimiter({ windowMs: 15 * 60 * 1000, max: 5 });

router.post('/pre', rateLimiter, preMiddleware, sendCodeController);

router.post('/login', loginController);

router.post('/validate', validateTokenController);

export default router;