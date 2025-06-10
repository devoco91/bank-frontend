import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MAP from '../../assets/map.png';
import './growth.css';

const GlobalGrowthSection = () => {
  return (
    <section className="py-5 text-center bg-white growth">
      <div className="container">
        <h6 className="fw-bold" style={{ background: "linear-gradient(to right, #00d4ff, #7a5cff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          OUR EXPECTED GROWTH
        </h6>
        <h4 className="text-dark mb-3 fw-bold">Our Global Growth</h4>
        <p className="text-muted mx-auto mb-5" style={{ maxWidth: "600px" }}>
          During Our Years Of Service And Till Date, We Have Grown Into A Huge System.
        </p>

        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-3 mb-4">
            <div className="p-4 rounded-4 shadow mb-4" style={{ background: "linear-gradient(to right, #00d4ff, #7a5cff)", color: "white" }}>
              <h6>Fully Encrypted</h6>
              <p className="mb-0">Transaction are performed in a secure way that cannot be breach.</p>
            </div>
            <div className="p-4 rounded-4 shadow" style={{ background: "linear-gradient(to right, #00d4ff, #7a5cff)", color: "white" }}>
              <h6>Safe and Secure</h6>
              <p className="mb-0">No one can access your transaction history except you.</p>
            </div>
          </div>

          <div className="col-12 col-md-6 mb-4">
            <img
              src={MAP}
              alt="World Map"
              className="img-fluid my-4"
              style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }}
            />
          </div>

          <div className="col-12 col-md-3 mb-4">
            <div className="p-4 rounded-4 shadow mb-4" style={{ background: "linear-gradient(to right, #00d4ff, #7a5cff)", color: "white" }}>
              <h6>24/7 Services</h6>
              <p className="mb-0">We are always open and available at anytime you wish to use the system.</p>
            </div>
            <div className="p-4 rounded-4 shadow" style={{ background: "linear-gradient(to right, #00d4ff, #7a5cff)", color: "white" }}>
              <h6>Instant Transfer</h6>
              <p className="mb-0">No delay on your transactions. Fastest delivery ensured.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalGrowthSection;
