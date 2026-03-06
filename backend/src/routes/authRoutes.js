import express from 'express';
import {
  loginController,
  forgotPasswordController,
  resetPasswordController,
  getMeController,
} from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', loginController);

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPasswordController);

// POST /api/auth/reset-password
router.post('/reset-password', resetPasswordController);

// GET /api/auth/me (protegida)
router.get('/me', authMiddleware, getMeController);

export default router;
