import multer from 'multer';
import { validateFileContent } from '../../utils/validators/file.validator';

const storage = multer.memoryStorage();

const { ALLOWED_MIME_TYPES, MAX_MB_UPLOAD_SIZE } = process.env

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: MAX_MB_UPLOAD_SIZE || 5 * 1024 * 1024 },
  fileFilter: async (req, file, cb) => {
    const allowedMimeTypes = ALLOWED_MIME_TYPES.split(',') || ['image/*', 'video/*']

    if (allowedMimeTypes.includes(file.mimetype)) {
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const validate = validateFileContent(file.buffer)
        if (!validate)
          cb(new Error('Your File Have Bad Content'), false);

      }
      cb(null, true);
    } else {
      cb(new Error('Only image, video, and audio files are allowed'), false);
    }

    try {
      const valid = await validateFileContent(file.buffer);
      if (!valid) {
        return cb(new Error('File contains malicious content'), false);
      }
      cb(null, true);
    } catch (e) {
      Logger.error(`Error-Upload-File : ${e.message}`, {
        info: { ip: req.ip, url: req.url, user_agent: req.headers['user-agent'] },
      });
      cb(new Error('Error validating file'), false);
    }
  },
});