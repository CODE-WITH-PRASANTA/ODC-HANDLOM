import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { 
  FiUpload, FiDownload, FiPlus, FiSearch, FiFilter, 
  FiMoreVertical, FiChevronLeft, FiChevronRight, FiX, 
  FiMail, FiPhone, FiCalendar
} from 'react-icons/fi';
import { 
  HiOutlineTrendingUp, HiOutlineTrendingDown, HiOutlineCurrencyRupee, 
  HiOutlineClock, HiOutlineCheckCircle, HiOutlineXCircle 
} from 'react-icons/hi';
import { HiOutlineWallet } from 'react-icons/hi2';
import './RefundsDashboard.css';

const initialRefundsData = [
  { id: '#RFD12548', orderId: '#ODC12548', customer: 'Ananya Sharma', email: 'ananya@gmail.com', phone: '+91 98765 43210', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces', amount: '₹ 2,950.00', rawAmount: 2950, paymentMethod: 'UPI (PhonePe)', status: 'Completed', requestedOn: 'May 25, 2025\n02:15 PM', processedOn: 'May 25, 2025 03:02 PM', reason: 'Product not as described', notes: 'Customer requested refund for defective product received.', type: 'UPI' },
  { id: '#RFD12547', orderId: '#ODC12547', customer: 'Ritika Verma', email: 'ritika@gmail.com', phone: '+91 98765 43211', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces', amount: '₹ 1,650.00', rawAmount: 1650, paymentMethod: 'Credit Card (Visa **** 4242)', status: 'Approved', requestedOn: 'May 25, 2025\n11:35 AM', processedOn: 'May 25, 2025 12:00 PM', reason: 'Wrong size delivered', notes: 'Exchange requested alternative size.', type: 'Card' },
  { id: '#RFD12546', orderId: '#ODC12546', customer: 'Priya Nair', email: 'priya@gmail.com', phone: '+91 98765 43212', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces', amount: '₹ 3,450.00', rawAmount: 3450, paymentMethod: 'Net Banking (HDFC Bank)', status: 'Completed', requestedOn: 'May 24, 2025\n06:20 PM', processedOn: 'May 24, 2025 08:10 PM', reason: 'Item damaged', notes: 'Received broken seal package.', type: 'NetBanking' },
  { id: '#RFD12545', orderId: '#ODC12545', customer: 'Meera Iyer', email: 'meera@gmail.com', phone: '+91 98765 43213', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=faces', amount: '₹ 2,250.00', rawAmount: 2250, paymentMethod: 'UPI (Google Pay)', status: 'Pending', requestedOn: 'May 24, 2025\n01:10 PM', processedOn: '-', reason: 'Delayed delivery', notes: 'Customer cancelled before shipping.', type: 'UPI' },
  { id: '#RFD12544', orderId: '#ODC12544', customer: 'Sneha Kapoor', email: 'sneha@gmail.com', phone: '+91 98765 43214', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces', amount: '₹ 1,850.00', rawAmount: 1850, paymentMethod: 'Wallet (Paytm)', status: 'Rejected', requestedOn: 'May 23, 2025\n09:45 AM', processedOn: 'May 23, 2025 11:00 AM', reason: 'Policy violation', notes: 'Return window expired.', type: 'Wallet' },
  { id: '#RFD12543', orderId: '#ODC12543', customer: 'Karan Malhotra', email: 'karan@gmail.com', phone: '+91 98765 43215', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces', amount: '₹ 2,650.00', rawAmount: 2650, paymentMethod: 'Credit Card (Mastercard **** 8358)', status: 'Approved', requestedOn: 'May 22, 2025\n07:30 PM', processedOn: 'May 22, 2025 09:00 PM', reason: 'Defective item', notes: 'Approved for store credit or card reversal.', type: 'Card' },
  { id: '#RFD12542', orderId: '#ODC12542', customer: 'Neha Joshi', email: 'neha@gmail.com', phone: '+91 98765 43216', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces', amount: '₹ 4,750.00', rawAmount: 4750, paymentMethod: 'Net Banking (ICICI Bank)', status: 'Completed', requestedOn: 'May 22, 2025\n03:15 PM', processedOn: 'May 22, 2025 04:30 PM', reason: 'Quality issue', notes: 'Refund processed successfully.', type: 'NetBanking' },
  { id: '#RFD12541', orderId: '#ODC12541', customer: 'Arjun Reddy', email: 'arjun@gmail.com', phone: '+91 98765 43217', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces', amount: '₹ 1,299.00', rawAmount: 1299, paymentMethod: 'UPI (BHIM)', status: 'Pending', requestedOn: 'May 21, 2025\n10:20 AM', processedOn: '-', reason: 'Duplicate order', notes: 'Awaiting verification.', type: 'UPI' },
  { id: '#RFD12540', orderId: '#ODC12540', customer: 'Pooja Singh', email: 'pooja@gmail.com', phone: '+91 98765 43218', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces', amount: '₹ 1,780.00', rawAmount: 1780, paymentMethod: 'Wallet (PhonePe Wallet)', status: 'Completed', requestedOn: 'May 20, 2025\n05:50 PM', processedOn: 'May 20, 2025 06:15 PM', reason: 'Wrong item', notes: 'Wallet credited.', type: 'Wallet' },
  { id: '#RFD12539', orderId: '#ODC12539', customer: 'Vivek Gupta', email: 'vivek@gmail.com', phone: '+91 98765 43219', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=faces', amount: '₹ 3,200.00', rawAmount: 3200, paymentMethod: 'Credit Card (Rupay **** 6622)', status: 'Approved', requestedOn: 'May 20, 2025\n02:40 PM', processedOn: 'May 20, 2025 03:00 PM', reason: 'Dissatisfied', notes: 'Approved for refund.', type: 'Card' }
];

const RefundsDashboard = () => {
  const navigate = useNavigate(); // 2. Initialize navigate hook
  const [refunds, setRefunds] = useState(initialRefundsData);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [paymentFilter, setPaymentFilter] = useState('All Payment Methods');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  // Date Picker States
  const [startDate, setStartDate] = useState('2025-05-01');
  const [endDate, setEndDate] = useState('2025-05-31');
  
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleExport = () => {
    const headers = ['Refund ID', 'Order ID', 'Customer', 'Email', 'Phone', 'Amount', 'Payment Method', 'Status', 'Reason'];
    const csvRows = [headers.join(',')];

    filteredRefunds.forEach(item => {
      const row = [item.id, item.orderId, `"${item.customer}"`, item.email, item.phone, `"${item.amount}"`, `"${item.paymentMethod}"`, item.status, `"${item.reason}"`];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'refunds_export.csv');
    a.click();
    showToast('Refund data successfully exported to CSV!');
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const newImportedRecord = {
            id: `#RFD${Math.floor(10000 + Math.random() * 90000)}`,
            orderId: `#ODC${Math.floor(10000 + Math.random() * 90000)}`,
            customer: 'Imported User',
            email: 'imported@gmail.com',
            phone: '+91 90000 00000',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
            amount: '₹ 4,100.00',
            rawAmount: 4100,
            paymentMethod: 'UPI (Google Pay)',
            status: 'Pending',
            requestedOn: 'May 26, 2025 10:00 AM',
            processedOn: '-',
            reason: 'Imported batch item',
            notes: `Successfully parsed file: ${file.name}`,
            type: 'UPI'
          };
          setRefunds([newImportedRecord, ...refunds]);
          showToast(`Successfully imported records from ${file.name}`);
        } catch (err) {
          showToast('Error parsing imported file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const totalPagesCheck = Math.ceil(filteredRefunds.length / rowsPerPage) || 1;
    if (newPage > totalPagesCheck || newPage === totalPagesCheck) {
      const randomIdNum = Math.floor(10000 + Math.random() * 90000);
      const extraDummyItem = {
        id: `#RFD${randomIdNum}`,
        orderId: `#ODC${randomIdNum}`,
        customer: `Generated User ${newPage}`,
        email: `user${newPage}@gmail.com`,
        phone: '+91 98765 55443',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=faces',
        amount: `₹ ${(Math.random() * 4000 + 1000).toFixed(2)}`,
        rawAmount: 2500,
        paymentMethod: 'Credit Card (Visa)',
        status: ['Completed', 'Pending', 'Approved', 'Rejected'][Math.floor(Math.random() * 4)],
        requestedOn: 'May 26, 2025 04:00 PM',
        processedOn: 'May 26, 2025 04:30 PM',
        reason: 'Auto-generated pagination entry',
        notes: 'Extra dummy data dynamically injected via pagination.',
        type: 'Card'
      };
      setRefunds(prev => [...prev, extraDummyItem]);
      showToast(`Loaded extra dummy data block for page ${newPage}!`);
    }
  };

  const handleStatusChange = (id, newStatus, e) => {
    e.stopPropagation();
    setRefunds(refunds.map(item => item.id === id ? { ...item, status: newStatus } : item));
    if (selectedRefund && selectedRefund.id === id) {
      setSelectedRefund({ ...selectedRefund, status: newStatus });
    }
    setActiveDropdown(null);
    showToast(`Refund status updated to ${newStatus}`);
  };

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedRows(paginatedRefunds.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id, e) => {
    e.stopPropagation();
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Filter logic
  const filteredRefunds = refunds.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || item.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPayment = paymentFilter === 'All Payment Methods' || item.paymentMethod.toLowerCase().includes(paymentFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRefunds.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRefunds = filteredRefunds.slice(startIndex, startIndex + Number(rowsPerPage));

  return (
    <div className="refunds-dashboard-container">
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept=".csv,.json,.txt" 
        onChange={handleFileChange} 
      />

      {toastMessage && <div className="toast-notification">{toastMessage}</div>}

      {/* Advanced Filters Modal */}
      {isFilterModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsFilterModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Advanced Filters</h3>
              <button className="modal-close-icon" onClick={() => setIsFilterModalOpen(false)}>
                <FiX />
              </button>
            </div>
            <p className="modal-subtitle">Apply custom filters to narrow down transactions.</p>
            
            <div className="modal-body">
              <div className="filter-field">
                <label>Sort By Amount</label>
                <select onChange={(e) => {
                  const sorted = [...refunds].sort((a, b) => e.target.value === 'asc' ? a.rawAmount - b.rawAmount : b.rawAmount - a.rawAmount);
                  setRefunds(sorted);
                  showToast('Applied sorting.');
                }}>
                  <option value="desc">Highest to Lowest</option>
                  <option value="asc">Lowest to Highest</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setIsFilterModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setIsFilterModalOpen(false)}>Apply Filters</button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="dashboard-header">
        <div className="header-title-area">
          <h1>Refunds</h1>
          <div className="breadcrumb">Dashboard <span>›</span> Refunds</div>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={handleExport}>
            <FiUpload /> Export
          </button>
          <button className="btn btn-outline" onClick={handleImportClick}>
            <FiDownload /> Import
          </button>
          
          {/* 3. Updated onClick event to navigate to /newfund */}
          <button className="btn btn-primary" onClick={() => navigate('/newfund')}>
            <FiPlus /> New Refund
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-wrapper blue"><HiOutlineCurrencyRupee className="metric-icon" /></div>
          <div className="metric-content">
            <span className="metric-title">Total Refunds</span>
            <h3 className="metric-value">₹ 2,85,640.00</h3>
            <span className="metric-trend positive"><HiOutlineTrendingUp /> 18.7% this month</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon-wrapper orange"><HiOutlineClock className="metric-icon" /></div>
          <div className="metric-content">
            <span className="metric-title">Pending</span>
            <h3 className="metric-value">₹ 48,750.00</h3>
            <span className="metric-trend positive"><HiOutlineTrendingUp /> 12.5% this month</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon-wrapper green"><HiOutlineCheckCircle className="metric-icon" /></div>
          <div className="metric-content">
            <span className="metric-title">Approved</span>
            <h3 className="metric-value">₹ 1,85,650.00</h3>
            <span className="metric-trend positive"><HiOutlineTrendingUp /> 14.8% this month</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon-wrapper teal"><HiOutlineWallet className="metric-icon" /></div>
          <div className="metric-content">
            <span className="metric-title">Completed</span>
            <h3 className="metric-value">₹ 1,65,900.00</h3>
            <span className="metric-trend positive"><HiOutlineTrendingUp /> 16.3% this month</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon-wrapper red"><HiOutlineXCircle className="metric-icon" /></div>
          <div className="metric-content">
            <span className="metric-title">Rejected</span>
            <h3 className="metric-value">₹ 20,990.00</h3>
            <span className="metric-trend negative"><HiOutlineTrendingDown /> 6.2% this month</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="filters-bar">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by Refund ID, Order ID, Customer..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="filter-dropdowns">
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
            <option value="All Status">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select value={paymentFilter} onChange={(e) => { setPaymentFilter(e.target.value); setCurrentPage(1); }}>
            <option value="All Payment Methods">All Payment Methods</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Wallet">Wallet</option>
          </select>
          
          <div className="date-picker-wrapper">
            <FiCalendar className="date-icon" />
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)}
              className="date-input"
            />
            <span className="date-separator">-</span>
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)}
              className="date-input"
            />
          </div>

          <button className="btn btn-outline filter-btn" onClick={() => setIsFilterModalOpen(true)}>
            <FiFilter /> Filters
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className={`dashboard-main-layout ${selectedRefund ? 'with-details-open' : ''}`}>
        <div className="table-container">
          <table className="refunds-table">
            <thead>
              <tr>
                <th className="col-checkbox"><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
                <th className="col-id">Refund ID</th>
                <th className="col-order">Order ID</th>
                <th className="col-customer">Customer</th>
                <th className="col-amount">Amount</th>
                <th className="col-method">Payment Method</th>
                <th className="col-status">Status</th>
                <th className="col-date">Requested On</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRefunds.length > 0 ? (
                paginatedRefunds.map((item) => (
                  <tr 
                    key={item.id} 
                    onClick={() => setSelectedRefund(item)}
                    className={selectedRefund?.id === item.id ? 'row-selected' : ''}
                  >
                    <td className="col-checkbox" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(item.id)} 
                        onChange={(e) => handleSelectRow(item.id, e)} 
                      />
                    </td>
                    <td className="col-id font-medium primary-text">{item.id}</td>
                    <td className="col-order primary-text">{item.orderId}</td>
                    <td className="col-customer">
                      <div className="customer-cell">
                        <img src={item.avatar} alt={item.customer} className="customer-avatar" />
                        <span className="customer-name">{item.customer}</span>
                      </div>
                    </td>
                    <td className="col-amount font-semibold">{item.amount}</td>
                    <td className="col-method"><span className="method-tag">{item.paymentMethod}</span></td>
                    <td className="col-status">
                      <span className={`status-badge ${item.status.toLowerCase()}`}>
                        <span className="status-dot"></span>
                        {item.status}
                      </span>
                    </td>
                    <td className="col-date date-cell">{item.requestedOn}</td>
                    <td className="col-actions actions-cell" onClick={(e) => e.stopPropagation()}>
                      <div className="dropdown-wrapper">
                        <button 
                          className="icon-btn" 
                          onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                        >
                          <FiMoreVertical />
                        </button>
                        {activeDropdown === item.id && (
                          <div className="status-dropdown-menu">
                            <div 
                              className={item.status === 'Completed' ? 'active-option' : ''} 
                              onClick={(e) => handleStatusChange(item.id, 'Completed', e)}
                            >
                              Completed
                            </div>
                            <div 
                              className={item.status === 'Pending' ? 'active-option' : ''} 
                              onClick={(e) => handleStatusChange(item.id, 'Pending', e)}
                            >
                              Pending
                            </div>
                            <div 
                              className={item.status === 'Approved' ? 'active-option' : ''} 
                              onClick={(e) => handleStatusChange(item.id, 'Approved', e)}
                            >
                              Approved
                            </div>
                            <div 
                              className={item.status === 'Rejected' ? 'active-option' : ''} 
                              onClick={(e) => handleStatusChange(item.id, 'Rejected', e)}
                            >
                              Rejected
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
                    No matching refunds found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination-bar">
            <span className="pagination-info">
              Showing {filteredRefunds.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + Number(rowsPerPage), filteredRefunds.length)} of {filteredRefunds.length} refunds
            </span>
            <div className="pagination-controls">
              <button 
                className="page-btn" 
                disabled={currentPage === 1}
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              >
                <FiChevronLeft />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i + 1} 
                  className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                className="page-btn" 
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <FiChevronRight />
              </button>

              <select 
                className="page-size-select" 
                value={rowsPerPage} 
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Refund Details Right Sidebar */}
        {selectedRefund && (
          <div className="refund-details-sidebar">
            <div className="details-header">
              <div className="details-title-row">
                <h3>Refund Details</h3>
                <span className="detail-tag">{selectedRefund.id}</span>
              </div>
              <button className="close-sidebar-btn" onClick={() => setSelectedRefund(null)}>
                <FiX />
              </button>
            </div>

            <div className="details-body">
              <div className="section-block">
                <h4>Customer Information</h4>
                <div className="customer-info-card">
                  <img src={selectedRefund.avatar} alt={selectedRefund.customer} className="large-avatar" />
                  <div className="customer-meta">
                    <h5>{selectedRefund.customer}</h5>
                    <p>{selectedRefund.email}</p>
                    <p>{selectedRefund.phone}</p>
                  </div>
                  <div className="customer-contact-icons">
                    <FiMail onClick={() => showToast(`Opened email composer for ${selectedRefund.email}`)} style={{ cursor: 'pointer' }} />
                    <FiPhone onClick={() => showToast(`Initiated call to ${selectedRefund.phone}`)} style={{ cursor: 'pointer' }} />
                  </div>
                </div>
              </div>

              <div className="section-block">
                <h4>Refund Information</h4>
                <div className="info-grid">
                  <div className="info-row"><span>Order ID</span> <strong>{selectedRefund.orderId}</strong></div>
                  <div className="info-row"><span>Refund Amount</span> <strong className="amount-highlight">{selectedRefund.amount}</strong></div>
                  <div className="info-row"><span>Payment Method</span> <strong>{selectedRefund.paymentMethod}</strong></div>
                  <div className="info-row"><span>Transaction ID</span> <strong>TXN759456123</strong></div>
                  <div className="info-row"><span>Status</span> <span className={`status-badge ${selectedRefund.status.toLowerCase()}`}>{selectedRefund.status}</span></div>
                  <div className="info-row"><span>Requested On</span> <strong>{selectedRefund.requestedOn.replace('\n', ' ')}</strong></div>
                  <div className="info-row"><span>Processed On</span> <strong>{selectedRefund.processedOn}</strong></div>
                  <div className="info-row"><span>Reason</span> <strong>{selectedRefund.reason}</strong></div>
                  <div className="info-row notes-row"><span>Notes</span> <strong>{selectedRefund.notes}</strong></div>
                </div>
              </div>

              <div className="section-block actions-block">
                <h4>Actions</h4>
                <div className="action-buttons-group">
                  <button className="btn btn-outline" onClick={() => showToast(`Navigating to order ${selectedRefund.orderId}`)}>View Order</button>
                  <button className="btn btn-outline" onClick={() => showToast(`Downloading invoice for ${selectedRefund.id}`)}>Download Invoice</button>
                </div>
                <button className="btn btn-dark-red" onClick={() => showToast('Note added successfully.')}>Add Note</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RefundsDashboard;