import Product from '../models/productModel.js';

// @desc     Fetch All Products
// @method   GET
// @endpoint /api/products
// @access   Public
const getProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Check if any products were found
    if (!products || products.length === 0) {
      // Return a 404 response if no products are found
      return res.status(404).json({
        message: 'Products not found.'
      });
    }

    // Send a success response with the list of products
    return res.status(200).json(products);
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching products:', error);

    // Handle errors during product retrieval
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

// @desc     Fetch Single Product
// @method   GET
// @endpoint /api/products/:productId
// @access   Public
const getProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    // Fetch a single product by ID from the database
    const product = await Product.findById(productId);

    // Check if the product was found
    if (!product) {
      // Return a 404 response if the product is not found
      return res.status(404).json({
        message: 'Product not found.'
      });
    }

    // Send a success response with the single product
    return res.status(200).json(product);
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching a single product:', error);

    // Handle errors during product retrieval
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

export { getProducts, getProduct };
