// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/earnings/page.jsx
import React from 'react';
import Link from 'next/link';
import Stats from './stats';
import History from './history';  // Assumé existant, ou ajoute-le si besoin

export default function EarningsPage() {
  return (
    <div className="earnings-container">
      <h1>Affiliate Earnings Dashboard - XenonCash</h1>
      <nav>
        <Link href="/dashboard/earnings/stats">Stats</Link> | 
        <Link href="/dashboard/earnings/history">History</Link>
      </nav>
      <Stats />
      <History />
    </div>
  );
}