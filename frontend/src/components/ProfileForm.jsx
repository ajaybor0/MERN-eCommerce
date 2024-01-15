import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useProfileMutation } from '../slices/usersApiSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from './Loader';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const { userInfo } = useSelector(state => state.auth);

  const [updateProfile, { isLoading: isUpdateProfileLoading }] =
    useProfileMutation();

  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const submitHandler = async e => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        return toast.error('Passwords do not match!');
      }
      const res = await updateProfile({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <Form onSubmit={submitHandler}>
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
      <Button className='mb-3 w-100' variant='warning' type='submit'>
        Update
      </Button>
      {isUpdateProfileLoading && <Loader />}
    </Form>
  );
};

export default ProfileForm;
