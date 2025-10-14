import Contact from "../db/contactModel.js";

export const getContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
};

export default {
  getContacts,
  getContactById,
};
