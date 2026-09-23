const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const auth = require('../middleware/auth');
const offers = require('../controllers/offersController');
const { validateBody } = require('../middleware/validate');
const { offerSchema, respondOfferSchema } = require('../validators/interactionValidator');

router.post('/goods/:publicId', auth, validateBody(offerSchema), asyncHandler(offers.createOfferForGood));
router.post('/needs/:publicId', auth, validateBody(offerSchema), asyncHandler(offers.createOfferForNeed));
router.get('/me', auth, asyncHandler(offers.listOffersForOwner));
router.get('/sent', auth, asyncHandler(offers.listOffersSent));
router.put('/:id/respond', auth, validateBody(respondOfferSchema), asyncHandler(offers.respondOffer));
router.post('/:id/counter', auth, validateBody(offerSchema), asyncHandler(offers.counterOffer));

module.exports = router;
