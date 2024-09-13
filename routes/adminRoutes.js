const express = require('express');
const { getPendingSellers, getApprovedSellers, approveSeller } = require('../controllers/adminController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all pending seller requests
router.get('/pending-sellers', authMiddleware, isAdmin, getPendingSellers);

// Get all approved sellers
router.get('/approved-sellers', authMiddleware, isAdmin, getApprovedSellers);

// Approve a seller
router.post('/approve-seller', authMiddleware, isAdmin, approveSeller);

module.exports = router;
