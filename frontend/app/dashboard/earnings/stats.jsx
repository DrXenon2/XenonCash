// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/earnings/stats.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';  // Pour le graphique
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

// Enregistre les composants Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Stats() {
  const [stats, setStats] = useState({
    balance: 0,
    totalEarnings: 0,
    epc: 0,  // Earnings Per Click
    conversions: 0,
    clicks: 0,
    roi: 0,  // Return on Investment
  });
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/dashboard/earnings/stats', {
          params: { userId: localStorage.getItem('userId') },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStats(response.data);

        // Données pour le graphique (exemple mensuel, adapte avec tes data)
        setChartData({
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Earnings (XOF)',
              data: [1200, 1900, 3000, 5000, 2000, 3000],  // Remplace par response.data.monthlyEarnings
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p>Loading earnings stats...</p>;

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Earnings Trend' },
    },
  };

  return (
    <div className="stats-section">
      <h2>Earnings Stats</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Balance</h3>
          <p>{stats.balance} XOF</p>
        </div>
        <div className="stat-card">
          <h3>Total Earnings</h3>
          <p>{stats.totalEarnings} XOF</p>
        </div>
        <div className="stat-card">
          <h3>EPC (Earnings Per Click)</h3>
          <p>{stats.epc} XOF</p>
        </div>
        <div className="stat-card">
          <h3>Conversions</h3>
          <p>{stats.conversions}</p>
        </div>
        <div className="stat-card">
          <h3>Clicks</h3>
          <p>{stats.clicks}</p>
        </div>
        <div className="stat-card">
          <h3>ROI</h3>
          <p>{stats.roi}%</p>
        </div>
      </div>
      <div className="chart-section">
        <Line options={options} data={chartData} />
      </div>
      <style jsx>{`
        .stats-section { padding: 20px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin-bottom: 20px; }
        .stat-card { border: 1px solid #ccc; padding: 15px; text-align: center; background: #f9f9f9; border-radius: 8px; }
        .stat-card h3 { margin: 0 0 10px 0; font-size: 14px; color: #666; }
        .stat-card p { font-size: 24px; font-weight: bold; color: #333; margin: 0; }
        .chart-section { padding: 20px; background: #fff; border: 1px solid #ddd; border-radius: 8px; }
      `}</style>
    </div>
  );
}