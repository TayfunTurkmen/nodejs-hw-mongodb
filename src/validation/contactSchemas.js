import Joi from 'joi';

const string20 = Joi.string().min(3).max(20);

export const createContactSchema = Joi.object({
  name: string20.required(),
  phoneNumber: string20.required(),
  email: Joi.string().email().min(3).max(50).optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const updateContactSchema = Joi.object({
  name: string20.optional(),
  phoneNumber: string20.optional(),
  email: Joi.string().email().min(3).max(50).optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').optional(),
}).min(1); 
