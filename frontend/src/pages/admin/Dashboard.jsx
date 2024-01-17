import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaStore, FaUsers, FaShoppingBag, FaWallet } from 'react-icons/fa';

import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

import { addCurrency } from '../../utils/addCurrency';

import Loader from '../../components/Loader';
import Meta from '../../components/Meta';
import ProductPriceChart from '../../components/Admin/ProductPriceChart';
import OrderPriceChart from '../../components/Admin/OrderPriceChart';
import DashboardCard from '../../components/Admin/DashboardCard';

const Dashboard = () => {
  const { data, isLoading } = useGetProductsQuery({});
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery({});
  const { data: orders, isLoading: isOrdersLoading } = useGetOrdersQuery({});

  return (
    <>
      {isLoading || isUsersLoading || isOrdersLoading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Meta title={'Admin Dashboard'} />
            <Col md={6} lg={3} className='position-relative'>
              <DashboardCard
                title={'Products'}
                icon={<FaStore size={40} />}
                value={data?.total}
                bgColor={'bg-info'}
              />
            </Col>
            <Col md={6} lg={3} className='position-relative'>
              <DashboardCard
                title={'Users'}
                icon={<FaUsers size={40} />}
                value={users?.length}
                bgColor={'bg-danger'}
              />
            </Col>
            <Col md={6} lg={3} className='position-relative'>
              <DashboardCard
                title={'Orders'}
                icon={<FaShoppingBag size={40} />}
                value={orders?.length}
                bgColor={'bg-warning'}
              />
            </Col>
            <Col md={6} lg={3} className='position-relative'>
              <DashboardCard
                title={'Revenue'}
                icon={<FaWallet size={40} />}
                value={addCurrency(
                  orders?.reduce((acc, item) => acc + item.totalPrice, 0)
                )}
                bgColor={'bg-success'}
              />
            </Col>
          </Row>

          <Row>
            <Col md={12} lg={6}>
              <ProductPriceChart products={data?.products} />
            </Col>
            <Col md={12} lg={6}>
              <OrderPriceChart orders={orders} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Dashboard;
