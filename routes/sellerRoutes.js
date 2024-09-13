const express = require('express');
const { addProduct, updateProduct, deleteProduct, getProduct, getAllProducts, getAllProductsSeller } = require('../controllers/productController');

const router = express.Router();



const { authMiddleware, isSeller } = require('../middleware/authMiddleware');


// // Only sellers can create products
// router.post('/create-product', authMiddleware, isSeller, createProduct);


router.post('/', authMiddleware, isSeller, addProduct);
router.put('/:id', authMiddleware, isSeller, updateProduct);
router.delete('/:id', authMiddleware, isSeller, deleteProduct);
router.get('/:id', authMiddleware, isSeller, getProduct);
router.get('/', authMiddleware, isSeller, getAllProductsSeller);
// router.get('/', authMiddleware, isSeller, getAllProducts);

module.exports = router;
