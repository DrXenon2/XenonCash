// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/components/Sidebar.jsx
import React from 'react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/dashboard/earnings">Earnings</Link></li>
        <li><Link href="/dashboard/withdrawals">Withdrawals</Link></li>
        <li><Link href="/dashboard/referrals">Referrals</Link></li>
        <li><Link href="/dashboard/profile">Profile</Link></li>
        <li><Link href="/merchant">Merchant</Link></li>
        <li><Link href="/merchant/products">Products</Link></li>
        <li><Link href="/merchant/payouts">Payouts</Link></li>
        <li><Link href="/merchant/reports">Reports</Link></li>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/about">About</Link></li>
      </ul>
      <style jsx>{`
        .sidebar { 
          width: 200px; 
          background: #f8f9fa; 
          padding: 20px; 
          height: 100vh; 
          position: fixed; 
          top: 0; 
          left: 0; 
        }
        .sidebar ul { list-style: none; padding: 0; }
        .sidebar li { margin: 15px 0; }
        .sidebar a { text-decoration: none; color: #0070f3; font-weight: bold; }
        .sidebar a:hover { color: #005bb5; }
        @media (max-width: 768px) {
          .sidebar { display: none; } /* Masque sur mobile, ajuste si besoin */
        }
      `}</style>
  );
}