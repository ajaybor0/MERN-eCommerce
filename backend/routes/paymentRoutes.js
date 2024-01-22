import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import { config, order, validate } from '../controllers/paymentController.js';
import validateRequest from '../middleware/validator.js';
import {body, check} from 'express-validator';

const router = express.Router();

const validator = {
    order: [
        body().custom(body => {
            if (Object.keys(body).length === 0) 
                throw new Error('Request Body is empty')
            return true;
        })
    ],
    validate: [
        body('razorpay_order_id')
            .notEmpty()
            .withMessage('Razorpay order ID is required')
            .trim(),
        body('razorpay_payment_id')
            .notEmpty()
            .withMessage('Razorpay payment ID is required')
            .trim(),
        body('razorpay_signature')
            .notEmpty()
            .withMessage('Razorpay signature is required')
            .trim()
            .escape()
    ]
}

router.get('/razorpay/config', config);

router.post('/razorpay/order', validator.order, validateRequest, protect, order);

router.post('/razorpay/order/validate', validator.validate, validateRequest, protect, validate);

export default router;
