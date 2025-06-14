import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = 'https://backend-dry-glade-5837.fly.dev';
// const API = 'http://localhost:3000';


export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ type: 'credit', amount: '', description: '', reference: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/auth');

    fetchDashboard(token);
    window.scrollTo(0, 0);
  }, [navigate]);

  const fetchDashboard = async (token) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/user/dashboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      const data = await res.json();
      console.log("Dashboard fetch status:", res.status);
      console.log("Fetched Dashboard data:", data);

      if (!res.ok || !data.accountNo) {
        localStorage.removeItem('token');
        return navigate('/auth');
      }

      setUser(data);
      setTransactions(Array.isArray(data.transactions) ? data.transactions.slice(0, 10) : []);
    } catch (e) {
      console.error('Dashboard fetch failed', e);
      localStorage.removeItem('token');
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  const createBalance = async () => {
    const amt = prompt('Enter initial balance:');
    if (!amt || isNaN(amt)) return alert('Invalid amount');
    try {
      await fetch(`${API}/user/total-amount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify({ totalAmount: Number(amt) }),
      });
      fetchDashboard(localStorage.getItem('token'));
    } catch (e) {
      alert('Failed to create balance');
      console.error(e);
    }
  };

  const updateTotal = async () => {
    const amt = prompt('Enter new total amount:', user.totalAmount);
    if (!amt || isNaN(amt)) return alert('Invalid amount');
    try {
      await fetch(`${API}/user/total-amount`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify({ totalAmount: Number(amt) }),
      });
      fetchDashboard(localStorage.getItem('token'));
    } catch (e) {
      alert('Failed to update balance');
      console.error(e);
    }
  };

  const deleteBalance = async () => {
    if (!window.confirm('Are you sure you want to reset the balance?')) return;
    try {
      await fetch(`${API}/user/total-amount`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      });
      fetchDashboard(localStorage.getItem('token'));
    } catch (e) {
      alert('Failed to delete balance');
      console.error(e);
    }
  };

  const startEdit = (txn) => {
    setIsEditing(true);
    setEditId(txn._id);
    setForm({
      type: txn.type,
      amount: txn.amount.toString(),
      description: txn.description || '',
      reference: txn.reference || '',
    });
  };

  const deleteTransaction = async (id) => {
    try {
      await fetch(`${API}/transactions/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      });
      fetchDashboard(localStorage.getItem('token'));
    } catch (e) {
      alert('Failed to delete transaction');
      console.error(e);
    }
  };

  const submitTransaction = async () => {
    const trimmedAmount = form.amount.trim();
    const trimmedReference = form.reference.trim();
    if (!trimmedAmount || !trimmedReference) return alert('Please fill required fields.');

    const amount = Number(trimmedAmount);
    if (isNaN(amount) || amount <= 0) return alert('Invalid amount');

    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      if (isEditing) {
        await fetch(`${API}/transactions/${editId}`, {
          method: 'PUT',
          headers,
          credentials: 'include',
          body: JSON.stringify({ ...form, amount }),
        });
      } else {
        await fetch(`${API}/transactions`, {
          method: 'POST',
          headers,
          credentials: 'include',
          body: JSON.stringify({ ...form, amount }),
        });
      }

      setForm({ type: 'credit', amount: '', description: '', reference: '' });
      setIsEditing(false);
      setEditId(null);
      fetchDashboard(token);
    } catch (e) {
      alert('Failed to submit transaction');
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container py-5">Loading dashboard...</div>;
  if (!user) return <div className="container py-5">No user data available.</div>;

  const {
    accountType,
    accountNumber,
    username,
    totalAmount,
    totalTransactions,
    accountNo,
  } = user;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4">Welcome, {accountNo || username}</h1>
        <button className="btn btn-outline-danger" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card p-3">Account Type: {accountType}</div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">Account Number: {accountNumber}</div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">Username: {username}</div>
        </div>
        <div className="col-md-6">
          <div className="card p-3">Balance: ${totalAmount?.toLocaleString()}</div>
        </div>
        <div className="col-md-6">
          <div className="card p-3">Total Transactions: {totalTransactions}</div>
        </div>
      </div>

      <div className="mb-4 d-flex flex-wrap gap-2">
        <button className="btn btn-primary" onClick={createBalance}>Create Balance</button>
        <button className="btn btn-secondary" onClick={updateTotal}>Update Balance</button>
        <button className="btn btn-danger" onClick={deleteBalance}>Delete Balance</button>
      </div>

      <div className="mb-5">
        <h5 className="mb-3">{isEditing ? 'Edit Transaction' : 'Add Transaction'}</h5>
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Amount"
              className="form-control"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Reference"
              className="form-control"
              value={form.reference}
              onChange={(e) => setForm({ ...form, reference: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Description"
              className="form-control"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>
        </div>
        <div className="mt-3 d-flex gap-2">
          <button
            className="btn btn-success"
            onClick={submitTransaction}
            disabled={submitting}
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
          {isEditing && (
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                setIsEditing(false);
                setForm({ type: 'credit', amount: '', description: '', reference: '' });
              }}
              disabled={submitting}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <h5 className="mb-3">Last 10 Transactions</h5>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Ref</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id}>
                <td>{tx.reference}</td>
                <td>{tx.type}</td>
                <td>${tx.amount}</td>
                <td>{new Date(tx.date).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-link text-primary me-2"
                    onClick={() => startEdit(tx)}
                    disabled={submitting}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-link text-danger"
                    onClick={() => deleteTransaction(tx._id)}
                    disabled={submitting}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
