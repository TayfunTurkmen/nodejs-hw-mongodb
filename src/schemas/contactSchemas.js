import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).max(15).required(),
  isFavorite: Joi.boolean(),
  type: Joi.string().valid("personal", "work"),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(5).max(15),
  isFavorite: Joi.boolean(),
  type: Joi.string().valid("personal", "work"),
}).min(1);

export const updateStatusSchema = Joi.object({
  isFavorite: Joi.boolean().required(),
});
