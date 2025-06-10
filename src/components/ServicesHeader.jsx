// File: src/components/ContactHeader.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ServicesHeader = () => {
  return (
    <div style={{
      background: 'linear-gradient(90deg, #5533ff 0%, #4a00e0 100%)',
      padding: '80px 0',
      textAlign: 'center',
      color: '#fff'
    }}>
      <Container>
        <h4 style={{ fontWeight: '600', fontSize: '1.5rem', marginBottom: '10px' }}>Our Services</h4>
        <div style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>
          <span style={{ marginRight: '10px',fontSize:'7px' }}>HOME</span>
          <span style={{ color: '#ccc' }}>|</span>
          <span style={{ marginLeft: '10px' ,fontSize:'7px'}}>SERVICES</span>
        </div>
      </Container>
    </div>
  );
};

export default ServicesHeader;
