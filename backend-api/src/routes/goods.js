const express = require('express');
const router = express.Router();
const goodsController = require('../controllers/goodsController');
const auth = require('../middleware/auth');
const { validateBody, validateQuery } = require('../middleware/validate');
const { createGoodSchema, listGoodsSchema } = require('../validators/marketplaceValidator');

router.post('/', auth, validateBody(createGoodSchema), goodsController.createGood);
router.get('/', validateQuery(listGoodsSchema), goodsController.listGoods);
router.get('/:id', goodsController.getGood);
router.put('/:id', auth, validateBody(createGoodSchema), goodsController.updateGood);
router.delete('/:id', auth, goodsController.deleteGood);

module.exports = router;
