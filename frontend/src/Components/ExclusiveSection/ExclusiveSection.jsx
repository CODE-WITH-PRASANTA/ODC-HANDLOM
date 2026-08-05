import React from 'react';
import './ExclusiveSection.css';
import womanImg from '../../assets/20.png';
import manImg from '../../assets/21.png';

const ExclusiveSection = () => {
  return (
    <section className="exclusive-section" id="exclusive-section" aria-label="Exclusive Collections">
      <div className="exclusive-container">
        
        {/* Women Card */}
        <div className="exclusive-card exclusive-card--woman">
          <div className="bg-text-wrapper">
            <span className="bg-label">NEW COLLECTION</span>
            <h1 className="bg-year">20</h1>
          </div>
          
          <div className="img-wrapper">
            <img src={womanImg} alt="Women's Exclusive Fashion" className="exclusive-img" loading="lazy" />
          </div>

          <button className="exclusive-btn" type="button">
            <span>#WOMEN EXCLUSIVE</span>
          </button>
        </div>

        {/* Men Card */}
        <div className="exclusive-card exclusive-card--man">
          <div className="bg-text-wrapper">
            <span className="bg-label">LIMITED EDITION</span>
            <h1 className="bg-year">21</h1>
          </div>

          <div className="img-wrapper">
            <img src={manImg} alt="Men's Exclusive Fashion" className="exclusive-img" loading="lazy" />
          </div>

          <button className="exclusive-btn" type="button">
            <span>#MEN EXCLUSIVE</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default ExclusiveSection;