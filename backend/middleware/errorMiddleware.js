/**
 * Middleware for handling 404 errors for routes not found.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  return next(error);
};

/**
 * Middleware for handling errors.
 * @param {Error} err - The error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Handle specific error cases
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource Not Found!';
    statusCode = 404;
  }

  // Send a JSON response with the error details
  return res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
};

export { notFound, errorHandler };
