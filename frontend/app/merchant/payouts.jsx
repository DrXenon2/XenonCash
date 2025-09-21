// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/merchant/payouts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Payouts() {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        const response = await axios.get('/api/merchant/payouts', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPayouts(response.data);
      } catch (err) {
        console.error('Error fetching payouts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayouts();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/merchant/payouts/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPayouts(payouts.map(p => p.id === id ? { ...p, status: 'approved' } : p));
    } catch (err) {
      console.error('Error approving payout:', err);
    }
  };

  if (loading) return <p>Loading payouts...</p>;

  return (
    <div className="payouts-section">
      <h2>Manage Payouts</h2>
      <table>
        <thead>
          <tr>
            <th>Affiliate</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map((payout) => (
            <tr key={payout.id}>
              <td>{payout.affiliate_name}</td>
              <td>{payout.amount} XOF</td>
              <td>{payout.method}</td>
              <td>{payout.status}</td>
              <td>
                {payout.status === 'pending' && (
                  <button onClick={() => handleApprove(payout.id)}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .payouts-section { padding: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f2f2f2; }
        button { padding: 5px 10px; }
      `}</style>
    </div>
  );
}