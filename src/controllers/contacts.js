const {
  getAllContacts,
  getContactById,
  addContact,
  patchContact,
  removeContact,
} = require('../services/contacts');

const createError = require('http-errors');

// 🔹 GET /contacts?type=work&isFavourite=true&page=1&perPage=10&sortBy=name&sortOrder=asc
const getContacts = async (req, res, next) => {
  try {
    const {
      page = 1,
      perPage = 10,
      sortBy = 'name',
      sortOrder = 'asc',
      type,
      isFavourite,
    } = req.query;

    const query = {};
    if (type) query.contactType = type;
    if (isFavourite !== undefined) query.isFavourite = isFavourite === 'true';

    const result = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      query,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// 🔹 GET /contacts/:contactId
const getContactByIdCtrl = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// 🔹 POST /contacts
const addContactCtrl = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully added contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

// 🔹 PATCH /contacts/:contactId
const patchContactCtrl = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await patchContact(contactId, req.body);

    if (!updatedContact) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

// 🔹 DELETE /contacts/:contactId
const removeContactCtrl = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await removeContact(contactId);

    if (!deletedContact) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully removed contact!',
      data: deletedContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById: getContactByIdCtrl,
  addContact: addContactCtrl,
  patchContact: patchContactCtrl,
  removeContact: removeContactCtrl,
};
