import multer from 'multer';
import { validateFileContent } from '../../utils/validators/file.validator.js';
import { Logger } from '../../utils/generators/logs/logger.log.js';

const storage = multer.memoryStorage();

const { ALLOWED_MIME_TYPES, MAX_MB_UPLOAD_SIZE } = process.env

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: MAX_MB_UPLOAD_SIZE || 5 * 1024 * 1024 },
  fileFilter: async (req, file, cb) => {
    const allowedMimeTypes = ALLOWED_MIME_TYPES.split(',') || ['image/*', 'video/*']
    if (req.files.length > 5)
      cb(new Error('Max File Length Is 5 File'), false);
    
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image, video, and audio files are allowed'), false);
    }
  },
});