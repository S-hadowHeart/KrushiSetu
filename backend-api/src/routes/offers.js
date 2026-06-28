const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const offers = require('../controllers/offersController');

router.post('/goods/:id', auth, offers.createOfferForGood);
router.post('/needs/:id', auth, offers.createOfferForNeed);
router.get('/me', auth, offers.listOffersForOwner);
router.put('/:id/respond', auth, offers.respondOffer);

module.exports = router;
