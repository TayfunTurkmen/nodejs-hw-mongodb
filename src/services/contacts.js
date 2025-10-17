import { Contact } from '../db/models/Contact.js';

export const listContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  type,
  isFavourite,
}) => {
  const filter = { userId }; // ✅ sadece kullanıcının kayıtları
  if (type) filter.contactType = type;
  if (typeof isFavourite === 'boolean') filter.isFavourite = isFavourite;

  const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

  const totalItems = await Contact.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const skip = (page - 1) * perPage;

  const data = await Contact.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(perPage);

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};

export const getContactById = async (userId, id) => {
  return Contact.findOne({ _id: id, userId });
};

export const createContact = async (userId, data) => {
  return Contact.create({ ...data, userId }); 
};

export const updateContact = async (userId, id, data) => {
  return Contact.findOneAndUpdate({ _id: id, userId }, data, { new: true });
};

export const deleteContact = async (userId, id) => {
  return Contact.findOneAndDelete({ _id: id, userId });
};
