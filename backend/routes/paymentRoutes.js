const express = require('express');
const { createPayment, verifyPayment, getUnverifiedPayments } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/make-payment', protect, createPayment);
router.post('/:paymentId/verify', protect, verifyPayment);
router.get('/unverified', protect, getUnverifiedPayments); // New route for unverified payments


module.exports = router;