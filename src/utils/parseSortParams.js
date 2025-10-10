import { SortOrder } from '../constants/index.js';

const parseSortBy = (sortBy) => {
  const keysOfContacts = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
  ];

  if (!keysOfContacts.includes(sortBy)) {
    return '_id';
  }
  return sortBy;
};
const parseSortOrder = (sortOrder) => {
  const isKnownOrder = Object.values(SortOrder).includes(sortOrder);

  return !isKnownOrder ? SortOrder.ASC : sortOrder;
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;
  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
