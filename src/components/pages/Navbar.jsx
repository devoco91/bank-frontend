import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



<style>{`
  .logo-hover:hover {
    filter: drop-shadow(0 0 8px #7367f0);
  }

  @media (max-width: 599px) {
    .custom-login-btn {
      display: block;
      width: 100%;
      margin-bottom: 0.5rem;
    }
    .custom-signup-btn {
      display: block;
      width: 100%;
    }
  }
`}</style>


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => {
      const mobile = window.innerWidth < 600;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={`navbar fixed-top shadow-sm px-3 px-lg-5 ${
        scrolled ? "bg-white py-2" : "bg-light py-3"
      }`}
      style={{
        backgroundColor: scrolled ? "#f8f9fa" : "#dce3f3",
        transition: "all 0.3s ease",
        borderBottom: scrolled ? "1px solid #ccc" : "none",
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap">
        <Link 
          className="navbar-brand fw-bold text-uppercase mb-0 logo-hover"
          to="/"
          style={{
            background: "linear-gradient(to right, #3e7bfa, #7367f0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "700",
            fontSize: "1.25rem",
            transition: "all 0.3s ease",
          }}
        >
          SKY WAVES FINANCIAL
        </Link>

        {isMobile && (
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        <div
          className={`${
            isMobile ? (menuOpen ? "d-block w-100 mt-2" : "d-none") : "d-flex"
          } justify-content-end align-items-center flex-grow-1`}
        >
          <ul
            className={`navbar-nav ms-auto mb-2 mb-lg-0 flex-row ${
              isMobile ? "flex-column" : ""
            }`}
          >
            <li className="nav-item px-2">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li className="nav-item px-2">
  <Link
    to="/login"
    className="btn btn-sm text-white custom-login-btn"
    style={{
      background: "linear-gradient(to right, #28c76f, #48dbfb)",
      border: "none",
    }}
  >
    LOG IN
  </Link>
</li>
<li className="nav-item px-2">
  <Link
    to="/sign"
    className="btn btn-sm text-white custom-signup-btn"
    style={{
      background: "linear-gradient(to right, #7367f0, #9b59b6)",
      border: "none",
    }}
  >
    SIGNUP
  </Link>
</li>

          </ul>
        </div>
      </div>

      {/* Glow animation CSS */}
      <style>{`
        .logo-hover:hover {
          filter: drop-shadow(0 0 8px #7367f0);
        }
      `}</style>
    </nav>
  );
}
