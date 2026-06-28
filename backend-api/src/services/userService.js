const prisma = require('../prismaClient');

async function getProfile(userId) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      verified: true,
      createdAt: true,
    },
  });
}

module.exports = {
  getProfile,
};
