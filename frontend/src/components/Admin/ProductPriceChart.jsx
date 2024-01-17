import React from 'react';
import { Card } from 'react-bootstrap';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const ProductPriceChart = ({ products }) => {
  return (
    <Card className='mb-3 py-3 px-2 rounded text-center'>
      <Card.Title>Product Price Chart</Card.Title>
      <ResponsiveContainer width='100%' height={350}>
        <AreaChart
          data={products}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type='monotone'
            dataKey='price'
            stroke='#54B4D3'
            fill='#0DCAF0'
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ProductPriceChart;
