const errorHanlderMiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err?.message || "Internal Server Error",
    status: err.status || 500,
  });
};

module.exports = errorHanlderMiddleware;
