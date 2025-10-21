export const calculatePaginationData = (items, currentPage, itemsPerPage) => {
    const totalItems = items;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    return {
        totalItems,
        currentPage,
        itemsPerPage,
        totalPages,
        hasNextPage,
        hasPreviousPage,
    };
}