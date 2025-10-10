// Calulate Pagination Data

export const calculatePaginationData = (count, page, perPage) => {
  const totalPages = Math.ceil(count / perPage || 1);
  const hasNextPage = Boolean(totalPages - page > 0);
  const hasPreviousPage = Boolean(page - 1 > 0);

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
