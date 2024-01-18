import crypto from 'crypto';
import Razorpay from 'razorpay';

const config = (req, res) =>
  res.send({
    razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET
  });

const order = async (req, res, next) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const options = req.body;

    const order = await razorpay.orders.create(options);

    if (!order) {
      res.statusCode = 500;
      throw new Error('No order');
    }
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

const validate = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');
  // console.log(generatedSignature, razorpay_signature);

  if (generatedSignature !== razorpay_signature) {
    res.statusCode = 400;
    throw new Error('payment is not legit!');
  }
  res.status(201).json({
    id: razorpay_payment_id,
    status: 'success',
    message: 'payment is successful',
    updateTime: new Date().toLocaleTimeString()
  });
};

export { config, order, validate };
