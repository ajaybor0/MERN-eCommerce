import React from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { FaRupeeSign, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { useDeleteProductMutation } from '../../slices/productsApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const ProductListPage = () => {
  // console.log(useGetProductsQuery());
  const { data: products, refetch, isLoading, error } = useGetProductsQuery();
  // console.log(useDeleteProductMutation());
  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation();

  const deleteHandler = async productId => {
    try {
      await deleteProduct(productId);
      refetch();
      toast.success('Product deleted');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <LinkContainer to={'/admin/product/create'}>
            <Button className='btn-sm my-3'>Add Product</Button>
          </LinkContainer>
        </Col>
      </Row>
      {isDeleteLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped hover bordered responsive size='sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>
                  <FaRupeeSign />
                  {product.price}
                </td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/products/${product._id}/edit`}>
                    <Button className='btn-sm' variant='light'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>

                  <Button
                    className='btn-sm'
                    variant='light'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash style={{ color: 'red' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListPage;
