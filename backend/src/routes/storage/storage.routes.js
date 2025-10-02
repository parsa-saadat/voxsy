import express from 'express';

import { deleteOneFileController, getFilesController, getOneFileController, uploadController } from '../../modules/storage/storage.controller.js';
import { uploadMiddleware } from '../../modules/storage/storage.middleware.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/safety/auth.middleware.js';

const router = express.Router()

router.post('/upload', authenticateToken, uploadMiddleware.array('files'), uploadController);

router.get('/', authenticateToken, authorizeRoles(['owner', "manager", 'admin']), getFilesController);

router.get('/:id', getOneFileController);

router.delete('/:id', authenticateToken, deleteOneFileController);


export default router;