// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/components/DashboardOverview.jsx
import React from 'react';

export default function DashboardOverview({ balance, totalEarnings, conversions, clicks }) {
  return (
    <div className="dashboard-overview">
      <h2>Dashboard Overview</h2>
      <div className="overview-grid">
        <div className="overview-card">
          <h3>Balance</h3>
          <p>{balance} XOF</p>
        </div>
        <div className="overview-card">
          <h3>Total Earnings</h3>
          <p>{totalEarnings} XOF</p>
        </div>
        <div className="overview-card">
          <h3>Conversions</h3>
          <p>{conversions}</p>
        </div>
        <div className="overview-card">
          <h3>Clicks</h3>
          <p>{clicks}</p>
        </div>
      </div>
      <style jsx>{`
        .dashboard-overview { padding: 20px; }
        .overview-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; }
        .overview-card { border: 1px solid #ccc; padding: 15px; text-align: center; background: #f9f9f9; border-radius: 8px; }
        .overview-card h3 { margin: 0 0 10px; font-size: 14px; color: #666; }
        .overview-card p { font-size: 24px; font-weight: bold; color: #333; margin: 0; }
      `}</style>
    </div>
  );
}