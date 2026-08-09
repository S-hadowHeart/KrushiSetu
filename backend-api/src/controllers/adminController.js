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

async function listNeeds(req, res) {
  const items = await prisma.need.findMany({ include: { buyer: { select: { id: true, name: true, email: true } } }, orderBy: { createdAt: 'desc' } });
  res.json({ items });
}

async function deleteNeed(req, res) {
  const id = parseInt(req.params.id, 10);
  await prisma.need.delete({ where: { id } });
  res.json({ ok: true });
}

async function listOffers(req, res) {
  const offers = await prisma.offer.findMany({
    include: {
      fromUser: { select: { id: true, name: true, email: true } },
      toUser: { select: { id: true, name: true, email: true } },
      good: { select: { id: true, name: true } },
      need: { select: { id: true, title: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ offers });
}

// Full oversight of direct messages between users, for moderation purposes.
async function listMessages(req, res) {
  const page = parseInt(req.query.page || '1', 10);
  const limit = Math.min(parseInt(req.query.limit || '50', 10), 200);
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    prisma.message.findMany({
      include: {
        sender: { select: { id: true, name: true, email: true } },
        receiver: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.message.count(),
  ]);
  res.json({ items, page, limit, total });
}

async function getStats(req, res) {
  const [users, farmers, buyers, goods, needs, offers, pendingVerifications, messages] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: 'FARMER' } }),
    prisma.user.count({ where: { role: 'BUYER' } }),
    prisma.good.count(),
    prisma.need.count(),
    prisma.offer.count(),
    prisma.verification.count({ where: { status: 'PENDING' } }),
    prisma.message.count(),
  ]);
  res.json({ stats: { users, farmers, buyers, goods, needs, offers, pendingVerifications, messages } });
}

module.exports = {
  listUsers,
  getUser,
  suspendUser,
  listGoods,
  deleteGood,
  listNeeds,
  deleteNeed,
  listOffers,
  listMessages,
  getStats,
};
