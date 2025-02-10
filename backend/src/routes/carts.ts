import express from 'express';
import { createCart, getCart, updateCart, deleteCart, getCarts } from '../controllers/carts';

const router = express.Router();

// Create a new cart
router.post('/', createCart);

// Get cart details by ID
router.get('/:id', getCart);

// Update cart information by ID
router.put('/:id', updateCart);

// Delete a cart by ID
router.delete('/:id', deleteCart);

// Get multiple carts
router.get('/', getCarts);

export default router;
