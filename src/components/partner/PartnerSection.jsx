import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import liva from "../../assets/1.png";
import kanba from "../../assets/2.png";
import amara from "../../assets/3.png";
import aven from "../../assets/4.png";


const partners = [
  { name: "liva", logo: liva },
  { name: "kanba", logo: kanba },
  { name: "amara", logo: amara },
  { name: "aven", logo: aven },
];

export default function PartnerSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      delay: 100,
      offset: 120,
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <div className="position-relative text-center py-5 bg-white overflow-hidden">
      
      <h5
        className="text-primary fw-bold"
        style={{
          background: "linear-gradient(to right, #00c6ff, #0072ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        data-aos="fade-up"
      >
        Our Main Partners
      </h5>
      <h2 className="fw-bold mb-5" data-aos="fade-up" data-aos-delay="150">
        Our Powerful Partners
      </h2>
      <div className="container">
        <div className="row justify-content-center">
          {partners.map((p, idx) => (
            <div
              key={idx}
              className="col-6 col-md-3 d-flex justify-content-center mb-4"
              data-aos="zoom-in-up"
              data-aos-delay={`${idx * 150}`}
            >
              <div
                className="d-flex align-items-center justify-content-center border bg-white partner-logo"
                style={{ width: 200, height: 100, borderColor: "#ddd" }}
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="img-fluid"
                  style={{
                    maxHeight: "60px",
                    filter: "grayscale(100%)",
                    opacity: 0.5,
                    transition: "all 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = "grayscale(0%)";
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "grayscale(100%)";
                    e.currentTarget.style.opacity = "0.5";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
