import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
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
  Trash2,
  Edit
} from 'lucide-react';

const INITIAL_FORM_STATE = {
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
  country: 'India',
  state: '',
  city: '',
  pincode: '',
  status: 'Active',
  notes: ''
};

const Customers = () => {
  const [customersList, setCustomersList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [groupFilter, setGroupFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // 1. Fetch Customers from Backend (READ)
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/customers');
      if (response.data.success) {
        setCustomersList(response.data.data);
        if (response.data.data.length > 0 && !selectedCustomer) {
          setSelectedCustomer(response.data.data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      alert(error.response?.data?.message || 'Failed to fetch customer records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // 2. Select Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(customersList.map((c) => c._id));
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

  // 3. Modal Handlers
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    setFormData(INITIAL_FORM_STATE);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cust) => {
    setIsEditing(true);
    setCurrentEditId(cust._id);
    setFormData({
      fullName: cust.fullName || '',
      email: cust.email || '',
      phone: cust.phone || '',
      dob: cust.dob || '',
      gender: cust.gender || '',
      group: cust.group || 'Regular',
      companyName: cust.companyName || '',
      gstNumber: cust.gstNumber || '',
      businessType: cust.businessType || '',
      addressLine1: cust.addressLine1 || '',
      addressLine2: cust.addressLine2 || '',
      country: cust.country || 'India',
      state: cust.state || '',
      city: cust.city || '',
      pincode: cust.pincode || '',
      status: cust.status || 'Active',
      notes: cust.notes || ''
    });
    setIsModalOpen(true);
  };

  // 4. Save Customer (CREATE / UPDATE via Axios instance)
  const handleSaveCustomer = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      alert('Name and Email are required!');
      return;
    }

    try {
      if (isEditing && currentEditId) {
        // PUT Request
        const res = await axios.put(`/customers/${currentEditId}`, formData);
        if (res.data.success) {
          const updatedCustomer = res.data.data;
          setCustomersList((prev) =>
            prev.map((c) => (c._id === currentEditId ? updatedCustomer : c))
          );
          if (selectedCustomer?._id === currentEditId) {
            setSelectedCustomer(updatedCustomer);
          }
        }
      } else {
        // POST Request
        const res = await axios.post('/customers', formData);
        if (res.data.success) {
          const newCustomer = res.data.data;
          setCustomersList([newCustomer, ...customersList]);
          setSelectedCustomer(newCustomer);
        }
      }
      setIsModalOpen(false);
      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      console.error('Error saving customer:', error);
      alert(error.response?.data?.message || 'Server error while saving customer');
    }
  };

  // 5. Delete Customer (DELETE via Axios instance)
  const handleDeleteCustomer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    try {
      const res = await axios.delete(`/customers/${id}`);
      if (res.data.success) {
        const updatedList = customersList.filter((c) => c._id !== id);
        setCustomersList(updatedList);
        if (selectedCustomer?._id === id) {
          setSelectedCustomer(updatedList[0] || null);
        }
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert(error.response?.data?.message || 'Server error while deleting customer');
    }
  };

  // 6. Search and Filter
  const filteredCustomers = customersList.filter((c) => {
    const matchesSearch =
      c.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone?.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesGroup = groupFilter === 'All' || c.group === groupFilter;
    return matchesSearch && matchesStatus && matchesGroup;
  });

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
          <button className="btn-primary" onClick={handleOpenAddModal}>
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
            <div className="stat-value">{customersList.length}</div>
            <span className="stat-change positive">Database Live</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon yellow-bg">
            <UserCheck size={20} className="icon-yellow" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Active Customers</span>
            <div className="stat-value">
              {customersList.filter((c) => c.status === 'Active').length}
            </div>
            <span className="stat-change positive">Verified</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple-bg">
            <UserPlus size={20} className="icon-purple" />
          </div>
          <div className="stat-info">
            <span className="stat-label">VIP Customers</span>
            <div className="stat-value">
              {customersList.filter((c) => c.group === 'VIP').length}
            </div>
            <span className="stat-change positive">Premium</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red-bg">
            <UserX size={20} className="icon-red" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Blocked Customers</span>
            <div className="stat-value">
              {customersList.filter((c) => c.status === 'Blocked').length}
            </div>
            <span className="stat-change negative">Restricted</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content-grid">
        <div className="table-container">
          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search by Name, Email, Phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="dropdown-filters">
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Blocked">Blocked</option>
              </select>
              <select
                className="filter-select"
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
              >
                <option value="All">All Groups</option>
                <option value="VIP">VIP</option>
                <option value="Regular">Regular</option>
                <option value="Wholesale">Wholesale</option>
              </select>
            </div>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '24px' }}>
                      Loading customer data...
                    </td>
                  </tr>
                ) : filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '24px' }}>
                      No customers found. Click "Add Customer" to create one.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((cust) => (
                    <tr
                      key={cust._id}
                      onClick={() => setSelectedCustomer(cust)}
                      className={selectedCustomer?._id === cust._id ? 'active-row' : ''}
                    >
                      <td onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(cust._id)}
                          onChange={() => handleSelectRow(cust._id)}
                        />
                      </td>
                      <td>
                        <div className="customer-user-cell">
                          <img
                            src={cust.avatar}
                            alt={cust.fullName}
                            className="user-avatar"
                          />
                          <div className="user-details">
                            <span className="user-name">{cust.fullName}</span>
                            <span className="user-email">{cust.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="contact-cell">
                          <span className="phone">{cust.phone}</span>
                          <span className="location">
                            {cust.state ? `${cust.state}, ${cust.country || 'India'}` : cust.country || 'India'}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge group-${cust.group.toLowerCase()}`}>
                          {cust.group}
                        </span>
                      </td>
                      <td className="center-text">{cust.orders || 0}</td>
                      <td className="bold-text">{cust.totalSpent || '₹ 0.00'}</td>
                      <td>
                        <span className={`badge status-${cust.status.toLowerCase()}`}>
                          {cust.status}
                        </span>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="icon-btn"
                            title="Edit"
                            onClick={() => handleOpenEditModal(cust)}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="icon-btn"
                            title="Delete"
                            onClick={() => handleDeleteCustomer(cust._id)}
                            style={{ color: '#ef4444' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar Details */}
        {selectedCustomer && (
          <div className="details-sidebar">
            <div className="details-header">
              <h3>Customer Details</h3>
              <div className="details-header-right">
                <span className="cust-id">{selectedCustomer.customerId}</span>
                <button className="close-btn" onClick={() => setSelectedCustomer(null)}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="profile-summary">
              <img
                src={selectedCustomer.avatar}
                alt={selectedCustomer.fullName}
                className="profile-avatar"
              />
              <div className="profile-meta">
                <h4>{selectedCustomer.fullName}</h4>
                <div className="meta-item">
                  <Mail size={14} /> {selectedCustomer.email}
                </div>
                <div className="meta-item">
                  <Phone size={14} /> {selectedCustomer.phone}
                </div>
              </div>
            </div>

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
                <span className="info-label">Total Orders</span>
                <span className="info-val">{selectedCustomer.orders || 0}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Total Spent</span>
                <span className="info-val bold-text">{selectedCustomer.totalSpent || '₹ 0.00'}</span>
              </div>
            </div>

            <div className="info-section">
              <div className="section-title">Address</div>
              <div className="address-box">
                <MapPin size={16} className="pin-icon" />
                <div>
                  <strong>{selectedCustomer.fullName}</strong>
                  <p>
                    {[
                      selectedCustomer.addressLine1,
                      selectedCustomer.addressLine2,
                      selectedCustomer.city,
                      selectedCustomer.state ? `${selectedCustomer.state} - ${selectedCustomer.pincode}` : selectedCustomer.pincode,
                      selectedCustomer.country
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                </div>
              </div>
            </div>

            <div className="sidebar-footer-actions">
              <button
                className="btn-outline"
                onClick={() => handleOpenEditModal(selectedCustomer)}
              >
                Edit Customer
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Customer Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <div className="modal-title-area">
                <div className="modal-title-icon">
                  <UserPlus size={20} />
                </div>
                <div>
                  <h2>{isEditing ? 'Edit Customer' : 'Add Customer'}</h2>
                  <p>{isEditing ? 'Update customer information.' : 'Add a new customer to your database.'}</p>
                </div>
              </div>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="modal-body">
              <div className="form-section">
                <h4 className="section-heading">Personal Information</h4>
                <div className="form-grid three-col">
                  <div className="form-group">
                    <label>Full Name *</label>
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
                    <label>Email Address *</label>
                    <div className="input-with-icon">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      <Mail size={16} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <div className="input-with-icon">
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
                    <label>Customer Group</label>
                    <select
                      name="group"
                      value={formData.group}
                      onChange={handleInputChange}
                    >
                      <option value="Regular">Regular</option>
                      <option value="VIP">VIP</option>
                      <option value="Wholesale">Wholesale</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-heading">Address Information</h4>
                <div className="form-grid two-col">
                  <div className="form-group">
                    <label>Address Line 1</label>
                    <input
                      type="text"
                      name="addressLine1"
                      placeholder="Enter address line 1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address Line 2</label>
                    <input
                      type="text"
                      name="addressLine2"
                      placeholder="Enter address line 2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-grid three-col mt-12">
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Enter pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  <Save size={16} /> {isEditing ? 'Update Customer' : 'Save Customer'}
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