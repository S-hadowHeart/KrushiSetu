const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/authorize');
const vc = require('../controllers/verificationController');
const { validateBody } = require('../middleware/validate');
const { verificationSchema, reviewVerificationSchema } = require('../validators/interactionValidator');

router.post('/', auth, validateBody(verificationSchema), asyncHandler(vc.submitVerification));
router.get('/:userId', auth, asyncHandler(vc.getVerification));
router.get('/', auth, requireRole('ADMIN'), asyncHandler(vc.listPending));
router.put('/:id', auth, requireRole('ADMIN'), validateBody(reviewVerificationSchema), asyncHandler(vc.review));

module.exports = router;
