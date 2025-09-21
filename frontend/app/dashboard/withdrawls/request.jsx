// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/withdrawals/request.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RequestWithdrawal() {
  const [form, setForm] = useState({ amount: '', method: 'MOMO', phone: '' });
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get('/api/dashboard', {
          params: { userId: localStorage.getItem('userId') },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setBalance(response.data.balance);
      } catch (err) {
        console.error('Error fetching balance:', err);
      }
    };
    fetchBalance();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(form.amount) > balance) {
      setMessage('Insufficient balance!');
      return;
    }
    if (parseFloat(form.amount) < 500) {
      setMessage('Minimum withdrawal is 500 XOF!');
      return;
    }
    try {
      await axios.post('/api/withdrawals', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMessage('Withdrawal requested successfully!');
      setForm({ amount: '', method: 'MOMO', phone: '' });
    } catch (err) {
      setMessage('Error requesting withdrawal: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="request-withdrawal">
      <h2>Request Withdrawal</h2>
      <p>Available Balance: {balance} XOF</p>
      <form onSubmit={handleSubmit}>
        <label>
          Amount (XOF):
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            min="500"
            required
          />
        </label>
        <label>
          Method:
          <select name="method" value={form.method} onChange={handleChange}>
            <option value="MOMO">Mobile Money</option>
            <option value="BANK">Bank Transfer</option>
          </select>
        </label>
        <label>
          Phone/Account Number:
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit Request</button>
      </form>
      {message && <p>{message}</p>}
      <style jsx>{`
        .request-withdrawal { padding: 20px; }
        label { display: block; margin: 10px 0; }
        input, select { margin-left: 10px; padding: 5px; width: 200px; }
        button { padding: 5px 10px; margin-top: 10px; }
      `}</style>
    </div>
  );
}