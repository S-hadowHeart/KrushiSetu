const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const auth = require('../middleware/auth');
const offers = require('../controllers/offersController');

router.post('/goods/:publicId', auth, asyncHandler(offers.createOfferForGood));
router.post('/needs/:publicId', auth, asyncHandler(offers.createOfferForNeed));
router.get('/me', auth, asyncHandler(offers.listOffersForOwner));
router.get('/sent', auth, asyncHandler(offers.listOffersSent));
router.put('/:id/respond', auth, asyncHandler(offers.respondOffer));
router.post('/:id/counter', auth, asyncHandler(offers.counterOffer));

module.exports = router;
