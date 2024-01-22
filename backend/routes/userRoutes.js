import express from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
  admins,
  resetPasswordRequest,
  resetPassword
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validator.js';
import {body, param} from 'express-validator';

const router = express.Router();
const validator = {
  checkLogin: [
    body('email').trim().notEmpty().withMessage('Email is Required').bail().isEmail().withMessage("Please enter a valid email address"),
    body('password').trim().isString().notEmpty().withMessage('Password is Empty')
  ],
  checkNewUser: [
    body('email').trim().notEmpty().withMessage('Email is Required').bail().isEmail().withMessage("Please enter a valid email address"),
    body('password').trim().isString().notEmpty().withMessage('Password is Empty').bail()
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').trim().notEmpty().withMessage('Name is Required').escape()
  ],
  checkGetUserById: [
    param('id').exists().withMessage('Id is required').isMongoId().withMessage('Invalid Id')
  ],
  checkUpdateUser: [
    body('email').trim().notEmpty().withMessage('Email is Required').bail().isEmail().withMessage("Please enter a valid email address"),
    body('name').trim().notEmpty().withMessage('Name is Required').escape(),
    body('isAdmin').isBoolean().withMessage('isAdmin value should be true/false'),
    param('id').exists().withMessage('Id is required').isMongoId().withMessage('Invalid Id')
  ],
  resetPasswordRequest: [
    body('email').trim().notEmpty().withMessage('Email is Required').bail().isEmail().withMessage("Please enter a valid email address")
  ],
  resetPassword: [
    body('password').trim().notEmpty().withMessage('Password is Required').escape().bail()
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    param('id').exists().withMessage('Id is required').isMongoId().withMessage('Invalid Id'),
    param('token').trim().notEmpty().withMessage('Token is Required')
  ]
}

router.route('/')
  .post(validator.checkNewUser, validateRequest, registerUser)
  .get(protect, admin, getUsers);

router.route('/admins').get(protect, admin, admins);

router.post('/reset-password/request', validator.resetPasswordRequest, validateRequest, resetPasswordRequest);
router.post('/reset-password/reset/:id/:token', validator.resetPassword, validateRequest, resetPassword);
router.post('/login', validator.checkLogin, validateRequest, loginUser);
router.post('/logout', protect, logoutUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(validator.checkNewUser, validateRequest, protect, updateUserProfile);

router
  .route('/:id')
  .get(validator.checkGetUserById, validateRequest, protect, admin, getUserById)
  .put(validator.checkUpdateUser, validateRequest, protect, admin, updateUser)
  .delete(validator.checkGetUserById, validateRequest, protect, admin, deleteUser);

export default router;
