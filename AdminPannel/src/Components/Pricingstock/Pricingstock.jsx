// Pricingstock.jsx
import React, { useState } from 'react';
import { FiDollarSign, FiTruck, FiChevronDown } from 'react-icons/fi';
import './Pricingstock.css';

const Pricingstock = () => {
  const [formData, setFormData] = useState({
    regularPrice: '16.38',
    salePrice: '12.99',
    costPrice: '9.00',
    taxClass: 'Standard',
    stockQuantity: '120',
    lowStockThreshold: '10',
    trackInventory: true,
    allowBackorders: false,
    weight: '0.750',
    length: '45',
    width: '30',
    height: '15',
    shippingClass: 'Standard',
    freeShipping: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleToggle = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="pricingstock-wrapper">
      {/* Pricing & Stock Card */}
      <div className="pricingstock-card">
        <div className="pricingstock-header">
          <div className="pricingstock-header-icon-box purple">
            <FiDollarSign className="pricingstock-header-icon" />
          </div>
          <h2 className="pricingstock-header-title">Pricing & Stock</h2>
        </div>

        <div className="pricingstock-grid-3">
          <div className="pricingstock-field">
            <label className="pricingstock-label">
              Regular Price <span className="pricingstock-required">*</span>
            </label>
            <div className="pricingstock-input-icon-wrapper">
              <span className="pricingstock-prefix">$</span>
              <input
                type="text"
                name="regularPrice"
                value={formData.regularPrice}
                onChange={handleChange}
                className="pricingstock-input pl-prefix"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="pricingstock-field">
            <label className="pricingstock-label">Sale Price</label>
            <div className="pricingstock-input-icon-wrapper">
              <span className="pricingstock-prefix">$</span>
              <input
                type="text"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
                className="pricingstock-input pl-prefix"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="pricingstock-field">
            <label className="pricingstock-label">Cost Price</label>
            <div className="pricingstock-input-icon-wrapper">
              <span className="pricingstock-prefix">$</span>
              <input
                type="text"
                name="costPrice"
                value={formData.costPrice}
                onChange={handleChange}
                className="pricingstock-input pl-prefix"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <div className="pricingstock-grid-3 mt-4">
          <div className="pricingstock-field">
            <label className="pricingstock-label">Tax Class</label>
            <div className="pricingstock-select-wrapper">
              <select
                name="taxClass"
                value={formData.taxClass}
                onChange={handleChange}
                className="pricingstock-select"
              >
                <option value="Standard">Standard</option>
                <option value="Reduced Rate">Reduced Rate</option>
                <option value="Zero Rate">Zero Rate</option>
                <option value="Exempt">Exempt</option>
              </select>
              <FiChevronDown className="pricingstock-select-arrow" />
            </div>
          </div>

          <div className="pricingstock-field">
            <label className="pricingstock-label">
              Stock Quantity <span className="pricingstock-required">*</span>
            </label>
            <input
              type="text"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              className="pricingstock-input"
              placeholder="0"
            />
          </div>

          <div className="pricingstock-field">
            <label className="pricingstock-label">Low Stock Threshold</label>
            <input
              type="text"
              name="lowStockThreshold"
              value={formData.lowStockThreshold}
              onChange={handleChange}
              className="pricingstock-input"
              placeholder="0"
            />
          </div>
        </div>

        <div className="pricingstock-toggles-row mt-5">
          <div className="pricingstock-toggle-group">
            <span className="pricingstock-toggle-label-title">Track Inventory</span>
            <div className="pricingstock-toggle-container" onClick={() => handleToggle('trackInventory')}>
              <div className={`pricingstock-switch ${formData.trackInventory ? 'active' : ''}`}>
                <div className="pricingstock-switch-handle"></div>
              </div>
              <span className="pricingstock-toggle-desc">Yes, track inventory for this product</span>
            </div>
          </div>

          <div className="pricingstock-toggle-group">
            <span className="pricingstock-toggle-label-title">Allow Backorders</span>
            <div className="pricingstock-toggle-container" onClick={() => handleToggle('allowBackorders')}>
              <div className={`pricingstock-switch ${formData.allowBackorders ? 'active' : ''}`}>
                <div className="pricingstock-switch-handle"></div>
              </div>
              <span className="pricingstock-toggle-desc">Allow customers to order even if out of stock</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Card */}
      <div className="pricingstock-card mt-4">
        <div className="pricingstock-header">
          <div className="pricingstock-header-icon-box blue">
            <FiTruck className="pricingstock-header-icon" />
          </div>
          <h2 className="pricingstock-header-title">Shipping</h2>
        </div>

        <div className="pricingstock-shipping-grid">
          <div className="pricingstock-field">
            <label className="pricingstock-label">Weight (kg)</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="pricingstock-input"
              placeholder="0.000"
            />
          </div>

          <div className="pricingstock-field dimensions-field-group">
            <label className="pricingstock-label">Dimensions (cm)</label>
            <div className="pricingstock-dimensions-inputs">
              <div className="pricingstock-dim-box">
                <input
                  type="text"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  className="pricingstock-input text-center"
                  placeholder="Length"
                />
                <span className="pricingstock-sub-label">Length</span>
              </div>
              <div className="pricingstock-dim-box">
                <input
                  type="text"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  className="pricingstock-input text-center"
                  placeholder="Width"
                />
                <span className="pricingstock-sub-label">Width</span>
              </div>
              <div className="pricingstock-dim-box">
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="pricingstock-input text-center"
                  placeholder="Height"
                />
                <span className="pricingstock-sub-label">Height</span>
              </div>
            </div>
          </div>

          <div className="pricingstock-field">
            <label className="pricingstock-label">Shipping Class</label>
            <div className="pricingstock-select-wrapper">
              <select
                name="shippingClass"
                value={formData.shippingClass}
                onChange={handleChange}
                className="pricingstock-select"
              >
                <option value="Standard">Standard</option>
                <option value="Express">Express</option>
                <option value="Heavy Goods">Heavy Goods</option>
                <option value="Fragile">Fragile</option>
              </select>
              <FiChevronDown className="pricingstock-select-arrow" />
            </div>
          </div>
        </div>

        <div className="pricingstock-toggles-row mt-4">
          <div className="pricingstock-toggle-group">
            <span className="pricingstock-toggle-label-title">Free Shipping</span>
            <div className="pricingstock-toggle-container" onClick={() => handleToggle('freeShipping')}>
              <div className={`pricingstock-switch ${formData.freeShipping ? 'active' : ''}`}>
                <div className="pricingstock-switch-handle"></div>
              </div>
              <span className="pricingstock-toggle-desc">This product has free shipping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricingstock;