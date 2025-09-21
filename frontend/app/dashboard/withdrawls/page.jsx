// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/withdrawals/page.jsx
import React from 'react';
import Link from 'next/link';
import RequestWithdrawal from './request';
import WithdrawalHistory from './history';
import Status from './status';

export default function WithdrawalsPage() {
  return (
    <div className="withdrawals-container">
      <h1>Withdrawals - XenonCash</h1>
      <nav>
        <Link href="/dashboard/withdrawals/request">Request Withdrawal</Link> | 
        <Link href="/dashboard/withdrawals/history">History</Link> | 
        <Link href="/dashboard/withdrawals/status">Status</Link>
      </nav>
      <RequestWithdrawal />
      <WithdrawalHistory />
      <Status />
    </div>
  );
}