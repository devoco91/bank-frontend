// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const API = 'https://backend-dry-glade-5837.fly.dev';

export default function LoginPage() {
  const [accountNo, setAccountNo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    if (!accountNo || !password) return alert("Please fill in all fields");

    try {
      setLoading(true);
      const res = await fetch(`${API}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ accountNo, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // ✅ Save token for future requests
        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        // ✅ Navigate to dashboard after login
        navigate('/dashboard');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

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
            onClick={login}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
