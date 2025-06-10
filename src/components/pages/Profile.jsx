// ProfilePage.jsx
import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaCalendarAlt, FaIdCard, FaRegBuilding, FaRegClock } from 'react-icons/fa';
import PROFILE from '../../assets/profile.jpg'
import Navbar from './Navbar';
import Footer from './Footer';

const ProfilePage = () => {
  return (
    <>
    <Navbar/>
    <Container className="py-5" style={{marginTop:'80px'}}>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow rounded-4 border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <img
                  src={PROFILE}
                  alt="Profile"
                  className="rounded-circle border border-3"
                  style={{ width: 120, height: 120, objectFit: 'cover' }}
                />
                <h4 className="mt-3 text-primary">Williams Chandler</h4>
                <p className="text-muted mb-0">Checking Account</p>
              </div>
              <hr />
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center">
                  <FaIdCard className="me-3 text-secondary" />
                  <strong>Account No:</strong>
                  <span className="ms-auto text-muted">8632107640</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaEnvelope className="me-3 text-secondary" />
                  <strong>Email:</strong>
                  <span className="ms-auto text-muted">willchand@gmail.com</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaCalendarAlt className="me-3 text-secondary" />
                  <strong>Date of Birth:</strong>
                  <span className="ms-auto text-muted">23-08-1970</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaRegClock className="me-3 text-secondary" />
                  <strong>Created:</strong>
                  <span className="ms-auto text-muted">23-09-2021</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  );
};

export default ProfilePage;

// Usage Example:
// <ProfilePage profile={{
//   profilePicture: 'https://i.pravatar.cc/150?img=3',
//   fullName: 'Jane Doe',
//   accountType: 'Savings',
//   accountNumber: '1234567890',
//   email: 'jane@example.com',
//   dob: '1990-04-12',
//   createdAt: '2023-01-20T15:30:00Z'
// }} />
