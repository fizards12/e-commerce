import { Router } from 'express';
import { register, login, getProfile, logout, getLoggedInUser, forgetPassword, resetPassword } from '../controllers/auth';
import { checkRole, validateToken } from '../middlewares/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile',validateToken,checkRole(['trader', 'admin']), getProfile);
router.get('/loggedIn',validateToken, getLoggedInUser);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);

export default router;
