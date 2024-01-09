import React from 'react';
import { Container, Col, Button } from 'react-bootstrap';

const ServerError = () => {
  return (
    <Container className='position-absolute top-50 start-50 translate-middle'>
      <Col className='text-center'>
        <h1 className='display-1 fw-bold'>500</h1>
        <p className='fs-3'>Internal Server Error</p>
        <p className='lead'>
          <span className='text-danger'>Opps!</span> Something went wrong on the
          server.
        </p>
        <Button onClick={() => window.location.reload(false)} variant='primary'>
          Reload Page
        </Button>
      </Col>
    </Container>
  );
};

export default ServerError;
