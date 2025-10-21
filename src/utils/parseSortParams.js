import {
  CONTACT_SORTABLE_FIELDS,
  SORT_ORDER,
} from "../constant/constantContact.js";

export const parseSortParams = (query) => {
  const sortOrder = parseSortOrder(query.sortOrder);
  const sortBy = parseSortBy(query.sortBy);

  return {
    sortOrder,
    sortBy,
  };
};

const parseSortOrder = (order) => {
  const knownSortOrders = [SORT_ORDER.ASC, SORT_ORDER.DESC];
  if (order && knownSortOrders.includes(order)) {
    return order;
  }

  return SORT_ORDER.ASC; // default sort order ASC
};

const parseSortBy = (sortBy) => {
  if (sortBy && CONTACT_SORTABLE_FIELDS.includes(sortBy)) {
    return sortBy;
  }
  return CONTACT_SORTABLE_FIELDS[0]; // default sort by field ID
};