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
    <>
      <AdminHeader />
      <main className='py-3 position-relative'>
        <Container fluid>
          <Row>
            <Col md={3}>
              <Card
                className='d-none d-md-block bg-light'
                style={{ height: '80vh' }}
              >
                <Navbar>
                  <Nav className='d-flex flex-column '>
                    <AdminSidebar />
                  </Nav>
                </Navbar>
              </Card>
            </Col>
            <Col md={9}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default AdminDashboard;
