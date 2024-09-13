const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'seller', null], default: 'user' },
    isApproved: { type: String, enum: ['approved', 'pending', 'denied'], default: 'pending' },
    sellerId: { type: mongoose.Schema.Types.ObjectId },  // Store ObjectId as sellerId
    cart: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Product reference
            quantity: { type: Number, default: 1 } // Quantity of the product
        }
    ]
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
