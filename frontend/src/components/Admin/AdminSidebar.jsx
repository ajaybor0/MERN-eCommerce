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
      <LinkContainer to='/admin/dashboard' className='mb-2'>
        <Nav.Link>
          <strong>
            <FaGauge
              style={{ marginRight: '10px', marginBottom: '3px' }}
              size={16}
            />
            Dashboard
          </strong>
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/admin/product-list' className='mb-2'>
        <Nav.Link>
          <strong>
            <FaTable
              style={{ marginRight: '10px', marginBottom: '3px' }}
              size={16}
            />
            Products
          </strong>
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/admin/order-list' className='mb-2'>
        <Nav.Link>
          <strong>
            <FaCartShopping
              style={{ marginRight: '10px', marginBottom: '3px' }}
              size={16}
            />
            Orders
          </strong>
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/admin/user-list' className='mb-2'>
        <Nav.Link>
          <strong>
            <FaUsers
              style={{ marginRight: '10px', marginBottom: '3px' }}
              size={16}
            />
            Users
          </strong>
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/admin/admin-list' className='mb-2'>
        <Nav.Link>
          <strong>
            <FaUserGroup
              style={{ marginRight: '10px', marginBottom: '3px' }}
              size={16}
            />
            Admins
          </strong>
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/admin/profile' className='mb-2'>
        <Nav.Link>
          <strong>
            <FaCircleUser
              style={{ marginRight: '10px', marginBottom: '3px' }}
              size={16}
            />
            Profile
          </strong>
        </Nav.Link>
      </LinkContainer>
      <Nav.Link onClick={logoutHandler}>
        <strong>
          <FaPowerOff
            style={{ marginRight: '10px', marginBottom: '3px' }}
            size={16}
          />
          Logout
        </strong>
      </Nav.Link>
    </>
  );
};

export default Sidebar;
