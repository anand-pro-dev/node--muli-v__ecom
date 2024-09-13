router.get('/', authMiddleware, isSeller, getAllProductsSeller);

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes and check user roles
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer')
        ? req.headers.authorization.split(' ')[1]
        : null;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

// Middleware to ensure the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Admin access only' });
    }
};

// Middleware to ensure the user is a seller
const isSeller = (req, res, next) => {
    if (req.user && req.user.role === 'seller') {
        next();
    } else {
        return res.status(403).json({ message: 'Seller access only' });
    }
};

module.exports = { authMiddleware, isAdmin, isSeller };