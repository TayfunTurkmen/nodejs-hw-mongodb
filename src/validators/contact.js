import Joi from 'joi';

// name:{
//     type:String,
//     required:true
// },
// phoneNumber:{
//     type:String,
//     required:true
// },
// email:{
//     type:String,
// },
// isFavourite:{
//     type:Boolean,
//     default:false
// },
// contactType:{
//     type:String,
//     enum:['work','other','personal'],
//     default:'personel',
//     required:true
// }
// }

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),
    isFavourite: Joi.boolean().default(false).required(),
    contactType: Joi.string().valid('work', 'other', 'personal').default('personal').required(),
})

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'other', 'personal'),
})