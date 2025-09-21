// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/about.jsx
import React from 'react';

export default function About() {
  return (
    <div className="about-container">
      <h2>About XenonCash</h2>
      <p>
        XenonCash is an innovative affiliate marketing platform designed to connect merchants and affiliates in Africa. Launched in 2025, our mission is to empower individuals and businesses by providing tools to earn through referrals and product promotions.
      </p>
      <h3>Our Features</h3>
      <ul>
        <li>Real-time earnings tracking</li>
        <li>Customizable product offers</li>
        <li>Secure withdrawal options</li>
        <li>Detailed merchant reports</li>
      </ul>
      <p>
        Contact us at <a href="mailto:support@xenoncash.com">support@xenoncash.com</a> for more information.
      </p>
      <style jsx>{`
        .about-container { padding: 20px; max-width: 800px; margin: 0 auto; }
        h2 { color: #333; }
        p { line-height: 1.6; }
        ul { list-style-type: disc; padding-left: 20px; }
        a { color: #0070f3; text-decoration: none; }
        a:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}