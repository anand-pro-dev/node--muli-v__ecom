const User = require('../models/User');

// Get all pending seller requests
exports.getPendingSellers = async (req, res) => {
    try {
        const requests = await User.find({ role: 'seller', isApproved: 'pending' });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pending sellers', error });
    }
};

// Get all approved sellers
exports.getApprovedSellers = async (req, res) => {
    try {
        const sellers = await User.find({ role: 'seller', isApproved: 'approved' });
        res.json(sellers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching approved sellers', error });
    }
};

// Approve a seller
exports.approveSeller = async (req, res) => {
    const { email } = req.body;

    try {
        const seller = await User.findOne({ email });

        if (!seller || seller.role !== 'seller' || seller.isApproved !== 'pending') {
            return res.status(404).json({ message: 'Seller not found or not pending approval' });
        }

        seller.isApproved = 'approved';
        seller.sellerId = seller._id;  // Assign ObjectId as sellerId

        await seller.save();

        res.json({
            message: `Seller with email ${seller.email} has been approved`,
            sellerId: seller.sellerId, // Return the sellerId
            seller
        });
    } catch (error) {
        res.status(500).json({ message: 'Error approving seller', error });
    }
};
