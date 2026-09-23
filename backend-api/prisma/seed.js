const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const isProduction = process.env.NODE_ENV === 'production';
const seedDemoData = process.env.SEED_DEMO_DATA !== 'false' && (!isProduction || process.env.SEED_DEMO_DATA === 'true');

function requireProductionSecret(value, name) {
  if (isProduction && !value) {
    throw new Error(`${name} must be set when seeding in production`);
  }
  return value;
}

async function upsertUser({ email, name, role, password, verified = true }) {
  const passwordHash = await bcrypt.hash(password, 12);
  return prisma.user.upsert({
    where: { email },
    update: { name, role, verified, password: passwordHash },
    create: { email, name, role, verified, password: passwordHash },
  });
}

async function seedDemoRecords({ farmer, buyer }) {
  const good = await prisma.good.upsert({
    where: { publicId: '00000000-0000-4000-8000-000000000001' },
    update: { farmerId: farmer.id },
    create: {
      publicId: '00000000-0000-4000-8000-000000000001',
      farmerId: farmer.id,
      name: 'Fresh Tomatoes',
      images: [],
      minQty: 10,
      maxQty: 500,
      priceMin: 18,
      priceMax: 25,
      locations: ['Pune', 'Nashik'],
      deliveryModes: ['FARMER_DELIVERY', 'PICKUP'],
      paymentModes: ['CASH', 'UPI'],
      description: 'Freshly harvested tomatoes suitable for retail and wholesale buyers.',
    },
  });

  const need = await prisma.need.upsert({
    where: { publicId: '00000000-0000-4000-8000-000000000002' },
    update: { buyerId: buyer.id },
    create: {
      publicId: '00000000-0000-4000-8000-000000000002',
      buyerId: buyer.id,
      title: 'Tomatoes for local grocery stores',
      description: 'Looking for a consistent weekly supply of quality tomatoes.',
      qtyNeeded: 100,
      locations: ['Pune'],
      priceMin: 18,
      priceMax: 24,
      deliveryMode: 'FARMER_DELIVERY',
      paymentMode: 'UPI',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  let offer = await prisma.offer.findFirst({ where: { fromUserId: farmer.id, toUserId: buyer.id, goodId: good.id, needId: need.id } });
  if (!offer) {
    offer = await prisma.offer.create({
      data: {
        fromUserId: farmer.id,
        toUserId: buyer.id,
        goodId: good.id,
        needId: need.id,
        qty: 100,
        price: 22,
        message: 'I can supply 100 kg every week from Pune.',
      },
    });
  }

  const existingMessage = await prisma.message.findFirst({ where: { senderId: farmer.id, receiverId: buyer.id, offerId: offer.id } });
  if (!existingMessage) {
    await prisma.message.create({
      data: {
        senderId: farmer.id,
        receiverId: buyer.id,
        goodId: good.id,
        needId: need.id,
        offerId: offer.id,
        body: 'Hello, I have fresh tomatoes available this week.',
      },
    });
  }

  const existingVerification = await prisma.verification.findFirst({ where: { userId: farmer.id } });
  if (!existingVerification) {
    await prisma.verification.create({
      data: {
        userId: farmer.id,
        idType: 'AADHAAR',
        idNumber: 'DEMO-FARMER-001',
        status: 'PENDING',
      },
    });
  }

  const existingRating = await prisma.rating.findFirst({ where: { authorId: buyer.id, targetId: farmer.id, type: 'USER' } });
  if (!existingRating) {
    await prisma.rating.create({
      data: {
        authorId: buyer.id,
        targetId: farmer.id,
        type: 'USER',
        score: 5,
        comment: 'Reliable local supplier.',
      },
    });
  }

  console.log(`Seeded demo marketplace data: good ${good.publicId}, need ${need.publicId}`);
}

async function main() {
  const adminEmail = requireProductionSecret(process.env.ADMIN_EMAIL, 'ADMIN_EMAIL') || 'admin@example.com';
  const adminPassword = requireProductionSecret(process.env.ADMIN_PASSWORD, 'ADMIN_PASSWORD') || 'ChangeMe123!';

  const admin = await upsertUser({ email: adminEmail, name: 'KrushiSetu Admin', role: 'ADMIN', password: adminPassword });
  console.log(`Seeded admin user: ${admin.email}`);

  if (!seedDemoData) {
    console.log('Demo data disabled. Set SEED_DEMO_DATA=true to enable it.');
    return;
  }

  const farmer = await upsertUser({
    email: process.env.DEMO_FARMER_EMAIL || 'farmer@example.com',
    name: 'Demo Farmer',
    role: 'FARMER',
    password: requireProductionSecret(process.env.DEMO_FARMER_PASSWORD, 'DEMO_FARMER_PASSWORD') || 'Farmer123!',
  });
  const buyer = await upsertUser({
    email: process.env.DEMO_BUYER_EMAIL || 'buyer@example.com',
    name: 'Demo Buyer',
    role: 'BUYER',
    password: requireProductionSecret(process.env.DEMO_BUYER_PASSWORD, 'DEMO_BUYER_PASSWORD') || 'Buyer123!',
  });

  await seedDemoRecords({ farmer, buyer });
  console.log('Demo credentials are configured through DEMO_FARMER_* and DEMO_BUYER_* environment variables.');
}

main()
  .catch((error) => {
    console.error('Database seed failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
