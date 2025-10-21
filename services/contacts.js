import { SORT_ORDER } from '../constant/constantContact.js';
import { ContactsCollection } from '../db/model/contactSchema.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
}) => {
  console.log('User ID:', userId);
  const contactQuerry = ContactsCollection.find({ userId });

  if (filter.contactType) {
    contactQuerry.where('contactType').in([filter.contactType]);
  }
  if (filter.isFavourite !== undefined) {
    contactQuerry.where('isFavourite').in([filter.isFavourite]);
  }

  const totalCount = await ContactsCollection.find()
    .merge(contactQuerry)
    .countDocuments();

  const contacts = await contactQuerry
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const pagination = calculatePaginationData(totalCount, page, perPage);
  return {
    data: contacts,
    ...pagination,
  };
};

export const getStudentsById = async (id, userId) => {
  const contact = await ContactsCollection.findById({ _id: id, userId });
  return contact;
};

export const createContact = async (contact) => {
  const newContact = await ContactsCollection.create(contact);
  return newContact;
};

export const updateContact = async (
  contactId,
  newFields,
  userId,
  options = {},
) => {
  const result = await ContactsCollection.findOneAndUpdate(
    {
      _id: contactId,
      userId,
    },
    newFields,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (result.value) {
    return {
      contact: result.value,
      isNew: Boolean(result.lastErrorObject.upserted),
    };
  }
  return null;
};

export const deleteContactById = async (id, userId) => {
  const contact = await ContactsCollection.findByIdAndDelete({
    _id: id,
    userId,
  });
  return contact;
};
