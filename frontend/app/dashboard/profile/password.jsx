// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/profile/password.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function Password() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setMessage('New passwords do not match!');
      return;
    }
    try {
      await axios.post('/api/users/change-password', {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMessage('Password updated successfully!');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); // Reset form
    } catch (err) {
      setMessage('Error updating password: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="password-section">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Current Password:
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          New Password:
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Confirm New Password:
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Update Password</button>
      </form>
      {message && <p>{message}</p>}
      <style jsx>{`
        .password-section { padding: 20px; }
        label { display: block; margin: 10px 0; }
        input { margin-left: 10px; padding: 5px; width: 200px; }
        button { padding: 5px 10px; margin-top: 10px; }
      `}</style>
    </div>
  );
}