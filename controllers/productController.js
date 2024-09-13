
const Product = require('../models/Product.js');

const addProduct = async (req, res) => {
  const { title, description, price, stock, category, images } = req.body;
  const seller = req.user._id; // Assuming req.user contains the authenticated user's info

  try {
    // Validate required fields
    if (!title || !description || !price || !stock || !category) {
      return res.status(400).json({ msg: 'Please fill in all required fields.' });
    }

    // Create new product
    const product = new Product({
      title,
      description,
      price,
      stock,
      category,
      images,
      seller, // Store seller's ID
    });

    // Save product to database
    await product.save();

    // Send back the created product
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
const getAllProductsSeller = async (req, res) => {
  const sellerId = req.user._id; // Assuming seller is authenticated and this is set in req.user

  try {
    // Find products that belong to the authenticated seller
    const products = await Product.find({ seller: sellerId }); // Changed to `seller` field

    // If no products found, return a 404 response
    if (!products.length) return res.status(404).json({ msg: 'No products found for this seller' });

    // Return the products if found
    res.status(200).json(products);
  } catch (err) {
    // Handle any server errors
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


const getProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};



const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updates = req.body;

  try {
    const product = await Product.findByIdAndUpdate(productId, updates, { new: true });
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};


const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    res.status(200).json({ msg: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};


module.exports = {
  addProduct, deleteProduct, updateProduct, getAllProducts, getProduct, getAllProductsSeller,

}