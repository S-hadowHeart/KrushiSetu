const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/authorize');
const ac = require('../controllers/adminController');

router.use(auth, requireRole('ADMIN'));

router.get('/users', asyncHandler(ac.listUsers));
router.get('/users/:id', asyncHandler(ac.getUser));
router.put('/users/:id/suspend', asyncHandler(ac.suspendUser));

router.get('/goods', asyncHandler(ac.listGoods));
router.delete('/goods/:id', asyncHandler(ac.deleteGood));

router.get('/needs', asyncHandler(ac.listNeeds));
router.delete('/needs/:id', asyncHandler(ac.deleteNeed));

router.get('/offers', asyncHandler(ac.listOffers));

router.get('/messages', asyncHandler(ac.listMessages));

router.get('/stats', asyncHandler(ac.getStats));

module.exports = router;
