import React from 'react';

import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div className='d-flex justify-content-center align-items-center  '>
      <Spinner
        animation='border'
        role='status'
        style={{ width: '100px', height: '100px' }}
      />
    </div>
  );
};

export default Loader;
