// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/merchant/reports.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/merchant/reports', {
          params: { merchantId: localStorage.getItem('merchantId') },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setReports(response.data);
      } catch (err) {
        console.error('Error fetching reports:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/merchant/reports', {
        params: { 
          merchantId: localStorage.getItem('merchantId'),
          startDate: dateRange.start,
          endDate: dateRange.end,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setReports(response.data);
    } catch (err) {
      console.error('Error filtering reports:', err);
    }
  };

  const handleChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const exportToCSV = () => {
    const csv = [
      'Date,Sales,Commissions,Affiliates',
      ...reports.map(row => `${row.date},${row.sales},${row.commissions},${row.affiliates}`).join('\n'),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `xenoncash_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) return <p>Loading reports...</p>;

  return (
    <div className="reports-section">
      <h2>Merchant Reports</h2>
      <form onSubmit={handleFilter} className="filter-form">
        <label>
          Start Date:
          <input
            type="date"
            name="start"
            value={dateRange.start}
            onChange={handleChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="end"
            value={dateRange.end}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Filter</button>
        <button type="button" onClick={exportToCSV}>Export CSV</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Sales (XOF)</th>
            <th>Commissions (XOF)</th>
            <th>Affiliates</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{new Date(report.date).toLocaleDateString()}</td>
              <td>{report.sales}</td>
              <td>{report.commissions}</td>
              <td>{report.affiliates}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .reports-section { padding: 20px; }
        .filter-form { margin-bottom: 20px; }
        label { margin-right: 10px; }
        input { padding: 5px; margin-right: 10px; }
        button { padding: 5px 10px; margin-right: 10px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f2f2f2; }
      `}</style>
    </div>
  );
}