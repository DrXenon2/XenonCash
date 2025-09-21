// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/profile/recommendations/list.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RecommendationList() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`/api/recommendations/${localStorage.getItem('userId')}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setRecommendations(response.data);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (loading) return <p>Loading recommendations...</p>;

  return (
    <div className="recommendations-list">
      <h2>Personalized Recommendations</h2>
      <div className="recommendations-grid">
        {recommendations.map((rec) => (
          <div key={rec.id} className="recommendation-card">
            <h3>{rec.name}</h3>
            <p>{rec.description}</p>
            <p>Price: {rec.price} XOF | Commission: {rec.commission_rate}%</p>
            <p>Niche: {rec.niche}</p>
            <button
              onClick={() => alert(`Promote ${rec.name} with your referral code!`)}
            >
              Promote
            </button>
          </div>
        ))}
      </div>
      <style jsx>{`
        .recommendations-list { padding: 20px; }
        .recommendations-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
        .recommendation-card { border: 1px solid #ccc; padding: 10px; background: #f9f9f9; }
        button { padding: 5px 10px; margin-top: 10px; }
      `}</style>
    </div>
  );
}