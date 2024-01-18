import React from 'react';
import {
  Card,
  Col,
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Row
} from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import AdminHeader from './components/Admin/AdminHeader';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import AdminSidebar from './components/Admin/AdminSidebar';

const AdminDashboard = () => {
  const { userInfo } = useSelector(state => state.auth);

  return (
    <div className='position-relative'>
      <AdminHeader />
      <Container fluid>
        <Row>
          <Col md={4} lg={2}>
            <Navbar
              className='align-items-start position-fixed d-none d-md-block'
              variant='dark'
              bg='dark'
              style={{
                height: '100vh',
                marginTop: '80px',
                borderRadius: '8px'
              }}
            >
              <Nav className='d-flex flex-column px-5'>
                <AdminSidebar />
              </Nav>
            </Navbar>
          </Col>
          <Col sm={12} md={8} lg={10}>
            <main>
              <Outlet />
            </main>
          </Col>
        </Row>
      </Container>
      <Footer />
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default AdminDashboard;
