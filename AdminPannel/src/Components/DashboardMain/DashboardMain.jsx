import React, { useState } from 'react';
import './DashboardMain.css';
 
const Icons = {
  TotalOrders: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  ),
  TotalSales: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ),
  NewCustomers: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  Revenue: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  ),
  AvgOrderValue: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  ),
  Refunds: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
      <line x1="6" y1="12" x2="10" y2="12"></line>
    </svg>
  ),
  Calendar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  ArrowUp: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
  )
};

const DashboardMain = () => {
  const [selectedDate, setSelectedDate] = useState('2025-07-27');

  const getFormattedDate = (dateString) => {
    if (!dateString) return '';
    const dateObj = new Date(dateString + 'T00:00:00');
    
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('en-US', { month: 'long' });
    const year = dateObj.getFullYear();
    const weekday = dateObj.toLocaleString('en-US', { weekday: 'long' });

    return `${day} ${month} ${year}, ${weekday}`;
  };

  const metricsData = [
    {
      id: 'total-orders',
      title: 'Total Orders',
      value: '75',
      trend: '12%',
      compareText: 'vs yesterday',
      IconComponent: Icons.TotalOrders,
      iconClass: 'total-orders'
    },
    {
      id: 'total-sales',
      title: 'Total Sales',
      value: '$5,231',
      trend: '18%',
      compareText: 'vs yesterday',
      IconComponent: Icons.TotalSales,
      iconClass: 'total-sales'
    },
    {
      id: 'new-customers',
      title: 'New Customers',
      value: '42',
      trend: '8%',
      compareText: 'vs yesterday',
      IconComponent: Icons.NewCustomers,
      iconClass: 'new-customers'
    },
    {
      id: 'revenue',
      title: 'Revenue',
      value: '$4,231',
      trend: '15%',
      compareText: 'vs yesterday',
      IconComponent: Icons.Revenue,
      iconClass: 'revenue'
    },
    {
      id: 'avg-order-value',
      title: 'Avg. Order Value',
      value: '$65.65',
      trend: '10%',
      compareText: 'vs yesterday',
      IconComponent: Icons.AvgOrderValue,
      iconClass: 'avg-order-value'
    },
    {
      id: 'refunds',
      title: 'Refunds',
      value: '5',
      trend: '5%',
      compareText: 'vs yesterday',
      IconComponent: Icons.Refunds,
      iconClass: 'refunds'
    }
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {/* Background Store Sketch Watermark */}
        <div className="dashboard-background-art">
          <svg viewBox="0 0 200 120" fill="none" stroke="#C4A482" strokeWidth="0.8" strokeOpacity="0.45">
            <path d="M 20 40 L 100 15 L 180 40 L 180 110 L 20 110 Z" />
            <path d="M 25 40 Q 37 55 50 40 Q 62 55 75 40 Q 87 55 100 40 Q 112 55 125 40 Q 137 55 150 40 Q 162 55 175 40" />
            <rect x="80" y="65" width="40" height="45" />
            <rect x="35" y="65" width="30" height="25" />
            <rect x="135" y="65" width="30" height="25" />
          </svg>
        </div>

        {/* Header Section */}
        <header className="dashboard-header">
          <div className="header-title-section">
            <h1 className="dashboard-title">Today's Snapshot</h1>
            <p className="dashboard-subtitle">Overview of your key business metrics</p>
          </div>

          {/* Calendar Date Picker */}
          <div className="calendar-wrapper">
            <div className="calendar-button">
              <span className="calendar-icon-wrapper">
                <Icons.Calendar />
              </span>
              <span className="calendar-date-text">{getFormattedDate(selectedDate)}</span>
            </div>
            <input
              type="date"
              className="calendar-hidden-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </header>

        {/* 2-Row / 3-Column Grid Container */}
        <div className="dashboard-grid">
          {metricsData.map((metric) => {
            const Icon = metric.IconComponent;
            return (
              <div key={metric.id} className="metric-card">
                <div className="card-content">
                  <div className={`icon-box ${metric.iconClass}`}>
                    <Icon />
                  </div>
                  <div className="card-info">
                    <h3 className="card-title">{metric.title}</h3>
                    <div className="card-value">{metric.value}</div>
                  </div>
                </div>
                
                <div className="card-trend">
                  <span className="trend-percent">
                    <Icons.ArrowUp />
                    {metric.trend}
                  </span>
                  <span className="trend-label">{metric.compareText}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;