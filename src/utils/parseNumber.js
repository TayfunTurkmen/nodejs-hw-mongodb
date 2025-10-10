export const parseNumber = (value, defaultValue) => {
  const isString = typeof value === 'string';

  if (!isString) return defaultValue;

  const parsed = parseInt(value);
  if (Number.isNaN(parsed)) {
    return defaultValue;
  }

  return parsed;
};
