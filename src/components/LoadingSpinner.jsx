import React from 'react';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-container">
      <div className="spinner-wrapper">
        <div className="spinner">
          <div className="spinner-inner"></div>
        </div>
        <div className="spinner-logo">
          <span className="logo-first">Cine</span><span className="logo-last">Verse</span>
        </div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner; 