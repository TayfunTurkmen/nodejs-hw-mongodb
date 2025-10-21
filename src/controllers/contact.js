import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactByPut,
  updateContactByPatch,
  deleteContact,
} from "../services/contact.js";


const getAllContactsController = async (req, res) => {
  const queryParams = req.query;
  const { page, limit } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(queryParams);
  const filter = parseFilterParams(queryParams);

  const contacts = await getAllContacts({
    page,
    limit,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).send({
    status: "success",
    code: 200,
    message: "Contacts fetched successfully",
    data: contacts,
  });
};

const createContactController = async (req, res) => {
  const contactData = req.body;
  const newContact = await createContact(contactData);
  res.status(201).json({
    status: "success",
    code: 201,
        message: "Contact created successfully",
        data: {
          contact: newContact,
        },
      });
    }
const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, `Contact with ID ${contactId} not found`);
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact fetched successfully",
    data: {
      contact,
    },
  });
};

const putContactController = async (req, res) => {
  const { contactId } = req.params;
  const contactData = req.body;

  const { updatedContact, isNew } = await updateContactByPut(
    contactId,
    contactData
  );

  if (!updatedContact) {
    throw createHttpError(
      404,
      `Unable to update. Contact with ID ${contactId} not found.`
    );
  }

  res.status(isNew ? 201 : 200).json({
    status: "success",
    code: isNew ? 201 : 200,
    message: isNew
      ? "Contact created successfully"
      : "Contact updated successfully",
    data: {
      contact: updatedContact,
    },
  });
};

const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const contactData = req.body;

  const { updatedContact } = await updateContactByPatch(contactId, contactData);

  if (!updatedContact) {
    throw createHttpError(
      404,
      `Unable to update. Contact with ID ${contactId} not found.`
    );
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact updated successfully",
    data: {
      contact: updatedContact,
    },
  });
};

const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  console.log("contactId:", contactId); // Debug log
  const deletedContact = await deleteContact(contactId);
  console.log("trying to delete contact");

  if (!deletedContact) {
    throw createHttpError(
      404,
      `Unable to delete. Contact with ID ${contactId} not found.`
    );
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact deleted successfully",
    data: {
      contact: deletedContact,
    },
  });
};


export { 
    getAllContactsController, 
    getContactByIdController, 
    createContactController, 
    putContactController, 
    patchContactController, 
    deleteContactController 
    };