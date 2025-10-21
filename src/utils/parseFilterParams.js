export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const contactTypeValue = parseContactTypeValue(type);

  // Fixed - properly handle isFavourite boolean conversion
  let isFavouriteValue = undefined;
  if (isFavourite !== undefined) {
    isFavouriteValue = isFavourite === "true";
  }

  const filter = {};

  if (contactTypeValue) {
    filter.contactType = contactTypeValue;
  }

  if (isFavouriteValue !== undefined) {
    filter.isFavourite = isFavouriteValue;
  }

  return filter;
};
const parseContactTypeValue = (type) => {
  const contactTypeValues = ["work", "home", "personal"];

  if (type && contactTypeValues.includes(type)) {
    return type;
  }

  return null;
};