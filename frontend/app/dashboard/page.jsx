// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/page.jsx
import React from 'react';
import Link from 'next/link';
import Stats from './stats';
import Transactions from './transactions';

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <h1>Dashboard - XenonCash</h1>
      <nav>
        <Link href="/dashboard/stats">Stats</Link> | 
        <Link href="/dashboard/transactions">Transactions</Link>
      </nav>
      <Stats />
      <Transactions />
    </div>
  );
}