const prisma = require('../prismaClient');
const HttpError = require('../utils/httpError');

async function createRating(req, res) {
  const data = req.body;
  if (data.type === 'USER' && data.targetId === req.userId) throw new HttpError(400, "You can't rate yourself");
  const rating = await prisma.rating.create({ data: {
    authorId: req.userId,
    targetId: data.targetId,
    type: data.type,
    score: data.score,
    comment: data.comment || null,
  } });
  res.status(201).json({ ok: true, rating });
}

async function getRatings(req, res) {
  const targetId = parseInt(req.params.targetId, 10);
  const items = await prisma.rating.findMany({ where: { targetId } });
  const avg = items.length ? items.reduce((s, r) => s + r.score, 0) / items.length : 0;
  res.json({ items, avg });
}

module.exports = { createRating, getRatings };
