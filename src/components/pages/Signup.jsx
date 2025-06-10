// File: src/components/RegisterForm.jsx
import React, { useState,useEffect } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaCity, FaGlobe, FaFlag, FaHashtag, FaIdCard, FaVenusMars, FaBuilding, FaCheckCircle } from 'react-icons/fa';
import skyImage from '../../assets/sky.jpeg';
import Navbar from './Navbar';
import Footer from './Footer';
import './sign.css'

const Signup = () => {

     useEffect(()=>{
        window.scrollTo(0,0)
      })

  const inputStyle = { fontSize: '12px' };
  const [agreed, setAgreed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert('You must agree to the terms and conditions before submitting.');
      return;
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    navigate('/login');
  };

  return (
    <div style={{
      backgroundImage: `url(${skyImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      paddingTop: '50px'
    }}>
      <Navbar />
      <Container className='sign'>
        <h5 className="text-center mb-3 text-light">Welcome Dear Customer!</h5>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={5}>
            <div className="bg-light p-4 rounded shadow-sm">
              <p className="text-center text-muted" style={{ fontSize: '12px' }}>Fill in your necessary credentials and signup</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <FaUser className="me-2 text-muted" />
                  <Form.Control style={inputStyle} placeholder="First Name" />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <FaUser className="me-2 text-muted" />
                  <Form.Control style={inputStyle} placeholder="Last Name" />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <FaEnvelope className="me-2 text-muted" />
                  <Form.Control style={inputStyle} type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <FaLock className="me-2 text-muted" />
                  <Form.Control style={inputStyle} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <FaLock className="me-2 text-muted" />
                  <Form.Control style={inputStyle} type="password" placeholder="Confirm Password" />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <FaIdCard className="me-2 text-muted" />
                  <Form.Control style={inputStyle} placeholder="Account PIN" />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <FaIdCard className="me-2 text-muted" />
                  <Form.Control style={inputStyle} placeholder="Confirm Account PIN" />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <FaPhone className="me-2 text-muted" />
                  <Form.Control style={inputStyle} placeholder="Phone Number" />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <FaCalendarAlt className="me-2 text-muted" />
                  <Form.Control style={inputStyle} placeholder="Date Of Birth E.g DD/MM/YY" />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <FaVenusMars className="me-2 text-muted" />
                  <Form.Select style={inputStyle}>
                    <option>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <FaBuilding className="me-2 text-muted" />
                  <Form.Select style={inputStyle}>
                    <option>Account Type</option>
                    <option>Savings</option>
                    <option>Current</option>
                    <option>Checking</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <FaMapMarkerAlt className="me-2 text-muted" />
                  <Form.Control style={inputStyle} placeholder="Address" />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <FaCity className="me-2 text-muted" />
                  <Form.Control style={inputStyle} placeholder="City" />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <FaFlag className="me-2 text-muted" />
                  <Form.Control style={inputStyle} placeholder="State" />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <FaGlobe className="me-2 text-muted" />
                  <Form.Control style={inputStyle} placeholder="Country" />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <FaHashtag className="me-2 text-muted" />
                  <Form.Control style={inputStyle} placeholder="Zip Code" />
                </Form.Group>
                <Form.Group className="mb-3 form-check">
                  <Form.Check
                    type="checkbox"
                    onChange={(e) => setAgreed(e.target.checked)}
                    label={<span style={{ fontSize: '12px' }}>By creating an account, you agree with the <a href="/terms" style={{ textDecoration: 'none', color: 'blue' }}>terms and conditions</a></span>}
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" type="submit">Register</Button>
                </div>
              </Form>
              <div className="text-center mt-3">
                <small className="text-muted">Already a customer?, <a href="/login" style={{ textDecoration: 'none', color: 'blue' }}>Login</a></small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body className="text-center">
          <FaCheckCircle size={50} className="text-success mb-3" />
          <h5>Registration Successful, Kindly<br />Check Email For Login Details</h5>
          <Button variant="primary" className="mt-3" onClick={handleClose}>OK</Button>
        </Modal.Body>
      </Modal>

      <Footer />
    </div>
  );
};

export default Signup;
