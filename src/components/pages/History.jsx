// HistoryPage.jsx - fetch and show latest transactions
import React, { useState, useEffect } from "react";
import { History } from "lucide-react";

const API = 'https://backend-dry-glade-5837.fly.dev';

export default function HistoryPage() {
  const [transactions, setTransactions] = useState([]);

  const token = localStorage.getItem("token");
  const authHeaders = { Authorization: `Bearer ${token}` };

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${API}/transactions`, { headers: authHeaders });
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to load transactions", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);


   useEffect(()=>{
      window.scrollTo(0,0)
    })

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4 d-flex align-items-center">
        <History className="me-2 text-warning" /> Transaction History
      </h5>
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
                  <td>${tx.amount}</td>
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
