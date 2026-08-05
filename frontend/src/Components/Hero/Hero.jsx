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
    <section className="hero-container" aria-label="Featured collections">
      {/* Row 1 */}
      <div
        className="hero-grid-item hero-item-wide hero-flash-hover"
        style={{ '--hero-img': `url(${banner1})`, '--i': 0 }}
        role="img"
        aria-label="Featured collection 1"
      ></div>
      <div
        className="hero-grid-item hero-item-square hero-flash-hover"
        style={{ '--hero-img': `url(${banner2})`, '--i': 1 }}
        role="img"
        aria-label="Featured collection 2"
      ></div>
      <div
        className="hero-grid-item hero-item-square hero-flash-hover"
        style={{ '--hero-img': `url(${banner3})`, '--i': 2 }}
        role="img"
        aria-label="Featured collection 3"
      ></div>

      {/* Row 2 */}
      <div
        className="hero-grid-item hero-item-square hero-flash-hover"
        style={{ '--hero-img': `url(${banner4})`, '--i': 3 }}
        role="img"
        aria-label="Featured collection 4"
      ></div>
      <div
        className="hero-grid-item hero-item-square hero-flash-hover"
        style={{ '--hero-img': `url(${banner5})`, '--i': 4 }}
        role="img"
        aria-label="Featured collection 5"
      ></div>
      <div
        className="hero-grid-item hero-item-wide hero-flash-hover"
        style={{ '--hero-img': `url(${banner6})`, '--i': 5 }}
        role="img"
        aria-label="Featured collection 6"
      ></div>
    </section>
  );
};

export default Hero;