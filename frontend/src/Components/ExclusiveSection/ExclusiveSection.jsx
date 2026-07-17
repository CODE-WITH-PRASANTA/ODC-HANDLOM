import React from 'react';
import './ExclusiveSection.css';
import womanImg from '../../assets/20.png';
import manImg from '../../assets/21.png';

const ExclusiveSection = () => {
  return (
    <section className="exclusive-section">
      <div className="exclusive-card exclusive-card--woman">
        <div className="bg-text-wrapper">
          <span className="bg-label">NEW YEAR</span>
          <h1 className="bg-year">20</h1>
        </div>
        <img src={womanImg} alt="Women" className="exclusive-img" />
        <button className="exclusive-btn">#WOMEN EXCLUSIVE</button>
      </div>

      <div className="exclusive-card exclusive-card--man">
        <div className="bg-text-wrapper">
          <span className="bg-label">EXCLUSIVE</span>
          <h1 className="bg-year">21</h1>
        </div>
        <img src={manImg} alt="Men" className="exclusive-img" />
        <button className="exclusive-btn">#MEN EXCLUSIVE</button>
      </div>
    </section>
  );
};

export default ExclusiveSection;