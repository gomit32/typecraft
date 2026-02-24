import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-spinner">
        <div className="loader-key">⌨️</div>
      </div>
      <p className="loader-text">Loading TypeCraft...</p>
    </div>
  );
};

export default Loader;