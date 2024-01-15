import React, { useState } from 'react';
import {
  Form,
  Button,
  InputGroup,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { searchProduct, clearSearch } from '../slices/searchProductSlice';

function SearchBox() {
  const [input, setInput] = useState('');

  const dispatch = useDispatch();

  const searchProductHandler = e => {
    e.preventDefault();
    dispatch(searchProduct(input));
  };

  const clearSearchHandler = () => {
    dispatch(clearSearch());
    setInput('');
  };
  return (
    <Form onSubmit={searchProductHandler} className='d-flex'>
      <InputGroup>
        <Form.Control
          size='sm'
          type='text'
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='Search Products...'
        />
        {input === '' ? (
          ''
        ) : (
          <Button type='button' variant='light' onClick={clearSearchHandler}>
            <FaTimes />
          </Button>
        )}
        <Button type='submit' variant='warning'>
          <FaSearch />
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBox;
