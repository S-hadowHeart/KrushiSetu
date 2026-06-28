const prisma = require('../prismaClient');
const HttpError = require('../utils/httpError');

async function createNeed(req, res) {
  const data = req.body;
  const userId = req.userId;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new HttpError(404, 'User not found');
  const need = await prisma.need.create({ data: {
    buyerId: userId,
    title: data.title,
    description: data.description || null,
    qtyNeeded: data.qtyNeeded,
    locations: data.locations || [],
    priceMin: data.priceMin ?? null,
    priceMax: data.priceMax ?? null,
    deliveryMode: data.deliveryMode ?? null,
    paymentMode: data.paymentMode ?? null,
    expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
  } });
  res.status(201).json({ ok: true, need });
}

async function listNeeds(req, res) {
  const q = req.query.q || undefined;
  const page = parseInt(req.query.page || '1', 10);
  const limit = Math.min(parseInt(req.query.limit || '20', 10), 100);
  const skip = (page - 1) * limit;

  const where = {};
  if (q) where.title = { contains: q, mode: 'insensitive' };
  if (req.query.location) where.locations = { has: req.query.location };

  const [items, total] = await Promise.all([
    prisma.need.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.need.count({ where }),
  ]);

  res.json({ items, page, limit, total });
}

async function getNeed(req, res) {
  const id = parseInt(req.params.id, 10);
  const need = await prisma.need.findUnique({ where: { id }, include: { offers: true } });
  if (!need) throw new HttpError(404, 'Need not found');
  const buyer = await prisma.user.findUnique({ where: { id: need.buyerId } });
  res.json({ need: { ...need, buyer: { id: buyer.id, name: buyer.name, verified: buyer.verified } } });
}

async function updateNeed(req, res) {
  const id = parseInt(req.params.id, 10);
  const userId = req.userId;
  const need = await prisma.need.findUnique({ where: { id } });
  if (!need) throw new HttpError(404, 'Need not found');
  if (need.buyerId !== userId) throw new HttpError(403, 'Forbidden');
  const data = req.body;
  const updated = await prisma.need.update({ where: { id }, data: {
    title: data.title ?? need.title,
    description: data.description ?? need.description,
    qtyNeeded: data.qtyNeeded ?? need.qtyNeeded,
    locations: data.locations ?? need.locations,
    priceMin: data.priceMin ?? need.priceMin,
    priceMax: data.priceMax ?? need.priceMax,
    deliveryMode: data.deliveryMode ?? need.deliveryMode,
    paymentMode: data.paymentMode ?? need.paymentMode,
    expiresAt: data.expiresAt ? new Date(data.expiresAt) : need.expiresAt,
  } });
  res.json({ ok: true, need: updated });
}

async function deleteNeed(req, res) {
  const id = parseInt(req.params.id, 10);
  const userId = req.userId;
  const need = await prisma.need.findUnique({ where: { id } });
  if (!need) throw new HttpError(404, 'Need not found');
  if (need.buyerId !== userId) throw new HttpError(403, 'Forbidden');
  await prisma.need.delete({ where: { id } });
  res.json({ ok: true });
}

module.exports = {
  createNeed,
  listNeeds,
  getNeed,
  updateNeed,
  deleteNeed,
};
