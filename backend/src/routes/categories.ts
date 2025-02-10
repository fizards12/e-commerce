import express from 'express';
import { createCategory, getCategory, updateCategory, deleteCategory, getCategories } from '../controllers/categories';

const router = express.Router();

// Create a new category
router.post('/', createCategory);

// Get category details by ID
router.get('/:id', getCategory);

// Update category information by ID
router.put('/:id', updateCategory);

// Delete a category by ID
router.delete('/:id', deleteCategory);

// Get multiple categories
router.get('/', getCategories);

export default router;
