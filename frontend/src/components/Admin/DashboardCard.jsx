import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const DashboardCard = ({ title, icon, value, bgColor }) => {
  return (
    <Card className={`mb-3 p-3 rounded ${bgColor} text-light`}>
      <Row className='align-items-center '>
        <Col xs={4}>{icon}</Col>
        <Col xs={8}>
          <Card.Title>{title}</Card.Title>
          <Card.Title>
            <strong>{value}</strong>
          </Card.Title>
        </Col>
      </Row>
    </Card>
  );
};

export default DashboardCard;
