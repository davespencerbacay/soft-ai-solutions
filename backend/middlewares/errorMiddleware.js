import NotFoundError from "../utils/custom-errors/NotFoundError.js";

const notFound = (req, res, next) => {
  throw new NotFoundError(`Resource not found - ${req.originalUrl}`);
};

const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({
    status: err.statusCode ?? 500,
    message: err.message ?? 'Internal Server Error',
    stack: err.stack,
  });
};

export { notFound, errorHandler };