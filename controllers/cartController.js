const User = require('../models/User');
const Product = require('../models/Product');

// Add to cart
exports.addToCart = async (req, res) => {
    const { productId } = req.body;

    try {
        const user = await User.findById(req.user._id);
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const cartItem = user.cart.find(item => item.product.equals(productId));
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            user.cart.push({ product: productId, quantity: 1 });
        }

        await user.save();
        res.json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;

    try {
        const user = await User.findById(req.user._id);
        user.cart = user.cart.filter(item => !item.product.equals(productId));

        await user.save();
        res.json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ error });
    }
};

// View cart
exports.viewCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: 'cart.product',
            model: 'Product',
            select: 'title price images'
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ error });
    }
};
