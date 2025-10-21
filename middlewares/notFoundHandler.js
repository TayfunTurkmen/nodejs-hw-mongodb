export const notFoundHandler = (req, res) => {
  res.status(404).send({
    message: '404 Not found!',
    status: 404,
  });
};
