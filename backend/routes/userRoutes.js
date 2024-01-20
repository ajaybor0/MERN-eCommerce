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
  admins
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
    body('password').trim().isString().notEmpty().withMessage('Password is Empty'),
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
  ]
}

router.route('/')
  .post(validator.checkNewUser, validateRequest, registerUser)
  .get(protect, admin, getUsers);

router.route('/admins').get(protect, admin, admins);
router.post('/login', validator.checkLogin, validateRequest, loginUser);

router.post('/logout', protect, logoutUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .get(validator.checkGetUserById, validateRequest, protect, admin, getUserById)
  .put(validator.checkUpdateUser, validateRequest, protect, admin, updateUser)
  .delete(validator.checkGetUserById, validateRequest, protect, admin, deleteUser);

export default router;
