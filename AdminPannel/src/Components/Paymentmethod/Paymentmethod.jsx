import React, { useState } from 'react';
import './Paymentmethod.css';

const initialMethods = [
  {
    id: 1,
    title: 'Credit / Debit Card',
    subtitle: 'Visa, Mastercard, Rupay',
    status: 'Active',
    iconType: 'card',
    brand: 'VISA'
  },
  {
    id: 2,
    title: 'UPI',
    subtitle: 'Google Pay, PhonePe, BHIM, etc.',
    status: 'Active',
    iconType: 'upi',
    brand: 'UPI'
  },
  {
    id: 3,
    title: 'Bank Transfer',
    subtitle: 'Direct bank transfer',
    status: 'Active',
    iconType: 'bank'
  },
  {
    id: 4,
    title: 'Wallet',
    subtitle: 'Paytm, Amazon Pay, Mobikwik, etc.',
    status: 'Inactive',
    iconType: 'wallet'
  },
  {
    id: 5,
    title: 'Cash on Delivery (COD)',
    subtitle: 'Pay when you receive',
    status: 'Active',
    iconType: 'cash'
  },
];

const availableOptions = [
  { type: 'card', title: 'Credit / Debit Card', desc: 'Accept card payments' },
  { type: 'upi', title: 'UPI', desc: 'Accept UPI payments' },
  { type: 'bank', title: 'Bank Transfer', desc: 'Accept bank transfers' },
  { type: 'wallet', title: 'Wallet', desc: 'Accept wallet payments' },
  { type: 'cash', title: 'Cash on Delivery', desc: 'Accept COD payments' },
];

