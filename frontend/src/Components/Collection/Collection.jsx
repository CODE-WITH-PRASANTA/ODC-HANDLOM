import React, { useState, useEffect } from 'react';
import './Collection.css';
import card1 from '../../assets/01.webp';
import card2 from '../../assets/02.webp';
import card3 from '../../assets/03.webp';

const Collection = () => {
  const cards = [
    { id: 1, img: card1, alt: 'Travel Baggage Blue' },
    { id: 2, img: card2, alt: 'Winter Collection Purple' },
    { id: 3, img: card3, alt: 'Travel Baggage Orange' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handles moving to the next card (Left-to-Right progression)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  // Handles moving to the previous card
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  // Automatically shifts one card over every 5.5 seconds
  useEffect(() => {
    const autoScroll = setInterval(nextSlide, 5500);
    return () => clearInterval(autoScroll);
  }, []);

  return (
    <section className="collection-slider-container">
      {/* Left Scroll Navigation Icon Arrow */}
      <button className="scroll-arrow arrow-left" onClick={prevSlide} aria-label="Previous Slide">
        &#10094;
      </button>

      {/* Slide Viewport Track Wrapper */}
      <div 
        className="collection-slider-track" 
        style={{ transform: `translateX(-${currentIndex * 75}vw)` }}
      >
        {cards.map((card) => (
          <div key={card.id} className="collection-card-item collection-flash-hover">
            <img src={card.img} alt={card.alt} />
          </div>
        ))}
      </div>

      {/* Right Scroll Navigation Icon Arrow */}
      <button className="scroll-arrow arrow-right" onClick={nextSlide} aria-label="Next Slide">
        &#10095;
      </button>
    </section>
  );
};

export default Collection;