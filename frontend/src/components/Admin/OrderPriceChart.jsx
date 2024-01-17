import React from 'react';
import { Card } from 'react-bootstrap';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const OrderPriceChart = ({ orders }) => {
  return (
    <Card className='mb-3 py-3 px-2 rounded text-center'>
      <Card.Title>Order Price Chart</Card.Title>
      <ResponsiveContainer width='100%' height={350}>
        <BarChart
          data={orders}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            type='monotone'
            dataKey='itemsPrice'
            fill='#7AC6E1'
            activeDot={{ r: 8 }}
          />
          <Bar
            type='monotone'
            dataKey='taxPrice'
            fill='#EB6F80'
            activeDot={{ r: 8 }}
          />
          <Bar
            type='monotone'
            dataKey='totalPrice'
            fill='#FFD949'
            activeDot={{ r: 8 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default OrderPriceChart;
