// Payments.jsx
import React, { useState } from 'react';
import { 
  FiBriefcase, 
  FiArrowDownLeft, 
  FiArrowUpRight, 
  FiCreditCard, 
  FiCalendar, 
  FiPlus, 
  FiTrendingUp, 
  FiChevronLeft, 
  FiChevronRight, 
  FiChevronDown, 
  FiX, 
  FiDownload, 
  FiCheckCircle, 
  FiFileText, 
  FiDollarSign, 
  FiClock, 
  FiActivity 
} from 'react-icons/fi';
import './Payments.css';

const Payments = () => {
  // Calendar Date Picker state
  const [dateRange, setDateRange] = useState('01 May 2025 - 31 May 2025');
  const [showCalendar, setShowCalendar] = useState(false);

  // Wallet Overview dropdown view state
  const [walletView, setWalletView] = useState('This Month');
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);

  // Add Funds Modal state
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [addFundsAmount, setAddFundsAmount] = useState('');

  // Request Withdrawal Modal state
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('Bank Transfer (XXXX4578)');

  // View Payout History Modal state
  const [showPayoutHistoryModal, setShowPayoutHistoryModal] = useState(false);

  // Right column sidebar visibility toggle (cross button behavior)
  const [showRightColumn, setShowRightColumn] = useState(true);

  // Recent Transactions Data & Pagination state
  const [transactions, setTransactions] = useState([
    { id: 1, date: '31 May 2025', time: '11:45 AM', description: 'Order #ODC12589\nPayment Received', type: 'Credit', amount: '+ ₹8,750.00', status: 'Completed', balance: '₹2,45,680.00' },
    { id: 2, date: '31 May 2025', time: '10:25 AM', description: 'Refund - Order #ODC12560\nCustomer Refund', type: 'Debit', amount: '- ₹2,450.00', status: 'Completed', balance: '₹2,36,930.00' },
    { id: 3, date: '30 May 2025', time: '04:15 PM', description: 'Payout to Bank A/c\nBank Transfer', type: 'Debit', amount: '- ₹25,000.00', status: 'Completed', balance: '₹2,39,380.00' },
    { id: 4, date: '30 May 2025', time: '01:05 PM', description: 'Order #ODC12520\nPayment Received', type: 'Credit', amount: '+ ₹5,980.00', status: 'Completed', balance: '₹2,64,380.00' },
    { id: 5, date: '29 May 2025', time: '09:30 AM', description: 'Added Funds\nManual Top-up', type: 'Credit', amount: '+ ₹50,000.00', status: 'Completed', balance: '₹2,58,400.00' },
    { id: 6, date: '28 May 2025', time: '02:20 PM', description: 'Order #ODC12499\nPayment Received', type: 'Credit', amount: '+ ₹12,400.00', status: 'Completed', balance: '₹2,08,400.00' },
    { id: 7, date: '27 May 2025', time: '11:10 AM', description: 'Payout to Bank A/c\nBank Transfer', type: 'Debit', amount: '- ₹40,000.00', status: 'Completed', balance: '₹1,96,000.00' }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);

  // Dummy Payout History data
  const payoutHistoryList = [
    { id: 1, date: '30 May 2025', amount: '₹25,000.00', method: 'Bank Transfer (XXXX4578)', status: 'Success' },
    { id: 2, date: '22 May 2025', amount: '₹50,000.00', method: 'Bank Transfer (XXXX4578)', status: 'Success' },
    { id: 3, date: '15 May 2025', amount: '₹18,500.00', method: 'Bank Transfer (XXXX4578)', status: 'Success' },
    { id: 4, date: '05 May 2025', amount: '₹35,000.00', method: 'Bank Transfer (XXXX4578)', status: 'Success' }
  ];

  // Dummy Payment Methods list
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: 'Bank Transfer', detail: 'A/c No. XXXXXXXXXX4578', badge: 'Primary', actionText: 'Primary' },
    { id: 2, name: 'UPI', detail: 'odchandloom@upi', badge: '', actionText: 'Manage' },
    { id: 3, name: 'Razorpay', detail: 'gateway@odchandloom.in', badge: '', actionText: 'Manage' },
    { id: 4, name: 'Paytm', detail: 'merchant@odchandloom.in', badge: '', actionText: 'Manage' }
  ]);

  // Handle Add Funds Form Submit
  const handleAddFundsSubmit = (e) => {
    e.preventDefault();
    if (!addFundsAmount) return;
    const newTx = {
      id: Date.now(),
      date: '31 May 2025',
      time: 'Just now',
      description: 'Added Funds\nManual Top-up',
      type: 'Credit',
      amount: `+ ₹${Number(addFundsAmount).toLocaleString('en-IN')}.00`,
      status: 'Completed',
      balance: '₹2,95,680.00'
    };
    setTransactions([newTx, ...transactions]);
    setAddFundsAmount('');
    setShowAddFundsModal(false);
  };

  // Handle Request Withdrawal Form Submit
  const handleWithdrawalSubmit = (e) => {
    e.preventDefault();
    if (!withdrawalAmount) return;
    const newTx = {
      id: Date.now(),
      date: '31 May 2025',
      time: 'Just now',
      description: 'Payout Request\nBank Transfer',
      type: 'Debit',
      amount: `- ₹${Number(withdrawalAmount).toLocaleString('en-IN')}.00`,
      status: 'Pending',
      balance: '₹2,20,680.00'
    };
    setTransactions([newTx, ...transactions]);
    setWithdrawalAmount('');
    setShowWithdrawalModal(false);
  };

  // Handle Download Report function
  const handleDownloadReport = () => {
    const reportText = transactions.map(t => 
      `${t.date} ${t.time} | ${t.description.replace('\n', ' - ')} | Type: ${t.type} | Amount: ${t.amount} | Status: ${t.status} | Balance: ${t.balance}`
    ).join('\n');

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Payments_Statement_${dateRange.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="payments-container">
      {/* Top Header Section */}
      <div className="payments-header">
        <div className="payments-breadcrumb">
           <span></span> 
        </div>
        <div className="payments-actions-header">
          {/* Calendar Picker */}
          <div className="payments-calendar-wrapper">
            <button 
              className="payments-calendar-btn"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <FiCalendar className="payments-icon" />
              <span>{dateRange}</span>
            </button>
            {showCalendar && (
              <div className="payments-calendar-dropdown">
                <p>Select Date Range:</p>
                <input 
                  type="text" 
                  value={dateRange} 
                  onChange={(e) => setDateRange(e.target.value)}
                />
                <button 
                  className="payments-apply-date"
                  onClick={() => setShowCalendar(false)}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Add Funds Button */}
          <button 
            className="payments-add-funds-btn"
            onClick={() => setShowAddFundsModal(true)}
          >
            <FiPlus className="payments-icon" />
            <span>Add Funds</span>
          </button>
        </div>
      </div>

      {/* Top 4 Summary Cards Grid */}
      <div className="payments-metrics-grid">
        <div className="payments-metric-card">
          <div className="payments-metric-icon-box green">
            <FiBriefcase />
          </div>
          <div className="payments-metric-content">
            <span className="payments-metric-title">Total Balance</span>
            <h3 className="payments-metric-value">₹2,45,680.00</h3>
            <span className="payments-metric-sub green-text">Available Balance</span>
          </div>
        </div>

        <div className="payments-metric-card">
          <div className="payments-metric-icon-box blue">
            <FiArrowDownLeft />
          </div>
          <div className="payments-metric-content">
            <span className="payments-metric-title">Total Credits</span>
            <h3 className="payments-metric-value">₹6,78,450.00</h3>
            <span className="payments-metric-sub">This Month</span>
          </div>
        </div>

        <div className="payments-metric-card">
          <div className="payments-metric-icon-box red">
            <FiArrowUpRight />
          </div>
          <div className="payments-metric-content">
            <span className="payments-metric-title">Total Debits</span>
            <h3 className="payments-metric-value">₹4,32,770.00</h3>
            <span className="payments-metric-sub">This Month</span>
          </div>
        </div>

        <div className="payments-metric-card">
          <div className="payments-metric-icon-box orange">
            <FiCreditCard />
          </div>
          <div className="payments-metric-content">
            <span className="payments-metric-title">Pending Payouts</span>
            <h3 className="payments-metric-value">₹58,230.00</h3>
            <span className="payments-metric-sub">3 Transactions</span>
          </div>
        </div>
      </div>

      {/* Main Layout Grid: Left Section & Right Sidebar */}
      <div className={`payments-main-layout ${!showRightColumn ? 'full-width-layout' : ''}`}>
        
        {/* Left Section */}
        <div className="payments-left-section">
          
          {/* Wallet Overview Card */}
          <div className="payments-card payments-wallet-overview">
            <div className="payments-card-header">
              <div className="payments-card-title-wrapper">
                <FiBriefcase className="payments-section-icon" />
                <h2>Wallet Overview</h2>
              </div>
              <div className="payments-dropdown-wrapper">
                <button 
                  className="payments-dropdown-btn"
                  onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                >
                  {walletView} <FiChevronDown />
                </button>
                {showWalletDropdown && (
                  <div className="payments-dropdown-menu">
                    {['This Month', 'Last Month', 'Last 3 Months', 'This Year'].map(item => (
                      <span key={item} onClick={() => { setWalletView(item); setShowWalletDropdown(false); }}>
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="payments-chart-subtitle">Balance Trend</div>

            <div className="payments-chart-container">
              <svg viewBox="0 0 700 220" className="payments-line-chart" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="paymentsRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a33b3b" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#a33b3b" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <text x="10" y="30" fill="#888" fontSize="10">3L</text>
                <text x="10" y="65" fill="#888" fontSize="10">2.5L</text>
                <text x="10" y="100" fill="#888" fontSize="10">2L</text>
                <text x="10" y="135" fill="#888" fontSize="10">1.5L</text>
                <text x="10" y="170" fill="#888" fontSize="10">1L</text>
                
                <line x1="40" y1="35" x2="680" y2="35" stroke="#eee" strokeDasharray="4" />
                <line x1="40" y1="70" x2="680" y2="70" stroke="#eee" strokeDasharray="4" />
                <line x1="40" y1="105" x2="680" y2="105" stroke="#eee" strokeDasharray="4" />
                <line x1="40" y1="140" x2="680" y2="140" stroke="#eee" strokeDasharray="4" />
                <line x1="40" y1="175" x2="680" y2="175" stroke="#eee" />

                <path 
                  d="M 50,145 C 100,130 150,110 200,115 C 250,120 300,90 350,65 C 400,95 450,140 500,120 C 550,105 600,112 670,85" 
                  fill="none" 
                  stroke="#a33b3b" 
                  strokeWidth="2.5" 
                />
                <path 
                  d="M 50,145 C 100,130 150,110 200,115 C 250,120 300,90 350,65 C 400,95 450,140 500,120 C 550,105 600,112 670,85 L 670,195 L 50,195 Z" 
                  fill="url(#paymentsRevenueGradient)" 
                />
              </svg>
              <div className="payments-chart-xaxis">
                <span>01 May</span>
                <span>06 May</span>
                <span>11 May</span>
                <span>16 May</span>
                <span>21 May</span>
                <span>26 May</span>
                <span>31 May</span>
              </div>
            </div>

            {/* Wallet Footer Breakdown Boxes */}
            <div className="payments-wallet-footer-grid">
              <div className="payments-footer-box">
                <span className="box-label">Opening Balance</span>
                <span className="box-value">₹1,85,420.00</span>
              </div>
              <div className="payments-footer-box">
                <span className="box-label">Total Credits</span>
                <span className="box-value green">+ ₹6,78,450.00</span>
              </div>
              <div className="payments-footer-box">
                <span className="box-label">Total Debits</span>
                <span className="box-value red">- ₹4,32,770.00</span>
              </div>
              <div className="payments-footer-box">
                <span className="box-label">Closing Balance</span>
                <span className="box-value">₹2,45,680.00</span>
              </div>
            </div>
          </div>

          {/* Recent Transactions Card */}
          <div className="payments-card payments-recent-transactions">
            <div className="payments-card-header">
              <div className="payments-card-title-wrapper">
                <FiCreditCard className="payments-section-icon" />
                <h2>Recent Transactions</h2>
              </div>
              <button className="payments-view-all-btn" onClick={handleDownloadReport}>
                Download Report
              </button>
            </div>

            <div className="payments-table-responsive">
              <table className="payments-data-table">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="payments-datetime-cell">
                        <b>{tx.date}</b>
                        <span>{tx.time}</span>
                      </td>
                      <td className="payments-desc-cell">
                        {tx.description.split('\n').map((line, idx) => (
                          <span key={idx}>{line}</span>
                        ))}
                      </td>
                      <td>
                        <span className={`payments-type-pill ${tx.type.toLowerCase()}`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className={`payments-amount-cell ${tx.type.toLowerCase()}`}>
                        {tx.amount}
                      </td>
                      <td>
                        <span className={`payments-status-pill ${tx.status.toLowerCase()}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="payments-balance-cell">{tx.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="payments-pagination-footer">
              <span>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, transactions.length)} of {transactions.length} transactions</span>
              <div className="payments-pagination-controls">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
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
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar Column */}
        {showRightColumn && (
          <div className="payments-right-column">
            
            {/* Wallet Balance Card */}
            <div className="payments-card payments-wallet-balance-card">
              <div className="payments-card-header">
                <div className="payments-card-title-wrapper">
                  <FiBriefcase className="payments-section-icon" />
                  <h2>Wallet Balance</h2>
                </div>
                <button 
                  className="payments-form-close-btn" 
                  onClick={() => setShowRightColumn(false)}
                  title="Close sidebar"
                >
                  <FiX />
                </button>
              </div>

              <div className="payments-wallet-balance-content">
                <div className="wallet-info-text">
                  <span className="label">Available Balance</span>
                  <h3 className="amount">₹2,45,680.00</h3>
                </div>
                <div className="wallet-image-box">
                  <img src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200&auto=format&fit=crop&q=80" alt="Wallet Illustration" />
                </div>
              </div>

              <div className="payments-sidebar-actions">
                <button className="payments-add-funds-action-btn" onClick={() => setShowAddFundsModal(true)}>
                  <FiPlus /> Add Funds
                </button>
                <button className="payments-withdrawal-action-btn" onClick={() => setShowWithdrawalModal(true)}>
                  <span className="btn-icon-text">📄 Request Withdrawal</span>
                  <span className="arrow">›</span>
                </button>
                <button className="payments-payout-history-btn" onClick={() => setShowPayoutHistoryModal(true)}>
                  <span className="btn-icon-text">📋 View Payout History</span>
                  <span className="arrow">›</span>
                </button>
              </div>
            </div>

            {/* Payment Methods Card */}
            <div className="payments-card payments-payment-methods-card">
              <div className="payments-card-header">
                <div className="payments-card-title-wrapper">
                  <FiCreditCard className="payments-section-icon" />
                  <h2>Payment Methods</h2>
                </div>
              </div>

              <div className="payments-methods-list">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="payments-method-item">
                    <div className="method-info">
                      <div className="method-icon-box">
                        <FiCreditCard />
                      </div>
                      <div className="method-text">
                        <h4>{method.name}</h4>
                        <p>{method.detail}</p>
                      </div>
                    </div>
                    {method.badge ? (
                      <span className="method-badge primary">{method.badge}</span>
                    ) : (
                      <button className="method-manage-btn">{method.actionText}</button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="payments-card payments-quick-summary-card">
              <div className="payments-card-header">
                <div className="payments-card-title-wrapper">
                  <FiTrendingUp className="payments-section-icon" />
                  <h2>Quick Summary</h2>
                </div>
              </div>

              <div className="quick-summary-stats">
                <div className="summary-row">
                  <span>Successful Transactions</span>
                  <b className="green-text">1280</b>
                </div>
                <div className="summary-row">
                  <span>Failed Transactions</span>
                  <b className="red-text">12</b>
                </div>
                <div className="summary-row">
                  <span>Refunds Processed</span>
                  <b className="gold-text">36</b>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Add Funds Popup Modal */}
      {showAddFundsModal && (
        <div className="payments-modal-overlay">
          <div className="payments-modal-content">
            <div className="payments-modal-header">
              <h2>Add Funds to Wallet</h2>
              <button onClick={() => setShowAddFundsModal(false)}><FiX /></button>
            </div>
            <form onSubmit={handleAddFundsSubmit}>
              <div className="payments-form-group">
                <label>Amount (₹) *</label>
                <input 
                  type="number" 
                  placeholder="Enter amount (e.g. 10000)" 
                  value={addFundsAmount}
                  onChange={(e) => setAddFundsAmount(e.target.value)}
                  required 
                />
              </div>
              <div className="payments-form-group">
                <label>Payment Source</label>
                <select>
                  <option>Bank Transfer (XXXX4578)</option>
                  <option>UPI (odchandloom@upi)</option>
                  <option>Razorpay Gateway</option>
                </select>
              </div>
              <div className="payments-modal-actions">
                <button type="button" className="payments-cancel-btn" onClick={() => setShowAddFundsModal(false)}>Cancel</button>
                <button type="submit" className="payments-submit-btn">Proceed to Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Request Withdrawal Modal */}
      {showWithdrawalModal && (
        <div className="payments-modal-overlay">
          <div className="payments-modal-content">
            <div className="payments-modal-header">
              <h2>Request Withdrawal</h2>
              <button onClick={() => setShowWithdrawalModal(false)}><FiX /></button>
            </div>
            <form onSubmit={handleWithdrawalSubmit}>
              <div className="payments-form-group">
                <label>Withdrawal Amount (₹) *</label>
                <input 
                  type="number" 
                  placeholder="Enter amount to withdraw" 
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  required 
                />
                <small>Available Balance: ₹2,45,680.00</small>
              </div>
              <div className="payments-form-group">
                <label>Select Payout Destination</label>
                <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
                  <option value="Bank Transfer (XXXX4578)">Bank Transfer (XXXX4578)</option>
                  <option value="Secondary Bank Account">Secondary Bank Account (XXXX9821)</option>
                  <option value="Registered UPI">Registered UPI (odchandloom@upi)</option>
                </select>
              </div>
              <div className="payments-modal-actions">
                <button type="button" className="payments-cancel-btn" onClick={() => setShowWithdrawalModal(false)}>Cancel</button>
                <button type="submit" className="payments-submit-btn">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Payout History Modal */}
      {showPayoutHistoryModal && (
        <div className="payments-modal-overlay">
          <div className="payments-modal-content large">
            <div className="payments-modal-header">
              <h2>Payout History</h2>
              <button onClick={() => setShowPayoutHistoryModal(false)}><FiX /></button>
            </div>
            <div className="payments-modal-body">
              <table className="payments-data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutHistoryList.map(p => (
                    <tr key={p.id}>
                      <td>{p.date}</td>
                      <td><b>{p.amount}</b></td>
                      <td>{p.method}</td>
                      <td><span className="payments-status-pill completed">{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="payments-modal-actions">
              <button type="button" className="payments-submit-btn" onClick={() => setShowPayoutHistoryModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Payments;