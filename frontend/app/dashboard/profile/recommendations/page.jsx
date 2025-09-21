// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/profile/recommendations/page.jsx
import React from 'react';
import Link from 'next/link';
import RecommendationList from './list';

export default function RecommendationsPage() {
  return (
    <div className="recommendations-container">
      <h1>Recommendations - XenonCash</h1>
      <nav>
        <Link href="/dashboard/profile/recommendations">View Recommendations</Link>
      </nav>
      <RecommendationList />
    </div>
  );
}