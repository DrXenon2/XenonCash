// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/admin/dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 0, products: 0, transactions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/admin/stats', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStats(response.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Users</h3>
          <p>{stats.users}</p>
        </div>
        <div className="stat-card">
          <h3>Products</h3>
          <p>{stats.products}</p>
        </div>
        <div className="stat-card">
          <h3>Transactions</h3>
          <p>{stats.transactions}</p>
        </div>
      </div>
      <style jsx>{`
        .dashboard { padding: 20px; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .stat-card { border: 1px solid #ccc; padding: 10px; text-align: center; }
      `}</style>
    </div>
  );
}