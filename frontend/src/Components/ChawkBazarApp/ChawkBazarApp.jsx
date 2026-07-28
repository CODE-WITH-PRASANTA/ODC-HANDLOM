import React from "react";
import "./ChawkBazarApp.css";

import phoneImage from "../../assets/app1.webp";
import appStore from "../../assets/app2.svg";
import googlePlay from "../../assets/app3.svg";

import { FaApple, FaGooglePlay } from "react-icons/fa";

const ChawkBazarApp = () => {
  return (
    <section className="ChawkBazarApp">
      <div className="ChawkBazarApp-container">

        <div className="ChawkBazarApp-left">

          <span className="ChawkBazarApp-subtitle">
            The ChawkBazar App
          </span>

          <h2 className="ChawkBazarApp-title">
            Share Your <strong>Ideas</strong> & Shop
            <br />
            Endless <strong>Inspiration</strong>
          </h2>

          <div className="ChawkBazarApp-buttons">

            <a href="/" className="ChawkBazarApp-storeBtn">

              <div className="ChawkBazarApp-icon">
                <FaApple />
              </div>

              <div className="ChawkBazarApp-text">
                <span>Available on the</span>
                <h5>App Store</h5>
              </div>

            </a>

            <a href="/" className="ChawkBazarApp-storeBtn">

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

        <div className="ChawkBazarApp-right">

          <img
            src={phoneImage}
            alt="ChawkBazar Mobile App"
          />

        </div>

      </div>
    </section>
  );
};

export default ChawkBazarApp;