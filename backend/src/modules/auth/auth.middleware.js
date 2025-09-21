import { preService } from './auth.service.js';

export const preMiddleware = async (req, res, next) => {
  try {
    await preService(req.body);
    next();
  } catch (e) {
    res.status(e.cause?.code || 500).json({
      body: null,
      status: 400,
      message: e.message,
      success: false,
    });
  }
};
