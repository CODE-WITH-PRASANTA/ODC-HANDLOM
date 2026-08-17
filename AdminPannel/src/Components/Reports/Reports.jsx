// Reports.jsx
import React, { useState } from 'react';
import { 
  FiShoppingBag, 
  FiDollarSign, 
  FiUsers, 
  FiShoppingCart, 
  FiTrendingUp, 
  FiCalendar, 
  FiDownload, 
  FiChevronDown 
} from 'react-icons/fi';
import './Reports.css';

const Reports = () => {
  const [dateRange, setDateRange] = useState('01 May 2025 - 31 May 2025');
  const [showCalendar, setShowCalendar] = useState(false);
  const [salesView, setSalesView] = useState('Daily');
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to handle report download
  const handleDownload = () => {
    const reportContent = `
Reports Summary (${dateRange})
-----------------------------------
Total Orders: 1,248 (+12.5% vs Apr 2025)
Total Revenue: ₹18,75,420 (+18.3% vs Apr 2025)
Total Customers: 856 (+9.7% vs Apr 2025)
Avg. Order Value: ₹1,503 (+6.2% vs Apr 2025)
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Reports_${dateRange.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="reports-container">
      {/* Top Header Section */}
      <div className="reports-header">
        <div className="reports-breadcrumb">
           <span></span> 
        </div>
        <div className="reports-actions">
          {/* Calendar Date Picker Toggle */}
          <div className="reports-calendar-wrapper">
            <button 
              className="reports-calendar-btn"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <FiCalendar className="reports-icon" />
              <span>{dateRange}</span>
            </button>
            {showCalendar && (
              <div className="reports-calendar-dropdown">
                <p>Select Date Range:</p>
                <input 
                  type="text" 
                  value={dateRange} 
                  onChange={(e) => setDateRange(e.target.value)}
                />
                <button 
                  className="reports-apply-date"
                  onClick={() => setShowCalendar(false)}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Download Report Button */}
          <button className="reports-download-btn" onClick={handleDownload}>
            <FiDownload className="reports-icon" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Cards Grid */}
      <div className="reports-metrics-grid">
        <div className="reports-metric-card">
          <div className="reports-metric-icon-box pink">
            <FiShoppingBag />
          </div>
          <div className="reports-metric-content">
            <span className="reports-metric-title">Total Orders</span>
            <h3 className="reports-metric-value">1,248</h3>
            <span className="reports-metric-trend positive">
              ↑ 12.5% <small>vs Apr 2025</small>
            </span>
          </div>
        </div>

        <div className="reports-metric-card">
          <div className="reports-metric-icon-box gold">
            <FiDollarSign />
          </div>
          <div className="reports-metric-content">
            <span className="reports-metric-title">Total Revenue</span>
            <h3 className="reports-metric-value">₹18,75,420</h3>
            <span className="reports-metric-trend positive">
              ↑ 18.3% <small>vs Apr 2025</small>
            </span>
          </div>
        </div>

        <div className="reports-metric-card">
          <div className="reports-metric-icon-box green">
            <FiUsers />
          </div>
          <div className="reports-metric-content">
            <span className="reports-metric-title">Total Customers</span>
            <h3 className="reports-metric-value">856</h3>
            <span className="reports-metric-trend positive">
              ↑ 9.7% <small>vs Apr 2025</small>
            </span>
          </div>
        </div>

        <div className="reports-metric-card">
          <div className="reports-metric-icon-box purple">
            <FiShoppingCart />
          </div>
          <div className="reports-metric-content">
            <span className="reports-metric-title">Avg. Order Value</span>
            <h3 className="reports-metric-value">₹1,503</h3>
            <span className="reports-metric-trend positive">
              ↑ 6.2% <small>vs Apr 2025</small>
            </span>
          </div>
        </div>
      </div>

      {/* Middle Section: Sales Overview & Top Selling Categories */}
      <div className="reports-middle-grid">
        {/* Sales Overview Chart Section */}
        <div className="reports-card reports-sales-overview">
          <div className="reports-card-header">
            <div className="reports-card-title-wrapper">
              <FiTrendingUp className="reports-section-icon" />
              <h2>Sales Overview</h2>
            </div>
            <div className="reports-dropdown-wrapper">
              <button 
                className="reports-dropdown-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {salesView} <FiChevronDown />
              </button>
              {showDropdown && (
                <div className="reports-dropdown-menu">
                  <span onClick={() => { setSalesView('Daily'); setShowDropdown(false); }}>Daily</span>
                  <span onClick={() => { setSalesView('Weekly'); setShowDropdown(false); }}>Weekly</span>
                  <span onClick={() => { setSalesView('Monthly'); setShowDropdown(false); }}>Monthly</span>
                </div>
              )}
            </div>
          </div>
          <div className="reports-chart-legend">
            <span className="reports-legend-dot"></span> Revenue (₹)
          </div>
          <div className="reports-chart-container">
            {/* SVG Custom Responsive Line Graph */}
            <svg viewBox="0 0 700 250" className="reports-line-chart" preserveAspectRatio="none">
              <defs>
                <linearGradient id="reportsRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a33b3b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#a33b3b" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <text x="10" y="30" fill="#888" fontSize="10">40K</text>
              <text x="10" y="95" fill="#888" fontSize="10">30K</text>
              <text x="10" y="160" fill="#888" fontSize="10">20K</text>
              <text x="10" y="220" fill="#888" fontSize="10">10K</text>
              
              <line x1="40" y1="35" x2="680" y2="35" stroke="#eee" strokeDasharray="4" />
              <line x1="40" y1="100" x2="680" y2="100" stroke="#eee" strokeDasharray="4" />
              <line x1="40" y1="165" x2="680" y2="165" stroke="#eee" strokeDasharray="4" />
              <line x1="40" y1="225" x2="680" y2="225" stroke="#eee" />

              <path 
                d="M 50,170 C 100,165 130,120 180,135 C 230,150 260,90 310,120 C 360,150 390,70 440,110 C 490,150 530,90 580,115 C 630,140 650,100 670,120" 
                fill="none" 
                stroke="#a33b3b" 
                strokeWidth="3" 
              />
              <path 
                d="M 50,170 C 100,165 130,120 180,135 C 230,150 260,90 310,120 C 360,150 390,70 440,110 C 490,150 530,90 580,115 C 630,140 650,100 670,120 L 670,240 L 50,240 Z" 
                fill="url(#reportsRevenueGradient)" 
              />
            </svg>
            <div className="reports-chart-xaxis">
              <span>01 May</span>
              <span>06 May</span>
              <span>11 May</span>
              <span>16 May</span>
              <span>21 May</span>
              <span>26 May</span>
              <span>31 May</span>
            </div>
          </div>
        </div>

        {/* Top Selling Categories Donut Chart Section */}
        <div className="reports-card reports-top-categories">
          <div className="reports-card-header">
            <div className="reports-card-title-wrapper">
              <FiShoppingBag className="reports-section-icon" />
              <h2>Top Selling Categories</h2>
            </div>
          </div>
          <div className="reports-donut-content-wrapper">
            <div className="reports-donut-chart-container">
              <div className="reports-donut-hole"></div>
            </div>
            <div className="reports-category-legend">
              <div className="reports-legend-item"><span className="dot saree"></span> Sarees <b>45%</b></div>
              <div className="reports-legend-item"><span className="dot dupatta"></span> Dupattas <b>25%</b></div>
              <div className="reports-legend-item"><span className="dot dress"></span> Dress Materials <b>15%</b></div>
              <div className="reports-legend-item"><span className="dot home"></span> Home Textiles <b>10%</b></div>
              <div className="reports-legend-item"><span className="dot others"></span> Others <b>5%</b></div>
            </div>
          </div>
          <button className="reports-view-full-btn">View Full Report</button>
        </div>
      </div>

      {/* Bottom Section: Best Selling Products, Payment Methods, and Banner */}
      <div className="reports-bottom-grid">
        {/* Best Selling Products Table */}
        <div className="reports-card reports-best-selling">
          <div className="reports-card-header">
            <div className="reports-card-title-wrapper">
              <FiShoppingBag className="reports-section-icon" />
              <h2>Best Selling Products</h2>
            </div>
            <button className="reports-view-all-btn">View All</button>
          </div>
          <div className="reports-table-responsive">
            <table className="reports-products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Orders</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="reports-product-cell">
                    <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&auto=format&fit=crop&q=80" alt="Handloom Silk Saree" />
                    <span>Handloom Silk Saree</span>
                  </td>
                  <td>325</td>
                  <td>₹4,87,500</td>
                </tr>
                <tr>
                  <td className="reports-product-cell">
                    <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=100&auto=format&fit=crop&q=80" alt="Cotton Handloom Dupatta" />
                    <span>Cotton Handloom Dupatta</span>
                  </td>
                  <td>278</td>
                  <td>₹2,78,000</td>
                </tr>
                <tr>
                  <td className="reports-product-cell">
                    <img src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100&auto=format&fit=crop&q=80" alt="Ikath Dress Material" />
                    <span>Ikath Dress Material</span>
                  </td>
                  <td>189</td>
                  <td>₹1,89,750</td>
                </tr>
                <tr>
                  <td className="reports-product-cell">
                    <img src="https://images.unsplash.com/photo-1590736963159-1c0c327220d5?w=100&auto=format&fit=crop&q=80" alt="Handwoven Table Runner" />
                    <span>Handwoven Table Runner</span>
                  </td>
                  <td>156</td>
                  <td>₹1,24,800</td>
                </tr>
                <tr>
                  <td className="reports-product-cell">
                    <img src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=100&auto=format&fit=crop&q=80" alt="Linen Saree" />
                    <span>Linen Saree</span>
                  </td>
                  <td>132</td>
                  <td>₹98,760</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Stack: Sales by Payment Method & Banner */}
        <div className="reports-right-stack">
          <div className="reports-card reports-payment-methods">
            <div className="reports-card-header">
              <div className="reports-card-title-wrapper">
                <FiShoppingBag className="reports-section-icon" />
                <h2>Sales by Payment Method</h2>
              </div>
            </div>
            <div className="reports-donut-content-wrapper">
              <div className="reports-donut-chart-container payment-donut">
                <div className="reports-donut-hole"></div>
              </div>
              <div className="reports-category-legend">
                <div className="reports-legend-item"><span className="dot upi"></span> UPI <b>42%</b></div>
                <div className="reports-legend-item"><span className="dot card"></span> Credit / Debit Card <b>28%</b></div>
                <div className="reports-legend-item"><span className="dot net"></span> Net Banking <b>16%</b></div>
                <div className="reports-legend-item"><span className="dot cod"></span> COD <b>10%</b></div>
                <div className="reports-legend-item"><span className="dot wallet"></span> Wallet <b>4%</b></div>
              </div>
            </div>
          </div>

          {/* Heritage Banner Card */}
          <div className="reports-card reports-banner-card">
            <div className="reports-banner-content">
              <div className="reports-banner-text">
                <h3>We weave tradition, you wear heritage.</h3>
                <div className="reports-ornament-divider"></div>
              </div>
              <div className="reports-banner-img-wrapper">
                <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=80" alt="Heritage Fabric" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;