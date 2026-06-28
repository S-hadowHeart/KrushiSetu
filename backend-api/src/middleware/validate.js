const HttpError = require('../utils/httpError');

function formatZodErrors(errors) {
  return errors.map((err) => ({ field: err.path.join('.'), message: err.message }));
}

function validateBody(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return next(new HttpError(400, 'Validation failed', formatZodErrors(parsed.error.errors)));
    }
    req.body = parsed.data;
    return next();
  };
}

function validateQuery(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) {
      return next(new HttpError(400, 'Validation failed', formatZodErrors(parsed.error.errors)));
    }
    req.query = parsed.data;
    return next();
  };
}

module.exports = {
  validateBody,
  validateQuery,
};
