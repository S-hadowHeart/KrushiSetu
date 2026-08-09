const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const accessTokenExpiry = process.env.JWT_EXPIRES || '15m';
const emailTokenExpiry = process.env.EMAIL_TOKEN_EXPIRES || '1d';
const resetTokenExpiry = process.env.RESET_TOKEN_EXPIRES || '1h';

const TokenType = {
  VERIFY: 'verify',
  RESET: 'reset',
};

function signJwt(payload, options = {}) {
  return jwt.sign(payload, secret, options);
}

function verifyJwt(token) {
  return jwt.verify(token, secret);
}

function createAccessToken(user) {
  return signJwt({ userId: user.id, role: user.role }, { expiresIn: accessTokenExpiry });
}

function createVerificationToken(userId) {
  return signJwt({ userId, type: TokenType.VERIFY }, { expiresIn: emailTokenExpiry });
}

function createResetToken(userId) {
  return signJwt({ userId, type: TokenType.RESET }, { expiresIn: resetTokenExpiry });
}

module.exports = {
  TokenType,
  createAccessToken,
  createVerificationToken,
  createResetToken,
  verifyJwt,
};
