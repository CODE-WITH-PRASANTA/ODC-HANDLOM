import React, { useState } from 'react';
import './DashboardCategory.css';

const properties = [
  { id: 1, img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=100&q=80', name: 'Royal Galaxy', value: '24,567', percent: 40 },
  { id: 2, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=100&q=80', name: 'Skyline', value: '18,392', percent: 30 },
  { id: 3, img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=100&q=80', name: 'Oceanic', value: '12,856', percent: 20 },
  { id: 4, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=100&q=80', name: 'Elite Square', value: '7,125', percent: 12 },
  { id: 5, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=100&q=80', name: 'Green View', value: '2,421', percent: 4 },
];

const salesStatuses = [
  { id: 1, color: '#3B82F6', label: 'On Sale', value: '3,452', percent: 38 },
  { id: 2, color: '#10B981', label: 'In Progress', value: '2,145', percent: 24 },
  { id: 3, color: '#F59E0B', label: 'Sold', value: '2,856', percent: 32 },
  { id: 4, color: '#EF4444', label: 'Canceled', value: '492', percent: 6 },
];

const totalSalesData = [
  { id: 1, label: 'This Week', value: '$48,560', color: '#3B82F6' },
  { id: 2, label: 'This Month', value: '$145,682', color: '#10B981' },
  { id: 3, label: 'This Quarter', value: '$456,985', color: '#F59E0B' },
  { id: 4, label: 'This Year', value: '$1,245,789', color: '#EF4444' },
];

const recentSales = [
  { property: 'Royal Galaxy', buyer: 'John Doe', amount: '$2.4M', status: 'Sold', time: '2h ago', statusBg: '#E6F4EA', statusColor: '#1E8E3E' },
  { property: 'Skyline', buyer: 'Maria Smith', amount: '$1.8M', status: 'On Sale', time: '5h ago', statusBg: '#E8F0FE', statusColor: '#1A73E8' },
  { property: 'Oceanic', buyer: 'Robert Brown', amount: '$1.2M', status: 'In Progress', time: '1d ago', statusBg: '#FEF7E0', statusColor: '#B06000' },
  { property: 'Elite Square', buyer: 'James Wilson', amount: '$750K', status: 'Sold', time: '2d ago', statusBg: '#E6F4EA', statusColor: '#1E8E3E' },
  { property: 'Green View', buyer: 'Linda Taylor', amount: '$450K', status: 'Canceled', time: '3d ago', statusBg: '#FCE8E6', statusColor: '#C5221F' },
];

const DashboardCategory = () => {
  const [, setActiveCard] = useState(null);

  const handleViewAll = (cardName) => {
    setActiveCard(cardName);
    console.log(`View All clicked for ${cardName}`);
  };

  const CardHeader = ({ title, viewAllAction }) => (
    <div className="card-header">
      <h3 className="card-title">{title}</h3>
      <button className="view-all-button" onClick={viewAllAction}>
        View All <span className="arrow">→</span>
      </button>
    </div>
  );

  return (
    <div className="dashboard-category">
      
      {/* 1. Top Properties */}
      <div className="dashboard-card">
        <CardHeader title="Top Properties" viewAllAction={() => handleViewAll('Top Properties')} />
        <div className="card-content properties-list">
          {properties.map((prop) => (
            <div key={prop.id} className="property-item">
              <img src={prop.img} alt={prop.name} className="property-thumbnail" />
              <span className="property-name">{prop.name}</span>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${prop.percent}%` }}></div>
              </div>
              <span className="property-value">{prop.value}</span>
              <span className="property-percent">{prop.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Sell Status */}
      <div className="dashboard-card">
        <CardHeader title="Sell Status" viewAllAction={() => handleViewAll('Sell Status')} />
        <div className="card-content sell-status-content">
          <div className="donut-chart-container">
            <svg viewBox="0 0 36 36" className="donut-chart">
              {salesStatuses.map((status, index) => {
                const strokeDasharray = `${status.percent} ${100 - status.percent}`;
                const strokeDashoffset = index === 0 ? 25 : 25 - salesStatuses.slice(0, index).reduce((sum, s) => sum + s.percent, 0);
                return (
                  <circle
                    key={status.id}
                    className="donut-segment"
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke={status.color}
                    strokeWidth="3.8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                  />
                );
              })}
              <g className="donut-text">
                <text x="18" y="16.5" className="donut-number">8,945</text>
                <text x="18" y="21.5" className="donut-label">Total Sales</text>
              </g>
            </svg>
          </div>

          <div className="status-legend">
            {salesStatuses.map((status) => (
              <div key={status.id} className="status-legend-item">
                <div className="status-label-group">
                  <span className="status-dot" style={{ backgroundColor: status.color }}></span>
                  <span className="status-label">{status.label}</span>
                </div>
                <span className="status-value">{status.value} ({status.percent}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Total Sales */}
      <div className="dashboard-card">
        <CardHeader title="Total Sales" viewAllAction={() => handleViewAll('Total Sales')} />
        <div className="card-content total-sales-content">
          {totalSalesData.map((item) => (
            <div key={item.id} className="sales-item">
              <div className="sales-left">
                <span className="sales-indicator" style={{ backgroundColor: item.color }}></span>
                <span className="sales-period">{item.label}</span>
              </div>
              <span className="sales-amount">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Recent Sales */}
      <div className="dashboard-card">
        <CardHeader title="Recent Sales" viewAllAction={() => handleViewAll('Recent Sales')} />
        <div className="card-content table-responsive">
          <table className="recent-sales-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Buyer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale, index) => (
                <tr key={index}>
                  <td className="property-cell">{sale.property}</td>
                  <td>{sale.buyer}</td>
                  <td className="amount-cell">{sale.amount}</td>
                  <td>
                    <span 
                      className="status-badge" 
                      style={{ backgroundColor: sale.statusBg, color: sale.statusColor }}
                    >
                      {sale.status}
                    </span>
                  </td>
                  <td className="time-cell">{sale.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DashboardCategory;