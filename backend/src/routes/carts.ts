import express from 'express';
import { getCart, updateItem, deleteCartItem } from '../controllers/carts';
import { validateToken } from '../middlewares/auth';

const router = express.Router();


// Get cart details
router.get('/',validateToken, getCart);

// Update cart item information
router.post('/',validateToken,updateItem);

// Delete a cart item by product ID
router.delete('/:id',validateToken,deleteCartItem);


export default router;
