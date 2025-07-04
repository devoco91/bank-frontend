// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LOGO from "../../assets/logo.png";
import PROFILE from "../../assets/profile.jpg";
import {
  Home,
  TrendingUp,
  Send,
  CreditCard,
  LayoutDashboard,
  SendHorizontal,
  History,
  Settings,
  Menu,
  DollarSign,
  MonitorSmartphone,
  RotateCcw,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Dashboard.css";

const API = 'https://backend-dry-glade-5837.fly.dev';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsUser, setStatsUser] = useState(null);
  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API}/user/dashboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (!data.accountNo) {
        localStorage.removeItem("token");
        return navigate("/login");
      }
      setUser(data);
      const sortedTxns = (data.transactions || []).sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(sortedTxns.slice(0, 10));
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const res = await fetch(`${API}/user/dashboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setStatsUser(data);
    } catch (_) {
      setStatsUser(null);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchStats();
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (!user) return <div className="container py-5">No user data available.</div>;

  return (
    <div className="d-flex flex-column flex-md-row" style={{ minHeight: "100vh", backgroundColor: "#f5f7fb" }}>
      {sidebarOpen && <div className="sidebar-overlay active" onClick={() => setSidebarOpen(false)} />}
      <div className={`sidebar-container ${sidebarOpen ? 'open' : ''} d-md-block`}>
        <button className="sidebar-close-btn d-md-none" onClick={() => setSidebarOpen(false)}>
          <span className="fs-4">&times;</span>
        </button>
        <div className="text-center mb-4">
         <Link to='/'>
          <img src={LOGO} alt="Logo" className="img-fluid mb-3" style={{ maxWidth: "100px" }} />
          </Link>
          
          <br />
          <Link to='/profile'>
          <img src='' alt="Profile" className="rounded-circle border shadow" width="80" height="80" style={{ objectFit: "cover" }} />
          </Link>
        </div>
        <ul className="nav flex-column fw-semibold">
          <li className="nav-item mb-3">
            <Link to="/account" className="nav-link text-dark d-flex align-items-center" onClick={() => setSidebarOpen(false)}>
              <LayoutDashboard size={18} className="me-2 text-primary" /> Dashboard
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link to="/transfer" className="nav-link text-dark d-flex align-items-center" onClick={() => setSidebarOpen(false)}>
              <SendHorizontal size={18} className="me-2 text-warning" /> Transfer
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link to="/history" className="nav-link text-dark d-flex align-items-center" onClick={() => setSidebarOpen(false)}>
              <History size={18} className="me-2 text-success" /> History
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link to="/settings" className="nav-link text-dark d-flex align-items-center" onClick={() => setSidebarOpen(false)}>
              <Settings size={18} className="me-2 text-danger" /> Settings
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-grow-1 position-relative z-0 d-flex flex-column">
<div className="p-3 p-md-4" style={{ backgroundColor: "#3e7bfa", color: "white", height: '170px' }}>
  <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap">
    <button className="btn btn-outline-light d-md-none" onClick={() => setSidebarOpen(true)}>
      <Menu size={20} />
    </button>
    <div className="dropdown ms-auto">
      <button className="btn btn-outline-light dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <span className="me-2 d-none d-sm-inline" style={{ fontFamily: "cursive", fontSize: "17px" }}>Williams Chandler</span>
        <img src='' className="rounded-circle border profile-img" width="40" height="40" alt="User" />
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
        <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
      </ul>
    </div>
  </div>
  {!sidebarOpen && (
    <div className="mt-3 ps-3" style={{ animation: 'slideInLeft 0.5s ease-out' }}>
      <h3 className="fw-bold mb-0 px-3 py-1 rounded text-white" style={{ display: 'inline-block' }}>My Dashboard</h3>
    </div>
  )}
</div>

<style>
  {`
    @keyframes slideInLeft {
      0% { opacity: 0; transform: translateX(-30px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @media (max-width: 768px) {
      .dashboard-card-col {
        flex: 0 0 100%;
        max-width: 100%;
      }
    }
    @media (min-width: 769px) and (max-width: 991px) {
      .dashboard-card-col {
        flex: 0 0 50%;
        max-width: 50%;
      }
    }
    @media (min-width: 992px) {
      .dashboard-card-col {
        flex: 0 0 25%;
        max-width: 25%;
      }
    }
    @media (max-width: 576px) {
      .dashboard-card p {
        font-size: 13px !important;
      }
      .dashboard-card h6 {
        font-size: 14px;
      }
    }
  `}
</style>

{/* Stat card section (responsive stack/grid) */}
<div className="row g-3 g-md-4 p-3 p-md-4 bg-light">
  {(statsLoading || !statsUser ? Array.from({ length: 4 }) : [
    {
      label: "ACCOUNT BALANCE",
      value: `$${statsUser?.totalAmount?.toLocaleString() || "0.00"}`,
      icon: <DollarSign size={16} color="white" />,
      bg: "#EA5455",
    },
    {
      label: "ACCOUNT TYPE",
      value: statsUser?.accountType || "N/A",
      icon: <MonitorSmartphone size={16} color="white" />,
      bg: "#FF9F43",
    },
    {
      label: "TOTAL TRANSACTIONS",
      value: statsUser?.totalTransactions ?? 0,
      icon: <RotateCcw size={16} color="white" />,
      bg: "#28C76F",
    },
    {
      label: "ACCOUNT NO.",
      value: statsUser?.accountNumber || "N/A",
      icon: <CreditCard size={16} color="white" />,
      bg: "#7367F0",
    }
  ]).map((item, idx) => (
    <div className="col dashboard-card-col" key={idx}>
      <div className="card text-center shadow-sm h-100 dashboard-card">
        {statsLoading || !statsUser ? (
          <div className="card-body d-flex flex-column justify-content-center align-items-center gap-2">
            <div className="skeleton rounded-circle mb-2" style={{ width: 30, height: 30 }}></div>
            <div className="skeleton w-75 mb-2" style={{ height: 10 }}></div>
            <div className="skeleton w-50" style={{ height: 15 }}></div>
          </div>
        ) : (
          <div className="card-body d-flex flex-column justify-content-center align-items-center gap-2">
            <div className="rounded-circle d-flex align-items-center justify-content-center mb-1" style={{ backgroundColor: item.bg, width: 30, height: 30 }}>
              {item.icon}
            </div>
            <p className="text-muted small mb-1" style={{ fontSize: '15px' }}>{item.label}</p>
            <h6 className="text-dark mb-0">{item.value}</h6>
          </div>
        )}
      </div>
    </div>
  ))}
</div>


{/* Scrollable transaction table */}
<div className="px-3 px-md-4 pb-4 overflow-auto" style={{ maxHeight: '500px', marginTop: '1rem' }}>
  <h4 className="mb-3 fw-semibold mt-3">Last 10 Transaction History</h4>
  <div className="table-responsive">
    <table className="table table-bordered bg-white">
      <thead className="table-head">
        <tr>
          <th style={{backgroundColor:'#d4d4d4'}}>#</th>
          <th style={{backgroundColor:'#d4d4d4'}}>REFERENCE</th>
          <th style={{backgroundColor:'#d4d4d4'}}>AMOUNT</th>
          <th style={{backgroundColor:'#d4d4d4'}}>TYPE</th>
          <th style={{backgroundColor:'#d4d4d4'}}>DESC</th>
          <th style={{backgroundColor:'#d4d4d4'}}>DATE</th>
          <th style={{backgroundColor:'#d4d4d4'}}>STATUS</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(transactions) && transactions.length > 0 ? (
          transactions.map((txn, index) => (
            <tr key={txn._id}>
              <td>{index + 1}</td>
              <td>{txn.reference}</td>
              <td>${txn.amount}</td>
              <td>
                <span className={`badge ${txn.type === "credit" ? "bg-success" : "bg-danger"}`}>{txn.type}</span>
              </td>
              <td>{txn.description}</td>
              <td>{new Date(txn.date).toLocaleString()}</td>
              <td><span className="badge bg-success">{txn.status}</span></td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">No transactions found</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

{/* Footer navigation */}
<div className="d-flex justify-content-between border-top p-3 bg-white w-100 flex-nowrap overflow-auto">
  <Link to="/" className="btn text-center flex-fill" style={{ fontSize: '17px', minWidth: '25%' }}>
    <Home size={20} color="#3e7bfa" /> <div>Home</div>
  </Link>
  <Link to="/investment" className="btn text-center flex-fill" style={{ fontSize: '17px', minWidth: '25%' }}>
    <TrendingUp size={20} color="#28c76f" /> <div>Investment</div>
  </Link>
  <Link to="/send" className="btn text-center flex-fill" style={{ fontSize: '17px', minWidth: '25%' }}>
    <Send size={20} color="#ff9f43" /> <div>Send</div>
  </Link>
  <Link to="/card" className="btn text-center flex-fill" style={{ fontSize: '17px', minWidth: '25%' }}>
    <CreditCard size={20} color="#7367f0" /> <div>Card</div>
  </Link>
</div>

      </div>
    </div>
  );
}
