// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/offers/list.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function OfferList() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('/api/offers', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOffers(response.data);
      } catch (err) {
        console.error('Error fetching offers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  if (loading) return <p>Loading offers...</p>;

  return (
    <div className="offer-list">
      <h2>Available Offers</h2>
      <div className="offers-grid">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card">
            <h3>{offer.name}</h3>
            <p>{offer.description}</p>
            <p>Commission: {offer.commission_rate}% | Price: {offer.price} XOF</p>
            <p>Niche: {offer.niche}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .offer-list { padding: 20px; }
        .offers-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
        .offer-card { border: 1px solid #ccc; padding: 10px; background: #f9f9f9; }
      `}</style>
    </div>
  );
}