import React, { useState } from 'react';
import { Row, Col, Form, Button, Table, InputGroup } from 'react-bootstrap';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import ProfileForm from '../components/ProfileForm';

const ProfilePage = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  // const { userInfo } = useSelector(state => state.auth);

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  // const [updateProfile, { isLoading: isUpdateProfileLoading }] =
  //   useProfileMutation();

  // const dispatch = useDispatch();

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };
  // const toggleConfirmPasswordVisibility = () => {
  //   setConfirmShowPassword(!showConfirmPassword);
  // };

  // const submitHandler = async e => {
  //   e.preventDefault();

  //   try {
  //     if (password !== confirmPassword) {
  //       return toast.error('Passwords do not match!');
  //     }
  //     const res = await updateProfile({ name, email, password }).unwrap();
  //     dispatch(setCredentials({ ...res }));
  //     setName('');
  //     setEmail('');
  //     setPassword('');
  //     setConfirmPassword('');
  //     toast.success(res.message);
  //   } catch (error) {
  //     toast.error(error?.data?.message || error.error);
  //   }
  // };
  return (
    <>
      <Row>
        <Col md={3}>
          <Meta title={'User Profile'} />
          <h2>User Profile</h2>
          <ProfileForm />
          {/* <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                type='text'
                placeholder='Enter name'
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                type='email'
                placeholder='Enter email'
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  placeholder='Enter password'
                  onChange={e => setPassword(e.target.value)}
                />
                <InputGroup.Text
                  onClick={togglePasswordVisibility}
                  id='togglePasswordVisibility'
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className='mb-3' controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  placeholder='Confirm password'
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <InputGroup.Text
                  onClick={toggleConfirmPasswordVisibility}
                  id='toggleConfirmPasswordVisibility'
                  style={{ cursor: 'pointer' }}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Button className='mb-3' variant='primary' type='submit'>
              Update
            </Button>
            {isUpdateProfileLoading && <Loader />}
          </Form> */}
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <Table striped hover responsive size='sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
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
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
