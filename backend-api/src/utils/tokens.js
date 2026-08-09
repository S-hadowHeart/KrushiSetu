const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const prisma = require('../prismaClient');

const REFRESH_TOKEN_DAYS = Number(process.env.REFRESH_TOKEN_DAYS || 30);

function makeCookieOptions() {
  const secure = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000,
  };
}

async function createRefreshToken(userId) {
  const id = crypto.randomUUID();
  const token = crypto.randomBytes(64).toString('hex');
  const tokenHash = await bcrypt.hash(token, 12);
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000);
  await prisma.refreshToken.create({ data: { id, tokenHash, userId, expiresAt } });
  return { id, token, cookieValue: `${id}.${token}`, expiresAt };
}

async function revokeRefreshTokenById(id) {
  return prisma.refreshToken.updateMany({ where: { id }, data: { revoked: true } });
}

async function findValidTokenRecord(id) {
  const rec = await prisma.refreshToken.findUnique({ where: { id } });
  if (!rec) return null;
  if (rec.revoked) return null;
  if (rec.expiresAt < new Date()) return null;
  return rec;
}

async function createPasswordResetToken(userId) {
  const id = crypto.randomUUID();
  const token = crypto.randomBytes(64).toString('hex');
  const tokenHash = await bcrypt.hash(token, 12);
  const expiresAt = new Date(Date.now() + (process.env.RESET_TOKEN_HOURS ? Number(process.env.RESET_TOKEN_HOURS) : 1) * 60 * 60 * 1000);
  await prisma.passwordResetToken.create({ data: { id, tokenHash, userId, expiresAt } });
  return { id, token, tokenValue: `${id}.${token}`, expiresAt };
}

async function getPasswordResetTokenRecord(tokenValue) {
  const parsed = parseRefreshCookie(tokenValue);
  if (!parsed) return null;
  const rec = await prisma.passwordResetToken.findUnique({ where: { id: parsed.id } });
  if (!rec) return null;
  if (rec.used) return null;
  if (rec.expiresAt < new Date()) return null;
  const valid = await bcrypt.compare(parsed.token, rec.tokenHash).catch(() => false);
  if (!valid) return null;
  return rec;
}

async function markPasswordResetTokenUsed(id) {
  return prisma.passwordResetToken.update({ where: { id }, data: { used: true } });
}

function parseRefreshCookie(cookieValue) {
  if (!cookieValue) return null;
  const [id, token] = cookieValue.split('.');
  if (!id || !token) return null;
  return { id, token };
}

module.exports = {
  createRefreshToken,
  revokeRefreshTokenById,
  findValidTokenRecord,
  makeCookieOptions,
  parseRefreshCookie,
  createPasswordResetToken,
  getPasswordResetTokenRecord,
  markPasswordResetTokenUsed,
};
