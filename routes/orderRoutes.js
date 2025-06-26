const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// 🛒 Create new order (only if logged in)
router.post('/', protect, createOrder);

// 📦 Optional: Get orders for logged-in user
router.get('/my-orders', protect, getMyOrders);

module.exports = router;
