import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaStore, FaUsers, FaShoppingBag, FaUsersCog } from 'react-icons/fa';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { useGetUsersQuery, useAdminsQuery } from '../../slices/usersApiSlice';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import Loader from '../../components/Loader';
import Meta from '../../components/Meta';

const Dashboard = () => {
  const { data, isLoading } = useGetProductsQuery({});
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery({});
  const { data: orders, isLoading: isOrdersLoading } = useGetOrdersQuery({});
  const { data: admins, isLoading: isAdminsLoading } = useAdminsQuery({});

  return (
    <Row>
      <Meta title={'Admin Dashboard'} />
      <Col sm={6} md={3} className='position-relative'>
        {isLoading ? (
          <Loader />
        ) : (
          <Card className='my-3 p-3 rounded bg-info '>
            <Row className='align-items-center justify-content-center text-center'>
              <Col>
                <Card.Body>
                  <Card.Title>Products</Card.Title>
                  <Card.Title>
                    <strong>{data?.total}</strong>
                  </Card.Title>
                </Card.Body>
              </Col>
              <Col>
                <FaStore size={40} />
              </Col>
            </Row>
          </Card>
        )}
      </Col>
      <Col sm={6} md={3} className='position-relative'>
        {isUsersLoading ? (
          <Loader />
        ) : (
          <Card className='my-3 p-3 rounded bg-info '>
            <Row className='align-items-center justify-content-center text-center'>
              <Col>
                <Card.Body>
                  <Card.Title>Users</Card.Title>
                  <Card.Title>
                    <strong>{users?.length}</strong>
                  </Card.Title>
                </Card.Body>
              </Col>
              <Col>
                <FaUsers size={40} />
              </Col>
            </Row>
          </Card>
        )}
      </Col>
      <Col sm={6} md={3} className='position-relative'>
        {isOrdersLoading ? (
          <Loader />
        ) : (
          <Card className='my-3 p-3 rounded bg-info '>
            <Row className='align-items-center justify-content-center text-center'>
              <Col>
                <Card.Body>
                  <Card.Title>Orders</Card.Title>
                  <Card.Title>
                    <strong>{orders?.length}</strong>
                  </Card.Title>
                </Card.Body>
              </Col>
              <Col>
                <FaShoppingBag size={40} />
              </Col>
            </Row>
          </Card>
        )}
      </Col>
      <Col sm={6} md={3} className='position-relative'>
        {isAdminsLoading ? (
          <Loader />
        ) : (
          <Card className='my-3 p-3 rounded bg-info '>
            <Row className='align-items-center justify-content-center text-center'>
              <Col>
                <Card.Body>
                  <Card.Title>Admins</Card.Title>
                  <Card.Title>
                    <strong>{admins?.length}</strong>
                  </Card.Title>
                </Card.Body>
              </Col>
              <Col>
                <FaUsersCog size={40} />
              </Col>
            </Row>
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default Dashboard;
