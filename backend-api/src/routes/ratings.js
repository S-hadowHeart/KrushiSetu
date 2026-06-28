const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const rc = require('../controllers/ratingsController');

router.post('/', auth, rc.createRating);
router.get('/:targetId', rc.getRatings);

module.exports = router;
