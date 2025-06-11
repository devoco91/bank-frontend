// DashboardPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = 'https://backend-dry-glade-5837.fly.dev';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ type: 'credit', amount: '', description: '', reference: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => { fetchDashboard(); }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  const fetchDashboard = async () => {
    if (!token) return logout();
    try {
      const res = await fetch(`${API}/user/dashboard`, {
  headers: authHeaders,
  credentials: "include"
});
      if (res.status === 401 || res.status === 403) return logout();
      const data = await res.json();
      setUser(data);
      setTransactions(Array.isArray(data.transactions) ? data.transactions : []);
    } catch (e) {
      console.error("Dashboard fetch failed", e);
      logout();
    }
  };

  const createBalance = async () => {
    const amt = prompt("Enter initial balance:");
    if (!amt || isNaN(amt)) return;
    await fetch(`${API}/user/total-amount`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ totalAmount: Number(amt) })
    });
    fetchDashboard();
  };

  const updateTotal = async () => {
    const amt = prompt("Enter new total amount:", user.totalAmount);
    if (!amt || isNaN(amt)) return;
    await fetch(`${API}/user/total-amount`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({ totalAmount: Number(amt) })
    });
    fetchDashboard();
  };

  const deleteBalance = async () => {
    const confirmDelete = window.confirm("Are you sure you want to reset the balance?");
    if (!confirmDelete) return;
    await fetch(`${API}/user/total-amount`, {
      method: 'DELETE',
      headers: authHeaders
    });
    fetchDashboard();
  };

  const submitTransaction = async () => {
    if (!form.amount || !form.reference) return alert("Please fill required fields.");
    const amount = Number(form.amount);
    if (isNaN(amount)) return alert("Invalid amount");

    if (isEditing) {
      const oldTx = transactions.find(t => t._id === editId);
      const oldAmount = Number(oldTx?.amount || 0);
      const delta =
        form.type === oldTx.type
          ? amount - oldAmount
          : form.type === "credit"
          ? amount + oldAmount
          : -1 * (amount + oldAmount);

      await fetch(`${API}/transactions/${editId}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(form)
      });

      await fetch(`${API}/user/total-amount`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ totalAmount: user.totalAmount + delta })
      });
    } else {
      await fetch(`${API}/transactions`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(form)
      });

      const delta = form.type === 'credit' ? amount : -amount;
      await fetch(`${API}/user/total-amount`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ totalAmount: user.totalAmount + delta })
      });
    }

    setForm({ type: 'credit', amount: '', description: '', reference: '' });
    setIsEditing(false);
    setEditId(null);
    fetchDashboard();
  };

  const deleteTransaction = async (id) => {
    await fetch(`${API}/transactions/${id}`, {
      method: 'DELETE',
      headers: authHeaders
    });
    fetchDashboard();
  };

  const startEdit = (txn) => {
    setIsEditing(true);
    setEditId(txn._id);
    setForm({
      type: txn.type,
      amount: txn.amount,
      description: txn.description,
      reference: txn.reference
    });
  };

  if (!user) return <div className="container py-5">Loading dashboard...</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4">Welcome, {user?.accountNo}</h1>
        <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card p-3">Account Type: {user?.accountType}</div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">Account Number: {user?.accountNumber}</div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">Username: {user?.username}</div>
        </div>
        <div className="col-md-6">
          <div className="card p-3">Balance: ${user?.totalAmount?.toLocaleString()}</div>
        </div>
        <div className="col-md-6">
          <div className="card p-3">Total Transactions: {user?.totalTransactions}</div>
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
            <input type="text" placeholder="Amount" className="form-control" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input type="text" placeholder="Reference" className="form-control" value={form.reference} onChange={e => setForm({ ...form, reference: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input type="text" placeholder="Description" className="form-control" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="col-md-3">
            <select className="form-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>
        </div>
        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-success" onClick={submitTransaction}>{isEditing ? 'Update' : 'Add'}</button>
          {isEditing && <button className="btn btn-outline-danger" onClick={() => {
            setIsEditing(false);
            setForm({ type: 'credit', amount: '', description: '', reference: '' });
          }}>Cancel</button>}
        </div>
      </div>

      <h5 className="mb-3">Last 10 Transactions</h5>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Ref</th><th>Type</th><th>Amount</th><th>Date</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx._id}>
                <td>{tx.reference}</td>
                <td>{tx.type}</td>
                <td>${tx.amount}</td>
                <td>{new Date(tx.date).toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm btn-link text-primary me-2" onClick={() => startEdit(tx)}>Edit</button>
                  <button className="btn btn-sm btn-link text-danger" onClick={() => deleteTransaction(tx._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
