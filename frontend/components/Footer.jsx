// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} XenonCash. All rights reserved. Contact: <a href="mailto:support@xenoncash.com">support@xenoncash.com</a></p>
      <style jsx>{`
        .footer { 
          padding: 10px; 
          background: #333; 
          color: white; 
          text-align: center; 
          position: relative; 
          bottom: 0; 
          width: 100%; 
        }
        .footer a { 
          color: #0070f3; 
          text-decoration: none; 
        }
        .footer a:hover { 
          text-decoration: underline; 
        }
      `}</style>
    </footer>
  );
}