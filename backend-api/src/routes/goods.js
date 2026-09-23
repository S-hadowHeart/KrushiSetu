const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const goodsController = require('../controllers/goodsController');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/authorize');
const { validateBody, validateQuery } = require('../middleware/validate');
const { createGoodSchema, listGoodsSchema } = require('../validators/marketplaceValidator');

router.post('/', auth, requireRole('FARMER'), validateBody(createGoodSchema), asyncHandler(goodsController.createGood));
router.get('/', validateQuery(listGoodsSchema), asyncHandler(goodsController.listGoods));
router.get('/:publicId', asyncHandler(goodsController.getGood));
router.put('/:publicId', auth, requireRole('FARMER'), validateBody(createGoodSchema), asyncHandler(goodsController.updateGood));
router.delete('/:publicId', auth, asyncHandler(goodsController.deleteGood));

module.exports = router;
