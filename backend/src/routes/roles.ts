import express from 'express';
import { createRole, getRole, updateRole, deleteRole, getRoleCount, getRoles } from '../controllers/roles';

const router = express.Router();

// Create a new role
router.post('/', createRole);

// Get role details by ID
router.get('/:id', getRole);

// Update role information by ID
router.put('/:id', updateRole);

// Delete a role by ID
router.delete('/:id', deleteRole);

// Get the number of roles
router.get('/count', getRoleCount);

// Get multiple roles
router.get('/', getRoles);

export default router;
