// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/admin/page.jsx
import React from 'react';
import Link from 'next/link';
import Dashboard from './dashboard';

export default function AdminPage() {
  return (
    <div className="admin-container">
      <h1>Admin Panel - XenonCash</h1>
      <nav>
        <Link href="/admin/dashboard">Dashboard</Link> | 
        <Link href="/admin/settings">Settings</Link>
      </nav>
      <Dashboard />
    </div>
  );
} 