import Joi from "joi";

const base = {
  name: Joi.string().min(3).max(20),
  email: Joi.string().email().min(3).max(30),
  phoneNumber: Joi.string().min(3).max(20),
  contactType: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(), 
};

export const createContactSchema = Joi.object({
  name: base.name.required(),
  email: base.email.required(),
  phoneNumber: base.phoneNumber.required(),
  contactType: base.contactType.optional(),
  isFavourite: base.isFavourite.optional(),
});

export const updateContactSchema = Joi.object({
  name: base.name,
  email: base.email,
  phoneNumber: base.phoneNumber,
  contactType: base.contactType,
  isFavourite: base.isFavourite,
}).min(1);