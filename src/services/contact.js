import { SORT_ORDER } from "../constant/constantContact.js";
import Contacts from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

const getAllContacts = async ({
  page = 1,
  limit = 10,
  sortBy = "_id",
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const perPage = Number(limit);
  const skip = (page - 1) * perPage; // Fixed - was using limit variable instead of perPage

  const contactQuery = Contacts.find();

  // Apply filters correctly
  if (filter.contactType) {
    contactQuery.where("contactType").equals(filter.contactType);
  }

  if (filter.isFavourite !== undefined) {
    contactQuery.where("isFavourite").equals(filter.isFavourite);
  }

  const totalContacts = await contactQuery.clone().countDocuments();

  const contacts = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const pagination = calculatePaginationData(totalContacts, page, limit);

  return {
    contacts,
    pagination,
  };
};


const getContactById = async (contactId) => {
  const contact = await Contacts.findById(contactId);
  return contact;
};

const createContact = async (contactData) => {
  const newContact = await Contacts.create(contactData);
  return newContact;
};
const updateContactByPut = async (contactId, contactData, options={}) => {
  const updatedContact = await Contacts.findByIdAndUpdate(
    contactId,
    contactData,
    { new: true,
      upsert: true,
      rawResult: true,
    includeResultMetadata: true,
    ...options, }
  );
  return {updatedContact , isNew: Boolean(updatedContact?.lastErrorObject?.updatedExisting)};
};
 
const updateContactByPatch = async (contactId, contactData) => {
  const updatedContact = await Contacts.findByIdAndUpdate(
    contactId,
    { $set: contactData },
    { new: true }
  );
  return updatedContact;
};

const deleteContact = async (contactId) => {
  console.log("Deleting contact with ID:", contactId);
  const deletedContact = await Contacts.findByIdAndDelete(contactId);
  console.log("Deleted contact:", deletedContact);
  return deletedContact;
};
export {
  getAllContacts,
  getContactById,
  createContact,
  updateContactByPut,
  updateContactByPatch,
  deleteContact,
};
