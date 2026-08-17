// Coupons.jsx
import React, { useState, useEffect } from 'react';
import { 
  FiPercent, 
  FiTag, 
  FiGift, 
  FiPieChart, 
  FiCalendar, 
  FiPlus, 
  FiSearch, 
  FiEdit2, 
  FiTrash2, 
  FiChevronLeft, 
  FiChevronRight, 
  FiX 
} from 'react-icons/fi';
import './Coupons.css';
import API, { IMG_URL } from "../../api/axios";

const Coupons = () => {
  // State for date range & calendar popup
  const [dateRange, setDateRange] = useState('01 May 2025 - 31 May 2025');
  const [showCalendar, setShowCalendar] = useState(false);

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Coupons Data List & Editing State
  const [couponsList, setCouponsList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Create/Edit Form State
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'Percentage',
    discountValue: '',
    discountOn: 'All Products',
    minOrderAmount: '',
    usageLimit: '',
    startDate: '',
    endDate: '',
    appliesTo: 'All Products',
    isActive: true
  });

  // Modal State for "Create Coupon" button click
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Right Form visibility toggle
  const [showRightForm, setShowRightForm] = useState(true);

  // Fetch Coupons from Backend on Mount using custom API client
  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await API.get('/coupons');
      setCouponsList(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  // Handle Delete Coupon
  const handleDelete = async (id) => {
    try {
      const response = await API.delete(`/coupons/${id}`);
      if (response.status === 200 || response.data) {
        setCouponsList(couponsList.filter(coupon => coupon._id !== id));
      }
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  // Handle Edit Coupon (Pre-fill right form with data)
  const handleEdit = (coupon) => {
    setEditingId(coupon._id);
    setNewCoupon({
      code: coupon.code,
      discountType: coupon.type,
      discountValue: coupon.discount.replace(/[^0-9]/g, ''),
      discountOn: 'All Products',
      minOrderAmount: coupon.minOrder.replace('₹', '').replace(',', ''),
      usageLimit: coupon.usage.split('/')[1]?.trim() || '',
      startDate: coupon.validityStart,
      endDate: coupon.validityEnd,
      appliesTo: 'All Products',
      isActive: coupon.status === 'Active'
    });
    setShowRightForm(true);
  };

  // Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCoupon(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle Submit New/Edited Coupon
  const handleCreateCouponSubmit = async (e) => {
    e.preventDefault();
    if (!newCoupon.code) return;

    let formattedDiscount = '10% OFF';
    if (newCoupon.discountType === 'Percentage') {
      formattedDiscount = `${newCoupon.discountValue || 10}% OFF`;
    } else if (newCoupon.discountType === 'Flat Amount') {
      formattedDiscount = `₹${newCoupon.discountValue || 100} OFF`;
    } else {
      formattedDiscount = 'Free Shipping';
    }

    const couponPayload = {
      code: newCoupon.code.toUpperCase(),
      type: newCoupon.discountType,
      discount: formattedDiscount,
      minOrder: newCoupon.minOrderAmount ? `₹${newCoupon.minOrderAmount}` : '₹0',
      usage: `0 / ${newCoupon.usageLimit || '100'}`,
      validityStart: newCoupon.startDate || '01 May 2025',
      validityEnd: newCoupon.endDate || '31 May 2025',
      status: newCoupon.isActive ? 'Active' : 'Inactive'
    };

    try {
      if (editingId) {
        // Update existing coupon
        const response = await API.put(`/coupons/${editingId}`, couponPayload);
        const updated = response.data;
        if (response.status === 200 || updated) {
          setCouponsList(couponsList.map(c => c._id === editingId ? updated : c));
        }
      } else {
        // Create new coupon
        const response = await API.post('/coupons', couponPayload);
        const created = response.data;
        if (response.status === 201 || response.status === 200 || created) {
          setCouponsList([created, ...couponsList]);
        }
      }

      // Reset Form State
      setEditingId(null);
      setNewCoupon({
        code: '',
        discountType: 'Percentage',
        discountValue: '',
        discountOn: 'All Products',
        minOrderAmount: '',
        usageLimit: '',
        startDate: '',
        endDate: '',
        appliesTo: 'All Products',
        isActive: true
      });
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error saving coupon:', error);
    }
  };

  // Filter logic
  const filteredCoupons = couponsList.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || coupon.status === statusFilter;
    const matchesType = typeFilter === 'All Types' || coupon.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCoupons.slice(indexOfFirstItem, indexOfLastItem);

  // Download Report Function
  const handleDownloadReport = () => {
    const reportText = couponsList.map(c => 
      `Code: ${c.code} | Type: ${c.type} | Discount: ${c.discount} | Min Order: ${c.minOrder} | Usage: ${c.usage} | Validity: ${c.validityStart} - ${c.validityEnd} | Status: ${c.status}`
    ).join('\n');

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Coupons_Report_${dateRange.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="coupons-container">
      {/* Top Header Section */}
      <div className="coupons-header">
        <div className="coupons-breadcrumb"><span></span></div>
        <div className="coupons-actions-header">
          {/* Calendar Picker */}
          <div className="coupons-calendar-wrapper">
            <button className="coupons-calendar-btn" onClick={() => setShowCalendar(!showCalendar)}>
              <FiCalendar className="coupons-icon" />
              <span>{dateRange}</span>
            </button>
            {showCalendar && (
              <div className="coupons-calendar-dropdown">
                <p>Select Date Range:</p>
                <input type="text" value={dateRange} onChange={(e) => setDateRange(e.target.value)} />
                <button className="coupons-apply-date" onClick={() => setShowCalendar(false)}>Apply</button>
              </div>
            )}
          </div>

          {/* Create Coupon Header Button */}
          <button className="coupons-create-btn" onClick={() => { setEditingId(null); setShowCreateModal(true); }}>
            <FiPlus className="coupons-icon" />
            <span>Create Coupon</span>
          </button>
        </div>
      </div>

      {/* Top Metric Cards Grid */}
      <div className="coupons-metrics-grid">
        <div className="coupons-metric-card">
          <div className="coupons-metric-icon-box pink"><FiPercent /></div>
          <div className="coupons-metric-content">
            <span className="coupons-metric-title">Total Coupons</span>
            <h3 className="coupons-metric-value">{couponsList.length}</h3>
            <span className="coupons-metric-sub">Active Coupons<br /><b>{couponsList.filter(c => c.status === 'Active').length}</b></span>
          </div>
        </div>
        <div className="coupons-metric-card">
          <div className="coupons-metric-icon-box gold"><FiTag /></div>
          <div className="coupons-metric-content">
            <span className="coupons-metric-title">Total Usage</span>
            <h3 className="coupons-metric-value">1,248</h3>
            <span className="coupons-metric-sub">This Month<br /><b>325</b></span>
          </div>
        </div>
        <div className="coupons-metric-card">
          <div className="coupons-metric-icon-box green"><FiGift /></div>
          <div className="coupons-metric-content">
            <span className="coupons-metric-title">Total Discount Given</span>
            <h3 className="coupons-metric-value">₹1,45,230</h3>
            <span className="coupons-metric-sub">This Month<br /><b>₹32,450</b></span>
          </div>
        </div>
        <div className="coupons-metric-card">
          <div className="coupons-metric-icon-box purple"><FiPieChart /></div>
          <div className="coupons-metric-content">
            <span className="coupons-metric-title">Redemption Rate</span>
            <h3 className="coupons-metric-value">32.6%</h3>
            <span className="coupons-metric-sub">This Month<br /><b>8.3%</b></span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className={`coupons-main-layout ${!showRightForm ? 'full-width-table' : ''}`}>
        
        {/* Left Section: Coupons Table */}
        <div className="coupons-table-card">
          <div className="coupons-table-header-bar">
            <div className="coupons-table-title-wrapper">
              <FiTag className="coupons-section-icon" />
              <h2>All Coupons</h2>
            </div>

            <div className="coupons-filter-controls">
              {/* Status Dropdown */}
              <div className="coupons-dropdown-container">
                <button className="coupons-filter-dropdown-btn" onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
                  {statusFilter} ▾
                </button>
                {showStatusDropdown && (
                  <div className="coupons-dropdown-menu">
                    {['All Status', 'Active', 'Expired', 'Inactive'].map(status => (
                      <span key={status} onClick={() => { setStatusFilter(status); setShowStatusDropdown(false); }}>
                        {status}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Type Dropdown */}
              <div className="coupons-dropdown-container">
                <button className="coupons-filter-dropdown-btn" onClick={() => setShowTypeDropdown(!showTypeDropdown)}>
                  {typeFilter} ▾
                </button>
                {showTypeDropdown && (
                  <div className="coupons-dropdown-menu">
                    {['All Types', 'Percentage', 'Flat Amount', 'Free Shipping'].map(type => (
                      <span key={type} onClick={() => { setTypeFilter(type); setShowTypeDropdown(false); }}>
                        {type}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Search input */}
              <div className="coupons-search-wrapper">
                <FiSearch className="coupons-search-icon" />
                <input 
                  type="text" 
                  placeholder="Search coupons..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="coupons-table-responsive">
            <table className="coupons-data-table">
              <thead>
                <tr>
                  <th>Coupon Code</th>
                  <th>Type</th>
                  <th>Discount</th>
                  <th>Min. Order</th>
                  <th>Usage / Limit</th>
                  <th>Validity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((coupon) => (
                    <tr key={coupon._id}>
                      <td><span className="coupons-code-badge">{coupon.code}</span></td>
                      <td>{coupon.type}</td>
                      <td>{coupon.discount}</td>
                      <td>{coupon.minOrder}</td>
                      <td>{coupon.usage}</td>
                      <td className="coupons-validity-cell">
                        <span>{coupon.validityStart}</span>
                        <span>{coupon.validityEnd}</span>
                      </td>
                      <td>
                        <span className={`coupons-status-pill ${coupon.status.toLowerCase()}`}>
                          {coupon.status}
                        </span>
                      </td>
                      <td className="coupons-actions-cell">
                        <button className="coupons-action-icon-btn edit" onClick={() => handleEdit(coupon)} title="Edit">
                          <FiEdit2 />
                        </button>
                        <button className="coupons-action-icon-btn delete" onClick={() => handleDelete(coupon._id)} title="Delete">
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '24px', color: '#7d6e65' }}>
                      No coupons found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="coupons-pagination-footer">
            <span>Showing {filteredCoupons.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredCoupons.length)} of {filteredCoupons.length} coupons</span>
            <div className="coupons-pagination-controls">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                <FiChevronLeft />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i + 1} 
                  className={currentPage === i + 1 ? 'active' : ''}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0}>
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Create/Edit Coupon Form */}
        {showRightForm && (
          <div className="coupons-form-card">
            <div className="coupons-form-card-header">
              <div className="coupons-form-title-wrapper">
                <FiTag className="coupons-section-icon" />
                <h2>{editingId ? 'Edit Coupon' : 'Create New Coupon'}</h2>
              </div>
              <button className="coupons-form-close-btn" onClick={() => setShowRightForm(false)} title="Close form">
                <FiX />
              </button>
            </div>

            <form onSubmit={handleCreateCouponSubmit} className="coupons-creation-form">
              <div className="coupons-form-group">
                <label>Coupon Code *</label>
                <input 
                  type="text" 
                  name="code" 
                  placeholder="Enter coupon code (e.g. HANDLOOM10)" 
                  value={newCoupon.code}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="coupons-form-group">
                <label>Discount Type *</label>
                <select name="discountType" value={newCoupon.discountType} onChange={handleInputChange}>
                  <option value="Percentage">Percentage</option>
                  <option value="Flat Amount">Flat Amount</option>
                  <option value="Free Shipping">Free Shipping</option>
                </select>
              </div>

              <div className="coupons-form-row">
                <div className="coupons-form-group">
                  <label>Discount Value *</label>
                  <input 
                    type="text" 
                    name="discountValue" 
                    placeholder="e.g. 10 or 200" 
                    value={newCoupon.discountValue}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Discount on *</label>
                  <select name="discountOn" value={newCoupon.discountOn} onChange={handleInputChange}>
                    <option value="All Products">All Products</option>
                    <option value="Specific Categories">Specific Categories</option>
                  </select>
                </div>
              </div>

              <div className="coupons-form-group">
                <label>Minimum Order Amount</label>
                <input 
                  type="text" 
                  name="minOrderAmount" 
                  placeholder="e.g. 999" 
                  value={newCoupon.minOrderAmount}
                  onChange={handleInputChange}
                />
              </div>

              <div className="coupons-form-group">
                <label>Usage Limit</label>
                <input 
                  type="text" 
                  name="usageLimit" 
                  placeholder="e.g. 500" 
                  value={newCoupon.usageLimit}
                  onChange={handleInputChange}
                />
              </div>

              <div className="coupons-form-group">
                <label>Validity Period *</label>
                <div className="coupons-date-inputs-row">
                  <div className="coupons-input-with-icon">
                    <input 
                      type="text" 
                      name="startDate" 
                      placeholder="01 May 2025" 
                      value={newCoupon.startDate}
                      onChange={handleInputChange}
                    />
                    <FiCalendar className="field-icon" />
                  </div>
                  <span>-</span>
                  <div className="coupons-input-with-icon">
                    <input 
                      type="text" 
                      name="endDate" 
                      placeholder="31 May 2025" 
                      value={newCoupon.endDate}
                      onChange={handleInputChange}
                    />
                    <FiCalendar className="field-icon" />
                  </div>
                </div>
              </div>

              <div className="coupons-form-group-toggle">
                <label>Status</label>
                <div className="coupons-toggle-wrapper">
                  <label className="coupons-switch">
                    <input 
                      type="checkbox" 
                      name="isActive" 
                      checked={newCoupon.isActive}
                      onChange={handleInputChange}
                    />
                    <span className="coupons-slider round"></span>
                  </label>
                  <span className="coupons-toggle-label">{newCoupon.isActive ? 'Active' : 'Inactive'}</span>
                </div>
              </div>

              <button type="submit" className="coupons-submit-btn">
                <FiPlus /> {editingId ? 'Update Coupon' : 'Create Coupon'}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Popup Modal for Top "Create Coupon" button */}
      {showCreateModal && (
        <div className="coupons-modal-overlay">
          <div className="coupons-modal-content">
            <div className="coupons-modal-header">
              <h2>Create New Coupon</h2>
              <button onClick={() => setShowCreateModal(false)}><FiX /></button>
            </div>
            <form onSubmit={handleCreateCouponSubmit} className="coupons-creation-form">
              <div className="coupons-form-group">
                <label>Coupon Code *</label>
                <input 
                  type="text" 
                  name="code" 
                  placeholder="Enter coupon code (e.g. FESTIVE50)" 
                  value={newCoupon.code}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="coupons-form-group">
                <label>Discount Type *</label>
                <select name="discountType" value={newCoupon.discountType} onChange={handleInputChange}>
                  <option value="Percentage">Percentage</option>
                  <option value="Flat Amount">Flat Amount</option>
                  <option value="Free Shipping">Free Shipping</option>
                </select>
              </div>
              <div className="coupons-form-row">
                <div className="coupons-form-group">
                  <label>Discount Value *</label>
                  <input type="text" name="discountValue" placeholder="e.g. 20" value={newCoupon.discountValue} onChange={handleInputChange} />
                </div>
                <div className="coupons-form-group">
                  <label>Min. Order</label>
                  <input type="text" name="minOrderAmount" placeholder="e.g. 999" value={newCoupon.minOrderAmount} onChange={handleInputChange} />
                </div>
              </div>
              <div className="coupons-modal-actions">
                <button type="button" className="coupons-cancel-btn" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="coupons-submit-btn">Save Coupon</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hidden Download Trigger */}
      <div style={{ display: 'none' }}>
        <button id="downloadReportTrigger" onClick={handleDownloadReport}>Download Report</button>
      </div>
    </div>
  );
};

export default Coupons;