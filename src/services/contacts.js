const Contact = require('../db/models/contact');

// 🔹 GET all contacts with pagination, sorting, and filtering
const getAllContacts = async ({ page, perPage, sortBy, sortOrder, query }) => {
  const skip = (page - 1) * perPage;
  const sortDirection = sortOrder === 'desc' ? -1 : 1;

  const totalItems = await Contact.countDocuments(query);
  const totalPages = Math.ceil(totalItems / perPage);

  const contacts = await Contact.find(query)
    .sort({ [sortBy]: sortDirection })
    .skip(skip)
    .limit(Number(perPage));

  return {
    data: contacts,
    page: Number(page),
    perPage: Number(perPage),
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};

// 🔹 GET contact by ID
const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

// 🔹 POST new contact
const addContact = async (data) => {
  return await Contact.create(data);
};

// 🔹 PATCH update contact
const patchContact = async (contactId, data) => {
  return await Contact.findByIdAndUpdate(contactId, data, { new: true });
};

// 🔹 DELETE contact
const removeContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  patchContact,
  removeContact,
};
