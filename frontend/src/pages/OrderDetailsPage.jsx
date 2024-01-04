import React, { useEffect } from 'react';
// import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Image, Card } from 'react-bootstrap';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useUpdateDeliverMutation,
  useGetRazorpayApiKeyQuery
} from '../slices/ordersApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import Loader from '../components/Loader';
import Message from '../components/Message';

import axios from 'axios';
// import { RAZORPAY_URL } from '../constants';
const OrderDetailsPage = () => {
  const { id: orderId } = useParams();
  // console.log(useGetOrderDetailsQuery());
  const {
    data: order,
    refetch,
    isLoading,
    isError,
    error
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder] = usePayOrderMutation();
  const [updateDeliver] = useUpdateDeliverMutation();
  console.log(useUpdateDeliverMutation());

  // const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { userInfo } = useSelector(state => state.auth);
  // const {
  //   data: paypal,

  //   isError: isErrorPayPal
  // } = useGetPayPalClientIdQuery();

  // useEffect(() => {
  //   if (!isErrorPayPal && paypal?.clientId) {
  //     const loadPayPalScript = async () => {
  //       paypalDispatch({
  //         type: 'resetOptions',
  //         value: {
  //           clientId: paypal?.clientId,
  //           currency: 'USD'
  //         }
  //       });
  //       paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
  //     };
  //     if (order && !order?.isPaid) {
  //       if (!window?.paypal) {
  //         loadPayPalScript();
  //       }
  //     }
  //   }
  // }, [order, paypal, paypalDispatch, isErrorPayPal]);

  // const onApproveTest = async () => {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   refetch();
  //   toast.success('Payment successful.');
  // };

  // const createOrder = async (data, actions) => {
  //   const orderId = await actions.order.create({
  //     purchase_units: [
  //       {
  //         amount: {
  //           value: order?.totalPrice
  //         }
  //       }
  //     ]
  //   });

  //   return orderId;
  // };

  // const onApprove = async (data, actions) => {
  //   try {
  //     const details = await actions.order.capture();
  //     await payOrder({ orderId, details });
  //     refetch();
  //     toast.success('Payment successful.');
  //   } catch (error) {
  //     toast.error(error?.data?.message || error.message);
  //   }
  // };

  // const onError = error => {
  //   toast.error(error?.data?.message || error.message);
  // };

  const { data: razorpayApiKey } = useGetRazorpayApiKeyQuery();

  const paymentHandler = async e => {
    try {
      // Check if order is defined before proceeding
      // if (!order) {
      //   console.error('Order is undefined');
      //   return;
      // }

      // Check if totalPrice is a valid number
      // const totalPrice = parseFloat(order.totalPrice);
      // if (isNaN(totalPrice) || totalPrice <= 0) {
      //   console.error('Invalid totalPrice:', order.totalPrice);
      //   return;
      // }

      // Make the API call to Razorpay

      const razorpayData = {
        amount: order.totalPrice * 100, // Razorpay expects the amount in paisa, so multiply by 100
        currency: 'INR',
        receipt: `receipt#${orderId}`
      };
      const { data } = await axios.post('/api/v1/razorpay/order', razorpayData);

      const { id: razorpayOrderId } = data;

      const options = {
        key: razorpayApiKey.razorpayKeyId, // Enter the Key ID generated from the Dashboard
        amount: razorpayData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: razorpayData.currency,
        name: 'MERN Shop', //your business name
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: razorpayOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async response => {
          // console.log(response);
          try {
            const { data } = await axios.post(
              `/api/v1/razorpay/order/validate`,
              response
            );
            const details = { ...data, email: order?.user?.email };
            await payOrder({ orderId, details });
            toast.success(data.message);
            refetch();
          } catch (error) {
            toast.error(error?.data?.message || error.error);
          }
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: order?.user?.name, //your customer's name
          email: order?.user?.email
          // contact: '9000090000' //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: 'Razorpay Corporate Office'
        },
        theme: {
          color: '#3399cc'
        }
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
      // e.preventDefault();

      // rzp1.on('payment.failed', response => {
      //   alert(response.error.code);
      //   alert(response.error.description);
      //   alert(response.error.source);
      //   alert(response.error.step);
      //   alert(response.error.reason);
      //   alert(response.error.metadata.order_id);
      //   alert(response.error.metadata.payment_id);
      // });
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deliveredHandler = async () => {
    try {
      await updateDeliver(orderId);
      toast.success('Order Delivered');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Order ID: {orderId}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping </h2>
                  <div className='mb-3'>
                    <strong>Name:</strong> {order?.user?.name}
                  </div>
                  <div className='mb-3'>
                    <strong>Email:</strong>{' '}
                    <Link to={`mailto:${order?.user?.email}`}>
                      {order?.user?.email}
                    </Link>
                  </div>
                  <div className='mb-3'>
                    <strong>Address:</strong> {order?.shippingAddress?.address},
                    {order?.shippingAddress?.city},
                    {order?.shippingAddress?.postalCode},
                    {order?.shippingAddress?.country} <br />
                  </div>
                  {order?.isDelivered ? (
                    <Message variant='success'>
                      Delivered on{' '}
                      {new Date(order?.deliveredAt).toLocaleString()}
                    </Message>
                  ) : (
                    <Message variant={'danger'}>{'Not Delivered'}</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method </h2>
                  <div className='mb-3'>
                    <strong>Method:</strong> {order?.paymentMethod}
                  </div>
                  {order?.isPaid ? (
                    <Message variant={'success'}>
                      Paid on {new Date(order?.paidAt).toLocaleString()}
                    </Message>
                  ) : (
                    <Message variant={'danger'}>{'Not paid'}</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items </h2>
                  <ListGroup variant='flush'>
                    {order?.orderItems?.map(item => (
                      <ListGroup.Item key={item._id}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col md={6}>
                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items:</Col>
                      <Col>
                        <FaIndianRupeeSign />
                        {order?.itemsPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping:</Col>
                      <Col>
                        <FaIndianRupeeSign />
                        {order?.shippingPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax:</Col>
                      <Col>
                        <FaIndianRupeeSign />
                        {order?.taxPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total:</Col>
                      <Col>
                        <FaIndianRupeeSign />
                        {order?.totalPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {!order?.isPaid && !userInfo.isAdmin && (
                    <ListGroup.Item>
                      <Button
                        onClick={paymentHandler}
                        style={{ marginBottom: '10px' }}
                      >
                        Pay Order
                      </Button>
                    </ListGroup.Item>
                  )}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order?.isPaid &&
                    !order?.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          onClick={deliveredHandler}
                          style={{ marginBottom: '10px' }}
                        >
                          Mark As Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderDetailsPage;
