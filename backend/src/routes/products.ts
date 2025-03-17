import express from 'express';
import { createProduct, getProduct, updateProduct, deleteProduct, getProducts } from '../controllers/products';
import { upload } from '../services/cloudinary';
import { validateToken } from '../middlewares/auth';

const router = express.Router();
// Get product details by ID
//TODO: Create a view controller for ecommerce app
router.get('/view/:id', getProduct);

// Get multiple products
//TODO: Create a view controller for ecommerce app
router.get('/view', getProducts);

router.use(validateToken)

// Get multiple products
router.get('/', getProducts);
// Create a new product
router.post('/',upload.single('img'), createProduct);


// Update product information by ID
router.put('/:id',upload.single('img'),updateProduct);

// Delete a product by ID
router.delete('/:id', deleteProduct);


export default router;