const Paymentmethod = () => {
  const [methods, setMethods] = useState(initialMethods);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedQuickAdd, setSelectedQuickAdd] = useState('card');
  const [activeMenuId, setActiveMenuId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    status: 'Active',
    iconType: 'card'
  });

  const openAddModal = (defaultType = 'card') => {
    setEditingItem(null);
    const selected = availableOptions.find(o => o.type === defaultType) || availableOptions[0];
    setFormData({
      title: selected.title,
      subtitle: selected.desc,
      status: 'Active',
      iconType: defaultType
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      subtitle: item.subtitle,
      status: item.status,
      iconType: item.iconType
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingItem) {
      setMethods(methods.map(m => m.id === editingItem.id ? { ...m, ...formData } : m));
    } else {
      const newMethod = {
        id: Date.now(),
        ...formData
      };
      setMethods([...methods, newMethod]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setMethods(methods.filter(m => m.id !== id));
    setActiveMenuId(null);
  };

  const renderIcon = (type, brand) => {
    if (brand === 'VISA' || type === 'card') {
      return <div className="pm-icon-box pm-icon-visa">VISA</div>;
    }
    if (brand === 'UPI' || type === 'upi') {
      return <div className="pm-icon-box pm-icon-upi">UPI</div>;
    }
    if (type === 'bank') {
      return <div className="pm-icon-box pm-icon-bank">🏛️</div>;
    }
    if (type === 'wallet') {
      return <div className="pm-icon-box pm-icon-wallet">👛</div>;
    }
    if (type === 'cash') {
      return <div className="pm-icon-box pm-icon-cash">💵</div>;
    }
    return <div className="pm-icon-box">💳</div>;
  };

  return (
    <div className="pm-page-wrapper">
      <div className="pm-container">
        
        {/* Breadcrumb */}
        <div className="pm-breadcrumb">
          <span>🏠</span>
          <span style={{ color: '#aaa' }}>›</span>
          <span>Settings</span>
          <span style={{ color: '#aaa' }}>›</span>
          <span className="pm-breadcrumb-active">Payment Methods</span>
        </div>

        {/* Header */}
        <div className="pm-header">
          <div>
            <h1 className="pm-title">Payment Methods</h1>
            <p className="pm-subtitle">Manage how you receive payments from your customers.</p>
          </div>
          <button className="pm-primary-btn" onClick={() => openAddModal()}>
            + Add Payment Method
          </button>
        </div>

        {/* All Payment Methods Card */}
        <div className="pm-card">
          <h2 className="pm-section-title">All Payment Methods</h2>

          <div className="pm-list">
            {methods.map((method) => (
              <div key={method.id} className="pm-list-item">
                <div className="pm-list-left">
                  {renderIcon(method.iconType, method.brand)}
                  <div>
                    <h3 className="pm-item-title">{method.title}</h3>
                    <p className="pm-item-subtitle">{method.subtitle}</p>
                  </div>
                </div>

                <div className="pm-list-right">
                  <span className={method.status === 'Active' ? 'pm-badge-active' : 'pm-badge-inactive'}>
                    {method.status}
                  </span>

                  <button className="pm-edit-btn" onClick={() => openEditModal(method)}>
                    Edit
                  </button>

                  <div style={{ position: 'relative' }}>
                    <button 
                      className="pm-more-btn" 
                      onClick={() => setActiveMenuId(activeMenuId === method.id ? null : method.id)}
                    >
                      ⋮
                    </button>
                    {activeMenuId === method.id && (
                      <div className="pm-dropdown-menu">
                        <button className="pm-dropdown-item" onClick={() => handleDelete(method.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Banner */}
          <div className="pm-info-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>ⓘ</span>
              <span>Drag and drop to reorder payment methods. The topmost active method will be shown first during checkout.</span>
            </div>
            <button className="pm-save-order-btn" onClick={() => alert('Order Saved Successfully!')}>
              Save Order
            </button>
          </div>
        </div>

        {/* Add New Payment Method Quick Section */}
        <div className="pm-quick-card">
          <h2 className="pm-section-title">Add New Payment Method</h2>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
            Enable a new payment option for your customers.
          </p>

          <div className="pm-quick-grid">
            {availableOptions.map((opt) => (
              <div 
                key={opt.type} 
                className={`pm-quick-box ${selectedQuickAdd === opt.type ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedQuickAdd(opt.type);
                  openAddModal(opt.type);
                }}
              >
                <div className="pm-quick-box-top">
                  <input 
                    type="radio" 
                    name="quickPayment" 
                    checked={selectedQuickAdd === opt.type} 
                    onChange={() => setSelectedQuickAdd(opt.type)}
                    style={{ accentColor: '#882222' }}
                  />
                  {renderIcon(opt.type)}
                </div>
                <h4 className="pm-quick-title">{opt.title}</h4>
                <p className="pm-quick-desc">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="pm-modal-overlay">
          <div className="pm-modal-content">
            <div className="pm-modal-header">
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                {editingItem ? 'Edit Payment Method' : 'Add Payment Method'}
              </h3>
              <button className="pm-modal-close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleSave} style={{ marginTop: '16px' }}>
              <div className="pm-form-group">
                <label className="pm-form-label">Title</label>
                <input 
                  type="text" 
                  className="pm-form-input"
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="pm-form-group">
                <label className="pm-form-label">Subtitle / Details</label>
                <input 
                  type="text" 
                  className="pm-form-input"
                  value={formData.subtitle} 
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>

              <div className="pm-form-row">
                <div className="pm-form-group">
                  <label className="pm-form-label">Type</label>
                  <select 
                    className="pm-form-input"
                    value={formData.iconType} 
                    onChange={(e) => setFormData({ ...formData, iconType: e.target.value })}
                  >
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                    <option value="bank">Bank</option>
                    <option value="wallet">Wallet</option>
                    <option value="cash">Cash</option>
                  </select>
                </div>

                <div className="pm-form-group">
                  <label className="pm-form-label">Status</label>
                  <select 
                    className="pm-form-input"
                    value={formData.status} 
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pm-modal-footer">
                <button type="button" className="pm-btn-cancel" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="pm-btn-save">
                  {editingItem ? 'Save Changes' : 'Add Method'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paymentmethod;