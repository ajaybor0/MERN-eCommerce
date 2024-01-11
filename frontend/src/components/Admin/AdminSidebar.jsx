import React from 'react';
import { Nav } from 'react-bootstrap';
import {
  FaCartShopping,
  FaCircleUser,
  FaGauge,
  FaPowerOff,
  FaTable,
  FaUserGroup,
  FaUsers
} from 'react-icons/fa6';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());

      navigate('/admin/login');
      toast.success('Logout successful');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      <LinkContainer to='/admin/dashboard'>
        <Nav.Link>
          <FaGauge style={{ marginRight: '5px' }} size={16} />
          Dashboard
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/admin/product-list'>
        <Nav.Link>
          <FaTable style={{ marginRight: '5px' }} size={16} />
          Products
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/admin/order-list'>
        <Nav.Link>
          <FaCartShopping style={{ marginRight: '5px' }} size={16} />
          Orders
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/admin/user-list'>
        <Nav.Link>
          <FaUsers style={{ marginRight: '5px' }} size={16} />
          Users
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/admin/admin-list'>
        <Nav.Link>
          <FaUserGroup style={{ marginRight: '5px' }} size={16} />
          Admins
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/admin/profile'>
        <Nav.Link>
          <FaCircleUser style={{ marginRight: '5px' }} size={16} />
          Profile
        </Nav.Link>
      </LinkContainer>
      <Nav.Link onClick={logoutHandler}>
        <FaPowerOff style={{ marginRight: '5px' }} size={16} />
        Logout
      </Nav.Link>
    </>
  );
};

export default Sidebar;
