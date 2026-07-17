import React from 'react';
import './Hero.css';
import banner1 from '../../assets/banner-1.webp';
import banner2 from '../../assets/banner-2.webp';
import banner3 from '../../assets/banner-3.webp';
import banner4 from '../../assets/banner-4.webp';
import banner5 from '../../assets/banner-5.webp';
import banner6 from '../../assets/banner-6.webp';

const Hero = () => {
  return (
    <section className="hero-container">
      {/* Row 1 */}
      <div className="hero-grid-item hero-item-wide hero-flash-hover" style={{ backgroundImage: `url(${banner1})` }}></div>
      <div className="hero-grid-item hero-item-square hero-flash-hover" style={{ backgroundImage: `url(${banner2})` }}></div>
      <div className="hero-grid-item hero-item-square hero-flash-hover" style={{ backgroundImage: `url(${banner3})` }}></div>
      
      {/* Row 2 */}
      <div className="hero-grid-item hero-item-square hero-flash-hover" style={{ backgroundImage: `url(${banner4})` }}></div>
      <div className="hero-grid-item hero-item-square hero-flash-hover" style={{ backgroundImage: `url(${banner5})` }}></div>
      <div className="hero-grid-item hero-item-wide hero-flash-hover" style={{ backgroundImage: `url(${banner6})` }}></div>
    </section>
  );
};

export default Hero;