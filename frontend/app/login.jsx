// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.id); // Ajuste selon la réponse
      setMessage('Login successful!');
      router.push('/dashboard'); // Redirige vers le dashboard
    } catch (err) {
      setMessage('Error logging in: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to XenonCash</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <style jsx>{`
        .login-container { max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
        label { display: block; margin: 10px 0 5px; }
        input { width: 100%; padding: 8px; margin-bottom: 10px; }
        button { width: 100%; padding: 10px; background: #0070f3; color: white; border: none; border-radius: 5px; }
        button:hover { background: #005bb5; }
      `}</style>
    </div>
  );
}