import React, { useEffect, useState } from 'react';

import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useSelector } from 'react-redux';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import ServerError from '../components/ServerError';
import Meta from '../components/Meta';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(4);
  const [skip, setSkip] = useState(0);
  const { search } = useSelector(state => state.search);

  const { data, isLoading, error } = useGetProductsQuery({ limit, skip, search });

  // Reset to first page on search change
  useEffect(() => {
    setCurrentPage(1);
    setSkip(0);
  }, [search]);

  // Update derived pagination values when data or page changes
  useEffect(() => {
    setSkip((currentPage - 1) * limit);
    if (data) {
      setTotal(data.total || 0);
      setTotalPage(Math.ceil((data.total || 0) / limit));
    }
  }, [currentPage, data, limit]);

  const pageHandler = pageNum => {
    if (pageNum >= 1 && pageNum <= totalPage && pageNum !== currentPage) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {!search && <ProductCarousel />}
          <Meta />
          <h1>Latest Products</h1>
          <Row>
            {data.products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {totalPage > 1 && !search && (
            <Paginate
              currentPage={currentPage}
              totalPage={totalPage}
              pageHandler={pageHandler}
            />
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
