// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/referrals/page.jsx
import React from 'react';
import Link from 'next/link';
import ReferralList from './list';
import Invite from './invite';

export default function ReferralsPage() {
  return (
    <div className="referrals-container">
      <h1>Referrals - XenonCash</h1>
      <nav>
        <Link href="/dashboard/referrals/list">Referral List</Link> | 
        <Link href="/dashboard/referrals/invite">Invite</Link>
      </nav>
      <ReferralList />
      <Invite />
    </div>
  );
}