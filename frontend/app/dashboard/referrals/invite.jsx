// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/referrals/invite.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Invite() {
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [inviteMessage, setInviteMessage] = useState('');

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

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setInviteMessage('Referral code copied to clipboard!');
    setTimeout(() => setInviteMessage(''), 3000);
  };

  if (loading) return <p>Loading referral code...</p>;

  return (
    <div className="invite-section">
      <h2>Invite Friends</h2>
      <p>Earn commissions by inviting others! Share your referral code:</p>
      <div className="referral-box">
        <strong>Referral Code:</strong> {referralCode}
        <button onClick={handleCopy}>Copy</button>
      </div>
      {inviteMessage && <p>{inviteMessage}</p>}
      <p>Send this code via WhatsApp or email with a personal message!</p>
      <style jsx>{`
        .invite-section { padding: 20px; }
        .referral-box { border: 1px solid #ccc; padding: 10px; margin: 10px 0; background: #f0f0f0; }
        button { margin-left: 10px; padding: 5px 10px; }
      `}</style>
    </div>
  );
}