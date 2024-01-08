import React, { useEffect, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../slices/productsApiSlice';

function SearchBox() {
  const [search, setSearch] = useState('');

  const { refetch } = useGetProductsQuery({ search });

  const searchHandler = e => {
    e.preventDefault();
    refetch();
  };
  return (
    <Form onSubmit={searchHandler} className='d-flex '>
      <InputGroup>
        <Form.Control
          size='sm'
          type='text'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search Products'
        />
        <Button type='submit' variant='outline-secondary'>
          <FaSearch />
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBox;
