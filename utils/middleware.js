export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

export const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};
