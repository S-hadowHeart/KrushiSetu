const HttpError = require('../utils/httpError');

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const payload = { error: err.message || 'Internal server error' };
  if (err.details) {
    payload.details = err.details;
  }
  if (!(err instanceof HttpError) && status === 500) {
    console.error(err);
  }
  res.status(status).json(payload);
}

module.exports = errorHandler;
