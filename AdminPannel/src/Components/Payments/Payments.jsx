// Payments.jsx
import React, { useState, useEffect } from 'react';
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
  FiEdit2,
  FiTrash2 
} from 'react-icons/fi';
import './Payments.css';

const Payments = () => {
  const [dateRange, setDateRange] = useState('01 May 2025 - 31 May 2025');
  const [showCalendar, setShowCalendar] = useState(false);

  const [walletView, setWalletView] = useState('This Month');
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);

  // Modals state
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [addFundsAmount, setAddFundsAmount] = useState('');

  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('Bank Transfer (XXXX4578)');

  const [showPayoutHistoryModal, setShowPayoutHistoryModal] = useState(false);
  const [showRightColumn, setShowRightColumn] = useState(true);

  // Transactions and Edit State
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Dummy Payout History data & Payment Methods
  const payoutHistoryList = [
    { id: 1, date: '30 May 2025', amount: '₹25,000.00', method: 'Bank Transfer (XXXX4578)', status: 'Success' },
    { id: 2, date: '22 May 2025', amount: '₹50,000.00', method: 'Bank Transfer (XXXX4578)', status: 'Success' }
  ];

  const [paymentMethods] = useState([
    { id: 1, name: 'Bank Transfer', detail: 'A/c No. XXXXXXXXXX4578', badge: 'Primary', actionText: 'Primary' },
    { id: 2, name: 'UPI', detail: 'odchandloom@upi', badge: '', actionText: 'Manage' }
  ]);

  // Fetch Transactions from Backend on Load
  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle Add / Edit Funds Form Submit
  const handleAddFundsSubmit = async (e) => {
    e.preventDefault();
    if (!addFundsAmount) return;

    const payload = {
      date: '31 May 2025',
      time: 'Just now',
      description: 'Added Funds\nManual Top-up',
      type: 'Credit',
      amount: `+ ₹${Number(addFundsAmount).toLocaleString('en-IN')}.00`,
      status: 'Completed',
      balance: '₹2,95,680.00'
    };

    try {
      if (editingId) {
        // Update existing
        const response = await fetch(`http://localhost:5000/api/transactions/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          fetchTransactions();
          setEditingId(null);
        }
      } else {
        // Create new
        const response = await fetch('http://localhost:5000/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          fetchTransactions();
        }
      }
      setAddFundsAmount('');
      setShowAddFundsModal(false);
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  // Handle Request Withdrawal Form Submit
  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();
    if (!withdrawalAmount) return;

    const payload = {
      date: '31 May 2025',
      time: 'Just now',
      description: 'Payout Request\nBank Transfer',
      type: 'Debit',
      amount: `- ₹${Number(withdrawalAmount).toLocaleString('en-IN')}.00`,
      status: 'Pending',
      balance: '₹2,20,680.00'
    };

    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        fetchTransactions();
        setWithdrawalAmount('');
        setShowWithdrawalModal(false);
      }
    } catch (error) {
      console.error('Error submitting withdrawal:', error);
    }
  };

  // Handle Edit Click - Load data into form modal
  const handleEdit = (tx) => {
    setEditingId(tx._id);
    // Extract numerical digits for amount input
    const numericAmount = tx.amount.replace(/[^0-9]/g, '');
    setAddFundsAmount(numericAmount);
    setShowAddFundsModal(true);
  };

  // Handle Delete Click
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchTransactions();
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Pagination Calculations
  const totalPages = Math.ceil(transactions.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="payments-container">
      {/* Top Header Section */}
      <div className="payments-header">
        <div className="payments-breadcrumb"><span></span></div>
        <div className="payments-actions-header">
          <button className="payments-add-funds-btn" onClick={() => { setEditingId(null); setAddFundsAmount(''); setShowAddFundsModal(true); }}>
            <FiPlus className="payments-icon" />
            <span>Add Funds</span>
          </button>
        </div>
      </div>

      {/* Top 4 Summary Cards Grid */}
      <div className="payments-metrics-grid">
        <div className="payments-metric-card">
          <div className="payments-metric-icon-box green"><FiBriefcase /></div>
          <div className="payments-metric-content">
            <span className="payments-metric-title">Total Balance</span>
            <h3 className="payments-metric-value">₹2,45,680.00</h3>
            <span className="payments-metric-sub green-text">Available Balance</span>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className={`payments-main-layout ${!showRightColumn ? 'full-width-layout' : ''}`}>
        <div className="payments-left-section">
          
          {/* Recent Transactions Table */}
          <div className="payments-card payments-recent-transactions">
            <div className="payments-card-header">
              <div className="payments-card-title-wrapper">
                <FiCreditCard className="payments-section-icon" />
                <h2>Recent Transactions</h2>
              </div>
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.map((tx) => (
                    <tr key={tx._id}>
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
                        <span className={`payments-type-pill ${tx.type.toLowerCase()}`}>{tx.type}</span>
                      </td>
                      <td className={`payments-amount-cell ${tx.type.toLowerCase()}`}>{tx.amount}</td>
                      <td>
                        <span className={`payments-status-pill ${tx.status.toLowerCase()}`}>{tx.status}</span>
                      </td>
                      <td className="payments-balance-cell">{tx.balance}</td>
                      <td>
                        <button className="action-icon-btn edit" onClick={() => handleEdit(tx)} title="Edit">
                          <FiEdit2 />
                        </button>
                        <button className="action-icon-btn delete" onClick={() => handleDelete(tx._id)} title="Delete">
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="payments-pagination-footer">
              <span>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, transactions.length)} of {transactions.length} transactions</span>
              <div className="payments-pagination-controls">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                  <FiChevronLeft />
                </button>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        {showRightColumn && (
          <div className="payments-right-column">
            <div className="payments-card payments-wallet-balance-card">
              <div className="payments-card-header">
                <h2>Wallet Balance</h2>
                <button className="payments-form-close-btn" onClick={() => setShowRightColumn(false)}><FiX /></button>
              </div>
              <div className="payments-sidebar-actions">
                <button className="payments-add-funds-action-btn" onClick={() => { setEditingId(null); setAddFundsAmount(''); setShowAddFundsModal(true); }}>
                  <FiPlus /> Add Funds
                </button>
                <button className="payments-withdrawal-action-btn" onClick={() => setShowWithdrawalModal(true)}>
                  <span className="btn-icon-text">📄 Request Withdrawal</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Funds Popup Modal */}
      {showAddFundsModal && (
        <div className="payments-modal-overlay">
          <div className="payments-modal-content">
            <div className="payments-modal-header">
              <h2>{editingId ? 'Edit Transaction' : 'Add Funds to Wallet'}</h2>
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
              <div className="payments-modal-actions">
                <button type="button" className="payments-cancel-btn" onClick={() => setShowAddFundsModal(false)}>Cancel</button>
                <button type="submit" className="payments-submit-btn">{editingId ? 'Update' : 'Proceed to Add'}</button>
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
              </div>
              <div className="payments-modal-actions">
                <button type="button" className="payments-cancel-btn" onClick={() => setShowWithdrawalModal(false)}>Cancel</button>
                <button type="submit" className="payments-submit-btn">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;