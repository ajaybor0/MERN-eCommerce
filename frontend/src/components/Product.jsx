import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { addCurrency } from '../utils/addCurrency';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: 'none' }}
        className='text-dark'
      >
        <Card.Img
          variant='top'
          src={product.image}
          style={{ height: '200px', objectFit: 'contain' }}
        />
        <Card.Body>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>

          <Card.Text as='div' className='mb-3'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as='h3'>{addCurrency(product.price)}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Product;
