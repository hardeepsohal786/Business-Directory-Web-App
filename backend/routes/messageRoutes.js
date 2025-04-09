const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { sendMessage, getMessages } = require('../controllers/messageController');
const router = express.Router();

router.post('/', authenticate, sendMessage);
router.get('/', authenticate, getMessages);

module.exports = router;
