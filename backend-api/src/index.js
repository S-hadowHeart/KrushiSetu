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
const adminRoutes = require('./routes/admin');
const errorHandler = require('./middleware/errorHandler');
const prisma = require('./prismaClient');

const app = express();

const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(helmet());
app.use(
  cors({
    origin: process.env.APP_URL,
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
app.use('/admin', adminRoutes);

app.get('/', (req, res) => res.json({ ok: true, name: 'KrushiSetu API' }));

app.use(errorHandler);

const port = Number(process.env.PORT || 4000);
app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  try {
    await prisma.$connect();
    console.log('Connected to database');
  } catch (e) {
    console.error('Failed connecting to DB', e.message);
  }
});
