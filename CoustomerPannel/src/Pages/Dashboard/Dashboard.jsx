import React, { useState } from 'react';
import './Dashboard.css';

// Asset Imports
import odcLogo from '../../assets/react.svg';
import referenceBanner from '../../assets/hero.png';

const stats = [
  { id: 1, label: 'Total Orders', value: '24', icon: '📋', link: 'View all orders →' },
  { id: 2, label: 'Pending Orders', value: '3', icon: '⏳', link: 'Track your order →' },
  { id: 3, label: 'Delivered Orders', value: '18', icon: '🚚', link: 'View history →' },
  { id: 4, label: 'Total Spent', value: '₹24,560', icon: '💰', link: 'View details →' },
];

const recentOrdersData = [
  { id: '#ODC1256', name: 'Handloom Dupatta', date: 'May 12, 2025', status: 'Delivered', price: '₹1,299' },
  { id: '#ODC1255', name: 'Handloom Saree', date: 'May 10, 2025', status: 'Shipped', price: '₹3,599' },
  { id: '#ODC1254', name: 'Handloom Stole', date: 'May 08, 2025', status: 'Processing', price: '₹899' },
  { id: '#ODC1253', name: 'Handloom Kurta', date: 'May 05, 2025', status: 'Delivered', price: '₹1,499' },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered': return 'status-delivered';
      case 'Shipped': return 'status-shipped';
      case 'Processing': return 'status-processing';
      default: return '';
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-container">
          <img src={odcLogo} alt="ODC Logo" className="brand-logo" />

          <div className="search-box">
            <input
              type="text"
              placeholder="Search for products, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>

          <div className="header-actions">
            <button className="action-item">
              🤍 Wishlist <span className="badge-count">(2)</span>
            </button>
            <button className="action-item">
              🛒 Cart
              <span className="cart-badge">3</span>
            </button>
            <button className="action-item">🔔</button>

            <div className="user-profile">
              <div className="avatar">J</div>
              <div className="user-info">
                <p>John Doe</p>
                <p>Welcome back!</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="main-content">
        {/* Left Side */}
        <div className="left-column">
          <div>
            <h1 className="welcome-title">Welcome back, John! 👋</h1>
            <p className="welcome-subtitle">Here's what's happening with your account today.</p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.id} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
                <a href="#" className="stat-link">{stat.link}</a>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="card-container">
            <div className="card-header">
              <h2 className="card-title">Recent Orders</h2>
              <a href="#" className="view-all-link">View All Orders →</a>
            </div>

            <div className="orders-list">
              {recentOrdersData.map((order) => (
                <div key={order.id} className="order-item">
                  <div className="product-img-placeholder">Product</div>
                  <div className="order-details">
                    <div>
                      <p className="product-name">{order.name}</p>
                      <p className="order-meta">Order ID: {order.id}</p>
                      <p className="order-meta">{order.date}</p>
                    </div>
                    <div>
                      <span className={`status-badge ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="order-price">{order.price}</p>
                    </div>
                    <div>
                      <button className="btn-secondary">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Highlights */}
          <div className="highlights-grid">
            <div className="highlight-card">
              <span className="highlight-icon">🛡️</span>
              <div>
                <p className="highlight-title">Secure Payments</p>
                <p className="highlight-desc">Your payments are safe and encrypted.</p>
              </div>
            </div>
            <div className="highlight-card">
              <span className="highlight-icon">🔄</span>
              <div>
                <p className="highlight-title">Easy Returns</p>
                <p className="highlight-desc">Hassle-free returns within 7 days.</p>
              </div>
            </div>
            <div className="highlight-card">
              <span className="highlight-icon">🏅</span>
              <div>
                <p className="highlight-title">Quality Products</p>
                <p className="highlight-desc">Handmade with love and heritage.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="right-column">
          {/* Banner Card */}
          <div className="brand-banner-card">
            <img src={referenceBanner} alt="Banner" className="banner-overlay-img" />
            <div className="banner-text">Bringing Tradition To Your Lifestyle</div>
          </div>

          {/* Account Overview */}
          <div className="card-container">
            <h2 className="card-title">Account Overview</h2>
            <div className="overview-list">
              <div className="overview-item">
                <span>👤</span>
                <div>
                  <p className="overview-label">Full Name</p>
                  <p className="overview-value">John Doe</p>
                </div>
              </div>
              <div className="overview-item">
                <span>✉️</span>
                <div>
                  <p className="overview-label">Email Address</p>
                  <p className="overview-value">john.doe@example.com</p>
                </div>
              </div>
              <div className="overview-item">
                <span>📞</span>
                <div>
                  <p className="overview-label">Phone Number</p>
                  <p className="overview-value">+91 98765 43210</p>
                </div>
              </div>
              <div className="overview-item">
                <span>📍</span>
                <div>
                  <p className="overview-label">Default Address</p>
                  <p className="overview-value">Bhubaneswar, Odisha, India</p>
                </div>
              </div>
            </div>
            <button className="btn-outline">Edit Profile</button>
          </div>

          {/* Support Ticket */}
          <div className="card-container">
            <h3 className="card-title">Need Help?</h3>
            <p className="welcome-subtitle">Have an issue with your order or account?</p>
            <ul className="help-list">
              <li><span className="check-icon">✓</span> Track your order</li>
              <li><span className="check-icon">✓</span> Return & Refunds</li>
              <li><span className="check-icon">✓</span> Product Support</li>
              <li><span className="check-icon">✓</span> General Queries</li>
            </ul>
            <button className="btn-primary">Create Support Ticket</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;