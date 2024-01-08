import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaIndianRupeeSign, FaXmark } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const OrderListsPage = () => {
  // console.log(useGetOrdersQuery());

  const { data: orders, refetch, isLoading, error } = useGetOrdersQuery();

  useEffect(() => {
    refetch();
  }, [refetch, orders]);

  return (
    <>
      <h2>Orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped hover bordered responsive size='sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map(order => (
              <tr key={order._id}>
                <td>{order.user._id}</td>
                <td>{order.user.name}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <FaIndianRupeeSign />
                  {order.totalPrice}
                </td>
                <td>
                  {order.isPaid ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaXmark style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaXmark style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm' variant='light'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListsPage;
