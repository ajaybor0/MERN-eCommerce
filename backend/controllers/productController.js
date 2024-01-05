import Product from '../models/productModel.js';

// @desc     Fetch All Products
// @method   GET
// @endpoint /api/v1/products
// @access   Public
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      res.statusCode = 404;
      throw new Error('Products not found!');
    }

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// @desc     Fetch Single Product
// @method   GET
// @endpoint /api/v1/products/:id
// @access   Public
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.statusCode = 404;
      throw new Error('Product not found!');
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc     Create product
// @method   POST
// @endpoint /api/v1/products
// @access   Private/Admin
const createProduct = async (req, res, next) => {
  try {
    const { name, image, description, brand, category, price, countInStock } =
      req.body;
    console.log(req.file);
    const product = new Product({
      user: req.user._id,
      name,
      image,
      description,
      brand,
      category,
      price,
      countInStock
    });
    const createdProduct = await product.save();

    res.status(200).json({ message: 'Product created', createdProduct });
  } catch (error) {
    next(error);
  }
};

// @desc     Update product
// @method   PUT
// @endpoint /api/v1/products/:id
// @access   Private/Admin
const updateProduct = async (req, res, next) => {
  try {
    const { name, image, description, brand, category, price, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.statusCode = 404;
      throw new Error('Product not found!');
    }

    (product.name = name || product.name),
      (product.image = image || product.image),
      (product.description = description || product.description),
      (product.brand = brand || product.brand),
      (product.category = category || product.category),
      (product.price = price || product.price),
      (product.countInStock = countInStock || product.countInStock);

    const updatedProduct = await product.save();

    res.status(200).json({ message: 'Product updated', updatedProduct });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @method   DELETE
// @endpoint /api/v1/products/:id
// @access   Admin
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.statusCode = 404;
      throw new Error('Product not found!');
    }
    await Product.deleteOne({ _id: product._id });

    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
