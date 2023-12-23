import express from 'express';
const router = express.Router();
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', loginUser);
router.post('/logout', protect, logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:userId')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
