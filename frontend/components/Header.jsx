// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/components/Header.jsx
import React from 'react';
import Link from 'next/link';

export default function Header({ title }) {
  return (
    <header className="header">
      <h1>{title || 'XenonCash'}</h1>
      <style jsx>{`
        .header { padding: 15px 20px; background: #0070f3; color: white; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
      `}</style>
    </header>
  );
}