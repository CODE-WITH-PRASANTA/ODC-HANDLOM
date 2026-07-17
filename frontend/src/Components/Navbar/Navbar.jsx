import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.svg';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Flash Sale', path: '/flash-sale' },
    { title: 'Products', path: '/products' },
    { title: 'Trending', path: '/trending' },
    { title: 'On Selling', path: '/on-selling' },
    { title: 'New Arrival', path: '/new-arrival' },
    { title: 'Gallery', path: '/gallery' },
    { title: 'FAQ', path: '/faq' },
    { title: 'Contact Us', path: '/contact-us' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-wrapper">
        
        {/* Logo Section */}
        <div className="navbar-logo-section">
          <a href="/" className="navbar-logo-link">
            <img src={logo} alt="Logo" className="navbar-logo-img" />
          </a>
        </div>

        {/* Hamburger Menu (Mobile Only) */}
        <button 
          className={`navbar-hamburger ${isMobileMenuOpen ? 'navbar-hamburger-active' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-hamburger-bar"></span>
          <span className="navbar-hamburger-bar"></span>
          <span className="navbar-hamburger-bar"></span>
        </button>

        {/* Navigation Links */}
        <ul className={`navbar-links-list ${isMobileMenuOpen ? 'navbar-links-list-mobile-open' : ''}`}>
          {navLinks.map((link, index) => (
            <li key={index} className="navbar-link-item">
              {/* Added a data attribute to keep text steady during bold transitions */}
              <a href={link.path} className="navbar-link-anchor" data-text={link.title}>
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side Icons & Actions */}
        <div className="navbar-actions-section">
          {/* Search Icon */}
          <button className="navbar-action-btn" aria-label="Search">
            <svg className="navbar-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Sign In Link */}
          <a href="/signin" className="navbar-signin-link">Sign In</a>

          {/* Cart Link with Badge (Changed from button to anchor tag with path) */}
          <a href="/cart" className="navbar-action-btn navbar-cart-btn" aria-label="Cart">
            <svg className="navbar-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className="navbar-cart-badge">0</span>
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;