const bcrypt = require('bcryptjs');
const prisma = require('../prismaClient');
const { sendVerificationEmail, sendResetEmail } = require('../utils/email');
const {
  createRefreshToken,
  revokeRefreshTokenById,
  findValidTokenRecord,
  makeCookieOptions,
  parseRefreshCookie,
  createPasswordResetToken,
  getPasswordResetTokenRecord,
  markPasswordResetTokenUsed,
} = require('../utils/tokens');
const {
  createAccessToken,
  createVerificationToken,
  verifyJwt,
  TokenType,
} = require('../utils/jwt');
const HttpError = require('../utils/httpError');

async function register({ email, password, name, role }) {
  if (!email || !password) {
    throw new HttpError(400, 'Email and password are required');
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  const requestedRole = String(role || 'FARMER').toUpperCase();
  const normalizedRole = ['FARMER', 'BUYER'].includes(requestedRole) ? requestedRole : 'FARMER';
  if (existing) {
    throw new HttpError(400, 'Email already registered');
  }

  const hash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({ data: { email, password: hash, name, role: normalizedRole } });
  await dispatchVerificationEmail(user);

  return { user };
}

// Shared by register and resendVerification. If SMTP isn't configured (very
// common in local dev), sendVerificationEmail rejects — we log the link
// itself so a developer can grab it straight from the terminal instead of
// being stuck with no way to verify the account at all.
async function dispatchVerificationEmail(user) {
  const verificationToken = createVerificationToken(user.id);
  try {
    await sendVerificationEmail(user.email, verificationToken);
  } catch (err) {
    const frontendUrl = process.env.FRONTEND_URL || process.env.APP_URL || 'http://localhost:5173';
    console.error('Verification email failed to send:', err.message);
    console.log(
      `[dev] Verification link for ${user.email}: ${frontendUrl.replace(/\/$/, '')}/auth/verify?token=${verificationToken}`
    );
  }
}

async function resendVerification(email) {
  if (!email) throw new HttpError(400, 'Email is required');
  const user = await prisma.user.findUnique({ where: { email } });
  // Don't reveal whether the email exists — same response either way.
  if (!user || user.verified) return { ok: true };
  await dispatchVerificationEmail(user);
  return { ok: true };
}

async function login({ email, password }) {
  if (!email || !password) {
    throw new HttpError(400, 'Email and password are required');
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new HttpError(400, 'Invalid credentials');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new HttpError(400, 'Invalid credentials');
  }

  if (!user.verified) {
    throw new HttpError(403, 'Email must be verified before login');
  }

  const token = createAccessToken(user);
  const refreshToken = await createRefreshToken(user.id);

  return {
    token,
    user,
    refreshToken,
    cookieOptions: makeCookieOptions(),
  };
}

async function refreshSession(refreshCookie) {
  const parsed = parseRefreshCookie(refreshCookie);
  if (!parsed) {
    throw new HttpError(401, 'Invalid or missing refresh token');
  }

  const record = await findValidTokenRecord(parsed.id);
  if (!record) {
    throw new HttpError(401, 'Invalid or expired refresh token');
  }

  const isValid = await bcrypt.compare(parsed.token, record.tokenHash).catch(() => false);
  if (!isValid) {
    await revokeRefreshTokenById(parsed.id).catch(() => {});
    throw new HttpError(401, 'Invalid refresh token');
  }

  const user = await prisma.user.findUnique({ where: { id: record.userId } });
  if (!user) {
    throw new HttpError(401, 'Invalid refresh token');
  }

  await revokeRefreshTokenById(parsed.id).catch(() => {});
  const newRefreshToken = await createRefreshToken(user.id);
  const token = createAccessToken(user);

  return {
    token,
    refreshToken: newRefreshToken,
    cookieOptions: makeCookieOptions(),
  };
}

async function logout(refreshCookie) {
  const parsed = parseRefreshCookie(refreshCookie);
  if (parsed) {
    await revokeRefreshTokenById(parsed.id).catch(() => {});
  }

  return { cookieOptions: makeCookieOptions() };
}

async function verifyEmail(token) {
  if (!token) {
    throw new HttpError(400, 'Verification token is required');
  }

  const payload = verifyJwt(token);
  if (payload.type !== TokenType.VERIFY) {
    throw new HttpError(400, 'Invalid verification token');
  }

  await prisma.user.update({ where: { id: payload.userId }, data: { verified: true } });
  return { ok: true };
}

async function forgotPassword(email) {
  if (!email) {
    throw new HttpError(400, 'Email is required');
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { ok: true };
  }

  const resetToken = await createPasswordResetToken(user.id);
  try {
    await sendResetEmail(user.email, resetToken.tokenValue);
  } catch (err) {
    const frontendUrl = process.env.FRONTEND_URL || process.env.APP_URL || 'http://localhost:5173';
    console.error('Reset email failed to send:', err.message);
    console.log(
      `[dev] Password reset link for ${user.email}: ${frontendUrl.replace(/\/$/, '')}/auth/reset-password#token=${resetToken.tokenValue}`
    );
  }

  return { ok: true };
}

async function resetPassword(token, password) {
  if (!token || !password) {
    throw new HttpError(400, 'Token and password are required');
  }

  const tokenRecord = await getPasswordResetTokenRecord(token);
  if (!tokenRecord) {
    throw new HttpError(400, 'Invalid or expired password reset token');
  }

  const user = await prisma.user.findUnique({ where: { id: tokenRecord.userId } });
  if (!user) {
    throw new HttpError(400, 'Invalid password reset token');
  }

  const sameAsOld = await bcrypt.compare(password, user.password).catch(() => false);
  if (sameAsOld) {
    throw new HttpError(400, 'New password must differ from the current password');
  }

  const hash = await bcrypt.hash(password, 12);
  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { password: hash } }),
    markPasswordResetTokenUsed(tokenRecord.id),
  ]);

  return { ok: true };
}

module.exports = {
  register,
  login,
  refreshSession,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  resendVerification,
};
