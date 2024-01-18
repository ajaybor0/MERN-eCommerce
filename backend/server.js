import path from 'path';
import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { protect, admin } from './middleware/authMiddleware.js';

const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();

// cors middleware
app.use(cors());
// compress all responses
app.use(compression());
//cookie parser middleware
app.use(cookieParser());
//application/json parser middleware
app.use(express.json());
//application/x-www-form-urlencoded parser middleware
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve(); // Set {__dirname} to current working directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.get('/api/v1/config/razorpay', (req, res) =>
//   res.send({
//     razorpayKeyId: process.env.RAZORPAY_KEY_ID,
//     razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET
//   })
// );

// app.post('/api/v1/razorpay/order', protect, async (req, res, next) => {
//   try {
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET
//     });

//     const options = req.body;

//     const order = await razorpay.orders.create(options);
//     if (!order) {
//       res.statusCode = 500;
//       throw new Error('No order');
//     }
//     res.status(201).json(order);
//   } catch (error) {
//     next(error);
//   }
// });

// app.post('/api/v1/razorpay/order/validate', protect, (req, res) => {
//   console.log(req.user);
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;

//   const generatedSignature = crypto
//     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//     .digest('hex');
//   // console.log(generatedSignature, razorpay_signature);

//   if (generatedSignature !== razorpay_signature) {
//     res.statusCode = 400;
//     throw new Error('payment is not legit!');
//   }
//   res.status(201).json({
//     id: razorpay_payment_id,
//     status: 'success',
//     message: 'payment is successful',
//     updateTime: new Date().toLocaleTimeString()
//   });
// });

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/upload', uploadRoutes);

//-------------------------------------
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  //any app route that is not api will redirected to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
}

//-------------------------------------
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
