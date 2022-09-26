const errorMiddleware = (err, req, res, next) => {
  return res.status(err.status).json(err.message);
};

module.exports = { errorMiddleware };
