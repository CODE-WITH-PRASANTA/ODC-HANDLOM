// SalesRefunds.jsx
import React, { useState } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiPlus, 
  FiEye, 
  FiMoreVertical, 
  FiChevronLeft, 
  FiChevronRight, 
  FiX, 
  FiDollarSign, 
  FiCheckCircle, 
  FiClock, 
  FiXCircle, 
  FiCalendar,
  FiTrash2,
  FiCheck
} from 'react-icons/fi';
import './SalesRefunds.css';

const initialRefundsData = [
  { id: '#RFND-1025', orderId: '#ORD-1250', customerName: 'Rohit Sharma', customerEmail: 'rohitsharma@email.com', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', amount: '$129.99', reason: 'Changed mind', status: 'Approved', refundDate: '20 May 2025, 10:30 AM', paymentMethod: 'Original Payment Method', cardLast4: '4242', note: 'Customer requested a refund as they changed their mind.', itemName: 'Nike Bag', itemQty: 1 },
  { id: '#RFND-1024', orderId: '#ORD-1248', customerName: 'Priya Patel', customerEmail: 'priyapatel@email.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', amount: '$89.50', reason: 'Product not as described', status: 'Pending', refundDate: '20 May 2025, 09:15 AM', paymentMethod: 'Original Payment Method', cardLast4: '8812', note: 'Item received differed from photos.', itemName: 'Handbag', itemQty: 1 },
  { id: '#RFND-1023', orderId: '#ORD-1247', customerName: 'Amit Kumar', customerEmail: 'amitkumar@email.com', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80', amount: '$249.00', reason: 'Damaged product', status: 'Approved', refundDate: '19 May 2025, 08:45 PM', paymentMethod: 'Credit Card', cardLast4: '1092', note: 'Package arrived with a torn box and scratched product.', itemName: 'Travel Backpack', itemQty: 1 },
  { id: '#RFND-1022', orderId: '#ORD-1246', customerName: 'Sneha Reddy', customerEmail: 'sneha.reddy@email.com', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80', amount: '$59.99', reason: 'Wrong item received', status: 'Rejected', refundDate: '19 May 2025, 06:20 PM', paymentMethod: 'PayPal', cardLast4: '5541', note: 'Claim rejected due to expiry of return window.', itemName: 'Accessories Kit', itemQty: 2 },
  { id: '#RFND-1021', orderId: '#ORD-1245', customerName: 'Vikram Singh', customerEmail: 'vikramsingh@email.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', amount: '$120.00', reason: 'Size issue', status: 'Approved', refundDate: '18 May 2025, 04:10 PM', paymentMethod: 'Original Payment Method', cardLast4: '3321', note: 'Needs a larger size variant.', itemName: 'Sports Shoes', itemQty: 1 },
  { id: '#RFND-1020', orderId: '#ORD-1244', customerName: 'Neha Gupta', customerEmail: 'nehagupta@email.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', amount: '$70.00', reason: 'Better price available', status: 'Pending', refundDate: '18 May 2025, 01:30 PM', paymentMethod: 'Credit Card', cardLast4: '9981', note: 'Found item cheaper elsewhere.', itemName: 'Duffel Bag', itemQty: 1 },
  { id: '#RFND-1019', orderId: '#ORD-1243', customerName: 'Arjun Mehta', customerEmail: 'arjunmehta@email.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', amount: '$199.99', reason: 'Not satisfied', status: 'Approved', refundDate: '17 May 2025, 11:15 AM', paymentMethod: 'Original Payment Method', cardLast4: '7765', note: 'Quality did not meet expectations.', itemName: 'Leather Backpack', itemQty: 1 },
  { id: '#RFND-1018', orderId: '#ORD-1242', customerName: 'Kavya Nair', customerEmail: 'kavyanair@email.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', amount: '$45.50', reason: 'Ordered by mistake', status: 'Rejected', refundDate: '17 May 2025, 09:05 AM', paymentMethod: 'Credit Card', cardLast4: '4432', note: 'Duplicate order placed accidentally.', itemName: 'Water Bottle', itemQty: 1 },
  { id: '#RFND-1017', orderId: '#ORD-1241', customerName: 'Manish Verma', customerEmail: 'manishverma@email.com', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80', amount: '$32.99', reason: 'Changed mind', status: 'Approved', refundDate: '16 May 2025, 07:45 PM', paymentMethod: 'Original Payment Method', cardLast4: '1234', note: 'No longer required.', itemName: 'Gym Towel', itemQty: 2 },
  { id: '#RFND-1016', orderId: '#ORD-1240', customerName: 'Pooja Shah', customerEmail: 'poojashah@email.com', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80', amount: '$299.00', reason: 'Damaged product', status: 'Pending', refundDate: '16 May 2025, 05:20 PM', paymentMethod: 'PayPal', cardLast4: '8901', note: 'Zipper broken on arrival.', itemName: 'Premium Suitcase', itemQty: 1 },
  // Extra items to fully demonstrate working pagination
  { id: '#RFND-1015', orderId: '#ORD-1239', customerName: 'Rahul Dravid', customerEmail: 'rahul@email.com', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', amount: '$85.00', reason: 'Size issue', status: 'Approved', refundDate: '15 May 2025, 02:20 PM', paymentMethod: 'Original Payment Method', cardLast4: '1111', note: 'Exchanged size.', itemName: 'Cap', itemQty: 1 },
  { id: '#RFND-1014', orderId: '#ORD-1238', customerName: 'Smriti Mandhana', customerEmail: 'smriti@email.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', amount: '$140.00', reason: 'Changed mind', status: 'Pending', refundDate: '15 May 2025, 11:10 AM', paymentMethod: 'PayPal', cardLast4: '2222', note: 'Wants different color.', itemName: 'Bat Bag', itemQty: 1 }
];

const SalesRefunds = () => {
  const [refunds, setRefunds] = useState(initialRefundsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [paymentFilter, setPaymentFilter] = useState('All Payment Methods');
  const [reasonFilter, setReasonFilter] = useState('All Refund Reasons');
  
  // Selection & Details panel state
  const [selectedRefund, setSelectedRefund] = useState(null); // null means panel is closed, component takes full width
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Action dropdown menu state for individual row action buttons
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Add Refund Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRefundForm, setNewRefundForm] = useState({
    orderId: '#ORD-1251',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya@email.com',
    amount: '$150.00',
    reason: 'Changed mind',
    status: 'Pending',
    paymentMethod: 'Original Payment Method',
    note: 'Customer initiated new refund request.',
    itemName: 'Classic Rucksack',
    itemQty: 1
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Filter logic
  const filteredRefunds = refunds.filter((item) => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
    const matchesPayment = paymentFilter === 'All Payment Methods' || item.paymentMethod === paymentFilter;
    const matchesReason = reasonFilter === 'All Refund Reasons' || item.reason === reasonFilter;

    return matchesSearch && matchesStatus && matchesPayment && matchesReason;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredRefunds.length / rowsPerPage) || 1;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRefunds.slice(indexOfFirstRow, indexOfLastRow);

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
      setSelectedRows(currentRows.map(r => r.id));
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
      + ["Refund ID,Order ID,Customer,Amount,Reason,Status,Date"]
      .concat(filteredRefunds.map(r => `${r.id},${r.orderId},${r.customerName},${r.amount},${r.reason},${r.status},${r.refundDate}`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_refunds_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddRefundSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `#RFND-${Math.floor(1030 + Math.random() * 100)}`,
      orderId: newRefundForm.orderId,
      customerName: newRefundForm.customerName,
      customerEmail: newRefundForm.customerEmail,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      amount: newRefundForm.amount,
      reason: newRefundForm.reason,
      status: newRefundForm.status,
      refundDate: new Date().toLocaleString(),
      paymentMethod: newRefundForm.paymentMethod,
      cardLast4: '9999',
      note: newRefundForm.note,
      itemName: newRefundForm.itemName,
      itemQty: Number(newRefundForm.itemQty)
    };
    setRefunds([newEntry, ...refunds]);
    setSelectedRefund(newEntry);
    setShowAddModal(false);
    alert('New refund request added successfully!');
  };

  // Action Handlers for row items
  const handleUpdateStatus = (id, newStatus, e) => {
    e.stopPropagation();
    setRefunds(refunds.map(r => r.id === id ? { ...r, status: newStatus } : r));
    if (selectedRefund && selectedRefund.id === id) {
      setSelectedRefund(prev => ({ ...prev, status: newStatus }));
    }
    setActiveMenuId(null);
  };

  const handleDeleteRefund = (id, e) => {
    e.stopPropagation();
    setRefunds(refunds.filter(r => r.id !== id));
    if (selectedRefund && selectedRefund.id === id) {
      setSelectedRefund(null);
    }
    setActiveMenuId(null);
  };

  return (
    <div className="sales-refunds-wrapper">
      {/* Top Metric Cards */}
      <div className="sales-refunds-metrics-grid">
        <div className="sales-refunds-metric-card">
          <div className="sales-refunds-metric-icon-box purple">
            <FiDollarSign className="sales-refunds-metric-icon" />
          </div>
          <div className="sales-refunds-metric-content">
            <span className="sales-refunds-metric-title">Total Refunds</span>
            <h3 className="sales-refunds-metric-value">$18,765.50</h3>
            <span className="sales-refunds-metric-sub">All time</span>
          </div>
        </div>

        <div className="sales-refunds-metric-card">
          <div className="sales-refunds-metric-icon-box green">
            <FiCheckCircle className="sales-refunds-metric-icon" />
          </div>
          <div className="sales-refunds-metric-content">
            <span className="sales-refunds-metric-title">Approved Refunds</span>
            <h3 className="sales-refunds-metric-value">$15,230.00</h3>
            <span className="sales-refunds-metric-sub green-text">81.23% of total</span>
          </div>
        </div>

        <div className="sales-refunds-metric-card">
          <div className="sales-refunds-metric-icon-box orange">
            <FiClock className="sales-refunds-metric-icon" />
          </div>
          <div className="sales-refunds-metric-content">
            <span className="sales-refunds-metric-title">Pending Refunds</span>
            <h3 className="sales-refunds-metric-value">$2,135.50</h3>
            <span className="sales-refunds-metric-sub">11.37% of total</span>
          </div>
        </div>

        <div className="sales-refunds-metric-card">
          <div className="sales-refunds-metric-icon-box red">
            <FiXCircle className="sales-refunds-metric-icon" />
          </div>
          <div className="sales-refunds-metric-content">
            <span className="sales-refunds-metric-title">Rejected Refunds</span>
            <h3 className="sales-refunds-metric-value">$1,400.00</h3>
            <span className="sales-refunds-metric-sub">7.40% of total</span>
          </div>
        </div>

        <div className="sales-refunds-metric-card">
          <div className="sales-refunds-metric-icon-box blue">
            <FiCalendar className="sales-refunds-metric-icon" />
          </div>
          <div className="sales-refunds-metric-content">
            <span className="sales-refunds-metric-title">This Month Refunds</span>
            <h3 className="sales-refunds-metric-value">$3,450.75</h3>
            <span className="sales-refunds-metric-sub">May 2025</span>
          </div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="sales-refunds-action-bar">
        <div className="sales-refunds-search-wrapper">
          <FiSearch className="sales-refunds-search-icon" />
          <input
            type="text"
            placeholder="Search by Order ID, Customer, Email..."
            value={searchTerm}
            onChange={handleSearch}
            className="sales-refunds-search-input"
          />
        </div>

        <div className="sales-refunds-filters-group">
          <select 
            value={statusFilter} 
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="sales-refunds-dropdown"
          >
            <option value="All Status">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select 
            value={paymentFilter} 
            onChange={(e) => { setPaymentFilter(e.target.value); setCurrentPage(1); }}
            className="sales-refunds-dropdown"
          >
            <option value="All Payment Methods">All Payment Methods</option>
            <option value="Original Payment Method">Original Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>

          <select 
            value={reasonFilter} 
            onChange={(e) => { setReasonFilter(e.target.value); setCurrentPage(1); }}
            className="sales-refunds-dropdown"
          >
            <option value="All Refund Reasons">All Refund Reasons</option>
            <option value="Changed mind">Changed mind</option>
            <option value="Product not as described">Product not as described</option>
            <option value="Damaged product">Damaged product</option>
            <option value="Wrong item received">Wrong item received</option>
            <option value="Size issue">Size issue</option>
            <option value="Not satisfied">Not satisfied</option>
          </select>

          <button 
            type="button" 
            className="sales-refunds-btn secondary"
            onClick={() => { setStatusFilter('All Status'); setPaymentFilter('All Payment Methods'); setReasonFilter('All Refund Reasons'); setSearchTerm(''); setCurrentPage(1); }}
          >
            <FiFilter /> Filter
          </button>

          <button 
            type="button" 
            className="sales-refunds-btn secondary"
            onClick={handleExport}
          >
            <FiDownload /> Export
          </button>

          <button 
            type="button" 
            className="sales-refunds-btn primary"
            onClick={() => setShowAddModal(true)}
          >
            <FiPlus /> New Refund
          </button>
        </div>
      </div>

      {/* Main Layout Container (Dynamic grid based on whether details panel is open) */}
      <div className={`sales-refunds-content-layout ${selectedRefund ? 'with-panel' : 'full-width'}`}>
        {/* Table Section */}
        <div className="sales-refunds-table-container">
          <table className="sales-refunds-table">
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox" 
                    checked={selectAll} 
                    onChange={handleSelectAll} 
                  />
                </th>
                <th>Refund ID</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Refund Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((refund) => (
                  <tr 
                    key={refund.id} 
                    className={selectedRefund?.id === refund.id ? 'active-row' : ''}
                    onClick={() => setSelectedRefund(refund)}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(refund.id)}
                        onChange={() => handleSelectRow(refund.id)}
                      />
                    </td>
                    <td className="sales-refunds-id-text">{refund.id}</td>
                    <td className="sales-refunds-order-id">{refund.orderId}</td>
                    <td>
                      <div className="sales-refunds-customer-cell">
                        <img src={refund.avatar} alt={refund.customerName} className="sales-refunds-avatar" />
                        <div>
                          <span className="sales-refunds-cust-name">{refund.customerName}</span>
                          <span className="sales-refunds-cust-email">{refund.customerEmail}</span>
                        </div>
                      </div>
                    </td>
                    <td className="sales-refunds-amount">{refund.amount}</td>
                    <td className="sales-refunds-reason">{refund.reason}</td>
                    <td>
                      <span className={`sales-refunds-status-badge ${refund.status.toLowerCase()}`}>
                        {refund.status}
                      </span>
                    </td>
                    <td className="sales-refunds-date">{refund.refundDate}</td>
                    <td>
                      <div className="sales-refunds-action-icons" onClick={(e) => e.stopPropagation()}>
                        <button type="button" onClick={() => setSelectedRefund(refund)} aria-label="View" title="View Details">
                          <FiEye />
                        </button>
                        <div className="sales-refunds-dropdown-menu-wrapper">
                          <button 
                            type="button" 
                            aria-label="More" 
                            title="Actions"
                            onClick={() => setActiveMenuId(activeMenuId === refund.id ? null : refund.id)}
                          >
                            <FiMoreVertical />
                          </button>
                          {activeMenuId === refund.id && (
                            <div className="sales-refunds-action-dropdown">
                              <button onClick={(e) => handleUpdateStatus(refund.id, 'Approved', e)}>
                                <FiCheck style={{ color: '#16a34a' }} /> Mark Approved
                              </button>
                              <button onClick={(e) => handleUpdateStatus(refund.id, 'Rejected', e)}>
                                <FiXCircle style={{ color: '#dc2626' }} /> Mark Rejected
                              </button>
                              <button onClick={(e) => handleDeleteRefund(refund.id, e)} className="delete-action">
                                <FiTrash2 /> Delete Record
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
                  <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                    No refund records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Fully Functional Pagination Footer */}
          <div className="sales-refunds-pagination-footer">
            <span className="sales-refunds-pagination-info">
              Showing {filteredRefunds.length > 0 ? indexOfFirstRow + 1 : 0} to {Math.min(indexOfLastRow, filteredRefunds.length)} of {filteredRefunds.length} refunds
            </span>
            <div className="sales-refunds-pagination-controls">
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
                // Render first, last, current, and surrounding pages for clean UI
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
                className="sales-refunds-rows-select"
              >
                <option value="5">5 / page</option>
                <option value="10">10 / page</option>
                <option value="20">20 / page</option>
                <option value="50">50 / page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Side Details Panel (Only rendered when selectedRefund is active, enabling full width when closed) */}
        {selectedRefund && (
          <div className="sales-refunds-details-panel">
            <div className="sales-refunds-details-header">
              <h3>Refund Details</h3>
              <button 
                type="button" 
                className="sales-refunds-close-panel"
                onClick={() => setSelectedRefund(null)}
                title="Close panel"
              >
                <FiX />
              </button>
            </div>

            <div className="sales-refunds-details-body">
              <div className="sales-refunds-details-row top-status">
                <div>
                  <span className="sales-refunds-details-label">Refund ID</span>
                  <div className="sales-refunds-details-val highlight">{selectedRefund.id}</div>
                </div>
                <span className={`sales-refunds-status-badge ${selectedRefund.status.toLowerCase()}`}>
                  {selectedRefund.status}
                </span>
              </div>

              <div className="sales-refunds-details-section-title">Order Information</div>
              <div className="sales-refunds-details-row">
                <span className="sales-refunds-details-label">Order ID</span>
                <span className="sales-refunds-details-val">{selectedRefund.orderId}</span>
              </div>
              <div className="sales-refunds-details-row">
                <span className="sales-refunds-details-label">Order Date</span>
                <span className="sales-refunds-details-val">20 May 2025, 10:30 AM</span>
              </div>
              <div className="sales-refunds-details-row">
                <span className="sales-refunds-details-label">Order Amount</span>
                <span className="sales-refunds-details-val red-text">{selectedRefund.amount}</span>
              </div>

              <div className="sales-refunds-details-section-title">Customer Information</div>
              <div className="sales-refunds-customer-box">
                <img src={selectedRefund.avatar} alt="Customer" className="sales-refunds-avatar lg" />
                <div>
                  <div className="sales-refunds-cust-name lg">{selectedRefund.customerName}</div>
                  <div className="sales-refunds-cust-email">{selectedRefund.customerEmail}</div>
                  <div className="sales-refunds-cust-phone">+91 98765 43210</div>
                </div>
              </div>

              <div className="sales-refunds-details-section-title">Refund Information</div>
              <div className="sales-refunds-details-row">
                <span className="sales-refunds-details-label">Refund Amount</span>
                <span className="sales-refunds-details-val">{selectedRefund.amount}</span>
              </div>
              <div className="sales-refunds-details-row">
                <span className="sales-refunds-details-label">Refund Date</span>
                <span className="sales-refunds-details-val">{selectedRefund.refundDate}</span>
              </div>
              <div className="sales-refunds-details-row">
                <span className="sales-refunds-details-label">Refund Method</span>
                <span className="sales-refunds-details-val">{selectedRefund.paymentMethod}</span>
              </div>
              <div className="sales-refunds-details-row">
                <span className="sales-refunds-details-label">Payment Method</span>
                <span className="sales-refunds-details-val card-info">
                  💳 **** **** **** {selectedRefund.cardLast4}
                </span>
              </div>
              <div className="sales-refunds-details-row">
                <span className="sales-refunds-details-label">Reason</span>
                <span className="sales-refunds-details-val">{selectedRefund.reason}</span>
              </div>
              <div className="sales-refunds-details-row">
                <span className="sales-refunds-details-label">Note</span>
                <span className="sales-refunds-details-val note-text">{selectedRefund.note}</span>
              </div>

              <div className="sales-refunds-details-section-title">Items Refunded ({selectedRefund.itemQty})</div>
              <div className="sales-refunds-item-card">
                <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=100&q=80" alt="Item" className="sales-refunds-item-thumb" />
                <div className="sales-refunds-item-info">
                  <span className="sales-refunds-item-name">{selectedRefund.itemName}</span>
                  <span className="sales-refunds-item-qty">Qty: {selectedRefund.itemQty}</span>
                </div>
                <span className="sales-refunds-item-price">{selectedRefund.amount}</span>
              </div>
            </div>

            <div className="sales-refunds-details-footer">
              <button 
                type="button" 
                className="sales-refunds-full-details-btn"
                onClick={() => alert(`Opening complete details for ${selectedRefund.id}`)}
              >
                <FiEye /> View Full Details
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add New Refund Modal Popup */}
      {showAddModal && (
        <div className="sales-refunds-modal-overlay">
          <div className="sales-refunds-modal-content">
            <div className="sales-refunds-modal-header">
              <h2>Create New Refund Request</h2>
              <button type="button" onClick={() => setShowAddModal(false)} className="sales-refunds-close-modal">
                <FiX />
              </button>
            </div>
            <form onSubmit={handleAddRefundSubmit} className="sales-refunds-modal-form">
              <div className="sales-refunds-modal-field">
                <label>Order ID</label>
                <input 
                  type="text" 
                  value={newRefundForm.orderId}
                  onChange={(e) => setNewRefundForm({...newRefundForm, orderId: e.target.value})}
                  required 
                />
              </div>
              <div className="sales-refunds-modal-field">
                <label>Customer Name</label>
                <input 
                  type="text" 
                  value={newRefundForm.customerName}
                  onChange={(e) => setNewRefundForm({...newRefundForm, customerName: e.target.value})}
                  required 
                />
              </div>
              <div className="sales-refunds-modal-field">
                <label>Customer Email</label>
                <input 
                  type="email" 
                  value={newRefundForm.customerEmail}
                  onChange={(e) => setNewRefundForm({...newRefundForm, customerEmail: e.target.value})}
                  required 
                />
              </div>
              <div className="sales-refunds-modal-field">
                <label>Refund Amount</label>
                <input 
                  type="text" 
                  value={newRefundForm.amount}
                  onChange={(e) => setNewRefundForm({...newRefundForm, amount: e.target.value})}
                  required 
                />
              </div>
              <div className="sales-refunds-modal-field">
                <label>Reason</label>
                <select 
                  value={newRefundForm.reason}
                  onChange={(e) => setNewRefundForm({...newRefundForm, reason: e.target.value})}
                >
                  <option value="Changed mind">Changed mind</option>
                  <option value="Product not as described">Product not as described</option>
                  <option value="Damaged product">Damaged product</option>
                  <option value="Wrong item received">Wrong item received</option>
                  <option value="Size issue">Size issue</option>
                </select>
              </div>
              <div className="sales-refunds-modal-field">
                <label>Status</label>
                <select 
                  value={newRefundForm.status}
                  onChange={(e) => setNewRefundForm({...newRefundForm, status: e.target.value})}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="sales-refunds-modal-field">
                <label>Note / Description</label>
                <textarea 
                  rows="3"
                  value={newRefundForm.note}
                  onChange={(e) => setNewRefundForm({...newRefundForm, note: e.target.value})}
                ></textarea>
              </div>
              <div className="sales-refunds-modal-actions">
                <button type="button" className="sales-refunds-btn secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="sales-refunds-btn primary">Save Refund</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesRefunds;