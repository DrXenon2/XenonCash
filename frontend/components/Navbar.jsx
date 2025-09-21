// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/components/Navbar.jsx
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1><Link href="/">XenonCash</Link></h1>
      <div className="nav-links">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/earnings">Earnings</Link>
        <Link href="/dashboard/withdrawals">Withdrawals</Link>
        <Link href="/dashboard/referrals">Referrals</Link>
        <Link href="/dashboard/profile">Profile</Link>
        <Link href="/merchant">Merchant</Link>
        <Link href="/merchant/products">Products</Link>
        <Link href="/merchant/payouts">Payouts</Link>
        <Link href="/merchant/reports">Reports</Link>
        <Link href="/login">Login</Link>
        <Link href="/about">About</Link>
      </div>
      <style jsx>{`
        .navbar { 
          padding: 10px 20px; 
          background: #333; 
          color: white; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          position: sticky; 
          top: 0; 
          z-index: 1000; 
        }
        .navbar a { 
          color: white; 
          text-decoration: none; 
          margin-left: 15px; 
        }
        .navbar a:hover { 
          text-decoration: underline; 
        }
        .nav-links { display: flex; align-items: center; }
        @media (max-width: 768px) {
          .nav-links { flex-direction: column; align-items: flex-start; }
          .nav-links a { margin: 5px 0; }
        }
      `}</style>
    </nav>
  );
}