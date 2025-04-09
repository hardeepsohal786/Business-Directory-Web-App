const express = require('express');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const { addFinancials, getByBusiness } = require('../controllers/financialController');
const router = express.Router();

router.post('/', authenticate, authorizeRoles('business'), addFinancials);
router.get('/:id', authenticate, getByBusiness);

module.exports = router;
