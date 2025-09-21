// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/not-found.jsx
import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <Link href="/">Return to Home</Link>
      <style jsx>{`
        .not-found-container { text-align: center; padding: 50px 20px; }
        .not-found-container a { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #0070f3; color: white; text-decoration: none; border-radius: 5px; }
        .not-found-container a:hover { background: #005bb5; }
      `}</style>
    </div>
  );
}