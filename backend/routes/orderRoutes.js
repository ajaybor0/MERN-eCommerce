import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliver,
  getOrders
} from '../controllers/orderController.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

router.get('/myorders', protect, getMyOrders);
router.get('/:orderId', protect, admin, getOrderById);

router.put('/:orderId/pay', protect, updateOrderToPaid);
router.put('/:orderId/deliver', protect, admin, updateOrderToDeliver);

export default router;
