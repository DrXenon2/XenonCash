// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/offers/promote.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Promote() {
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferralCode = async () => {
      try {
        const response = await axios.get('/api/affiliates/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setReferralCode(response.data.referral_code);
      } catch (err) {
        console.error('Error fetching referral code:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReferralCode();
  }, []);

  if (loading) return <p>Loading referral code...</p>;

  return (
    <div className="promote-section">
      <h2>Promote Your Offers</h2>
      <p>Share your unique referral code with others to earn commissions!</p>
      <div className="referral-box">
        <strong>Referral Code:</strong> {referralCode}
        <button
          onClick={() => navigator.clipboard.writeText(referralCode)}
        >
          Copy
        </button>
      </div>
      <p>Tip: Share on WhatsApp or Instagram with a call-to-action!</p>
      <style jsx>{`
        .promote-section { padding: 20px; }
        .referral-box { border: 1px solid #ccc; padding: 10px; margin: 10px 0; background: #f0f0f0; }
        button { margin-left: 10px; padding: 5px 10px; }
      `}</style>
    </div>
  );
}