// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/earnings/summary.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Summary() {
  const [summary, setSummary] = useState({ totalEarnings: 0, pending: 0, approved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('/api/dashboard/earnings', {
          params: { userId: localStorage.getItem('userId') },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSummary(response.data);
      } catch (err) {
        console.error('Error fetching earnings summary:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return <p>Loading earnings summary...</p>;

  return (
    <div className="summary-section">
      <h2>Earnings Summary</h2>
      <div className="summary-grid">
        <div className="summary-card">
          <h3>Total Earnings</h3>
          <p>{summary.totalEarnings} XOF</p>
        </div>
        <div className="summary-card">
          <h3>Pending</h3>
          <p>{summary.pending} XOF</p>
        </div>
        <div className="summary-card">
          <h3>Approved</h3>
          <p>{summary.approved} XOF</p>
        </div>
      </div>
      <style jsx>{`
        .summary-section { padding: 20px; }
        .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .summary-card { border: 1px solid #ccc; padding: 10px; text-align: center; background: #f9f9f9; }
      `}</style>
    </div>
  );
}