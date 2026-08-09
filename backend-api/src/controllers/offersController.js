const prisma = require('../prismaClient');
const HttpError = require('../utils/httpError');

const userSelect = { id: true, name: true, verified: true, role: true };

async function createOfferForGood(req, res) {
  const publicId = req.params.publicId;
  const data = req.body;
  const userId = req.userId;
  const good = await prisma.good.findUnique({ where: { publicId } });
  if (!good) throw new HttpError(404, 'Good not found');
  if (good.farmerId === userId) throw new HttpError(400, "You can't make an offer on your own listing");
  const offer = await prisma.offer.create({ data: {
    fromUserId: userId,
    toUserId: good.farmerId,
    goodId: good.id,
    qty: data.qty,
    price: data.price,
    message: data.message || null,
  } });
  res.status(201).json({ ok: true, offer });
}

async function createOfferForNeed(req, res) {
  const publicId = req.params.publicId;
  const data = req.body;
  const userId = req.userId;
  const need = await prisma.need.findUnique({ where: { publicId } });
  if (!need) throw new HttpError(404, 'Need not found');
  if (need.buyerId === userId) throw new HttpError(400, "You can't make an offer on your own need");
  const offer = await prisma.offer.create({ data: {
    fromUserId: userId,
    toUserId: need.buyerId,
    needId: need.id,
    qty: data.qty,
    price: data.price,
    message: data.message || null,
  } });
  res.status(201).json({ ok: true, offer });
}

// Offers where the current user is the recipient (i.e. they need to respond).
async function listOffersForOwner(req, res) {
  const userId = req.userId;
  const offers = await prisma.offer.findMany({
    where: { toUserId: userId },
    include: { fromUser: { select: userSelect }, good: true, need: true, counters: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ offers });
}

// Offers the current user originally sent, so they can track their own status.
async function listOffersSent(req, res) {
  const userId = req.userId;
  const offers = await prisma.offer.findMany({
    where: { fromUserId: userId },
    include: { toUser: { select: userSelect }, good: true, need: true, counters: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ offers });
}

async function respondOffer(req, res) {
  const id = parseInt(req.params.id, 10);
  const { status } = req.body;
  if (!['ACCEPTED', 'REJECTED'].includes(status)) throw new HttpError(400, 'Invalid status');
  const offer = await prisma.offer.findUnique({ where: { id } });
  if (!offer) throw new HttpError(404, 'Offer not found');
  if (offer.toUserId !== req.userId) throw new HttpError(403, 'Forbidden');
  const updated = await prisma.offer.update({ where: { id }, data: { status } });
  res.json({ ok: true, offer: updated });
}

// Negotiation: the recipient of an offer replies with a new offer of their
// own, flowing back toward the original sender. This keeps the direction
// (fromUser/toUser) meaningful while letting either side propose new terms.
async function counterOffer(req, res) {
  const id = parseInt(req.params.id, 10);
  const userId = req.userId;
  const data = req.body;
  const original = await prisma.offer.findUnique({ where: { id } });
  if (!original) throw new HttpError(404, 'Offer not found');
  if (original.toUserId !== userId && original.fromUserId !== userId) {
    throw new HttpError(403, 'Forbidden');
  }
  const counterpartId = original.toUserId === userId ? original.fromUserId : original.toUserId;

  const [updated, counter] = await prisma.$transaction([
    prisma.offer.update({ where: { id }, data: { status: 'COUNTERED' } }),
    prisma.offer.create({
      data: {
        fromUserId: userId,
        toUserId: counterpartId,
        goodId: original.goodId,
        needId: original.needId,
        qty: data.qty ?? original.qty,
        price: data.price ?? original.price,
        message: data.message || null,
        parentOfferId: original.id,
      },
    }),
  ]);

  res.status(201).json({ ok: true, offer: counter, previousOffer: updated });
}

module.exports = {
  createOfferForGood,
  createOfferForNeed,
  listOffersForOwner,
  listOffersSent,
  respondOffer,
  counterOffer,
};
