// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/stats.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Stats() {
  const [stats, setStats] = useState({ balance: 0, sales: 0, leads: 0, referrals: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/dashboard', {
          params: { userId: localStorage.getItem('userId') },
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

  if (loading) return <p>Loading stats...</p>;

  return (
    <div className="stats-section">
      <h2>Your Stats</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Balance</h3>
          <p>{stats.balance} XOF</p>
        </div>
        <div className="stat-card">
          <h3>Sales</h3>
          <p>{stats.sales}</p>
        </div>
        <div className="stat-card">
          <h3>Leads</h3>
          <p>{stats.leads}</p>
        </div>
        <div className="stat-card">
          <h3>Referrals</h3>
          <p>{stats.referrals}</p>
        </div>
      </div>
      <style jsx>{`
        .stats-section { padding: 20px; }
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .stat-card { border: 1px solid #ccc; padding: 10px; text-align: center; background: #f9f9f9; }
      `}</style>
    </div>
  );
}