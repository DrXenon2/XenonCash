// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/offers/page.jsx
import React from 'react';
import Link from 'next/link';
import OfferList from './list';
import Promote from './promote';

export default function OffersPage() {
  return (
    <div className="offers-container">
      <h1>Offers - XenonCash</h1>
      <nav>
        <Link href="/dashboard/offers/list">Offer List</Link> | 
        <Link href="/dashboard/offers/promote">Promote</Link>
      </nav>
      <OfferList />
      <Promote />
    </div>
  );
}