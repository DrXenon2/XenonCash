// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/layout.jsx
import React from 'react';
import Link from 'next/link';
import './globals.css'; // Crée ce fichier pour les styles globaux

export const metadata = {
  title: 'XenonCash Affiliate Platform',
  description: 'Manage your affiliate earnings, products, and more with XenonCash',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <h1><Link href="/">XenonCash</Link></h1>
          <nav>
            <Link href="/dashboard">Dashboard</Link> | 
            <Link href="/dashboard/earnings">Earnings</Link> | 
            <Link href="/dashboard/withdrawals">Withdrawals</Link> | 
            <Link href="/dashboard/referrals">Referrals</Link> | 
            <Link href="/dashboard/profile">Profile</Link> | 
            <Link href="/merchant">Merchant</Link> | 
            <Link href="/merchant/products">Products</Link> | 
            <Link href="/merchant/payouts">Payouts</Link> | 
            <Link href="/merchant/reports">Reports</Link> | 
            <Link href="/login">Login</Link> | 
            <Link href="/about">About</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} XenonCash. All rights reserved. Contact: <a href="mailto:support@xenoncash.com">support@xenoncash.com</a></p>
        </footer>
        <style jsx>{`
          .header { 
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
          .header a { 
            color: white; 
            text-decoration: none; 
            margin-left: 15px; 
          }
          .header a:hover { 
            text-decoration: underline; 
          }
          main { 
            min-height: calc(100vh - 100px); 
            padding: 20px; 
            background: #f5f5f5; 
          }
          .footer { 
            padding: 10px; 
            background: #333; 
            color: white; 
            text-align: center; 
            position: relative; 
            bottom: 0; 
            width: 100%; 
          }
          .footer a { 
            color: #0070f3; 
            text-decoration: none; 
          }
          .footer a:hover { 
            text-decoration: underline; 
          }
        `}</style>
      </body>
    </html>
  );
}