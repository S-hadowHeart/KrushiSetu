const prisma = require('../prismaClient');
const HttpError = require('../utils/httpError');

async function createOfferForGood(req, res) {
  const goodId = parseInt(req.params.id, 10);
  const data = req.body;
  const userId = req.userId;
  const good = await prisma.good.findUnique({ where: { id: goodId } });
  if (!good) throw new HttpError(404, 'Good not found');
  const offer = await prisma.offer.create({ data: {
    fromUserId: userId,
    toUserId: good.farmerId,
    goodId,
    qty: data.qty,
    price: data.price,
    message: data.message || null,
  } });
  res.status(201).json({ ok: true, offer });
}

async function createOfferForNeed(req, res) {
  const needId = parseInt(req.params.id, 10);
  const data = req.body;
  const userId = req.userId;
  const need = await prisma.need.findUnique({ where: { id: needId } });
  if (!need) throw new HttpError(404, 'Need not found');
  const offer = await prisma.offer.create({ data: {
    fromUserId: userId,
    toUserId: need.buyerId,
    needId,
    qty: data.qty,
    price: data.price,
    message: data.message || null,
  } });
  res.status(201).json({ ok: true, offer });
}

async function listOffersForOwner(req, res) {
  const userId = req.userId;
  const offers = await prisma.offer.findMany({ where: { toUserId: userId }, orderBy: { createdAt: 'desc' } });
  res.json({ offers });
}

async function respondOffer(req, res) {
  const id = parseInt(req.params.id, 10);
  const { status } = req.body;
  const offer = await prisma.offer.findUnique({ where: { id } });
  if (!offer) throw new HttpError(404, 'Offer not found');
  if (offer.toUserId !== req.userId) throw new HttpError(403, 'Forbidden');
  const updated = await prisma.offer.update({ where: { id }, data: { status } });
  res.json({ ok: true, offer: updated });
}

module.exports = { createOfferForGood, createOfferForNeed, listOffersForOwner, respondOffer };
