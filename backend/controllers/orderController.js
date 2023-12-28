import Order from '../models/orderModel.js';

// @desc     Create new order
// @method   POST
// @endpoint /api/orders
// @access   Private
const addOrderItems = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.statusCode = 400;
      throw new Error('No order items.');
    }

    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map(item => ({
        ...item,
        product: item._id,
        _id: undefined
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// @desc     Get logged-in user orders
// @method   GET
// @endpoint /api/orders/myorders
// @access   Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    if (!orders || orders.length === 0) {
      res.statusCode = 404;
      throw new Error('No orders found for the logged-in user.');
    }

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc     Get order by ID
// @method   GET
// @endpoint /api/orders/:orderId
// @access   Private/Admin
const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('user', 'name email');

    if (!order) {
      res.statusCode = 404;
      throw new Error('Order not found!');
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

// @desc     Update order to paid
// @method   PUT
// @endpoint /api/orders/:orderId/pay
// @access   Private
const updateOrderToPaid = async (req, res) => {
  try {
    res.status(200).json({
      message: 'Payment successful.'
    });
  } catch (error) {
    console.error('Error accepting order payment:', error);

    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

// @desc     Update order to delivered
// @method   PUT
// @endpoint /api/orders/:orderId/deliver
// @access   Private/Admin
const updateOrderToDeliver = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Order delivered successfully.'
    });
  } catch (error) {
    console.error('Error order delivery:', error);

    // Handle errors during product retrieval
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

// @desc     Get all orders
// @method   GET
// @endpoint /api/orders
// @access   Private/Admin
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    if (!orders || orders.length === 0) {
      res.statusCode = 404;
      throw new Error('Orders not found!');
    }
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliver,
  getOrders
};
