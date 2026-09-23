const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const auth = require('../middleware/auth');
const rc = require('../controllers/ratingsController');
const { validateBody } = require('../middleware/validate');
const { ratingSchema } = require('../validators/interactionValidator');

router.post('/', auth, validateBody(ratingSchema), asyncHandler(rc.createRating));
router.get('/:targetId', asyncHandler(rc.getRatings));

module.exports = router;
