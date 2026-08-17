import React, { useState } from 'react';
import { 
  FiTruck, 
  FiCheckCircle, 
  FiPauseCircle, 
  FiGlobe, 
  FiSearch, 
  FiChevronDown, 
  FiEdit2, 
  FiTrash2, 
  FiPlus, 
  FiShield, 
  FiLayers, 
  FiChevronLeft, 
  FiChevronRight, 
  FiGrid,
  FiX 
} from 'react-icons/fi';
import './ShippingMethods.css';

const ShippingMethods = () => {
  // State for search filter, status dropdown, pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [rowsPerPage, setRowsPerPage] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);

  // Modal / Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Form Fields State
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formType, setFormType] = useState('Flat Rate');
  const [formDeliveryTime, setFormDeliveryTime] = useState('3 - 5 Business Days');
  const [formCoverage, setFormCoverage] = useState('India');
  const [formCost, setFormCost] = useState('₹80.00');
  const [formStatus, setFormStatus] = useState('Active');

  // Initial dummy data for shipping methods table
  const [methods, setMethods] = useState([
    {
      id: 1,
      name: 'Standard Shipping',
      description: 'Reliable delivery in standard time',
      type: 'Flat Rate',
      deliveryTime: '3 - 5 Business Days',
      coverage: 'India',
      cost: '₹80.00',
      status: 'Active',
      sortOrder: 1
    },
    {
      id: 2,
      name: 'Express Shipping',
      description: 'Fast delivery for urgent orders',
      type: 'Flat Rate',
      deliveryTime: '1 - 2 Business Days',
      coverage: 'India',
      cost: '₹150.00',
      status: 'Active',
      sortOrder: 2
    },
    {
      id: 3,
      name: 'International Shipping',
      description: 'Worldwide delivery service',
      type: 'Calculated',
      deliveryTime: '7 - 15 Business Days',
      coverage: 'Worldwide',
      cost: '₹500.00+',
      status: 'Active',
      sortOrder: 3
    },
    {
      id: 4,
      name: 'Local Pickup',
      description: 'Pick up your order from store',
      type: 'Free',
      deliveryTime: 'Same Day',
      coverage: 'Mumbai, India',
      cost: '₹0.00',
      status: 'Active',
      sortOrder: 4
    },
    {
      id: 5,
      name: 'Same Day Delivery',
      description: 'Delivery on the same day',
      type: 'Flat Rate',
      deliveryTime: 'Same Day',
      coverage: 'Mumbai, Thane',
      cost: '₹120.00',
      status: 'Active',
      sortOrder: 5
    },
    {
      id: 6,
      name: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      type: 'COD',
      deliveryTime: '3 - 5 Business Days',
      coverage: 'India',
      cost: '₹40.00',
      status: 'Disabled',
      sortOrder: 6
    }
  ]);

  // Open Add Modal
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormName('');
    setFormDesc('');
    setFormType('Flat Rate');
    setFormDeliveryTime('3 - 5 Business Days');
    setFormCoverage('India');
    setFormCost('₹80.00');
    setFormStatus('Active');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (method) => {
    setIsEditing(true);
    setCurrentId(method.id);
    setFormName(method.name);
    setFormDesc(method.description);
    setFormType(method.type);
    setFormDeliveryTime(method.deliveryTime);
    setFormCoverage(method.coverage);
    setFormCost(method.cost);
    setFormStatus(method.status);
    setIsModalOpen(true);
  };

  // Handle Form Submit (Add or Edit)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('Please enter a method name.');
      return;
    }

    if (isEditing) {
      // Update existing
      setMethods(methods.map(m => m.id === currentId ? {
        ...m,
        name: formName,
        description: formDesc,
        type: formType,
        deliveryTime: formDeliveryTime,
        coverage: formCoverage,
        cost: formCost,
        status: formStatus
      } : m));
    } else {
      // Add new
      const newMethod = {
        id: Date.now(),
        name: formName,
        description: formDesc || 'Custom shipping method',
        type: formType,
        deliveryTime: formDeliveryTime,
        coverage: formCoverage,
        cost: formCost,
        status: formStatus,
        sortOrder: methods.length + 1
      };
      setMethods([...methods, newMethod]);
    }

    setIsModalOpen(false);
  };

  // Handle Delete Action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this shipping method?')) {
      setMethods(methods.filter(m => m.id !== id));
    }
  };

  // Filter methods based on search and status
  const filteredMethods = methods.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.coverage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="shipping-methods-container">
      {/* Top Header & Breadcrumb */}
      <div className="shipping-methods-header-top">
        <div className="shipping-methods-breadcrumb">
           &gt;  &gt;  
        </div>
        <button className="shipping-methods-add-btn" onClick={handleOpenAddModal}>
          <FiPlus /> Add New Shipping Method
        </button>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="shipping-methods-stats-grid">
        <div className="shipping-methods-stat-card">
          <div className="shipping-methods-stat-icon-wrap orange">
            <FiTruck size={22} />
          </div>
          <div>
            <span className="shipping-methods-stat-title">Total Methods</span>
            <h2 className="shipping-methods-stat-value">{methods.length}</h2>
            <span className="shipping-methods-stat-desc">Active shipping methods</span>
          </div>
        </div>

        <div className="shipping-methods-stat-card">
          <div className="shipping-methods-stat-icon-wrap green">
            <FiCheckCircle size={22} />
          </div>
          <div>
            <span className="shipping-methods-stat-title">Active Methods</span>
            <h2 className="shipping-methods-stat-value">{methods.filter(m => m.status === 'Active').length}</h2>
            <span className="shipping-methods-stat-desc">Currently enabled</span>
          </div>
        </div>

        <div className="shipping-methods-stat-card">
          <div className="shipping-methods-stat-icon-wrap yellow">
            <FiPauseCircle size={22} />
          </div>
          <div>
            <span className="shipping-methods-stat-title">Disabled Methods</span>
            <h2 className="shipping-methods-stat-value">{methods.filter(m => m.status === 'Disabled').length}</h2>
            <span className="shipping-methods-stat-desc">Temporarily disabled</span>
          </div>
        </div>

        <div className="shipping-methods-stat-card">
          <div className="shipping-methods-stat-icon-wrap purple">
            <FiGlobe size={22} />
          </div>
          <div>
            <span className="shipping-methods-stat-title">Countries Covered</span>
            <h2 className="shipping-methods-stat-value">3</h2>
            <span className="shipping-methods-stat-desc">India, USA, UK</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Table Section + Right Overview/Quick Actions) */}
      <div className="shipping-methods-main-layout">
        
        {/* Left Table Section */}
        <div className="shipping-methods-card shipping-methods-table-card">
          <div className="shipping-methods-table-header-row">
            <div>
              <div className="shipping-methods-title-flex">
                <FiTruck className="shipping-methods-main-icon" />
                <h3>Shipping Methods List</h3>
              </div>
              <p>Manage and configure your shipping methods</p>
            </div>
            <div className="shipping-methods-controls-flex">
              <div className="shipping-methods-select-wrapper">
                <select 
                  className="shipping-methods-select-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All Status">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
                <FiChevronDown className="shipping-methods-arrow" />
              </div>
              <div className="shipping-methods-search-box">
                <FiSearch className="shipping-methods-search-icon" />
                <input 
                  type="text" 
                  placeholder="Search shipping methods..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="shipping-methods-table-responsive">
            <table className="shipping-methods-table">
              <thead>
                <tr>
                  <th>Method Name <FiChevronDown size={12} /></th>
                  <th>Type</th>
                  <th>Delivery Time</th>
                  <th>Coverage</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th>Sort Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMethods.length > 0 ? (
                  filteredMethods.map((method) => (
                    <tr key={method.id}>
                      <td>
                        <div className="shipping-method-info-cell">
                          <div className="shipping-method-row-icon">
                            <FiTruck size={16} />
                          </div>
                          <div>
                            <span className="shipping-method-name">{method.name}</span>
                            <span className="shipping-method-desc">{method.description}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`shipping-method-badge type-${method.type.toLowerCase().replace(/\s+/g, '-')}`}>
                          {method.type}
                        </span>
                      </td>
                      <td>{method.deliveryTime}</td>
                      <td>{method.coverage}</td>
                      <td>{method.cost}</td>
                      <td>
                        <span className={`shipping-method-status ${method.status.toLowerCase()}`}>
                          {method.status}
                        </span>
                      </td>
                      <td>
                        <div className="shipping-method-sort-cell">
                          <FiGrid size={14} className="drag-handle" /> {method.sortOrder}
                        </div>
                      </td>
                      <td>
                        <div className="shipping-methods-action-btns">
                          <button className="shipping-action-btn" onClick={() => handleOpenEditModal(method)} title="Edit">
                            <FiEdit2 size={14} />
                          </button>
                          <button className="shipping-action-btn delete" onClick={() => handleDelete(method.id)} title="Delete">
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '24px', color: '#8c7365' }}>
                      No shipping methods found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="shipping-methods-table-footer">
            <span className="shipping-methods-pagination-info">
              Showing 1 to {filteredMethods.length} of {methods.length} methods
            </span>
            <div className="shipping-methods-pagination-controls">
              <button 
                className="shipping-page-btn" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <FiChevronLeft />
              </button>
              <button className="shipping-page-btn active">1</button>
              <button 
                className="shipping-page-btn" 
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                <FiChevronRight />
              </button>
              <div className="shipping-methods-rows-dropdown">
                <select 
                  value={rowsPerPage} 
                  onChange={(e) => setRowsPerPage(e.target.value)}
                  className="shipping-methods-select-filter"
                >
                  <option value="10">10 / page</option>
                  <option value="20">20 / page</option>
                  <option value="50">50 / page</option>
                </select>
                <FiChevronDown className="shipping-methods-arrow" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Section (Overview & Quick Actions) */}
        <div className="shipping-methods-sidebar-column">
          
          {/* Shipping Overview Card */}
          <div className="shipping-methods-card shipping-overview-card">
            <h4>Shipping Overview</h4>
            <div className="shipping-overview-chart-container">
              <div className="shipping-donut-chart">
                <div className="shipping-donut-inner"></div>
              </div>
              <div className="shipping-chart-legend">
                <div className="legend-item"><span className="dot orange"></span> Standard Shipping <span className="val">40%</span></div>
                <div className="legend-item"><span className="dot green"></span> Express Shipping <span className="val">20%</span></div>
                <div className="legend-item"><span className="dot purple"></span> International Shipping <span className="val">20%</span></div>
                <div className="legend-item"><span className="dot yellow"></span> Local Pickup <span className="val">10%</span></div>
                <div className="legend-item"><span className="dot pink"></span> Same Day Delivery <span className="val">10%</span></div>
              </div>
            </div>

            <div className="shipping-did-you-know-box">
              <div className="did-you-know-header">
                <span className="bulb-icon">💡</span> <strong>Did you know?</strong>
              </div>
              <p>
                You can set different shipping methods for different countries and regions. Configure rate based on weight, price, or distance for better accuracy.
              </p>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="shipping-methods-card quick-actions-card">
            <h4>Quick Actions</h4>
            <div className="quick-action-list">
              <div className="quick-action-item" onClick={handleOpenAddModal}>
                <div className="qa-icon-wrap"><FiPlus size={16} /></div>
                <span>Add New Shipping Method</span>
                <FiChevronRight className="qa-arrow" />
              </div>
              <div className="quick-action-item" onClick={() => alert('Navigating to Shipping Zones...')}>
                <div className="qa-icon-wrap"><FiGlobe size={16} /></div>
                <span>Shipping Zones</span>
                <FiChevronRight className="qa-arrow" />
              </div>
              <div className="quick-action-item" onClick={() => alert('Navigating to Shipping Rules...')}>
                <div className="qa-icon-wrap"><FiShield size={16} /></div>
                <span>Shipping Rules</span>
                <FiChevronRight className="qa-arrow" />
              </div>
              <div className="quick-action-item" onClick={() => alert('Opening Bulk Actions...')}>
                <div className="qa-icon-wrap"><FiLayers size={16} /></div>
                <span>Bulk Actions</span>
                <FiChevronRight className="qa-arrow" />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Banner */}
      <div className="shipping-methods-card optimize-strategy-banner">
        <div className="banner-left-content">
          <div className="banner-shield-icon">
            <FiShield size={22} />
          </div>
          <div>
            <h4>Optimize Your Shipping Strategy</h4>
            <p>Configure shipping methods that best fit your business needs and improve customer satisfaction.</p>
          </div>
        </div>
        <button className="shipping-methods-learn-more-btn" onClick={() => alert('Loading documentation...')}>
          Learn More
        </button>
      </div>

      {/* Modal Popup for Add / Edit Shipping Method */}
      {isModalOpen && (
        <div className="shipping-modal-overlay">
          <div className="shipping-modal-content">
            <div className="shipping-modal-header">
              <h3>{isEditing ? 'Edit Shipping Method' : 'Add New Shipping Method'}</h3>
              <button className="shipping-modal-close" onClick={() => setIsModalOpen(false)}>
                <FiX size={18} />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="shipping-modal-form">
              <div className="shipping-form-group">
                <label>Method Name *</label>
                <input 
                  type="text" 
                  value={formName} 
                  onChange={(e) => setFormName(e.target.value)} 
                  placeholder="e.g. Next Day Air" 
                  required 
                />
              </div>

              <div className="shipping-form-group">
                <label>Description</label>
                <input 
                  type="text" 
                  value={formDesc} 
                  onChange={(e) => setFormDesc(e.target.value)} 
                  placeholder="Brief description of the method" 
                />
              </div>

              <div className="shipping-form-row-2">
                <div className="shipping-form-group">
                  <label>Type</label>
                  <select value={formType} onChange={(e) => setFormType(e.target.value)}>
                    <option value="Flat Rate">Flat Rate</option>
                    <option value="Calculated">Calculated</option>
                    <option value="Free">Free</option>
                    <option value="COD">COD</option>
                  </select>
                </div>
                <div className="shipping-form-group">
                  <label>Delivery Time</label>
                  <input 
                    type="text" 
                    value={formDeliveryTime} 
                    onChange={(e) => setFormDeliveryTime(e.target.value)} 
                    placeholder="e.g. 2 - 4 Business Days" 
                  />
                </div>
              </div>

              <div className="shipping-form-row-2">
                <div className="shipping-form-group">
                  <label>Coverage</label>
                  <input 
                    type="text" 
                    value={formCoverage} 
                    onChange={(e) => setFormCoverage(e.target.value)} 
                    placeholder="e.g. India, Worldwide" 
                  />
                </div>
                <div className="shipping-form-group">
                  <label>Cost</label>
                  <input 
                    type="text" 
                    value={formCost} 
                    onChange={(e) => setFormCost(e.target.value)} 
                    placeholder="e.g. ₹100.00" 
                  />
                </div>
              </div>

              <div className="shipping-form-group">
                <label>Status</label>
                <select value={formStatus} onChange={(e) => setFormStatus(e.target.value)}>
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>

              <div className="shipping-modal-actions">
                <button type="button" className="shipping-modal-btn-cancel" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="shipping-modal-btn-save">
                  {isEditing ? 'Save Changes' : 'Create Method'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ShippingMethods;