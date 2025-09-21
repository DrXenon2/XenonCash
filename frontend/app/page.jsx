// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/page.jsx
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to XenonCash</h2>
      <p>Your platform for affiliate marketing and merchant management.</p>
      <div className="home-links">
        <Link href="/dashboard">Go to Dashboard</Link>
        <Link href="/merchant">Go to Merchant Panel</Link>
      </div>
      <style jsx>{`
        .home-container { text-align: center; padding: 50px 20px; }
        .home-links a { display: block; margin: 10px 0; padding: 10px 20px; background: #0070f3; color: white; text-decoration: none; border-radius: 5px; }
        .home-links a:hover { background: #005bb5; }
      `}</style>
    </div>
  );
}