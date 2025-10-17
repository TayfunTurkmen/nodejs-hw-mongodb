import Joi from 'joi';

const str = Joi.string().min(3).max(50);

export const registerSchema = Joi.object({
  name: str.required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});
