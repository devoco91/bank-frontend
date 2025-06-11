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

const API = "https://backend-dry-glade-5837.fly.dev";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const authHeaders = { Authorization: `Bearer ${token}` };

  const fetchDashboard = async () => {
    if (!token) return navigate("/login");
    try {
      setLoading(true);
     const res = await fetch(`${API}/user/dashboard`, {
  method: "GET",
  headers: authHeaders,
  credentials: "include" // ✅ ensures cross-domain cookies or sessions work
});
      if (!res.ok) return navigate("/login");
      const data = await res.json();
      setUser(data);
      setTransactions((data.transactions || []).slice(0, 10));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "dashboardRefresh") {
        fetchDashboard();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    {
      label: "ACCOUNT BALANCE",
      value: `$${user?.totalAmount?.toLocaleString()}`,
      icon: <DollarSign size={18} color="white" />,
      bg: "#EA5455",
    },
    {
      label: "ACCOUNT TYPE",
      value: user?.accountType,
      icon: <MonitorSmartphone size={18} color="white" />,
      bg: "#FF9F43",
    },
    {
      label: "TOTAL TRANSACTIONS",
      value: user?.totalTransactions,
      icon: <RotateCcw size={18} color="white" />,
      bg: "#28C76F",
    },
    {
      label: "ACCOUNT NO.",
      value: user?.accountNumber,
      icon: <CreditCard size={18} color="white" />,
      bg: "#7367F0",
    },
  ];

  return (
    <div className="d-flex flex-column flex-md-row" style={{ minHeight: "100vh", backgroundColor: "#f5f7fb" }}>
      <div
        className="bg-white border-end sidebar position-relative z-1"
        style={{
          width: sidebarOpen ? 200 : 60,
          overflow: "hidden",
          padding: sidebarOpen ? "20px 10px" : "10px 5px",
          transition: "all 0.3s ease",
        }}
      >
        <div className="position-relative mb-4 text-center">
          {sidebarOpen && (
            <Link to="/">
              <img src={LOGO} alt="Logo" className="img-fluid" style={{ maxWidth: "120px" }} />
            </Link>
          )}
        </div>

        {sidebarOpen && (
          <>
            <div className="text-center mb-4">
              <img
                src=""
                alt="Profile"
                className="rounded-circle border"
                width="70"
                height="70"
                style={{ objectFit: "cover" }}
              />
              <div className="mt-2 small text-muted">{user?.username}</div>
            </div>
            <ul className="nav flex-column fw-semibold fade-in">
              <li className="nav-item mb-3">
                <Link to="/account" className="nav-link d-flex align-items-center text-dark" style={{ fontSize: "12px" }}>
                  <LayoutDashboard color="#3e7bfa" size={18} className="me-2" /> Dashboard
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link to="/transfer" className="nav-link d-flex align-items-center text-dark" style={{ fontSize: "12px" }}>
                  <SendHorizontal color="#28c76f" size={18} className="me-2" /> Transfer
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link to="/history" className="nav-link d-flex align-items-center text-dark" style={{ fontSize: "12px" }}>
                  <History color="#ff9f43" size={18} className="me-2" /> History
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link to="/settings" className="nav-link d-flex align-items-center text-dark" style={{ fontSize: "12px" }}>
                  <Settings color="#7367f0" size={18} className="me-2" /> Settings
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>

      <div className="flex-grow-1 position-relative z-0 d-flex flex-column">
        <div className="p-3 p-md-4" style={{ backgroundColor: "#3e7bfa", color: "white" }}>
          <div className="d-flex justify-content-between align-items-center gap-2 mb-2 flex-wrap">
            <button
              className="btn btn-outline-light d-md-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            >
              <Menu size={20} />
            </button>

            <h5 className="fw-bold mb-0">My Dashboard</h5>

            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="me-2 d-none d-sm-inline" style={{ fontFamily: "cursive", fontSize: "12px" }}>
                  {user?.username || "User"}
                </span>
                <img
                  src=""
                  className="rounded-circle border profile-img"
                  width="40"
                  height="40"
                  alt="User"
                />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row g-3 g-md-4 p-3 p-md-4" style={{ backgroundColor: "#f0f4ff", color: "#333" }}>
          {loading ? (
            Array(4).fill(null).map((_, idx) => (
              <div className="col-6 col-md-3" key={idx}>
                <div className="card text-center shadow-sm h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center gap-2">
                    <div className="rounded-circle mb-1" style={{ backgroundColor: '#dee2e6', width: 35, height: 35 }} />
                    <div className="placeholder-glow w-75">
                      <span className="placeholder col-12 mb-1"></span>
                      <span className="placeholder col-8"></span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            stats.map((item, idx) => (
              <div className="col-6 col-md-3" key={idx}>
                <div className="card text-center shadow-sm h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center gap-2">
                    <div className="rounded-circle d-flex align-items-center justify-content-center mb-1" style={{ backgroundColor: item.bg, width: 35, height: 35 }}>
                      {item.icon}
                    </div>
                    <p className="text-muted small mb-1" style={{fontSize:'12px'}}>{item.label}</p>
                    <h6 className="text-dark stat-value mb-0">{item.value}</h6>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-2 px-md-4 pb-4">
          <h6 className="mb-3 fw-semibold">Last 10 Transaction History</h6>
          <div className="table-responsive">
            <table className="table table-bordered bg-white">
              <thead className="table-head">
                <tr>
                  <th style={{backgroundColor:'#d3d3d3',fontSize:'9px'}}>#</th>
                  <th style={{backgroundColor:'#d3d3d3',fontSize:'9px'}}>REFERENCE</th>
                  <th style={{backgroundColor:'#d3d3d3',fontSize:'9px'}}>AMOUNT</th>
                  <th style={{backgroundColor:'#d3d3d3',fontSize:'9px'}}>TYPE</th>
                  <th style={{backgroundColor:'#d3d3d3',fontSize:'9px'}}>DESC</th>
                  <th style={{backgroundColor:'#d3d3d3',fontSize:'9px'}}>DATE</th>
                  <th style={{backgroundColor:'#d3d3d3',fontSize:'9px'}}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(transactions) && transactions.length > 0 ? (
                  transactions.map((txn, index) => (
                    <tr key={txn._id}>
                      <td>{index + 1}</td>
                      <td>{txn.reference}</td>
                      <td>${txn.amount}</td>
                      <td><span className={`badge ${txn.type === 'credit' ? 'bg-success' : 'bg-danger'}`}>{txn.type}</span></td>
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

        <div className="d-flex flex-wrap justify-content-around border-top p-3 bg-white w-100">
          <Link to="/" className="btn text-center flex-fill" style={{ fontSize:'12px'}}>
            <Home size={20} color="#3e7bfa" /> <br className="d-none d-sm-block" /> Home
          </Link>
          <Link to="/investment" className="btn text-center flex-fill" style={{ fontSize:'12px'}}>
            <TrendingUp size={20} color="#28c76f" /> <br className="d-none d-sm-block" /> Investment
          </Link>
          <Link to="/send" className="btn text-center flex-fill" style={{ fontSize:'12px'}}>
            <Send size={20} color="#ff9f43" /> <br className="d-none d-sm-block" /> Send
          </Link>
          <Link to="/card" className="btn text-center flex-fill" style={{ fontSize:'12px'}}>
            <CreditCard size={20} color="#7367f0" /> <br className="d-none d-sm-block" /> Card
          </Link>
        </div>
      </div>
    </div>
  );
}
