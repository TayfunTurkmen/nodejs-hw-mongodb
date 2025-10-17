import createError from 'http-errors';
import {
  listContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const { page = '1', perPage = '10', sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;

  const parsed = {
    userId: req.user._id, // ✅ authenticate middleware’den gelen user
    page: Math.max(1, parseInt(page, 10) || 1),
    perPage: Math.max(1, parseInt(perPage, 10) || 10),
    sortBy,
    sortOrder: sortOrder === 'desc' ? 'desc' : 'asc',
    type,
    isFavourite: typeof isFavourite === 'string' ? isFavourite.toLowerCase() === 'true' : undefined,
  };

  const result = await listContacts(parsed);

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: result,
  });
};

export const getContactByIdController = async (req, res) => {
  const contact = await getContactById(req.user._id, req.params.contactId);
  if (!contact) throw createError(404, 'Contact not found');

  res.json({
    status: 200,
    message: `Successfully found contact with id ${req.params.contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.user._id, req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res) => {
  const contact = await updateContact(req.user._id, req.params.contactId, req.body);
  if (!contact) throw createError(404, 'Contact not found');

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const deleted = await deleteContact(req.user._id, req.params.contactId);
  if (!deleted) throw createError(404, 'Contact not found');

  res.status(204).send();
};
