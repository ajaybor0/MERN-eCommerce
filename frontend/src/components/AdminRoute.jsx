import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AdminRoute = () => {
  const { userInfo } = useSelector(state => state.auth);
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/admin/login' replace />
  );
};

export default AdminRoute;
