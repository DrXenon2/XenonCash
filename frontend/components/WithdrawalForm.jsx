// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/components/WithdrawalForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WithdrawalForm({ balance, onSuccess }) {
  const [form, setForm] = useState({ amount: '', method: 'MOMO', phone: '' });
  const [message, setMessage] = useState('');

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
      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage('Error requesting withdrawal: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="withdrawal-form">
      <h3>Request Withdrawal</h3>
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
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      <style jsx>{`
        .withdrawal-form { padding: 20px; border: 1px solid #ccc; border-radius: 5px; background: #f9f9f9; }
        label { display: block; margin: 10px 0 5px; }
        input, select { width: 100%; padding: 8px; margin-bottom: 10px; }
        button { width: 100%; padding: 10px; background: #28a745; color: white; border: none; border-radius: 5px; }
        button:hover { background: #218838; }
      `}</style>
    </div>
  );
}