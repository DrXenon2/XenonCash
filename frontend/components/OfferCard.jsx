// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/components/OfferCard.jsx
import React from 'react';

export default function OfferCard({ name, description, price, commission_rate, niche, onPromote }) {
  return (
    <div className="offer-card">
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Price: {price} XOF | Commission: {commission_rate}%</p>
      <p>Niche: {niche}</p>
      <button onClick={onPromote}>Promote</button>
      <style jsx>{`
        .offer-card { border: 1px solid #ccc; padding: 10px; margin: 10px 0; background: #f9f9f9; border-radius: 5px; }
        .offer-card h3 { margin: 0 0 10px; }
        .offer-card p { margin: 5px 0; }
        .offer-card button { padding: 5px 10px; background: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer; }
        .offer-card button:hover { background: #218838; }
      `}</style>
    </div>
  );
}