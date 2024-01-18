import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import { config, order, validate } from '../controllers/paymentController.js';

const router = express.Router();

router.get('/razorpay/config', config);

router.post('/razorpay/order', protect, order);

router.post('/razorpay/order/validate', protect, validate);

export default router;
