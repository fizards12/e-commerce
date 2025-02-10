import express from 'express';
import { createUser, getUser, updateUser, deleteUser, getUserCount, getUsers } from '../controllers/users';

const router = express.Router();

// Create a new user
router.post('/', createUser);

// Get user details by ID
router.get('/:id', getUser);

// Update user information by ID
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);

// Get the number of users
router.get('/count', getUserCount);

// Get multiple users
router.get('/', getUsers);

export default router;
