require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const goodsRoutes = require('./routes/goods');
const needsRoutes = require('./routes/needs');
const verificationRoutes = require('./routes/verification');
const offersRoutes = require('./routes/offers');
const ratingsRoutes = require('./routes/ratings');
const uploadsRoutes = require('./routes/uploads');
const messagesRoutes = require('./routes/messages');
const adminRoutes = require('./routes/admin');
const errorHandler = require('./middleware/errorHandler');
const prisma = require('./prismaClient');

const app = express();

const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(helmet());
const allowedOrigins = [process.env.APP_URL, process.env.FRONTEND_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('CORS policy blocked this request'));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/goods', goodsRoutes);
app.use('/needs', needsRoutes);
app.use('/verification', verificationRoutes);
app.use('/offers', offersRoutes);
app.use('/ratings', ratingsRoutes);
app.use('/uploads', uploadsRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/messages', messagesRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => res.json({ ok: true, name: 'KrushiSetu API' }));

app.use(errorHandler);

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled promise rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

const port = Number(process.env.PORT || 4000);

async function start() {
  try {
    await prisma.$connect();
    const server = app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

    const shutdown = async (signal) => {
      console.log(`${signal} received, shutting down`);
      server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
      });
    };

    process.once('SIGINT', () => shutdown('SIGINT'));
    process.once('SIGTERM', () => shutdown('SIGTERM'));
    console.log('Connected to database');
  } catch (error) {
    console.error('Failed connecting to DB', error.message);
    await prisma.$disconnect();
    process.exitCode = 1;
  }
}

if (require.main === module) {
  start();
}

module.exports = { app, start };
