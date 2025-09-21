// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/withdrawals/status.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Status() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('/api/withdrawals/status', {
          params: { userId: localStorage.getItem('userId') },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setWithdrawals(response.data);
      } catch (err) {
        console.error('Error fetching withdrawal status:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get('/api/withdrawals/status', {
        params: { userId: localStorage.getItem('userId') },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setWithdrawals(response.data);
    } catch (err) {
      console.error('Error refreshing status:', err);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) return <p>Loading withdrawal status...</p>;

  return (
    <div className="status-section">
      <h2>Withdrawal Status</h2>
      <button onClick={handleRefresh} disabled={refreshing}>
        {refreshing ? 'Refreshing...' : 'Refresh Status'}
      </button>
      {withdrawals.length === 0 ? (
        <p>No pending withdrawals.</p>
      ) : (
        <ul className="status-list">
          {withdrawals.map((withdrawal) => (
            <li key={withdrawal.id} className={`status-item ${withdrawal.status.toLowerCase()}`}>
              <p><strong>Amount:</strong> {withdrawal.amount} XOF</p>
              <p><strong>Method:</strong> {withdrawal.method}</p>
              <p><strong>Status:</strong> {withdrawal.status}</p>
              <p><strong>Transaction ID:</strong> {withdrawal.transaction_id || 'N/A'}</p>
              <p><strong>Date:</strong> {new Date(withdrawal.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .status-section { padding: 20px; }
        button { padding: 5px 10px; margin-bottom: 10px; }
        .status-list { list-style: none; padding: 0; }
        .status-item { border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 4px; }
        .status-item.pending { background: #fff3cd; }
        .status-item.approved { background: #d4edda; }
        .status-item.rejected { background: #f8d7da; }
        p { margin: 5px 0; }
      `}</style>
    </div>
  );
}