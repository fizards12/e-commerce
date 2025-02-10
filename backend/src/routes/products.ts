import express from 'express';
import { createProduct, getProduct, updateProduct, deleteProduct, getProducts } from '../controllers/products';

const router = express.Router();

// Create a new product
router.post('/', createProduct);

// Get product details by ID
router.get('/:id', getProduct);

// Update product information by ID
router.put('/:id', updateProduct);

// Delete a product by ID
router.delete('/:id', deleteProduct);

// Get multiple products
router.get('/', getProducts);

export default router;
