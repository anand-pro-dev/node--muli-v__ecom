const express = require('express');
const { addReview } = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Users can add reviews
router.post('/add', authMiddleware, addReview);

module.exports = router;
