const prisma = require('../prismaClient');
const HttpError = require('../utils/httpError');

async function submitVerification(req, res) {
  const userId = req.userId;
  const { idType, idNumber, attachments } = req.body;
  const rec = await prisma.verification.create({ data: { userId, idType, idNumber, attachments: attachments || [] } });
  res.status(201).json({ ok: true, verification: rec });
}

async function getVerification(req, res) {
  const userId = parseInt(req.params.userId, 10) || req.userId;
  const rec = await prisma.verification.findFirst({ where: { userId }, orderBy: { createdAt: 'desc' } });
  if (!rec) throw new HttpError(404, 'Verification not found');
  res.json({ verification: rec });
}

async function listPending(req, res) {
  const items = await prisma.verification.findMany({ where: { status: 'PENDING' }, orderBy: { createdAt: 'asc' } });
  res.json({ items });
}

async function review(req, res) {
  const id = parseInt(req.params.id, 10);
  const { status } = req.body; // APPROVED or REJECTED
  const updated = await prisma.verification.update({ where: { id }, data: { status, reviewedBy: req.userId, reviewedAt: new Date() } });
  if (status === 'APPROVED') {
    await prisma.user.update({ where: { id: updated.userId }, data: { verified: true } });
  }
  res.json({ ok: true, verification: updated });
}

module.exports = { submitVerification, getVerification, listPending, review };
