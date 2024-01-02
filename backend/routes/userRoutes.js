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

// @desc     Register a new user
// @method   POST
// @endpoint /api/users
// @access   Public
router.route('/').post(registerUser).get(protect, admin, getUsers);

// @desc     Login user
// @method   POST
// @endpoint /api/users/login
// @access   Public
router.post('/login', loginUser);

// @desc     Logout user
// @method   POST
// @endpoint /api/users/logout
// @access   Private
router.post('/logout', protect, logoutUser);

// @desc     Get user profile and update user profile
// @method   GET, PUT
// @endpoint /api/users/profile
// @access   Private
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// @desc     Get, update, or delete a user by ID
// @method   GET, PUT, DELETE
// @endpoint /api/users/:id
// @access   Private/Admin
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
