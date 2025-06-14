// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const API = 'https://backend-dry-glade-5837.fly.dev';
// const API = 'http://localhost:3000';
;

export default function LoginPage() {
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
          console.log("Login successful, saving token and navigating to /dashboard");
          localStorage.setItem("token", data.token);
          setTimeout(() => {
            navigate("/dashboard");
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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <div className="card shadow p-4">
          <h2 className="text-center mb-4">Login</h2>

          <div className="mb-3">
            <label className="form-label">Account Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your account number"
              value={accountNo}
              onChange={e => setAccountNo(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
