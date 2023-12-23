import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import 'dotenv/config';
// import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();
//cookie parser middleware
app.use(cookieParser());
//application/json parser middleware
app.use(express.json());
//application/x-www-form-urlencoded parser middleware
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// app.use(notFound);
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
