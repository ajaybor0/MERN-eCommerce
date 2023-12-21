import React from 'react';

import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div className='position-absolute top-50 start-50 translate-middle'>
      <Spinner
        animation='border'
        role='status'
        style={{ width: '100px', height: '100px' }}
      />
    </div>
  );
};

export default Loader;
