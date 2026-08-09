const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const needsController = require('../controllers/needsController');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/validate');
const { createNeedSchema } = require('../validators/marketplaceValidator');

router.post('/', auth, validateBody(createNeedSchema), asyncHandler(needsController.createNeed));
router.get('/', asyncHandler(needsController.listNeeds));
router.get('/:publicId', asyncHandler(needsController.getNeed));
router.put('/:publicId', auth, validateBody(createNeedSchema), asyncHandler(needsController.updateNeed));
router.delete('/:publicId', auth, asyncHandler(needsController.deleteNeed));

module.exports = router;
