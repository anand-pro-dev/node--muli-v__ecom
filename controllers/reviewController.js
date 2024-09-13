const Review = require('../models/Review');
const Product = require('../models/Product');

exports.addReview = async (req, res) => {
    const { productId, rating, comment } = req.body;
    const userId = req.user.id;

    // Basic validation
    if (!productId || !rating || !comment) {
        return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ msg: 'Rating must be between 1 and 5' });
    }

    try {
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        // Check if user has already reviewed this product
        const existingReview = await Review.findOne({ user: userId, product: productId });
        if (existingReview) {
            return res.status(400).json({ msg: 'You have already reviewed this product' });
        }

        // Create and save the new review
        const review = new Review({
            user: userId,
            product: productId,
            rating,
            comment,
        });

        await review.save();
        res.status(201).json(review);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};
