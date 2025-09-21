// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/admin/settings.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function Settings() {
  const [form, setForm] = useState({ minWithdrawal: 500, currency: 'XOF' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/settings', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMessage('Settings updated successfully!');
    } catch (err) {
      setMessage('Error updating settings: ' + err.message);
    }
  };

  return (
    <div className="settings">
      <h2>Admin Settings</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Minimum Withdrawal:
          <input
            type="number"
            name="minWithdrawal"
            value={form.minWithdrawal}
            onChange={handleChange}
          />
        </label>
        <label>
          Currency:
          <input
            type="text"
            name="currency"
            value={form.currency}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
      {message && <p>{message}</p>}
      <style jsx>{`
        .settings { padding: 20px; }
        label { display: block; margin: 10px 0; }
        input { margin-left: 10px; padding: 5px; }
        button { padding: 5px 10px; }
      `}</style>
    </div>
  );
}