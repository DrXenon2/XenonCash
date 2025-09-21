// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/earnings/history.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function History() {
  const [earningsHistory, setEarningsHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('/api/dashboard/earnings/history', {
          params: { userId: localStorage.getItem('userId') },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setEarningsHistory(response.data);
      } catch (err) {
        console.error('Error fetching earnings history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <p>Loading earnings history...</p>;

  return (
    <div className="history-section">
      <h2>Earnings History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {earningsHistory.map((entry) => (
            <tr key={entry.id}>
              <td>{new Date(entry.created_at).toLocaleDateString()}</td>
              <td>{entry.amount} XOF</td>
              <td>{entry.type}</td>
              <td>{entry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .history-section { padding: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f2f2f2; }
      `}</style>
    </div>
  );
}