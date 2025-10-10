import { ContactTypes } from '../constants/index.js';
const parseIsFavourite = (status) => {
  const isString = typeof status === 'string';
  if (!isString) return;
  const lowered = status.toLowerCase();
  if (['true', '1'].includes(lowered)) {
    return true;
  }
  if (['false', '0'].includes(lowered)) {
    return false;
  }
  return undefined;
};

const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const isKnownType = Object.values(ContactTypes).includes(type);
  if (!isKnownType) {
    return null;
  }
  return type;
};

export const parseFilterParams = (query) => {
  const result = {};
  const { isFavourite, type } = query;
  const parsedIsFavorite = parseIsFavourite(isFavourite);
  const parsedType = parseContactType(type);

  if (parsedIsFavorite !== undefined) {
    result.isFavourite = parsedIsFavorite;
  }
  if (parsedType !== undefined) {
    result.type = parsedType;
  }

  // const result = {
  //   isFavourite: parsedIsFavorite,
  //   type: parsedType,
  // };
  return result;
};
