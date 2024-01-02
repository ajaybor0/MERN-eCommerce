import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL
      })
    }),
    getProductDetails: builder.query({
      query: productId => ({
        url: `${PRODUCTS_URL}/${productId}`
      })
    })
  })
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productApiSlice;
