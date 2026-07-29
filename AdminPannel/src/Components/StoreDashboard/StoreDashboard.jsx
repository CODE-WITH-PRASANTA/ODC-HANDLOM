import React from 'react';
import './StoreDashboard.css';

const StoreStatCard = ({ icon, title, count, changeText }) => {
  return (
    <div className="store-stat-card">
      <div className="store-stat-card-header">
        <div className="store-stat-icon-container">{icon}</div>
        <div className="store-stat-title-count">
          <span className="store-stat-title">{title}</span>
          <h3 className="store-stat-count">{count}</h3>
        </div>
      </div>
      <div className="store-stat-card-footer">
        <span className="store-stat-up-arrow">↑</span>
        <span className="store-stat-change-text">{changeText}</span>
      </div>
    </div>
  );
};

const StoreCategoryIcon = () => (
  <div className="store-icon-bg store-brown-bg">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9A7B4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <rect x="8" y="8" width="8" height="8" />
    </svg>
  </div>
);

const StoreCollectionIcon = () => (
  <div className="store-icon-bg store-brown-bg">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9A7B4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  </div>
);

const StoreCustomerIcon = () => (
  <div className="store-icon-bg store-red-bg">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A84343" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  </div>
);

const StoreReviewIcon = () => (
  <div className="store-icon-bg store-green-bg">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B8253" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 9h8" />
      <path d="M8 13h6" />
    </svg>
  </div>
);

const StoreCouponIcon = () => (
  <div className="store-icon-bg store-red-bg">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A84343" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  </div>
);

const StoreDashboard = () => {
  const storeStatsData = [
    { icon: <StoreCategoryIcon />, title: 'Active Categories', count: '68', changeText: '3 this month' },
    { icon: <StoreCollectionIcon />, title: 'Active Collections', count: '24', changeText: '2 this month' },
    { icon: <StoreCustomerIcon />, title: 'Total Customers', count: '1,845', changeText: '156 this month' },
    { icon: <StoreReviewIcon />, title: 'Total Reviews', count: '956', changeText: '85 this month' },
    { icon: <StoreCouponIcon />, title: 'Total Coupons', count: '32', changeText: '5 this month' },
  ];

  return (
    <div className="store-dashboard">
      <div className="store-dashboard-overview">
        <h2 className="store-dashboard-title">Store Overview</h2>
        <div className="store-dashboard-grid">
          {storeStatsData.map((stat, index) => (
            <StoreStatCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              count={stat.count}
              changeText={stat.changeText}
            />
          ))}
        </div>
      </div>

      <div className="store-dashboard-promo">
        <div className="store-dashboard-promo-overlay"></div>
        <div className="store-dashboard-promo-content">
          <h2 className="store-dashboard-promo-heading">
            Celebrate Tradition<br />Grow Handloom Pride
          </h2>
          <button className="store-dashboard-analytics-btn">View Sales Analytics</button>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;