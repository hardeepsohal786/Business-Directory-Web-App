const express = require('express');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const { createProfile, getAll, getById } = require('../controllers/businessController');
const router = express.Router();

router.post('/', authenticate, authorizeRoles('business'), createProfile);
router.get('/', authenticate, getAll);
router.get('/:id', authenticate, getById);

module.exports = router;
