import Product from '../models/productModel.js';

// @desc     Fetch All Products
// @method   GET
// @endpoint /api/products
// @access   Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products.length > 0) {
      return res.status(404).json({
        message: 'Products Not Found!'
      });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
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
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: 'Product Not Found!'
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getProducts, getProduct };
