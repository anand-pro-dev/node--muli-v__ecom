const express = require('express');
const { addToCart, removeFromCart } = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Users can add to or remove from their cart
router.post('/add', authMiddleware, addToCart);
router.post('/remove', authMiddleware, removeFromCart);
router.get('/', authMiddleware, removeFromCart);

module.exports = router;
