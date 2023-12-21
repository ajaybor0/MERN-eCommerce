import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import ProductPage from '../pages/ProductPage';
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        path: '/',
        element: <HomePage />
      },
      {
        path: '/product/:productId',
        element: <ProductPage />
      },
      {
        path: '/cart',
        element: <CartPage />
      }
    ]
  }
]);
const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
