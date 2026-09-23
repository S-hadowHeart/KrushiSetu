const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');
const HttpError = require('../utils/httpError');

async function register(req, res) {
  const { email, password, name, role } = req.body;
  const { user } = await authService.register({ email, password, name, role });
  res.status(201).json({
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      verified: user.verified,
      createdAt: user.createdAt,
    },
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  const { token, user, refreshToken, cookieOptions } = await authService.login({ email, password });
  res.cookie('refreshToken', refreshToken.cookieValue, cookieOptions);
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      verified: user.verified,
      createdAt: user.createdAt,
    },
  });
}

async function refresh(req, res) {
  const { token, refreshToken, cookieOptions } = await authService.refreshSession(req.cookies && req.cookies.refreshToken);
  res.cookie('refreshToken', refreshToken.cookieValue, cookieOptions);
  res.json({ token });
}

async function logout(req, res) {
  await authService.logout(req.cookies && req.cookies.refreshToken);
  res.clearCookie('refreshToken');
  res.json({ ok: true });
}

async function verify(req, res) {
  const { token } = req.query;
  await authService.verifyEmail(token);
  res.json({ ok: true, message: 'Email verified' });
}

async function resendVerification(req, res) {
  const { email } = req.body;
  await authService.resendVerification(email);
  res.json({ ok: true, message: 'If that account needs verifying, a new email is on its way.' });
}

async function forgotPassword(req, res) {
  const { email } = req.body;
  await authService.forgotPassword(email);
  res.json({ ok: true });
}

async function resetPassword(req, res) {
  const { token, password } = req.body;
  await authService.resetPassword(token, password);
  res.json({ ok: true, message: 'Password reset' });
}

module.exports = {
  register: asyncHandler(register),
  login: asyncHandler(login),
  refresh: asyncHandler(refresh),
  logout: asyncHandler(logout),
  verify: asyncHandler(verify),
  resendVerification: asyncHandler(resendVerification),
  forgotPassword: asyncHandler(forgotPassword),
  resetPassword: asyncHandler(resetPassword),
};
