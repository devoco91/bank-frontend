import React, { useState, useEffect } from "react";
import { History } from "lucide-react";

const API = 'https://backend-dry-glade-5837.fly.dev';
// const API = 'http://localhost:3000';

export default function HistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const authHeaders = { Authorization: `Bearer ${token}` };

  const fetchTransactions = async () => {
    if (!token) {
      setError("Not authorized. Please log in.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API}/transactions`, {
        headers: authHeaders,
        credentials: "include"
      });
      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized. Please log in again.");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      setError("Failed to load transactions.");
      console.error("Failed to load transactions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <div className="p-4">Loading transactions...</div>;

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4 d-flex align-items-center">
        <History className="me-2 text-warning" /> Transaction History
      </h5>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-bordered bg-white">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx, idx) => (
                <tr key={tx._id}>
                  <td>{idx + 1}</td>
                  <td>{new Date(tx.date).toLocaleString()}</td>
                  <td>${Number(tx.amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td>
                    <span className={`badge ${tx.type === 'credit' ? 'bg-success' : 'bg-danger'}`}>{tx.type}</span>
                  </td>
                  <td><span className="badge bg-success">{tx.status}</span></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
