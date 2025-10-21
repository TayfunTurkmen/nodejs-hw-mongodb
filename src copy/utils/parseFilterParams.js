const parseContactTypeValue = (type) => {
  const ContactTypeValue = ['work', 'home', 'personal'];

  if (ContactTypeValue.includes(type)) {
    return type;
  }
  return null;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const contactTypeValue = parseContactTypeValue(type);

  return {
    contactType: contactTypeValue,
    isFavourite: isFavourite === 'true',
  };
};
