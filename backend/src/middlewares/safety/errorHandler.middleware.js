import { Logger } from '../../utils/generators/logs/logger.log.js';

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  // Send response with error details
  const statusCode = err.status || 500;
  Logger.error(`Error-Request : ${err.message}`, {
    info: { ip: req.ip, url: req.url, user_agent: req.headers['user-agent'] },
  });
  res.status(statusCode).json({
    body: null,
    status: statusCode,
    message: err.message,
    success: false,
  });
};

export default errorHandler;
