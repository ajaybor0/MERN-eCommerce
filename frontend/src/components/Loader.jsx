import React from 'react';

import { Spinner, Modal } from 'react-bootstrap';

const Loader = () => {
  return (
    <Modal.Dialog className=' position-absolute top-50 start-50 translate-middle '>
      <Modal.Body>
        <Spinner
          animation='border'
          role='status'
          style={{ width: '100px', height: '100px' }}
        />
      </Modal.Body>
    </Modal.Dialog>
  );
};

export default Loader;
