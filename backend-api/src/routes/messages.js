const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const auth = require('../middleware/auth');
const messages = require('../controllers/messagesController');
const { validateBody } = require('../middleware/validate');
const { messageSchema } = require('../validators/interactionValidator');

router.use(auth);

router.post('/', validateBody(messageSchema), asyncHandler(messages.sendMessage));
router.get('/conversations', asyncHandler(messages.listConversations));
router.get('/thread/:userId', asyncHandler(messages.getThread));
router.put('/thread/:userId/read', asyncHandler(messages.markThreadRead));

module.exports = router;
