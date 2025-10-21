export const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not Found",
  });
}
export default notFoundHandler;