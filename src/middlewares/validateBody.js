import createError from 'http-errors';

export const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error) {
    const details = error.details.map(d => d.message);
    return next(createError(400, 'Validation error', { details }));
  }
  req.body = value;
  next();
};
