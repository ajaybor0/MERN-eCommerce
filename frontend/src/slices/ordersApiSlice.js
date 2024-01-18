import { ORDERS_URL, RAZORPAY_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: order => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order }
      }),
      invalidatesTags: ['Order']
    }),
    getOrderDetails: builder.query({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}`
      }),
      providesTags: ['Order']
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/my-orders`
      }),
      providesTags: ['Order']
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { ...details }
      }),
      invalidatesTags: ['Order']
    }),
    updateDeliver: builder.mutation({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT'
      }),
      invalidatesTags: ['Order']
    }),
    getRazorpayApiKey: builder.query({
      query: () => ({
        url: `${RAZORPAY_URL}/razorpay/config`
      }),
      providesTags: ['Order']
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL
      }),
      providesTags: ['Order']
    })
  })
});

export const {
  useGetOrderDetailsQuery,
  useCreateOrderMutation,
  usePayOrderMutation,
  useUpdateDeliverMutation,
  useGetRazorpayApiKeyQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery
} = ordersApiSlice;
