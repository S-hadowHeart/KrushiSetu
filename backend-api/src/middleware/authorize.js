const HttpError = require('../utils/httpError');

function requireRole(...roles) {
  return (req, res, next) => {
    const role = req.userRole;
    if (!role || !roles.includes(role)) return next(new HttpError(403, 'Forbidden'));
    return next();
  };
}

module.exports = { requireRole };
