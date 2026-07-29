import React, { useState } from 'react';
import './Customers.css';
import {
  Users,
  UserCheck,
  UserPlus,
  RotateCcw,
  UserX,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  MoreVertical,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Save,
  Building,
  CreditCard,
  Briefcase
} from 'lucide-react';
 
const CUSTOMERS_DATA = [
  {
    id: '#CUS12548',
    name: 'Ananya Sharma',
    email: 'ananya@gmail.com',
    phone: '+91 98765 43210',
    location: 'Karnataka, India',
    group: 'VIP',
    orders: 12,
    totalSpent: '₹ 25,430.00',
    status: 'Active',
    joinedOn: 'May 25, 2025',
    lastOrder: 'May 27, 2025',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    address: '23, Park Street, Near MG Road, Bangalore, Karnataka - 560001 India'
  },
  {
    id: '#CUS12549',
    name: 'Ritika Verma',
    email: 'ritika@gmail.com',
    phone: '+91 87654 32109',
    location: 'Delhi, India',
    group: 'Regular',
    orders: 8,
    totalSpent: '₹ 15,230.00',
    status: 'Active',
    joinedOn: 'May 25, 2025',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  },
  {
    id: '#CUS12550',
    name: 'Priya Nair',
    email: 'priya@gmail.com',
    phone: '+91 76543 21098',
    location: 'Kerala, India',
    group: 'Wholesale',
    orders: 20,
    totalSpent: '₹ 45,670.00',
    status: 'Active',
    joinedOn: 'May 24, 2025',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'
  },
  {
    id: '#CUS12551',
    name: 'Meera Iyer',
    email: 'meera@gmail.com',
    phone: '+91 65432 10987',
    location: 'Tamil Nadu, India',
    group: 'VIP',
    orders: 15,
    totalSpent: '₹ 32,890.00',
    status: 'Active',
    joinedOn: 'May 24, 2025',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
  },
  {
    id: '#CUS12552',
    name: 'Sneha Kapoor',
    email: 'sneha@gmail.com',
    phone: '+91 54321 09876',
    location: 'Maharashtra, India',
    group: 'Regular',
    orders: 6,
    totalSpent: '₹ 12,450.00',
    status: 'Inactive',
    joinedOn: 'May 23, 2025',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150'
  },
  {
    id: '#CUS12553',
    name: 'Karan Malhotra',
    email: 'karan@gmail.com',
    phone: '+91 43210 99766',
    location: 'Punjab, India',
    group: 'Wholesale',
    orders: 18,
    totalSpent: '₹ 38,750.00',
    status: 'Active',
    joinedOn: 'May 23, 2025',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  },
  {
    id: '#CUS12554',
    name: 'Neha Joshi',
    email: 'neha@gmail.com',
    phone: '+91 43210 97654',
    location: 'Rajasthan, India',
    group: 'Regular',
    orders: 5,
    totalSpent: '₹ 9,890.00',
    status: 'Active',
    joinedOn: 'May 22, 2025',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150'
  },
  {
    id: '#CUS12555',
    name: 'Arjun Reddy',
    email: 'arjun@gmail.com',
    phone: '+91 21098 76543',
    location: 'Telangana, India',
    group: 'VIP',
    orders: 22,
    totalSpent: '₹ 55,430.00',
    status: 'Active',
    joinedOn: 'May 21, 2025',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
  },
  {
    id: '#CUS12556',
    name: 'Pooja Singh',
    email: 'pooja@gmail.com',
    phone: '+91 10987 65432',
    location: 'Uttar Pradesh, India',
    group: 'Regular',
    orders: 3,
    totalSpent: '₹ 6,230.00',
    status: 'Blocked',
    joinedOn: 'May 20, 2025',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
  },
  {
    id: '#CUS12557',
    name: 'Vivek Gupta',
    email: 'vivek@gmail.com',
    phone: '+91 09876 54321',
    location: 'Gujarat, India',
    group: 'Wholesale',
    orders: 10,
    totalSpent: '₹ 18,640.00',
    status: 'Active',
    joinedOn: 'May 20, 2025',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150'
  }
];

