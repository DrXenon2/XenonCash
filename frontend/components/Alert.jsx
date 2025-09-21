// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/components/Alert.jsx
import React from 'react';

export default function Alert({ message, type = 'info', onClose }) {
  return (
    <div className={`alert ${type}`}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="close-btn">&times;</button>
      )}
      <style jsx>{`
        .alert { 
          padding: 10px 15px; 
          margin-bottom: 10px; 
          border-radius: 4px; 
          color: white; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
        }
        .alert.info { background: #0070f3; }
        .alert.success { background: #28a745; }
        .alert.error { background: #dc3545; }
        .close-btn { 
          background: none; 
          border: none; 
          color: white; 
          font-size: 18px; 
          cursor: pointer; 
          padding: 0 5px; 
        }
      `}</style>
    </div>
  );
}