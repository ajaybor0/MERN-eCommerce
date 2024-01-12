import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import Loader from './Loader';
import ServerError from './ServerError';
import { addCurrency } from '../utils/addCurrency';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ServerError />
      ) : (
        <Carousel fade className='text-center bg-secondary mb-5 '>
          {products?.map(product => (
            <Carousel.Item key={product._id} interval={3000}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className='pb-5 '>
                  <h3>{product.name}</h3>
                  <h1>{addCurrency(product.price)}</h1>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ProductCarousel;
