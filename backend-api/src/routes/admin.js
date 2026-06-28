const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/authorize');
const ac = require('../controllers/adminController');

router.use(auth, requireRole('ADMIN'));

router.get('/users', ac.listUsers);
router.get('/users/:id', ac.getUser);
router.put('/users/:id/suspend', ac.suspendUser);

router.get('/goods', ac.listGoods);
router.delete('/goods/:id', ac.deleteGood);

module.exports = router;
