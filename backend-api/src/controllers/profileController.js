const userService = require('../services/userService');
const asyncHandler = require('../utils/asyncHandler');
const HttpError = require('../utils/httpError');

async function getProfile(req, res) {
  const user = await userService.getProfile(req.userId);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  res.json({ user });
}

module.exports = {
  getProfile: asyncHandler(getProfile),
};
