const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const auth = require('../middleware/auth');
const messages = require('../controllers/messagesController');

router.use(auth);

router.post('/', asyncHandler(messages.sendMessage));
router.get('/conversations', asyncHandler(messages.listConversations));
router.get('/thread/:userId', asyncHandler(messages.getThread));
router.put('/thread/:userId/read', asyncHandler(messages.markThreadRead));

module.exports = router;
