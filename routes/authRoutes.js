const express = require('express');
const { register, login } = require('../controllers/userController');
const router = express.Router();

// Register user (including sellers)
router.post('/register', register);

// Login user
router.post('/login', login);

module.exports = router;
