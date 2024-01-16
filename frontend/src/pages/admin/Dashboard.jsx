import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import {
  FaStore,
  FaUsers,
  FaShoppingBag,
  FaUsersCog,
  FaWallet
} from 'react-icons/fa';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { useGetUsersQuery, useAdminsQuery } from '../../slices/usersApiSlice';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import Loader from '../../components/Loader';
import Meta from '../../components/Meta';
import { addCurrency } from '../../utils/addCurrency';
const Dashboard = () => {
  const { data, isLoading } = useGetProductsQuery({});
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery({});
  const { data: orders, isLoading: isOrdersLoading } = useGetOrdersQuery({});
  console.log(orders);
  const { data: admins, isLoading: isAdminsLoading } = useAdminsQuery({});

  return (
    <Row>
      <Meta title={'Admin Dashboard'} />
      <Col sm={6} md={3} className='position-relative'>
        {isLoading ? (
          <Loader />
        ) : (
          <Card className='my-3 p-3 rounded bg-info text-light'>
            <Row className='align-items-center '>
              <Col xs={4}>
                <FaStore size={40} />
              </Col>
              <Col xs={8}>
                <Card.Title>Products</Card.Title>
                <Card.Title>
                  <strong>{data?.total}</strong>
                </Card.Title>
              </Col>
            </Row>
          </Card>
        )}
      </Col>
      <Col sm={6} md={3} className='position-relative'>
        {isUsersLoading ? (
          <Loader />
        ) : (
          <Card className='my-3 p-3 rounded bg-danger text-light'>
            <Row className='align-items-center '>
              <Col xs={4}>
                <FaUsers size={40} />
              </Col>
              <Col xs={8}>
                <Card.Title>Users</Card.Title>
                <Card.Title>
                  <strong>{users?.length}</strong>
                </Card.Title>
              </Col>
            </Row>
          </Card>
        )}
      </Col>
      <Col sm={6} md={3} className='position-relative'>
        {isOrdersLoading ? (
          <Loader />
        ) : (
          <Card className='my-3 p-3 rounded bg-warning text-light'>
            <Row className='align-items-center '>
              <Col xs={4}>
                <FaShoppingBag size={40} />
              </Col>
              <Col xs={8}>
                <Card.Title>Orders</Card.Title>
                <Card.Title>
                  <strong>{orders?.length}</strong>
                </Card.Title>
              </Col>
            </Row>
          </Card>
        )}
      </Col>
      <Col sm={6} md={3} className='position-relative'>
        {isAdminsLoading ? (
          <Loader />
        ) : (
          <Card className='my-3 p-3 rounded bg-success text-light '>
            <Row className='align-items-center '>
              <Col xs={4}>
                <FaWallet size={40} />
              </Col>
              <Col xs={8}>
                <Card.Title>Revenue</Card.Title>
                <Card.Title>
                  <strong>
                    {addCurrency(
                      orders?.reduce((acc, item) => acc + item.totalPrice, 0)
                    )}
                  </strong>
                </Card.Title>
              </Col>
            </Row>
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default Dashboard;
