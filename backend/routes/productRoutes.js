import express, { query } from 'express';
import {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validator.js';
import {body, check, param} from 'express-validator';

const router = express.Router();

const validator = {
  getProducts: [
    check('limit').optional().isNumeric().withMessage('Limit parameter must be a number').custom(value => {
      if(value < 0) throw new Error('Value should not be less than Zero');
      return true;
    }),
    check('skip').optional().isNumeric().withMessage('skip parameter must be a number').custom(value => {
      if(value < 0) throw new Error('Value should not be less than Zero');
      return true;
    }),
    check('search').optional().trim().escape()
  ],
  createProduct: [
    check('name').trim().notEmpty().withMessage('Name is required').escape(),
    check('image').notEmpty().withMessage('Image is required'),
    check('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required')
      .escape(),
    check('brand').trim().notEmpty().withMessage('Brand is required').escape(),
    check('category').trim().notEmpty().withMessage('Category is required').escape(),
    check('price')
      .notEmpty()
      .withMessage('Price is required')
      .isNumeric()
      .withMessage('Price must be a number'),
    check('countInStock')
      .notEmpty()
      .withMessage('Count in stock is required')
      .isNumeric()
      .withMessage('Count in stock must be a number')
  ],
  createProductReview: [
    param('id').notEmpty().withMessage('Id is required').isMongoId().withMessage('Invalid Id Format'),
    body('rating').notEmpty().withMessage('Rating is Empty').bail().isNumeric().withMessage('Ratings must be number'),
    body('comment').trim().escape()
  ],
  getProduct: [
    param('id').notEmpty().withMessage('Id is required').isMongoId().withMessage('Invalid Id Format')
  ],
  deleteProduct: [
    param('id').notEmpty().withMessage('Id is required').isMongoId().withMessage('Invalid Id Format')
  ],
  updateProduct: [
    check('name').trim().notEmpty().withMessage('Name is required').escape(),
    check('image').notEmpty().withMessage('Image is required'),
    check('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required')
      .escape(),
    check('brand').trim().notEmpty().withMessage('Brand is required').escape(),
    check('category').trim().notEmpty().withMessage('Category is required').escape(),
    check('price')
      .notEmpty()
      .withMessage('Price is required')
      .isNumeric()
      .withMessage('Price must be a number'),
    check('countInStock')
      .notEmpty()
      .withMessage('Count in stock is required')
      .isNumeric()
      .withMessage('Count in stock must be a number'),
    param('id').notEmpty().withMessage('Id is required').isMongoId().withMessage('Invalid Id Format')
  ]
}

router.route('/')
  .post(validator.createProduct, validateRequest, protect, admin, createProduct)
  .get(validator.getProducts, validateRequest, getProducts);
router.get('/top', getTopProducts);
router.post('/reviews/:id', validator.createProductReview, validateRequest, protect, createProductReview);
router
  .route('/:id')
  .get(validator.getProduct, validateRequest, getProduct)
  .put(validator.updateProduct, validateRequest, protect, admin, updateProduct)
  .delete(validator.deleteProduct, validateRequest, protect, admin, deleteProduct);

export default router;
