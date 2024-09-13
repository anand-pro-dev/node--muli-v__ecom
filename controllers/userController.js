const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


// Token expiration set to 5 years
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5y' });

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the user already exists by email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        let user = new User({ name, email, password, role });

        // If the role is 'seller', create a sellerId
        if (role === 'seller') {
            user.sellerId = new mongoose.Types.ObjectId(); // Generate MongoDB ObjectId for the sellerId
        }

        // Save the user
        user = await user.save();

        // Generate token for the created user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5y' });

        // Respond with the token and user information
        res.status(201).json({ token, user });
    } catch (error) {
        // Improved error handling: Log and return a detailed error message
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token for login
        const token = generateToken(user._id);
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error });
    }
};
