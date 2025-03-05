import express from 'express';
import { createProduct, getProduct, updateProduct, deleteProduct, getProducts } from '../controllers/products';
import { upload } from '../services/cloudinary';
import { validateToken } from '../middlewares/auth';

const router = express.Router();
// Get product details by ID
router.get('/:id', getProduct);

// Get multiple products
router.get('/', getProducts);

router.use(validateToken)

// Create a new product
router.post('/',upload.single('img'), createProduct);


// Update product information by ID
router.put('/:id',upload.single('img'),updateProduct);

// Delete a product by ID
router.delete('/:id', deleteProduct);


export default router;
