import express from 'express';
import { getAllUsers, updateProfile } from '../controllers/userController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.get('/', restrictTo('admin'), getAllUsers);
router.patch('/profile', updateProfile);

export default router;