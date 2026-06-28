const prisma = require('../prismaClient');
const HttpError = require('../utils/httpError');

async function createGood(req, res) {
  const data = req.body;
  const userId = req.userId;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new HttpError(404, 'User not found');
  const good = await prisma.good.create({
    data: {
      farmerId: userId,
      name: data.name,
      images: data.images || [],
      minQty: data.minQty,
      maxQty: data.maxQty,
      priceMin: data.priceMin,
      priceMax: data.priceMax,
      locations: data.locations || [],
      deliveryModes: data.deliveryModes || [],
      paymentModes: data.paymentModes || [],
      description: data.description || null,
      availableFrom: data.availableFrom ? new Date(data.availableFrom) : null,
    },
  });
  res.status(201).json({ ok: true, good });
}

async function listGoods(req, res) {
  const q = req.query.q || undefined;
  const page = parseInt(req.query.page || '1', 10);
  const limit = Math.min(parseInt(req.query.limit || '20', 10), 100);
  const skip = (page - 1) * limit;

  const where = {};
  if (q) where.name = { contains: q, mode: 'insensitive' };
  if (req.query.location) where.locations = { has: req.query.location };
  if (req.query.farmerId) where.farmerId = parseInt(req.query.farmerId, 10);

  const [items, total] = await Promise.all([
    prisma.good.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.good.count({ where }),
  ]);

  res.json({ items, page, limit, total });
}

async function getGood(req, res) {
  const id = parseInt(req.params.id, 10);
  const good = await prisma.good.findUnique({ where: { id }, include: { offers: true } });
  if (!good) throw new HttpError(404, 'Good not found');
  const farmer = await prisma.user.findUnique({ where: { id: good.farmerId } });
  res.json({ good: { ...good, farmer: { id: farmer.id, name: farmer.name, verified: farmer.verified } } });
}

async function updateGood(req, res) {
  const id = parseInt(req.params.id, 10);
  const userId = req.userId;
  const good = await prisma.good.findUnique({ where: { id } });
  if (!good) throw new HttpError(404, 'Good not found');
  if (good.farmerId !== userId) throw new HttpError(403, 'Forbidden');
  const data = req.body;
  const updated = await prisma.good.update({ where: { id }, data: {
    name: data.name ?? good.name,
    images: data.images ?? good.images,
    minQty: data.minQty ?? good.minQty,
    maxQty: data.maxQty ?? good.maxQty,
    priceMin: data.priceMin ?? good.priceMin,
    priceMax: data.priceMax ?? good.priceMax,
    locations: data.locations ?? good.locations,
    deliveryModes: data.deliveryModes ?? good.deliveryModes,
    paymentModes: data.paymentModes ?? good.paymentModes,
    description: data.description ?? good.description,
    availableFrom: data.availableFrom ? new Date(data.availableFrom) : good.availableFrom,
  } });
  res.json({ ok: true, good: updated });
}

async function deleteGood(req, res) {
  const id = parseInt(req.params.id, 10);
  const userId = req.userId;
  const good = await prisma.good.findUnique({ where: { id } });
  if (!good) throw new HttpError(404, 'Good not found');
  if (good.farmerId !== userId) throw new HttpError(403, 'Forbidden');
  await prisma.good.delete({ where: { id } });
  res.json({ ok: true });
}

module.exports = {
  createGood,
  listGoods,
  getGood,
  updateGood,
  deleteGood,
};
