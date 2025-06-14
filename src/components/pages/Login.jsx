// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreditCard, KeyRound, X } from "lucide-react";
import backgroundImg from "../../assets/sky.jpeg";

const API = 'https://backend-dry-glade-5837.fly.dev';
// const API = 'http://localhost:3000';


export default function Login() {
  const [accountNo, setAccountNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!accountNo || !password) {
      console.warn("Login attempt with empty fields");
      return setError("Please fill in all fields");
    }

    try {
      setLoading(true);
      console.log("Sending login request...", { accountNo, password });

      const res = await fetch(`${API}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ accountNo, password }),
      });

      const data = await res.json();
      console.log("Login response status:", res.status);
      console.log("Login response data:", data);

      if (res.ok && data.token) {
        console.log("Login successful, saving token and navigating to /account");
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          navigate("/account");
        }, 100);
      } else {
        console.warn("Login failed:", data.error || "Invalid credentials");
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      const msg = err?.message || "Something went wrong";
      console.error("Login error:", msg, err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setError("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-vh-100 position-relative"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#000"
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}></div>

      <div className="d-flex justify-content-center align-items-center h-100 w-100 position-relative" style={{ zIndex: 1, padding: "1rem" }}>
        <div className="bg-white p-4 rounded shadow-sm text-dark w-100" style={{ maxWidth: "400px", marginTop:'200px' }}>
          <h4 className="text-center fw-bold mb-2">Welcome Guest!</h4>
          <p className="text-center text-muted small mb-3">Sign in with your credentials</p>

          <div className="mb-2 d-flex align-items-center bg-light rounded px-2 py-1">
            <CreditCard className="me-2 text-muted" size={16} />
            <input
              type="text"
              className="form-control form-control-sm border-0 bg-transparent"
              placeholder="Account No"
              value={accountNo}
              onChange={e => setAccountNo(e.target.value)}
            />
          </div>

          <div className="mb-2 d-flex align-items-center bg-light rounded px-2 py-1">
            <KeyRound className="me-2 text-muted" size={16} />
            <input
              type="password"
              className="form-control form-control-sm border-0 bg-transparent"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="form-check my-3">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
          </div>

          <button
            className="btn btn-sm btn-primary w-100 shadow-sm"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="d-flex flex-column flex-sm-row justify-content-between mt-4 px-1 small gap-2">
            <button className="btn btn-link btn-sm p-0 text-decoration-none" onClick={() => navigate("/settings")}>Forgot password?</button>
            <button className="btn btn-link btn-sm p-0 text-decoration-none" onClick={() => navigate("/account")}>Create new account</button>
          </div>
        </div>
      </div>

      {error && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center">
              <div className="modal-body py-5">
                <div className="mb-3">
                  <X size={48} color="#dc3545" />
                </div>
                <h5 className="mb-3">Something Went Wrong</h5>
                <p className="text-muted">{error}</p>
                <button className="btn btn-outline-primary" onClick={closeModal}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
