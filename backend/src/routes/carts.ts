import express from 'express';
import { getCart, updateCart, deleteCart } from '../controllers/carts';

const router = express.Router();


// Get cart details by ID
router.get('/:id', getCart);

// Update cart information by ID
router.put('/:id', updateCart);

// Delete a cart by ID
router.delete('/:id', deleteCart);


export default router;
