import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import './DashboardOverview.css';

// --- DATA DEFINITIONS --- //
 
const salesData = [
  { date: '1 May', totalSales: 42000, orders: 20000 },
  { date: '6 May', totalSales: 70000, orders: 32000 },
  { date: '11 May', totalSales: 52000, orders: 28000 },
  { date: '16 May', totalSales: 88000, orders: 50000 },
  { date: '21 May', totalSales: 60000, orders: 30000 },
  { date: '26 May', totalSales: 85000, orders: 58000 },
  { date: '31 May', totalSales: 50000, orders: 30000 },
];

const userStatusData = [
  { name: 'Active', value: 12650, percentage: '54%', color: '#0f9d58' },
  { name: 'Inactive', value: 6125, percentage: '26%', color: '#2b58bf' },
  { name: 'New Users', value: 3250, percentage: '14%', color: '#f4b400' },
  { name: 'Banned', value: 850, percentage: '4%', color: '#d93025' },
  { name: 'Unverified', value: 445, percentage: '2%', color: '#7b1fa2' },
];

const topProducts = [
  { id: 1, name: 'Womens Dress', category: 'Fashion', count: '12.5K', badgeBg: '#a81c1c', badgeColor: '#ffffff', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&q=80' },
  { id: 2, name: 'Summer Dress', category: 'Fashion', count: '11.2K', badgeBg: '#e28843', badgeColor: '#ffffff', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100&q=80' },
  { id: 3, name: 'T-Shirt', category: 'Fashion', count: '9.8K', badgeBg: '#f2a900', badgeColor: '#ffffff', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100&q=80' },
  { id: 4, name: 'Denim Jacket', category: 'Fashion', count: '7.6K', badgeBg: '#f0f0f0', badgeColor: '#666666', image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=100&q=80' },
  { id: 5, name: 'Long Top', category: 'Fashion', count: '6.3K', badgeBg: '#f0f0f0', badgeColor: '#666666', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=100&q=80' },
];

const DashboardOverview = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Last 30 Days');

  const handleTimeframeChange = (e) => {
    setSelectedTimeframe(e.target.value);
  };

  const handleViewAll = () => {
    alert('Navigating to Top Sellers / Products details page');
  };

  return (
    <div className="dashboard-overview-container">
      {/* 1. Sales Overview Card */}
      <div className="dashboard-card sales-overview-card">
        <div className="card-header">
          <h2 className="card-title">Sales Overview</h2>
          <div className="select-wrapper">
            <select
              className="timeframe-select"
              value={selectedTimeframe}
              onChange={handleTimeframeChange}
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
            </select>
          </div>
        </div>

        <div className="legend-and-menu">
          <div className="chart-legend">
            <span className="legend-item">
              <span className="dot dot-sales"></span> Total Sales
            </span>
            <span className="legend-item">
              <span className="dot dot-orders"></span> Orders
            </span>
          </div>
          <button className="hamburger-btn" aria-label="Chart Options">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="chart-container line-chart-wrapper">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b0000" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#8b0000" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e28843" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#e28843" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} stroke="#888" tick={{ fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                stroke="#888"
                tick={{ fontSize: 12 }}
                tickFormatter={(val) => (val === 0 ? '0' : `${val / 1000}K`)}
                domain={[0, 100000]}
              />
              <Tooltip formatter={(value) => [`${value.toLocaleString()}`, '']} />
              <Area
                type="monotone"
                dataKey="totalSales"
                stroke="#8b0000"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#salesGrad)"
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#e28843"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#ordersGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. User Status Card */}
      <div className="dashboard-card user-status-card">
        <div className="card-header">
          <h2 className="card-title">User Status</h2>
        </div>

        <div className="user-status-content">
          <div className="donut-chart-wrapper">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie
                  data={userStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {userStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value.toLocaleString(), 'Users']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center-text">
              <span className="total-number">23,320</span>
              <span className="total-label">Total Users</span>
            </div>
          </div>

          <div className="status-legend-list">
            {userStatusData.map((status, index) => (
              <div className="status-legend-item" key={index}>
                <span className="status-dot" style={{ backgroundColor: status.color }}></span>
                <div className="status-info">
                  <div className="status-name">{status.name}</div>
                  <div className="status-count">
                    {status.value.toLocaleString()} ({status.percentage})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Top Sellers / Products Card */}
      <div className="dashboard-card top-sellers-card">
        <div className="card-header">
          <h2 className="card-title">Top Sellers / Products</h2>
          <button className="view-all-btn" onClick={handleViewAll}>
            View All
          </button>
        </div>

        <div className="products-list">
          {topProducts.map((product) => (
            <div className="product-item" key={product.id}>
              <div className="product-rank-img">
                <span
                  className="rank-badge"
                  style={{ backgroundColor: product.badgeBg, color: product.badgeColor }}
                >
                  {product.id}
                </span>
                <img src={product.image} alt={product.name} className="product-img" />
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <span className="product-category">{product.category}</span>
              </div>
              <div className="product-sales-count">{product.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;