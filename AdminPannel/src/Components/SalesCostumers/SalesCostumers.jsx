// SalesCostumers.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiPlus, 
  FiEye, 
  FiEdit2,
  FiMoreVertical, 
  FiChevronLeft, 
  FiChevronRight, 
  FiX, 
  FiUsers, 
  FiUserCheck, 
  FiUserPlus, 
  FiUserX,
  FiCalendar,
  FiClock,
  FiTag,
  FiUser,
  FiMapPin,
  FiTrash2,
  FiCheck
} from 'react-icons/fi';
import './SalesCostumers.css';

const initialCustomersData = [
  { id: 1, name: 'Rohit Sharma', email: 'rohitsharma@email.com', phone: '+91 98765 43210', orders: 18, totalSpent: '$1,249.99', status: 'Active', joinedOn: '20 May 2025', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', isVip: true, group: 'VIP Customers', gender: 'Male', address: '123, MG Road, Near Metro Station, Bangalore, Karnataka - 560001, India', rewardPoints: 120, lastActive: '21 May 2025, 09:15 AM' },
  { id: 2, name: 'Priya Patel', email: 'priyapatel@email.com', phone: '+91 91234 56789', orders: 12, totalSpent: '$899.50', status: 'Active', joinedOn: '20 May 2025', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', isVip: false, group: 'Regular', gender: 'Female', address: '45, Park Street, Kolkata, West Bengal - 700016, India', rewardPoints: 85, lastActive: '20 May 2025, 02:30 PM' },
  { id: 3, name: 'Amit Kumar', email: 'amitkumar@email.com', phone: '+91 99887 76655', orders: 25, totalSpent: '$2,349.00', status: 'Active', joinedOn: '19 May 2025', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80', isVip: true, group: 'VIP Customers', gender: 'Male', address: '78, Connaught Place, New Delhi, Delhi - 110001, India', rewardPoints: 210, lastActive: '19 May 2025, 08:45 PM' },
  { id: 4, name: 'Sneha Reddy', email: 'sneha.reddy@email.com', phone: '+91 90000 11122', orders: 8, totalSpent: '$459.99', status: 'Active', joinedOn: '19 May 2025', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80', isVip: false, group: 'New Customers', gender: 'Female', address: '12, Banjara Hills, Hyderabad, Telangana - 500034, India', rewardPoints: 40, lastActive: '19 May 2025, 06:20 PM' },
  { id: 5, name: 'Vikram Singh', email: 'vikramsingh@email.com', phone: '+91 87654 32100', orders: 15, totalSpent: '$1,120.00', status: 'Active', joinedOn: '18 May 2025', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', isVip: false, group: 'Regular', gender: 'Male', address: '56, FC Road, Pune, Maharashtra - 411004, India', rewardPoints: 95, lastActive: '18 May 2025, 04:10 PM' },
  { id: 6, name: 'Neha Gupta', email: 'nehagupta@email.com', phone: '+91 90909 87654', orders: 6, totalSpent: '$670.00', status: 'Active', joinedOn: '18 May 2025', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', isVip: false, group: 'New Customers', gender: 'Female', address: '90, MI Road, Jaipur, Rajasthan - 302001, India', rewardPoints: 50, lastActive: '18 May 2025, 01:30 PM' },
  { id: 7, name: 'Arjun Mehta', email: 'arjunmehta@email.com', phone: '+91 78945 61234', orders: 20, totalSpent: '$1,999.99', status: 'Inactive', joinedOn: '17 May 2025', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', isVip: true, group: 'VIP Customers', gender: 'Male', address: '34, SG Highway, Ahmedabad, Gujarat - 380054, India', rewardPoints: 150, lastActive: '15 May 2025, 10:00 AM' },
  { id: 8, name: 'Kavya Nair', email: 'kavya.nair@email.com', phone: '+91 81234 56780', orders: 9, totalSpent: '$345.50', status: 'Active', joinedOn: '17 May 2025', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', isVip: false, group: 'Regular', gender: 'Female', address: '18, MG Road, Kochi, Kerala - 682016, India', rewardPoints: 30, lastActive: '17 May 2025, 09:05 AM' },
  { id: 9, name: 'Manish Verma', email: 'manishverma@email.com', phone: '+91 99876 54321', orders: 22, totalSpent: '$2,899.00', status: 'Active', joinedOn: '16 May 2025', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80', isVip: true, group: 'VIP Customers', gender: 'Male', address: '22, Mall Road, Kanpur, Uttar Pradesh - 208001, India', rewardPoints: 240, lastActive: '16 May 2025, 07:45 PM' },
  { id: 10, name: 'Pooja Shah', email: 'poojashah@email.com', phone: '+91 93456 78901', orders: 5, totalSpent: '$232.99', status: 'Blocked', joinedOn: '16 May 2025', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80', isVip: false, group: 'New Customers', gender: 'Female', address: '67, Satellite Road, Surat, Gujarat - 395007, India', rewardPoints: 10, lastActive: '10 May 2025, 11:20 AM' },
  { id: 11, name: 'Rahul Dravid', email: 'rahul@email.com', phone: '+91 98111 22233', orders: 14, totalSpent: '$950.00', status: 'Active', joinedOn: '15 May 2025', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', isVip: false, group: 'Regular', gender: 'Male', address: 'Indiranagar, Bangalore, India', rewardPoints: 90, lastActive: '15 May 2025, 05:00 PM' }
];

const SalesCostumers = () => {
  const [customers, setCustomers] = useState(initialCustomersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [groupFilter, setGroupFilter] = useState('All Groups');
  const [locationFilter, setLocationFilter] = useState('All Locations');

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Edit Customer Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Add New Customer Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomerForm, setNewCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
    group: 'New Customers',
    gender: 'Female',
    address: '',
    status: 'Active'
  });

  const menuRef = useRef(null);

  // Handle clicking outside the action menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredCustomers = customers.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
    const matchesGroup = groupFilter === 'All Groups' || item.group === groupFilter;
    const matchesLocation = locationFilter === 'All Locations' || item.address.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesGroup && matchesLocation;
  });

  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage) || 1;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCustomers.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false);
      setSelectedRows([]);
    } else {
      setSelectAll(true);
      setSelectedRows(currentRows.map(c => c.id));
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rId => rId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Customer ID,Name,Email,Phone,Orders,Total Spent,Status,Joined On"]
      .concat(filteredCustomers.map(c => `${c.id},${c.name},${c.email},${c.phone},${c.orders},${c.totalSpent},${c.status},${c.joinedOn}`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_customers_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add Customer Submit
  const handleAddCustomerSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      name: newCustomerForm.name,
      email: newCustomerForm.email,
      phone: newCustomerForm.phone,
      orders: 0,
      totalSpent: '$0.00',
      status: newCustomerForm.status,
      joinedOn: '21 May 2025',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      isVip: newCustomerForm.group === 'VIP Customers',
      group: newCustomerForm.group,
      gender: newCustomerForm.gender,
      address: newCustomerForm.address || 'N/A',
      rewardPoints: 0,
      lastActive: 'Just now'
    };
    setCustomers([newEntry, ...customers]);
    setSelectedCustomer(newEntry);
    setShowAddModal(false);
    setNewCustomerForm({ name: '', email: '', phone: '', group: 'New Customers', gender: 'Female', address: '', status: 'Active' });
  };

  // Edit Customer Open & Submit
  const handleOpenEditModal = (cust, e) => {
    e.stopPropagation();
    setEditingCustomer({ ...cust });
    setShowEditModal(true);
    setActiveMenuId(null);
  };

  const handleEditCustomerSubmit = (e) => {
    e.preventDefault();
    setCustomers(customers.map(c => c.id === editingCustomer.id ? editingCustomer : c));
    if (selectedCustomer && selectedCustomer.id === editingCustomer.id) {
      setSelectedCustomer(editingCustomer);
    }
    setShowEditModal(false);
    setEditingCustomer(null);
  };

  // Status Change Action
  const handleUpdateStatus = (id, newStatus, e) => {
    e.stopPropagation();
    setCustomers(customers.map(c => c.id === id ? { ...c, status: newStatus } : c));
    if (selectedCustomer && selectedCustomer.id === id) {
      setSelectedCustomer(prev => ({ ...prev, status: newStatus }));
    }
    setActiveMenuId(null);
  };

  // Delete Action
  const handleDeleteCustomer = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== id));
      if (selectedCustomer && selectedCustomer.id === id) {
        setSelectedCustomer(null);
      }
    }
    setActiveMenuId(null);
  };

  return (
    <div className="sales-costumers-wrapper">
      {/* Top Metric Cards */}
      <div className="sales-costumers-metrics-grid">
        <div className="sales-costumers-metric-card">
          <div className="sales-costumers-metric-icon-box purple">
            <FiUsers className="sales-costumers-metric-icon" />
          </div>
          <div className="sales-costumers-metric-content">
            <span className="sales-costumers-metric-title">Total Customers</span>
            <h3 className="sales-costumers-metric-value">{customers.length}</h3>
            <span className="sales-costumers-metric-sub">All customers</span>
          </div>
        </div>

        <div className="sales-costumers-metric-card">
          <div className="sales-costumers-metric-icon-box green">
            <FiUserCheck className="sales-costumers-metric-icon" />
          </div>
          <div className="sales-costumers-metric-content">
            <span className="sales-costumers-metric-title">Active Customers</span>
            <h3 className="sales-costumers-metric-value">{customers.filter(c => c.status === 'Active').length}</h3>
            <span className="sales-costumers-metric-sub green-text">
              {((customers.filter(c => c.status === 'Active').length / (customers.length || 1)) * 100).toFixed(2)}% of total
            </span>
          </div>
        </div>

        <div className="sales-costumers-metric-card">
          <div className="sales-costumers-metric-icon-box blue">
            <FiUserPlus className="sales-costumers-metric-icon" />
          </div>
          <div className="sales-costumers-metric-content">
            <span className="sales-costumers-metric-title">New Customers</span>
            <h3 className="sales-costumers-metric-value">{customers.filter(c => c.group === 'New Customers').length}</h3>
            <span className="sales-costumers-metric-sub">This month</span>
          </div>
        </div>

        <div className="sales-costumers-metric-card">
          <div className="sales-costumers-metric-icon-box red">
            <FiUserX className="sales-costumers-metric-icon" />
          </div>
          <div className="sales-costumers-metric-content">
            <span className="sales-costumers-metric-title">Blocked Customers</span>
            <h3 className="sales-costumers-metric-value">{customers.filter(c => c.status === 'Blocked').length}</h3>
            <span className="sales-costumers-metric-sub">
              {((customers.filter(c => c.status === 'Blocked').length / (customers.length || 1)) * 100).toFixed(2)}% of total
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="sales-costumers-action-bar">
        <div className="sales-costumers-search-wrapper">
          <FiSearch className="sales-costumers-search-icon" />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchTerm}
            onChange={handleSearch}
            className="sales-costumers-search-input"
          />
        </div>

        <div className="sales-costumers-filters-group">
          <select 
            value={statusFilter} 
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="sales-costumers-dropdown"
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Blocked">Blocked</option>
          </select>

          <select 
            value={groupFilter} 
            onChange={(e) => { setGroupFilter(e.target.value); setCurrentPage(1); }}
            className="sales-costumers-dropdown"
          >
            <option value="All Groups">All Groups</option>
            <option value="VIP Customers">VIP Customers</option>
            <option value="Regular">Regular</option>
            <option value="New Customers">New Customers</option>
          </select>

          <select 
            value={locationFilter} 
            onChange={(e) => { setLocationFilter(e.target.value); setCurrentPage(1); }}
            className="sales-costumers-dropdown"
          >
            <option value="All Locations">All Locations</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Kolkata">Kolkata</option>
            <option value="New Delhi">New Delhi</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Ahmedabad">Ahmedabad</option>
          </select>

          <button 
            type="button" 
            className="sales-costumers-btn secondary"
            onClick={() => { setStatusFilter('All Status'); setGroupFilter('All Groups'); setLocationFilter('All Locations'); setSearchTerm(''); setCurrentPage(1); }}
          >
            <FiFilter /> Filter
          </button>

          <button 
            type="button" 
            className="sales-costumers-btn secondary"
            onClick={handleExport}
          >
            <FiDownload /> Export
          </button>

          <button 
            type="button" 
            className="sales-costumers-btn primary"
            onClick={() => setShowAddModal(true)}
          >
            <FiPlus /> Add New Customer
          </button>
        </div>
      </div>

      {/* Main Content Layout Container */}
      <div className={`sales-costumers-content-layout ${selectedCustomer ? 'with-panel' : 'full-width'}`}>
        {/* Table Section */}
        <div className="sales-costumers-table-container">
          <table className="sales-costumers-table">
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox" 
                    checked={selectAll} 
                    onChange={handleSelectAll} 
                  />
                </th>
                <th>#</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Joined On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((cust, idx) => (
                  <tr 
                    key={cust.id} 
                    className={selectedCustomer?.id === cust.id ? 'active-row' : ''}
                    onClick={() => setSelectedCustomer(cust)}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(cust.id)}
                        onChange={() => handleSelectRow(cust.id)}
                      />
                    </td>
                    <td className="sales-costumers-id-col">{indexOfFirstRow + idx + 1}</td>
                    <td>
                      <div className="sales-costumers-customer-cell">
                        <img src={cust.avatar} alt={cust.name} className="sales-costumers-avatar" />
                        <div>
                          <span className="sales-costumers-cust-name">
                            {cust.name} {cust.isVip && <span className="sales-costumers-vip-tag">VIP</span>}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="sales-costumers-email">{cust.email}</td>
                    <td className="sales-costumers-phone">{cust.phone}</td>
                    <td className="sales-costumers-orders">{cust.orders}</td>
                    <td className="sales-costumers-spent">{cust.totalSpent}</td>
                    <td>
                      <span className={`sales-costumers-status-badge ${cust.status.toLowerCase()}`}>
                        {cust.status}
                      </span>
                    </td>
                    <td className="sales-costumers-date">{cust.joinedOn}</td>
                    <td>
                      <div className="sales-costumers-action-icons" onClick={(e) => e.stopPropagation()}>
                        <button type="button" onClick={() => setSelectedCustomer(cust)} aria-label="View" title="View Profile">
                          <FiEye />
                        </button>
                        <button type="button" onClick={(e) => handleOpenEditModal(cust, e)} aria-label="Edit" title="Edit Customer">
                          <FiEdit2 />
                        </button>
                        <div className="sales-costumers-dropdown-menu-wrapper" ref={activeMenuId === cust.id ? menuRef : null}>
                          <button 
                            type="button" 
                            aria-label="More" 
                            title="Actions"
                            onClick={() => setActiveMenuId(activeMenuId === cust.id ? null : cust.id)}
                          >
                            <FiMoreVertical />
                          </button>
                          {activeMenuId === cust.id && (
                            <div className="sales-costumers-action-dropdown">
                              <button onClick={(e) => handleUpdateStatus(cust.id, 'Active', e)}>
                                <FiCheck style={{ color: '#16a34a' }} /> Mark Active
                              </button>
                              <button onClick={(e) => handleUpdateStatus(cust.id, 'Inactive', e)}>
                                <FiUserX style={{ color: '#ca8a04' }} /> Mark Inactive
                              </button>
                              <button onClick={(e) => handleUpdateStatus(cust.id, 'Blocked', e)}>
                                <FiUserX style={{ color: '#dc2626' }} /> Block Customer
                              </button>
                              <button onClick={(e) => handleDeleteCustomer(cust.id, e)} className="delete-action">
                                <FiTrash2 /> Delete Customer
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                    No customer records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className="sales-costumers-pagination-footer">
            <span className="sales-costumers-pagination-info">
              Showing {filteredCustomers.length > 0 ? indexOfFirstRow + 1 : 0} to {Math.min(indexOfLastRow, filteredCustomers.length)} of {filteredCustomers.length} customers
            </span>
            <div className="sales-costumers-pagination-controls">
              <button 
                type="button" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous"
              >
                <FiChevronLeft />
              </button>
              
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                if (
                  pageNum === 1 || 
                  pageNum === totalPages || 
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button 
                      key={pageNum}
                      type="button" 
                      className={currentPage === pageNum ? 'active' : ''}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  pageNum === currentPage - 2 || 
                  pageNum === currentPage + 2
                ) {
                  return <span key={pageNum} style={{ padding: '0 4px', color: '#64748b' }}>...</span>;
                }
                return null;
              })}

              <button 
                type="button" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next"
              >
                <FiChevronRight />
              </button>

              <select 
                value={rowsPerPage} 
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="sales-costumers-rows-select"
              >
                <option value="5">5 / page</option>
                <option value="10">10 / page</option>
                <option value="20">20 / page</option>
                <option value="50">50 / page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Side Customer Details Panel */}
        {selectedCustomer && (
          <div className="sales-costumers-details-panel">
            <div className="sales-costumers-details-header">
              <h3>Customer Details</h3>
              <button 
                type="button" 
                className="sales-costumers-close-panel"
                onClick={() => setSelectedCustomer(null)}
                title="Close panel"
              >
                <FiX />
              </button>
            </div>

            <div className="sales-costumers-details-body">
              <div className="sales-costumers-profile-box">
                <img src={selectedCustomer.avatar} alt="Customer" className="sales-costumers-avatar lg" />
                <div className="sales-costumers-profile-info">
                  <div className="sales-costumers-profile-name-row">
                    <span className="sales-costumers-cust-name lg">{selectedCustomer.name}</span>
                    {selectedCustomer.isVip && <span className="sales-costumers-vip-tag">VIP</span>}
                  </div>
                  <span className="sales-costumers-cust-email">{selectedCustomer.email}</span>
                  <span className="sales-costumers-cust-phone">{selectedCustomer.phone}</span>
                </div>
              </div>
              <div className="sales-costumers-status-tag-row">
                <span className={`sales-costumers-status-badge ${selectedCustomer.status.toLowerCase()}`}>
                  {selectedCustomer.status} Customer
                </span>
              </div>

              <div className="sales-costumers-stats-bar">
                <div className="sales-costumers-stat-item">
                  <span className="sales-costumers-stat-val">{selectedCustomer.orders}</span>
                  <span className="sales-costumers-stat-label">Total Orders</span>
                </div>
                <div className="sales-costumers-stat-divider"></div>
                <div className="sales-costumers-stat-item">
                  <span className="sales-costumers-stat-val">{selectedCustomer.totalSpent}</span>
                  <span className="sales-costumers-stat-label">Total Spent</span>
                </div>
                <div className="sales-costumers-stat-divider"></div>
                <div className="sales-costumers-stat-item">
                  <span className="sales-costumers-stat-val">{selectedCustomer.rewardPoints}</span>
                  <span className="sales-costumers-stat-label">Reward Points</span>
                </div>
              </div>

              <div className="sales-costumers-details-section-title">Customer Information</div>
              
              <div className="sales-costumers-details-row">
                <span className="sales-costumers-details-label"><FiCalendar /> Joined On</span>
                <span className="sales-costumers-details-val">{selectedCustomer.joinedOn}, 10:30 AM</span>
              </div>
              
              <div className="sales-costumers-details-row">
                <span className="sales-costumers-details-label"><FiClock /> Last Active</span>
                <span className="sales-costumers-details-val">{selectedCustomer.lastActive}</span>
              </div>
              
              <div className="sales-costumers-details-row">
                <span className="sales-costumers-details-label"><FiTag /> Group</span>
                <span className="sales-costumers-details-val">{selectedCustomer.group}</span>
              </div>
              
              <div className="sales-costumers-details-row">
                <span className="sales-costumers-details-label"><FiUser /> Gender</span>
                <span className="sales-costumers-details-val">{selectedCustomer.gender}</span>
              </div>
              
              <div className="sales-costumers-details-row address-row">
                <span className="sales-costumers-details-label"><FiMapPin /> Address</span>
                <span className="sales-costumers-details-val address-text">{selectedCustomer.address}</span>
              </div>

              <div className="sales-costumers-recent-orders-header">
                <span className="sales-costumers-details-section-title" style={{ margin: 0 }}>Recent Orders</span>
                <button type="button" className="sales-costumers-view-all-link" onClick={() => alert('Viewing all customer orders')}>View All</button>
              </div>

              <div className="sales-costumers-order-item-card">
                <div>
                  <span className="sales-costumers-order-id">#ORD-1250</span>
                  <span className="sales-costumers-order-date">20 May 2025</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="sales-costumers-order-price">$129.99</span>
                  <span className="sales-costumers-order-status green">Delivered</span>
                </div>
              </div>

              <div className="sales-costumers-order-item-card">
                <div>
                  <span className="sales-costumers-order-id">#ORD-1248</span>
                  <span className="sales-costumers-order-date">19 May 2025</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="sales-costumers-order-price">$249.00</span>
                  <span className="sales-costumers-order-status green">Delivered</span>
                </div>
              </div>

              <div className="sales-costumers-order-item-card">
                <div>
                  <span className="sales-costumers-order-id">#ORD-1239</span>
                  <span className="sales-costumers-order-date">15 May 2025</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="sales-costumers-order-price">$179.50</span>
                  <span className="sales-costumers-order-status blue">Shipped</span>
                </div>
              </div>

            </div>

            <div className="sales-costumers-details-footer">
              <button 
                type="button" 
                className="sales-costumers-full-profile-btn"
                onClick={() => alert(`Opening full profile dashboard for ${selectedCustomer.name}`)}
              >
                <FiEye /> View Full Profile
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add New Customer Modal */}
      {showAddModal && (
        <div className="sales-costumers-modal-overlay">
          <div className="sales-costumers-modal-content">
            <div className="sales-costumers-modal-header">
              <h2>Add New Customer</h2>
              <button type="button" onClick={() => setShowAddModal(false)} className="sales-costumers-close-modal">
                <FiX />
              </button>
            </div>
            <form onSubmit={handleAddCustomerSubmit} className="sales-costumers-modal-form">
              <div className="sales-costumers-modal-field">
                <label>Customer Name</label>
                <input 
                  type="text" 
                  placeholder="Enter full name"
                  value={newCustomerForm.name}
                  onChange={(e) => setNewCustomerForm({...newCustomerForm, name: e.target.value})}
                  required 
                />
              </div>
              <div className="sales-costumers-modal-field">
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter email address"
                  value={newCustomerForm.email}
                  onChange={(e) => setNewCustomerForm({...newCustomerForm, email: e.target.value})}
                  required 
                />
              </div>
              <div className="sales-costumers-modal-field">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  placeholder="Enter phone number"
                  value={newCustomerForm.phone}
                  onChange={(e) => setNewCustomerForm({...newCustomerForm, phone: e.target.value})}
                  required 
                />
              </div>
              <div className="sales-costumers-modal-field">
                <label>Customer Group</label>
                <select 
                  value={newCustomerForm.group}
                  onChange={(e) => setNewCustomerForm({...newCustomerForm, group: e.target.value})}
                >
                  <option value="New Customers">New Customers</option>
                  <option value="Regular">Regular</option>
                  <option value="VIP Customers">VIP Customers</option>
                </select>
              </div>
              <div className="sales-costumers-modal-field">
                <label>Gender</label>
                <select 
                  value={newCustomerForm.gender}
                  onChange={(e) => setNewCustomerForm({...newCustomerForm, gender: e.target.value})}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="sales-costumers-modal-field">
                <label>Status</label>
                <select 
                  value={newCustomerForm.status}
                  onChange={(e) => setNewCustomerForm({...newCustomerForm, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
              <div className="sales-costumers-modal-field">
                <label>Address</label>
                <textarea 
                  rows="2"
                  placeholder="Enter full address details"
                  value={newCustomerForm.address}
                  onChange={(e) => setNewCustomerForm({...newCustomerForm, address: e.target.value})}
                ></textarea>
              </div>
              <div className="sales-costumers-modal-actions">
                <button type="button" className="sales-costumers-btn secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="sales-costumers-btn primary">Save Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {showEditModal && editingCustomer && (
        <div className="sales-costumers-modal-overlay">
          <div className="sales-costumers-modal-content">
            <div className="sales-costumers-modal-header">
              <h2>Edit Customer</h2>
              <button type="button" onClick={() => setShowEditModal(false)} className="sales-costumers-close-modal">
                <FiX />
              </button>
            </div>
            <form onSubmit={handleEditCustomerSubmit} className="sales-costumers-modal-form">
              <div className="sales-costumers-modal-field">
                <label>Customer Name</label>
                <input 
                  type="text" 
                  value={editingCustomer.name}
                  onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                  required 
                />
              </div>
              <div className="sales-costumers-modal-field">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={editingCustomer.email}
                  onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
                  required 
                />
              </div>
              <div className="sales-costumers-modal-field">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  value={editingCustomer.phone}
                  onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                  required 
                />
              </div>
              <div className="sales-costumers-modal-field">
                <label>Customer Group</label>
                <select 
                  value={editingCustomer.group}
                  onChange={(e) => setEditingCustomer({...editingCustomer, group: e.target.value, isVip: e.target.value === 'VIP Customers'})}
                >
                  <option value="New Customers">New Customers</option>
                  <option value="Regular">Regular</option>
                  <option value="VIP Customers">VIP Customers</option>
                </select>
              </div>
              <div className="sales-costumers-modal-field">
                <label>Status</label>
                <select 
                  value={editingCustomer.status}
                  onChange={(e) => setEditingCustomer({...editingCustomer, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
              <div className="sales-costumers-modal-field">
                <label>Address</label>
                <textarea 
                  rows="2"
                  value={editingCustomer.address}
                  onChange={(e) => setEditingCustomer({...editingCustomer, address: e.target.value})}
                ></textarea>
              </div>
              <div className="sales-costumers-modal-actions">
                <button type="button" className="sales-costumers-btn secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="sales-costumers-btn primary">Update Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesCostumers;