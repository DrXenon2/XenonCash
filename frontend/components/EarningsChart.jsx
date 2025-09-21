// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/components/EarningsChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function EarningsChart({ data }) {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Earnings Trend (Monthly)' },
    },
  };

  const chartData = {
    labels: data.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Earnings (XOF)',
        data: data.values || [1200, 1900, 3000, 5000, 2000, 3000],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div className="earnings-chart">
      <Line options={options} data={chartData} />
      <style jsx>{`
        .earnings-chart { padding: 20px; background: #fff; border: 1px solid #ddd; border-radius: 8px; }
      `}</style>
    </div>
  );
}