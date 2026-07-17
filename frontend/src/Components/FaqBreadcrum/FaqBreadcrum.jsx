import React from 'react';
import './FaqBreadcrum.css';
import bgImage from '../../assets/img1.jpg'; // Adjust file path and extension to match your assets folder

const FaqBreadcrum = () => {
  return (
    <div 
      className="FaqBreadcrum" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay to match the exact moody lighting of the reference design */}
      <div className="FaqBreadcrum-overlay">
        <div className="FaqBreadcrum-content">
          <span className="FaqBreadcrum-subtitle">explore</span>
          <h1 className="FaqBreadcrum-title">Frequently Asked Questions</h1>
        </div>
      </div>
    </div>
  );
};

export default FaqBreadcrum;