const Customers = () => {
  const [customersList, setCustomersList] = useState(CUSTOMERS_DATA);
  const [selectedCustomer, setSelectedCustomer] = useState(CUSTOMERS_DATA[0]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    group: 'Regular',
    companyName: '',
    gstNumber: '',
    businessType: '',
    addressLine1: '',
    addressLine2: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    status: 'Active',
    notes: ''
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(customersList.map((c) => c.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    const newCust = {
      id: `#CUS${Math.floor(10000 + Math.random() * 90000)}`,
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone || '+91 98765 00000',
      location: formData.state ? `${formData.state}, India` : 'India',
      group: formData.group || 'Regular',
      orders: 0,
      totalSpent: '₹ 0.00',
      status: formData.status,
      joinedOn: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      address: `${formData.addressLine1} ${formData.addressLine2}, ${formData.city}, ${formData.state} - ${formData.pincode}`
    };

    setCustomersList([newCust, ...customersList]);
    setIsModalOpen(false);
    // Reset Form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      group: 'Regular',
      companyName: '',
      gstNumber: '',
      businessType: '',
      addressLine1: '',
      addressLine2: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
      status: 'Active',
      notes: ''
    });
  };

  return (
    <div className="customers-page">
      {/* Header Bar */}
      <div className="customers-header">
        <div className="title-area">
          <h1>Customers</h1>
          <div className="breadcrumb">Dashboard &gt; Customers</div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Download size={16} /> Export
          </button>
          <button className="btn-secondary">
            <Upload size={16} /> Import
          </button>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Add Customer
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue-bg">
            <Users size={20} className="icon-blue" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Customers</span>
            <div className="stat-value">2,540</div>
            <span className="stat-change positive">↑ 18.7% this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon yellow-bg">
            <UserCheck size={20} className="icon-yellow" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Active Customers</span>
            <div className="stat-value">2,126</div>
            <span className="stat-change positive">↑ 12.3% this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple-bg">
            <UserPlus size={20} className="icon-purple" />
          </div>
          <div className="stat-info">
            <span className="stat-label">New Customers</span>
            <div className="stat-value">214</div>
            <span className="stat-change positive">↑ 8.9% this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon violet-bg">
            <RotateCcw size={20} className="icon-violet" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Repeat Customers</span>
            <div className="stat-value">1,869</div>
            <span className="stat-change positive">↑ 15.6% this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red-bg">
            <UserX size={20} className="icon-red" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Blocked Customers</span>
            <div className="stat-value">45</div>
            <span className="stat-change negative">↓ 3.2% this month</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="main-content-grid">
        {/* Table & Filter Column */}
        <div className="table-container">
          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Search by Name, Email, Phone..." />
            </div>
            <div className="dropdown-filters">
              <select className="filter-select">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Blocked</option>
              </select>
              <select className="filter-select">
                <option>All Groups</option>
                <option>VIP</option>
                <option>Regular</option>
                <option>Wholesale</option>
              </select>
              <select className="filter-select">
                <option>All Locations</option>
              </select>
            </div>
            <button className="btn-filter">
              <Filter size={16} /> More Filters
            </button>
          </div>

          {/* Customer Table */}
          <div className="table-wrapper">
            <table className="customers-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedRows.length === customersList.length &&
                        customersList.length > 0
                      }
                    />
                  </th>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Group</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Status</th>
                  <th>Joined On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customersList.map((cust) => (
                  <tr
                    key={cust.id}
                    onClick={() => setSelectedCustomer(cust)}
                    className={selectedCustomer?.id === cust.id ? 'active-row' : ''}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(cust.id)}
                        onChange={() => handleSelectRow(cust.id)}
                      />
                    </td>
                    <td>
                      <div className="customer-user-cell">
                        <img
                          src={cust.avatar}
                          alt={cust.name}
                          className="user-avatar"
                        />
                        <div className="user-details">
                          <span className="user-name">{cust.name}</span>
                          <span className="user-email">{cust.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-cell">
                        <span className="phone">{cust.phone}</span>
                        <span className="location">{cust.location}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge group-${cust.group.toLowerCase()}`}>
                        {cust.group}
                      </span>
                    </td>
                    <td className="center-text">{cust.orders}</td>
                    <td className="bold-text">{cust.totalSpent}</td>
                    <td>
                      <span className={`badge status-${cust.status.toLowerCase()}`}>
                        {cust.status}
                      </span>
                    </td>
                    <td className="date-text">{cust.joinedOn}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <button className="icon-btn">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination-bar">
            <div className="pagination-info">Showing 1 to 10 of 2,540 customers</div>
            <div className="pagination-controls">
              <button className="page-btn">
                <ChevronLeft size={16} />
              </button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span className="ellipsis">...</span>
              <button className="page-btn">254</button>
              <button className="page-btn">
                <ChevronRight size={16} />
              </button>
              <select className="page-select">
                <option>10 / page</option>
                <option>20 / page</option>
                <option>50 / page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Sidebar Details */}
        {selectedCustomer && (
          <div className="details-sidebar">
            <div className="details-header">
              <h3>Customer Details</h3>
              <div className="details-header-right">
                <span className="cust-id">{selectedCustomer.id}</span>
                <button
                  className="close-btn"
                  onClick={() => setSelectedCustomer(null)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Profile Overview */}
            <div className="profile-summary">
              <img
                src={selectedCustomer.avatar}
                alt={selectedCustomer.name}
                className="profile-avatar"
              />
              <div className="profile-meta">
                <h4>{selectedCustomer.name}</h4>
                <div className="meta-item">
                  <Mail size={14} /> {selectedCustomer.email}
                </div>
                <div className="meta-item">
                  <Phone size={14} /> {selectedCustomer.phone}
                </div>
              </div>
            </div>

            {/* Info Table */}
            <div className="info-section">
              <div className="section-title">Customer Info</div>
              <div className="info-row">
                <span className="info-label">Group</span>
                <span className={`badge group-${selectedCustomer.group.toLowerCase()}`}>
                  {selectedCustomer.group}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Status</span>
                <span className={`badge status-${selectedCustomer.status.toLowerCase()}`}>
                  {selectedCustomer.status}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Joined On</span>
                <span className="info-val">{selectedCustomer.joinedOn}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Last Order</span>
                <span className="info-val">
                  {selectedCustomer.lastOrder || 'May 27, 2025'}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Total Orders</span>
                <span className="info-val">{selectedCustomer.orders}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Total Spent</span>
                <span className="info-val bold-text">
                  {selectedCustomer.totalSpent}
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="info-section">
              <div className="section-title">Address</div>
              <div className="address-box">
                <MapPin size={16} className="pin-icon" />
                <div>
                  <strong>{selectedCustomer.name}</strong>
                  <p>
                    {selectedCustomer.address ||
                      '23, Park Street, Near MG Road, Bangalore, Karnataka - 560001 India'}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="info-section">
              <div className="section-header-flex">
                <span className="section-title">Recent Orders</span>
                <a href="#viewall" className="view-all">
                  View All
                </a>
              </div>
              <div className="recent-orders-list">
                <div className="order-item">
                  <span className="order-id">#ODC12548</span>
                  <span className="order-date">May 27, 2025</span>
                  <span className="order-price">₹ 2,950.00</span>
                </div>
                <div className="order-item">
                  <span className="order-id">#ODC12487</span>
                  <span className="order-date">May 25, 2025</span>
                  <span className="order-price">₹ 1,780.00</span>
                </div>
                <div className="order-item">
                  <span className="order-id">#ODC12412</span>
                  <span className="order-date">May 20, 2025</span>
                  <span className="order-price">₹ 3,250.00</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="sidebar-footer-actions">
              <button className="btn-outline">Edit Customer</button>
              <button className="btn-dark">View Full Profile</button>
            </div>
          </div>
        )}
      </div>

      {/* Add Customer Modal Window */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <div className="modal-title-area">
                <div className="modal-title-icon">
                  <UserPlus size={20} />
                </div>
                <div>
                  <h2>Add Customer</h2>
                  <p>Add a new customer to your system.</p>
                </div>
              </div>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="modal-body">
              {/* Personal Info */}
              <div className="form-section">
                <h4 className="section-heading">Personal Information</h4>
                <div className="form-grid three-col">
                  <div className="form-group">
                    <label>
                      Full Name <span>*</span>
                    </label>
                    <div className="input-with-icon">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                      <Users size={16} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Email Address <span>*</span>
                    </label>
                    <div className="input-with-icon">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      <Mail size={16} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Phone Number <span>*</span>
                    </label>
                    <div className="input-with-icon phone-input">
                      <select className="country-code">
                        <option>+91</option>
                      </select>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                      <Phone size={16} />
                    </div>
                  </div>
                </div>

                <div className="form-grid three-col mt-12">
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <div className="input-with-icon">
                      <input
                        type="text"
                        name="dob"
                        placeholder="Select date of birth"
                        value={formData.dob}
                        onChange={handleInputChange}
                      />
                      <Calendar size={16} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Customer Group</label>
                    <select
                      name="group"
                      value={formData.group}
                      onChange={handleInputChange}
                    >
                      <option value="Regular">Select group</option>
                      <option value="VIP">VIP</option>
                      <option value="Regular">Regular</option>
                      <option value="Wholesale">Wholesale</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="form-section">
                <h4 className="section-heading">Business Information (Optional)</h4>
                <div className="form-grid three-col">
                  <div className="form-group">
                    <label>Company Name</label>
                    <div className="input-with-icon">
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Enter company name"
                        value={formData.companyName}
                        onChange={handleInputChange}
                      />
                      <Building size={16} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>GST Number</label>
                    <div className="input-with-icon">
                      <input
                        type="text"
                        name="gstNumber"
                        placeholder="Enter GST number"
                        value={formData.gstNumber}
                        onChange={handleInputChange}
                      />
                      <CreditCard size={16} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Business Type</label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select business type</option>
                      <option value="Retail">Retail</option>
                      <option value="Wholesale">Wholesale</option>
                      <option value="Corporate">Corporate</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="form-section">
                <h4 className="section-heading">Address Information</h4>
                <div className="form-grid two-col">
                  <div className="form-group">
                    <label>
                      Address Line 1 <span>*</span>
                    </label>
                    <div className="input-with-icon">
                      <input
                        type="text"
                        name="addressLine1"
                        placeholder="Enter address line 1"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                      />
                      <MapPin size={16} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Address Line 2</label>
                    <input
                      type="text"
                      name="addressLine2"
                      placeholder="Enter address line 2 (optional)"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-grid three-col mt-12">
                  <div className="form-group">
                    <label>Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    >
                      <option value="">Select country</option>
                      <option value="India">India</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>State *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    >
                      <option value="">Select state</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>City *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    >
                      <option value="">Select city</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Mumbai">Mumbai</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid three-col mt-12">
                  <div className="form-group">
                    <label>Pincode *</label>
                    <div className="input-with-icon">
                      <input
                        type="text"
                        name="pincode"
                        placeholder="Enter pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                      />
                      <MapPin size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="form-section">
                <h4 className="section-heading">Additional Information</h4>
                <div className="status-and-notes-grid">
                  <div className="form-group">
                    <label>
                      Status <span>*</span>
                    </label>
                    <div className="status-radio-group">
                      <label
                        className={`radio-card ${
                          formData.status === 'Active' ? 'selected' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          value="Active"
                          checked={formData.status === 'Active'}
                          onChange={handleInputChange}
                        />
                        <div>
                          <strong>Active</strong>
                          <p>Customer can place orders</p>
                        </div>
                      </label>

                      <label
                        className={`radio-card ${
                          formData.status === 'Inactive' ? 'selected' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          value="Inactive"
                          checked={formData.status === 'Inactive'}
                          onChange={handleInputChange}
                        />
                        <div>
                          <strong>Inactive</strong>
                          <p>Customer is blocked</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Notes</label>
                    <div className="textarea-container">
                      <textarea
                        name="notes"
                        placeholder="Enter any additional notes..."
                        maxLength={200}
                        value={formData.notes}
                        onChange={handleInputChange}
                      />
                      <span className="char-count">
                        {formData.notes.length}/200
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  <Save size={16} /> Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;