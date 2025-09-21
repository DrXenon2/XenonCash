// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/withdrawals/history.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WithdrawalHistory() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get('/api/withdrawals', {
          params: { userId: localStorage.getItem('userId') },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setWithdrawals(response.data);
      } catch (err) {
        console.error('Error fetching withdrawals:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWithdrawals();
  }, []);

  if (loading) return <p>Loading withdrawal history...</p>;

  return (
    <div className="withdrawal-history">
      <h2>Withdrawal History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Transaction ID</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map((withdrawal) => (
            <tr key={withdrawal.id}>
              <td>{new Date(withdrawal.created_at).toLocaleDateString()}</td>
              <td>{withdrawal.amount} XOF</td>
              <td>{withdrawal.method}</td>
              <td>{withdrawal.status}</td>
              <td>{withdrawal.transaction_id || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .withdrawal-history { padding: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f2f2f2; }
      `}</style>
    </div>
  );
}