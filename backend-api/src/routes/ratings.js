const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const auth = require('../middleware/auth');
const rc = require('../controllers/ratingsController');

router.post('/', auth, asyncHandler(rc.createRating));
router.get('/:targetId', asyncHandler(rc.getRatings));

module.exports = router;
