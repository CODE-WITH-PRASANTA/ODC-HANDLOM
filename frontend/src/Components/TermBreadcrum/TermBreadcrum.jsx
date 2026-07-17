import React from 'react';
import './TermBreadcrum.css';
import bgImage from '../../assets/img1.jpg'; // Adjust path based on your exact folder structure

const TermBreadcrum = () => {
  return (
    <div 
      className="TermBreadcrum" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay to match the dim, elegant lighting in the reference image */}
      <div className="TermBreadcrum-overlay">
        <div className="TermBreadcrum-content">
          <span className="TermBreadcrum-subtitle">explore</span>
          <h1 className="TermBreadcrum-title">Terms of Service</h1>
        </div>
      </div>
    </div>
  );
};

export default TermBreadcrum;