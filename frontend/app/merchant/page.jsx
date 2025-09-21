// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/merchant/page.jsx
import React from 'react';
import Link from 'next/link';
import Products from './products';
import Payouts from './payouts';

export default function MerchantPage() {
  return (
    <div className="merchant-container">
      <h1>Merchant Panel - XenonCash</h1>
      <nav>
        <Link href="/merchant/products">Manage Products</Link> | 
        <Link href="/merchant/payouts">Manage Payouts</Link>
      </nav>
      <Products />
      <Payouts />
    </div>
  );
}