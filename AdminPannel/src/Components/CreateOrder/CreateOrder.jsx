import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiShoppingCart, 
  FiX, 
  FiPlus, 
  FiMinus, 
  FiTrash2, 
  FiCalendar, 
  FiChevronDown 
} from 'react-icons/fi';
import './CreateOrder.css';

const CreateOrder = ({ onClose }) => {
  const navigate = useNavigate();
  const dateInputRef = useRef(null);

  const [formData, setFormData] = useState({
    customer: '',
    email: 'customer@email.com',
    phone: '98765 43210',
    // ISO format for <input type="datetime-local">
    orderDate: '2025-05-29T11:30',
    paymentMethod: 'UPI',
    shippingMethod: 'India Post (Free)',
    paymentStatus: 'Paid',
    useDefaultAddress: true,
    fullName: 'Ananya Sharma',
    addressLine1: '23, Park Street, Near MG Road,',
    addressLine2: 'Bangalore, Karnataka - 560001',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    country: 'India',
    notes: ''
  });

  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Handloom Silk Saree',
      variant: 'Red & Black',
      price: 1990.00,
      qty: 1,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'Cotton Dupatta',
      variant: 'Ivory',
      price: 650.00,
      qty: 1,
      image: 'https://images.unsplash.com/photo-1584273143981-4cc07302be55?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      name: 'Handwoven Stole',
      variant: 'Blue',
      price: 810.00,
      qty: 1,
      image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=100&auto=format&fit=crop&q=80'
    }
  ]);

  // Unified close handler for cross button, cancel button, and escape key
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1); // Navigates back in history or default route
    }
  };

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleQtyChange = (id, delta) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Triggers native browser date-time picker when calendar icon is clicked
  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === 'function') {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = 0.00;
  const discount = 0.00;
  const totalAmount = subtotal + shipping - discount;
  const totalItemsCount = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="create-order-overlay" onClick={handleClose}>
      <div className="create-order-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="header-title-wrapper">
            <div className="header-icon-box">
              <FiShoppingCart className="header-cart-icon" />
            </div>
            <div>
              <h2>Create Order</h2>
              <p>Create a new customer order.</p>
            </div>
          </div>
          <button className="close-btn" onClick={handleClose} aria-label="Close modal">
            <FiX />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          
          {/* Section 1: Customer Information */}
          <div className="form-section customer-info-section">
            <div className="section-title">
              <span className="step-badge">1</span>
              <h3>Customer Information</h3>
            </div>
            <div className="customer-grid">
              <div className="input-group">
                <label>Select Customer *</label>
                <div className="input-with-action">
                  <select className="form-control" defaultValue="">
                    <option value="" disabled>Search customer by name, email or phone...</option>
                    <option value="1">Ananya Sharma</option>
                    <option value="2">Rahul Verma</option>
                  </select>
                  <button className="add-customer-btn" type="button"><FiPlus /></button>
                </div>
              </div>
              <div className="input-group">
                <label>Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="input-group">
                <label>Phone</label>
                <div className="phone-input-wrapper">
                  <select className="country-code-select">
                    <option value="+91">+91</option>
                  </select>
                  <input 
                    type="text" 
                    className="form-control phone-number-input" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid: Order Details, Shipping Address, Order Items */}
          <div className="order-content-grid">
            
            {/* Section 2: Order Details */}
            <div className="form-section order-details-section">
              <div className="section-title">
                <span className="step-badge">2</span>
                <h3>Order Details</h3>
              </div>

              {/* Functional Interactive Calendar Field */}
              <div className="input-group">
                <label>Order Date *</label>
                <div className="input-icon-wrapper" onClick={handleCalendarClick}>
                  <input 
                    type="datetime-local" 
                    ref={dateInputRef}
                    className="form-control date-picker-input" 
                    value={formData.orderDate} 
                    onChange={(e) => setFormData({...formData, orderDate: e.target.value})}
                  />
                  <FiCalendar className="input-suffix-icon calendar-trigger" />
                </div>
              </div>

              <div className="input-group">
                <label>Payment Method *</label>
                <div className="select-wrapper">
                  <select 
                    className="form-control" 
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  >
                    <option value="UPI">UPI</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                  </select>
                  <FiChevronDown className="select-chevron" />
                </div>
              </div>

              <div className="input-group">
                <label>Shipping Method *</label>
                <div className="select-wrapper">
                  <select 
                    className="form-control" 
                    value={formData.shippingMethod}
                    onChange={(e) => setFormData({...formData, shippingMethod: e.target.value})}
                  >
                    <option value="India Post (Free)">India Post (Free)</option>
                    <option value="Express Delivery">Express Delivery</option>
                  </select>
                  <FiChevronDown className="select-chevron" />
                </div>
              </div>

              <div className="input-group">
                <label>Payment Status *</label>
                <div className="select-wrapper">
                  <select 
                    className="form-control status-paid" 
                    value={formData.paymentStatus}
                    onChange={(e) => setFormData({...formData, paymentStatus: e.target.value})}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                  <FiChevronDown className="select-chevron" />
                </div>
              </div>
            </div>

            {/* Section 3: Shipping Address */}
            <div className="form-section shipping-address-section">
              <div className="section-title">
                <span className="step-badge">3</span>
                <h3>Shipping Address</h3>
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={formData.useDefaultAddress} 
                    onChange={(e) => setFormData({...formData, useDefaultAddress: e.target.checked})}
                  />
                  <span>Use customer default address</span>
                </label>
              </div>

              <div className="input-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div className="input-group">
                <label>Address Line 1 *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({...formData, addressLine1: e.target.value})}
                />
              </div>

              <div className="input-group">
                <label>Address Line 2</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.addressLine2}
                  onChange={(e) => setFormData({...formData, addressLine2: e.target.value})}
                />
              </div>

              <div className="address-row-grid">
                <div className="input-group">
                  <label>City *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>State *</label>
                  <div className="select-wrapper">
                    <select 
                      className="form-control" 
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                    >
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                    <FiChevronDown className="select-chevron" />
                  </div>
                </div>
              </div>

              <div className="address-row-grid">
                <div className="input-group">
                  <label>Pincode *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Country *</label>
                  <div className="select-wrapper">
                    <select 
                      className="form-control" 
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                    >
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                    </select>
                    <FiChevronDown className="select-chevron" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Order Items */}
            <div className="form-section order-items-section">
              <div className="section-title-between">
                <div className="section-title">
                  <span className="step-badge">4</span>
                  <h3>Order Items</h3>
                </div>
                <button className="add-item-btn" type="button"><FiPlus /> Add Item</button>
              </div>

              <div className="items-list">
                {items.map((item) => (
                  <div className="order-item-card" key={item.id}>
                    <div className="item-main-info">
                      <img src={item.image} alt={item.name} className="item-thumbnail" />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>{item.variant}</p>
                      </div>
                      <button className="delete-item-btn" type="button" onClick={() => handleRemoveItem(item.id)}>
                        <FiTrash2 />
                      </button>
                    </div>

                    <div className="item-pricing-row">
                      <div className="item-qty-control">
                        <span className="qty-label">Qty</span>
                        <div className="qty-box">
                          <button type="button" onClick={() => handleQtyChange(item.id, -1)}><FiMinus /></button>
                          <span>{item.qty}</span>
                          <button type="button" onClick={() => handleQtyChange(item.id, 1)}><FiPlus /></button>
                        </div>
                      </div>
                      <div className="item-price-calc">
                        <div className="price-col">
                          <span className="calc-label">Price</span>
                          <span className="calc-value">₹ {item.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                        </div>
                        <div className="price-col">
                          <span className="calc-label">Total</span>
                          <span className="calc-value">₹ {(item.price * item.qty).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Subtotals */}
              <div className="order-summary-totals">
                <div className="summary-row">
                  <span>Subtotal ({totalItemsCount} items)</span>
                  <span>₹ {subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>₹ {shipping.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
                <div className="summary-row discount-row">
                  <span>Discount</span>
                  <div className="discount-input-wrapper">
                    <span>₹</span>
                    <input type="text" defaultValue="0.00" />
                  </div>
                </div>
                <div className="summary-row grand-total">
                  <span>Total Amount</span>
                  <span className="highlight-price">₹ {totalAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Section 5: Additional Information */}
          <div className="form-section additional-info-section">
            <div className="section-title">
              <span className="step-badge">5</span>
              <h3>Additional Information</h3>
            </div>
            <div className="input-group">
              <label>Notes</label>
              <textarea 
                className="form-control textarea-control" 
                placeholder="Enter order notes (optional)..."
                maxLength={200}
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              ></textarea>
              <span className="char-count">{formData.notes.length} / 200</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" type="button" onClick={handleClose}>Cancel</button>
          <button className="btn-create-order" type="button">
            <FiShoppingCart /> Create Order
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateOrder;