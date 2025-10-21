const parseNumber = (value, defaultValue) => {
    const parsedValue = Number(value);
    return isNaN(parsedValue) ? defaultValue : parsedValue;
};

export const parsePaginationParams = (query) => {
    const page = parseNumber(query.page);
    const limit = parseNumber(query.limit);
    return {
        page,
        limit,
    }
};