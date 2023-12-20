import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
// import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/products', productRoutes);

// app.use(notFound);
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
