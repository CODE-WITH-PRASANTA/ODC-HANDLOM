import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Top Section: Links Columns */}
      <div className="footer-links-grid">
        
        {/* Social Column */}
        <div className="footer-column">
          <h3 className="footer-column-title">Social</h3>
          <ul className="footer-links-list">
            <li className="footer-link-item">
              <a href="https://instagram.com" className="footer-anchor-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram footer-social-icon"></i> Instagram
              </a>
            </li>
            <li className="footer-link-item">
              <a href="https://twitter.com" className="footer-anchor-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter footer-social-icon"></i> Twitter
              </a>
            </li>
            <li className="footer-link-item">
              <a href="https://facebook.com" className="footer-anchor-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f footer-social-icon"></i> Facebook
              </a>
            </li>
            <li className="footer-link-item">
              <a href="https://youtube.com" className="footer-anchor-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube footer-social-icon"></i> Youtube
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-column">
          <h3 className="footer-column-title">Contact</h3>
          <ul className="footer-links-list">
            <li className="footer-link-item"><a href="/contact-us" className="footer-anchor-link">Contact Us</a></li>
            <li className="footer-link-item"><a href="mailto:yourexample@email.com" className="footer-anchor-link">yourexample@email.com</a></li>
            <li className="footer-link-item"><a href="mailto:example@email.com" className="footer-anchor-link">example@email.com</a></li>
            <li className="footer-link-item"><span className="footer-text-info">Call us: +1 254 568-5479</span></li>
          </ul>
        </div>

        {/* About Column */}
        <div className="footer-column">
          <h3 className="footer-column-title">About</h3>
          <ul className="footer-links-list">
            <li className="footer-link-item"><a href="/support" className="footer-anchor-link">Support Center</a></li>
            <li className="footer-link-item"><a href="/customer-support" className="footer-anchor-link">Customer Support</a></li>
            <li className="footer-link-item"><a href="/about-us" className="footer-anchor-link">About Us</a></li>
            <li className="footer-link-item"><a href="/copyright" className="footer-anchor-link">Copyright</a></li>
          </ul>
        </div>

        {/* Customer Care Column */}
        <div className="footer-column">
          <h3 className="footer-column-title">Customer Care</h3>
          <ul className="footer-links-list">
            <li className="footer-link-item"><a href="/faq" className="footer-anchor-link">FAQ & Helps</a></li>
            <li className="footer-link-item"><a href="/shipping" className="footer-anchor-link">Shipping & Delivery</a></li>
            <li className="footer-link-item"><a href="/returns" className="footer-anchor-link">Return & Exchanges</a></li>
          </ul>
        </div>

        {/* Our Information Column */}
        <div className="footer-column">
          <h3 className="footer-column-title">Our Information</h3>
          <ul className="footer-links-list">
            <li className="footer-link-item"><a href="/privacy-policy" className="footer-anchor-link">Privacy policy update</a></li>
            <li className="footer-link-item"><a href="/terms" className="footer-anchor-link">Terms & conditions</a></li>
            <li className="footer-link-item"><a href="/return-policy" className="footer-anchor-link">Return Policy</a></li>
            <li className="footer-link-item"><a href="/sitemap" className="footer-anchor-link">Site Map</a></li>
          </ul>
        </div>

        {/* Top Categories Column */}
        <div className="footer-column">
          <h3 className="footer-column-title">Top Categories</h3>
          <ul className="footer-links-list">
            <li className="footer-link-item"><a href="/categories/mens-wear" className="footer-anchor-link">Men's Wear</a></li>
            <li className="footer-link-item"><a href="/categories/womens-wear" className="footer-anchor-link">Women's Wear</a></li>
            <li className="footer-link-item"><a href="/categories/kids-wear" className="footer-anchor-link">Kid's Wear</a></li>
            <li className="footer-link-item"><a href="/categories/sports-wear" className="footer-anchor-link">Sports Wear</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Section: Copyright & Payments */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-wrapper">
          <p className="footer-copyright-text">
            Copyright © 2026 <strong>REDQ</strong>. All rights reserved. <span className="footer-developer-credit">Developed by <strong>PR Webstock</strong></span>
          </p>
          
          <div className="footer-payment-gateways">
            {/* Mastercard SVG */}
            <svg className="footer-payment-svg" viewBox="0 0 24 15" width="36" height="22">
              <circle cx="7" cy="7.5" r="7" fill="#EB001B"/>
              <circle cx="17" cy="7.5" r="7" fill="#F79E1B" fillOpacity="0.8"/>
            </svg>

            {/* Visa SVG */}
            <svg className="footer-payment-svg" viewBox="0 0 24 15" width="36" height="22">
              <path d="M0 0h24v15H0z" fill="#fff"/>
              <path d="M10.2 11.4l1.4-6.2h2.2l-1.4 6.2h-2.2zm7.4-6c-.4-.2-1.1-.4-1.9-.4-2.1 0-3.6 1-3.6 2.5 0 1.1 1 1.7 1.8 2.1.8.4 1.1.6 1.1.9 0 .5-.7.8-1.3.8-1.1 0-1.7-.2-2.5-.5l-.3-.2-.4 2.2c.6.3 1.8.5 2.9.5 2.2 0 3.7-1 3.7-2.7 0-1.8-2.6-1.9-2.6-2.7 0-.3.3-.5.9-.6.7-.1 1.3 0 1.9.3l.2.1.3-2.3zm4.4-.2h-1.7c-.5 0-.9.3-1.1.7l-3.9 8.3h2.3l.5-1.2h2.8l.3 1.2h2.1l-1.3-9zm-2.8 6.1l1.1-3 0 0 .7 3h-1.8zm-13-6.1L4 10.1l-.2-1.1C3.3 7.2 1.8 5.8.3 5.5v.1h3.7c.5 0 .9.3 1 1l2.4 7.9h2.3l-3.5-9.1z" fill="#1A1F71"/>
            </svg>

            {/* PayPal SVG */}
            <svg className="footer-payment-svg" viewBox="0 0 24 15" width="36" height="22">
              <path d="M9.1 2.2C8.6 1 7.2.5 5.5.5H1.2C.8.5.5.8.4 1.2L.5 1.1 2.3 12c.1.4.4.6.8.6h2.4l.7-4.1.1-.3h2.4c2.5 0 4.1-1.1 4.7-3.4.3-1.2.1-2.1-.6-2.6zm.4 3.3c-.3 1.5-1.6 1.5-2.8 1.5H5.4l.5-3.1h1.3c1.2 0 2.2 0 2.3 1.6z" fill="#003087"/>
              <path d="M12.9 5.2c-.3-1.2-1.7-1.7-3.4-1.7H5.2c-.4 0-.7.3-.8.7l-1.8 11c0 .3.2.5.5.5h2.5l.8-4.9.1-.4h2.4c2.5 0 4.1-1.1 4.7-3.4.3-1.1.1-2-.5-2.6 0 0 0-.1-.1-.2zm.5 3.3c-.3 1.5-1.6 1.5-2.8 1.5H9.2l.5-3.1h1.3c1.2 0 2.2 0 2.4 1.6z" fill="#0079C1"/>
            </svg>

            {/* JCB SVG */}
            <svg className="footer-payment-svg" viewBox="0 0 24 15" width="36" height="22">
              <rect width="24" height="15" rx="2" fill="#fff"/>
              <path d="M2 2h6v11H2z" fill="#004198"/>
              <path d="M8 2h6v11H8z" fill="#E60012"/>
              <path d="M14 2h8v11h-8z" fill="#008D36"/>
              <text x="12" y="10" fontFamily="sans-serif" fontWeight="bold" fontSize="7" fill="#fff" textAnchor="middle">JCB</text>
            </svg>

            {/* Skrill SVG */}
            <svg className="footer-payment-svg" viewBox="0 0 24 15" width="36" height="22">
              <rect width="24" height="15" rx="2" fill="#50123C"/>
              <text x="12" y="10" fontFamily="sans-serif" fontWeight="bold" fontSize="6" fill="#fff" textAnchor="middle">Skrill</text>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;