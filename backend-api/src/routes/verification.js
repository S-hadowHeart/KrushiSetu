const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/authorize');
const vc = require('../controllers/verificationController');

router.post('/', auth, vc.submitVerification);
router.get('/:userId', auth, vc.getVerification);
router.get('/', auth, requireRole('ADMIN'), vc.listPending);
router.put('/:id', auth, requireRole('ADMIN'), vc.review);

module.exports = router;
