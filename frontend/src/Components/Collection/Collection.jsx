import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Collection.css';
import card1 from '../../assets/01.webp';
import card2 from '../../assets/02.webp';
import card3 from '../../assets/03.webp';

const CARDS = [
  { id: 1, img: card1, alt: 'Travel Baggage Blue' },
  { id: 2, img: card2, alt: 'Winter Collection Purple' },
  { id: 3, img: card3, alt: 'Travel Baggage Orange' },
];

const AUTOPLAY_MS = 5500;
const TRANSITION_MS = 650;
const SWIPE_THRESHOLD = 50;

const Collection = () => {
  // Clone the last slide to the front and the first slide to the back
  // so the track can slide "past the end" and jump back invisibly —
  // this is what makes the loop feel infinite instead of snapping backwards.
  const slides = [CARDS[CARDS.length - 1], ...CARDS, CARDS[0]];

  const [currentIndex, setCurrentIndex] = useState(1); // 1 = real first slide
  const [isAnimating, setIsAnimating] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const jumpTimeoutRef = useRef(null);

  const goNext = useCallback(() => {
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const goPrev = useCallback(() => {
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const goToDot = (dotIndex) => {
    setIsAnimating(true);
    setCurrentIndex(dotIndex + 1);
  };

  // Seamless wrap: after sliding onto a clone, silently jump back
  // to the matching real slide with the transition switched off.
  useEffect(() => {
    if (currentIndex === slides.length - 1) {
      jumpTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(1);
      }, TRANSITION_MS);
    } else if (currentIndex === 0) {
      jumpTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(slides.length - 2);
      }, TRANSITION_MS);
    }
    return () => clearTimeout(jumpTimeoutRef.current);
  }, [currentIndex, slides.length]);

  // Re-enable the transition on the next paint after a silent jump,
  // so the jump itself is invisible but future slides still animate.
  useEffect(() => {
    if (!isAnimating) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => setIsAnimating(true));
        jumpTimeoutRef.current = raf2;
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [isAnimating]);

  // Autoplay, paused on hover / touch / focus
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, goNext]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  };

  // Touch / swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setIsPaused(true);
  };
  const handleTouchMove = (e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const handleTouchEnd = () => {
    if (touchDeltaX.current > SWIPE_THRESHOLD) goPrev();
    else if (touchDeltaX.current < -SWIPE_THRESHOLD) goNext();
    setIsPaused(false);
  };

  const activeDot = (currentIndex - 1 + CARDS.length) % CARDS.length;

  return (
    <section
      className="collection-slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      <div
        className="collection-slider-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isAnimating
            ? `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`
            : 'none',
        }}
      >
        {slides.map((card, i) => (
          <div
            className="collection-card-item"
            key={`${card.id}-${i}`}
            aria-hidden={i !== currentIndex}
          >
            <img src={card.img} alt={card.alt} draggable="false" />
            <div className="collection-card-overlay">
              <span className="collection-card-eyebrow">Collection</span>
              <h2 className="collection-card-title">{card.alt}</h2>
            </div>
          </div>
        ))}
      </div>

      <button className="scroll-arrow arrow-left" onClick={goPrev} aria-label="Previous slide">
        &#10094;
      </button>
      <button className="scroll-arrow arrow-right" onClick={goNext} aria-label="Next slide">
        &#10095;
      </button>

      <div className="collection-dots" role="tablist" aria-label="Slide navigation">
        {CARDS.map((card, i) => (
          <button
            key={card.id}
            className={`collection-dot ${i === activeDot ? 'is-active' : ''}`}
            onClick={() => goToDot(i)}
            role="tab"
            aria-selected={i === activeDot}
            aria-label={`Go to slide ${i + 1}: ${card.alt}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Collection;