import React, { useState, useEffect, useRef } from 'react';
import './PaymentMethods.css';

const initialPaymentMethods = [
  {
    id: 1,
    type: 'visa',
    isDefault: true,
    lastFour: '4242',
    expires: '12/28',
    name: 'John Doe',
  },
  {
    id: 2,
    type: 'mastercard',
    isDefault: false,
    lastFour: '8888',
    expires: '11/27',
    name: 'John Doe',
  },
  {
    id: 3,
    type: 'upi',
    isDefault: false,
    upiId: 'john.doe@upi',
    isPrimary: true,
    name: 'John Doe',
  },
];

const PaymentMethods = () => {
  const [methods, setMethods] = useState(initialPaymentMethods);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [openThreeDotMenu, setOpenThreeDotMenu] = useState(null);

  // Form states for modal
  const [formData, setFormData] = useState({
    type: 'visa',
    lastFour: '',
    expires: '',
    upiId: '',
    name: '',
  });

  const menuRef = useRef(null);

  // Close three-dot menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenThreeDotMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update form inputs when modal opens or edit targets change
  useEffect(() => {
    if (editingMethod) {
      setFormData({
        type: editingMethod.type || 'visa',
        lastFour: editingMethod.lastFour || '',
        expires: editingMethod.expires || '',
        upiId: editingMethod.upiId || '',
        name: editingMethod.name || '',
      });
    } else {
      setFormData({
        type: 'visa',
        lastFour: '',
        expires: '',
        upiId: '',
        name: '',
      });
    }
  }, [editingMethod, showAddModal]);

  const renderBrandHeader = (method) => {
    if (method.isDefault) {
      return <span className="default-badge">Default</span>;
    }

    switch (method.type) {
      case 'visa':
        return <span className="visa-text-logo">VISA</span>;
      case 'mastercard':
        return (
          <div className="mastercard-circles">
            <span className="circle red"></span>
            <span className="circle orange"></span>
          </div>
        );
      case 'upi':
        return (
          <div className="upi-logo">
            <span className="upi-text">UPI</span>
            <span className="upi-arrow">▶</span>
          </div>
        );
      default:
        return null;
    }
  };

  const handleEdit = (method) => {
    setEditingMethod(method);
    setShowAddModal(true);
    setOpenThreeDotMenu(null);
  };

  const handleDelete = (id) => {
    setMethods(methods.filter((method) => method.id !== id));
    setOpenThreeDotMenu(null);
  };

  const handleSetDefault = (id) => {
    setMethods(
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
    setOpenThreeDotMenu(null);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (editingMethod) {
      setMethods(
        methods.map((method) =>
          method.id === editingMethod.id
            ? {
                ...method,
                type: formData.type,
                name: formData.name,
                ...(formData.type === 'upi'
                  ? { upiId: formData.upiId }
                  : { lastFour: formData.lastFour, expires: formData.expires }),
              }
            : method
        )
      );
    } else {
      const newMethod = {
        id: Date.now(),
        type: formData.type,
        name: formData.name,
        isDefault: methods.length === 0,
        ...(formData.type === 'upi'
          ? { upiId: formData.upiId, isPrimary: false }
          : { lastFour: formData.lastFour, expires: formData.expires }),
      };
      setMethods([...methods, newMethod]);
    }

    setShowAddModal(false);
    setEditingMethod(null);
  };

  const toggleThreeDotMenu = (id, e) => {
    e.stopPropagation();
    setOpenThreeDotMenu(openThreeDotMenu === id ? null : id);
  };

  return (
    <div className="PaymentMethods-full-page">
      <div className="PaymentMethods-container">
        <div className="PaymentMethods-header">
          <h2 className="PaymentMethods-title">Payment Methods</h2>
          <button
            className="PaymentMethods-add-btn"
            onClick={() => {
              setEditingMethod(null);
              setShowAddModal(true);
            }}
          >
            <span className="add-icon">+</span> Add New Card
          </button>
        </div>

        <div className="PaymentMethods-list">
          {methods.map((method) => (
            <div
              key={method.id}
              className={`PaymentMethods-card ${method.isDefault ? 'is-default' : ''}`}
            >
              <div className="card-header">
                <div className="card-icon-container">{renderBrandHeader(method)}</div>
                <div className="three-dot-wrapper">
                  <button
                    className="three-dot-btn"
                    onClick={(e) => toggleThreeDotMenu(method.id, e)}
                    aria-label="Options"
                  >
                    •••
                  </button>
                  {openThreeDotMenu === method.id && (
                    <div className="three-dot-menu" ref={menuRef}>
                      {!method.isDefault && (
                        <button onClick={() => handleSetDefault(method.id)}>
                          Set as Default
                        </button>
                      )}
                      <button onClick={() => handleEdit(method)}>Edit</button>
                      <button className="delete-option" onClick={() => handleDelete(method.id)}>
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="card-body">
                {method.type === 'upi' ? (
                  <>
                    <p className="card-main-text">
                      <strong>UPI ID:</strong> {method.upiId}
                    </p>
                    <p className="card-sub-text">{method.isPrimary ? 'Primary UPI' : 'Secondary UPI'}</p>
                    <p className="card-sub-text">{method.name}</p>
                  </>
                ) : (
                  <>
                    <p className="card-main-text">
                      <span className="card-type-name">
                        {method.type.charAt(0).toUpperCase() + method.type.slice(1)}
                      </span>{' '}
                      •••• •••• •••• {method.lastFour}
                    </p>
                    <p className="card-sub-text">Expires {method.expires}</p>
                    <p className="card-sub-text">{method.name}</p>
                  </>
                )}
              </div>

              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEdit(method)}>
                  Edit
                </button>
                <button className="remove-btn" onClick={() => handleDelete(method.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Responsive Modal Form */}
        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-modal-btn"
                onClick={() => setShowAddModal(false)}
              >
                &times;
              </button>
              <h3 className="modal-title">
                {editingMethod ? 'Edit Payment Method' : 'Add New Payment Method'}
              </h3>

              <form onSubmit={handleSubmitForm} className="modal-form">
                <div className="form-group">
                  <label>Payment Method Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                    <option value="upi">UPI ID</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Cardholder / Account Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {formData.type === 'upi' ? (
                  <div className="form-group">
                    <label>UPI ID</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. john.doe@upi"
                      value={formData.upiId}
                      onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    />
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label>Last 4 Digits</label>
                      <input
                        type="text"
                        maxLength={4}
                        pattern="\d{4}"
                        required
                        placeholder="e.g. 4242"
                        value={formData.lastFour}
                        onChange={(e) => setFormData({ ...formData, lastFour: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Expiry Date (MM/YY)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 12/28"
                        value={formData.expires}
                        onChange={(e) => setFormData({ ...formData, expires: e.target.value })}
                      />
                    </div>
                  </>
                )}

                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    {editingMethod ? 'Update' : 'Add Card'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;