// File: src/components/ContactForm.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactForm = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="py-5" style={{ backgroundColor: '#fff' }}>
      <Container>
        <div className="text-center mb-4">
          <p className="text-primary fw-bold mb-1" style={{ fontSize: '14px' }}>Contact Us</p>
          <h5 className="f" style={{ fontSize: '24px' }}>Contact With Us</h5>
        </div>

        <Form className="mx-auto" style={{ maxWidth: '700px' }} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6} className="mb-3 mb-md-0">
              <Form.Group>
                <Form.Label className="text-muted" style={{ fontSize: '14px' }}>Name</Form.Label>
                <Form.Control type="text" className="border-0 border-bottom border-dark rounded-0 shadow-none" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-muted" style={{ fontSize: '14px' }}>Email</Form.Label>
                <Form.Control type="email" className="border-0 border-bottom border-dark rounded-0 shadow-none" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="text-muted" style={{ fontSize: '14px' }}>Subject</Form.Label>
            <Form.Control type="text" className="border-0 border-bottom border-dark rounded-0 shadow-none" />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="text-muted" style={{ fontSize: '14px' }}>Message</Form.Label>
            <Form.Control as="textarea" rows={4} className="border-0 border-dark border-bottom rounded-0 shadow-none" />
          </Form.Group>

          <div className="text-center">
            <Button 
              type="submit" 
              className="px-4 py-2 border-0 rounded-pill"
              style={{ 
                background: 'linear-gradient(to right, #00c9a7, #5e60ce)', 
                fontSize: '13px', 
                fontWeight: '600' 
              }}
            >
              SEND MESSAGE
            </Button>
          </div>
        </Form>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Body className="text-center">
            <h5 className="mb-3">Message Sent Successfully</h5>
            <Button variant="primary" onClick={() => setShowModal(false)}>OK</Button>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default ContactForm;
