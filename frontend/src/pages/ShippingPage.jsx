import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';

const ShippingPage = () => {
  const { shippingAddress } = useSelector(state => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country
      })
    );
    navigate('/payment');
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <Meta title={'Shipping'} />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={address}
            type='text'
            placeholder='Enter address'
            onChange={e => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            value={city}
            type='text'
            placeholder='Enter city'
            onChange={e => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            value={postalCode}
            type='text'
            placeholder='Enter city'
            onChange={e => setPostalCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            value={country}
            type='text'
            placeholder='Enter city'
            onChange={e => setCountry(e.target.value)}
          />
        </Form.Group>
        <Button className='mb-3 w-100' variant='warning' type='submit'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
