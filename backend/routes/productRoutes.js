import express from 'express';
import {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, admin, createProduct).get(getProducts);

router.route('/:id').get(getProduct).delete(protect, admin, deleteProduct);

export default router;
