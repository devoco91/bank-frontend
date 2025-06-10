import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ABOUT1 from '../../assets/about-11.png';
import ABOUT2 from '../../assets/about-12.png';
import ABOUT3 from '../../assets/dotted1.svg';
import './deposit.css'

const Deposit = () => {
  return (
    <div className="bg-light py-5 position-relative overflow-hidden">
      <img
        src={ABOUT3}
        alt="Decorative dots or illustration"
        className="position-absolute  d-none d-md-block"
        style={{ bottom: "40px", left: "-30px", maxWidth: "250px", zIndex: 0 }}
      />

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center">
          <div className="col-12 col-md-6 position-relative mb-4 mb-md-0">
            <img
              src={ABOUT1}
              className="img-fluid rounded w-100"
              alt="Man with tablet"
              style={{ height: "auto" }}
            />
          <div className="position-absolute shadow p-3 " style={{ top: '-40px', left: '10px', zIndex: 10 }}>
             <img
                src={ABOUT2}
                alt="Leonard Boyd"
                className="rounded-circle me-3 alert-animate"
                style={{ width: "300px", height: "200px" }}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <h6 className="text-primary">Reliable Online Payment Platform</h6>
            <h5 className="mb-3">
              Transfer and Deposit your money anytime, anywhere in the world
            </h5>
            <p className="text-muted small">
              Our Money Transfer service allows customers to transfer funds to any
              beneficiary in another country in a secure, reliable and efficient way.
            </p>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-success me-2 fs-5"></i>
                <div>
                  <strong>Trusted And Reliable</strong>
                  <p className="mb-0 text-muted small">
                    We are a trusted and reliable company with over 6 years of experience.
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-success me-2 fs-5"></i>
                <div>
                  <strong>Brings More Transparency And Speed</strong>
                  <p className="mb-0 text-muted small">
                    Our system are built using blockchain technology, 100% Transparency System Where
                    both sender and receiver can see transactions details.
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-success me-2 fs-5"></i>
                <div>
                  <strong>Special For Multiple Use Capabilities</strong>
                  <p className="mb-0 text-muted small">
                    Our system are scalable and efficiency for more capabilities usages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;





//  <div className="position-absolute shadow p-3 " style={{ top: '-40px', left: '10px', zIndex: 10 }}>
//               <img
//                 src={ABOUT2}
//                 alt="Leonard Boyd"
//                 className="rounded-circle me-3 alert-animate"
//                 style={{ width: "300px", height: "200px" }}
//               />
//             </div>