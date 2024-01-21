import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNewPasswordRequestMutation } from '../slices/usersApiSlice';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';
import Message from '../components/Message';
import { toast } from 'react-toastify';

const ResetPasswordRequestPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [requestNewPassword, { isLoading }] = useNewPasswordRequestMutation();
  // console.log(useNewPasswordRequestMutation());
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await requestNewPassword({ email }).unwrap();
      setMessage(res.message);
      setEmail('');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <Meta title={'Request New Password'} />
      <h1>Request New Password</h1>
      {message && <Message>{message}</Message>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            value={email}
            placeholder='Enter email'
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button
          className='mb-3 w-100'
          variant='warning'
          type='submit'
          disabled={isLoading}
        >
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ResetPasswordRequestPage;
