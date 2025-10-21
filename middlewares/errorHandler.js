import { HttpError } from 'http-errors';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    // Handle HTTP errors
    return res.status(err.statusCode).send({
      message: err.message,
      status: err.statusCode,
    });
  }
  res.status(500).send({
    message: err.message ?? 'Internal Server Error',
    // message: 'Internal Server Error',
    status: 500,
  });
};
