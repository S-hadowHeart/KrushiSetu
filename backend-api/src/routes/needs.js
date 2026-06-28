const express = require('express');
const router = express.Router();
const needsController = require('../controllers/needsController');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/validate');
const { createNeedSchema } = require('../validators/marketplaceValidator');

router.post('/', auth, validateBody(createNeedSchema), needsController.createNeed);
router.get('/', needsController.listNeeds);
router.get('/:id', needsController.getNeed);
router.put('/:id', auth, validateBody(createNeedSchema), needsController.updateNeed);
router.delete('/:id', auth, needsController.deleteNeed);

module.exports = router;
