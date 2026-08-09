const prisma = require('../prismaClient');
const HttpError = require('../utils/httpError');

const userSelect = { id: true, name: true, role: true, verified: true };

async function sendMessage(req, res) {
  const senderId = req.userId;
  const { toUserId, body, goodId, needId, offerId } = req.body;
  const receiverId = parseInt(toUserId, 10);
  if (!receiverId) throw new HttpError(400, 'toUserId is required');
  if (!body || !body.trim()) throw new HttpError(400, 'Message body is required');
  if (receiverId === senderId) throw new HttpError(400, "You can't message yourself");

  const receiver = await prisma.user.findUnique({ where: { id: receiverId } });
  if (!receiver) throw new HttpError(404, 'Recipient not found');

  const message = await prisma.message.create({
    data: {
      senderId,
      receiverId,
      body: body.trim(),
      goodId: goodId ? parseInt(goodId, 10) : null,
      needId: needId ? parseInt(needId, 10) : null,
      offerId: offerId ? parseInt(offerId, 10) : null,
    },
  });
  res.status(201).json({ ok: true, message });
}

// One row per conversation partner, with the most recent message and an
// unread count, similar to any chat app's inbox view.
async function listConversations(req, res) {
  const userId = req.userId;
  const messages = await prisma.message.findMany({
    where: { OR: [{ senderId: userId }, { receiverId: userId }] },
    orderBy: { createdAt: 'desc' },
    include: {
      sender: { select: userSelect },
      receiver: { select: userSelect },
    },
  });

  const conversations = new Map();
  for (const m of messages) {
    const partner = m.senderId === userId ? m.receiver : m.sender;
    if (!conversations.has(partner.id)) {
      conversations.set(partner.id, {
        partner,
        lastMessage: m,
        unreadCount: 0,
      });
    }
    if (m.receiverId === userId && !m.readAt) {
      conversations.get(partner.id).unreadCount += 1;
    }
  }

  res.json({ conversations: Array.from(conversations.values()) });
}

async function getThread(req, res) {
  const userId = req.userId;
  const otherUserId = parseInt(req.params.userId, 10);
  if (!otherUserId) throw new HttpError(400, 'User ID is required');
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    },
    orderBy: { createdAt: 'asc' },
    take: 200,
  });
  const partner = await prisma.user.findUnique({ where: { id: otherUserId }, select: userSelect });
  if (!partner) throw new HttpError(404, 'User not found');
  res.json({ messages, partner });
}

async function markThreadRead(req, res) {
  const userId = req.userId;
  const otherUserId = parseInt(req.params.userId, 10);
  await prisma.message.updateMany({
    where: { senderId: otherUserId, receiverId: userId, readAt: null },
    data: { readAt: new Date() },
  });
  res.json({ ok: true });
}

module.exports = { sendMessage, listConversations, getThread, markThreadRead };
