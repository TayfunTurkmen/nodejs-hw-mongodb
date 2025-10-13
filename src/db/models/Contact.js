const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 20 },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  contactType: {
    type: String,
    enum: ['work', 'friend', 'family'],
    required: true,
  },
  isFavourite: { type: Boolean, default: false },
});

const Contact = model('Contact', contactSchema);

module.exports = Contact;
