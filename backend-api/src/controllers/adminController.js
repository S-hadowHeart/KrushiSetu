const prisma = require('../prismaClient');
const HttpError = require('../utils/httpError');

async function listUsers(req, res) {
  const users = await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true, verified: true, createdAt: true } });
  res.json({ users });
}

async function getUser(req, res) {
  const id = parseInt(req.params.id, 10);
  const user = await prisma.user.findUnique({ where: { id }, include: { verifications: true } });
  if (!user) throw new HttpError(404, 'User not found');
  res.json({ user });
}

async function suspendUser(req, res) {
  const id = parseInt(req.params.id, 10);
  // For now, we'll mark verified=false as suspension placeholder
  const user = await prisma.user.update({ where: { id }, data: { verified: false } });
  res.json({ ok: true, user });
}

async function listGoods(req, res) {
  const items = await prisma.good.findMany({ include: { farmer: { select: { id: true, name: true, email: true } } }, orderBy: { createdAt: 'desc' } });
  res.json({ items });
}

async function deleteGood(req, res) {
  const id = parseInt(req.params.id, 10);
  await prisma.good.delete({ where: { id } });
  res.json({ ok: true });
}

module.exports = { listUsers, getUser, suspendUser, listGoods, deleteGood };
