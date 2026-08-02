import React from "react";
import "./ChawkBazarApp.css";

import phoneImage from "../../assets/app1.webp";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const ChawkBazarApp = () => {
  return (
    <section className="ChawkBazarApp" id="chawkbazar-app-section" aria-label="Download Mobile App">
      <div className="ChawkBazarApp-container">
        
        {/* Ambient Glow Effects */}
        <div className="app-glow-top"></div>
        <div className="app-glow-bottom"></div>

        {/* Left Info Column */}
        <div className="ChawkBazarApp-left">
          <div className="ChawkBazarApp-badge">
            <span className="badge-dot"></span>
            <span className="ChawkBazarApp-subtitle">THE CHAWKBAZAR APP</span>
          </div>

          <h2 className="ChawkBazarApp-title">
            Share Your <strong>Ideas</strong> & Shop <br />
            Endless <strong>Inspiration</strong>
          </h2>

          <p className="ChawkBazarApp-desc">
            Download our top-rated app to unlock exclusive mobile deals, early access to new arrivals, and instant real-time order tracking.
          </p>

          <div className="ChawkBazarApp-buttons">
            {/* App Store Button */}
            <a 
              href="https://www.apple.com/app-store/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ChawkBazarApp-storeBtn"
            >
              <div className="ChawkBazarApp-icon">
                <FaApple />
              </div>
              <div className="ChawkBazarApp-text">
                <span>Available on the</span>
                <h5>App Store</h5>
              </div>
            </a>

            {/* Google Play Button */}
            <a 
              href="https://play.google.com/store" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ChawkBazarApp-storeBtn"
            >
              <div className="ChawkBazarApp-icon">
                <FaGooglePlay />
              </div>
              <div className="ChawkBazarApp-text">
                <span>Available on the</span>
                <h5>Google Play</h5>
              </div>
            </a>
          </div>
        </div>

        {/* Right Phone Mockup Column */}
        <div className="ChawkBazarApp-right">
          <div className="phone-wrapper">
            <img
              src={phoneImage}
              alt="ChawkBazar Mobile App Preview"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ChawkBazarApp;