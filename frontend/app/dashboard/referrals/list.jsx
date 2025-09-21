// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/referrals/list.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReferralList() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await axios.get('/api/referrals', {
          params: { affiliateId: localStorage.getItem('affiliateId') },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setReferrals(response.data);
      } catch (err) {
        console.error('Error fetching referrals:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReferrals();
  }, []);

  if (loading) return <p>Loading referrals...</p>;

  return (
    <div className="referral-list">
      <h2>Your Referrals</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Joined Date</th>
            <th>Earnings Generated</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map((ref) => (
            <tr key={ref.id}>
              <td>{ref.username}</td>
              <td>{ref.email}</td>
              <td>{new Date(ref.created_at).toLocaleDateString()}</td>
              <td>{ref.earnings || 0} XOF</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .referral-list { padding: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f2f2f2; }
      `}</style>
    </div>
  );
}