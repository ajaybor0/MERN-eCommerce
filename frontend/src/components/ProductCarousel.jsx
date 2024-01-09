import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import Loader from './Loader';
import Message from './Message';
const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Carousel  fade className='text-center bg-secondary mb-5 '>
          {products?.map(product => (
            <Carousel.Item key={product._id} interval={3000}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className='pb-5 '>
                  <h3>{product.name}</h3>
                  <h1>
                    <FaIndianRupeeSign size={14} />
                    {product.price}
                  </h1>
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