const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        stock: { type: Number, required: true },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Seller reference
        images: [{ type: String }], // Array of image URLs
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // User references for likes
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

module.exports = mongoose.model('Product', productSchema);
