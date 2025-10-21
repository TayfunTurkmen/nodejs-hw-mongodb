const parseNumber = (value, defaultValue) => {
  const parsedValue = Number(value);
  return isNaN(parsedValue) ? defaultValue : parsedValue;
};

export const parsePaginationParams = (query) => {
  const page = parseNumber(query.page, 1);
  const perPage = parseNumber(query.perPage, 10);
  return {
    page,
    perPage,
  };
};
