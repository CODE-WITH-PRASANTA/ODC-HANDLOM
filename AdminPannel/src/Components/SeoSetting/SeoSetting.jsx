// SeoSetting.jsx
import React, { useState } from 'react';
import { FiGlobe } from 'react-icons/fi';
import './SeoSetting.css';

const SeoSetting = () => {
  const [formData, setFormData] = useState({
    metaTitle: 'ODC Handloom - Authentic Handcrafted Cotton & Silk Sarees',
    urlSlug: 'odc-handloom-authentic-handcrafted-cotton-silk-sarees',
    metaDescription: 'Shop authentic ODC Handloom products online. Discover traditional handcrafted cotton sarees, silk fabrics, and ethnic wear directly from master weavers at the best price.'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    console.log('Saving Product SEO Settings:', formData);
    alert('Product SEO Settings saved successfully for ODC Handloom!');
  };

  const handleCancel = () => {
    console.log('Action cancelled');
  };

  return (
    <div className="seo-setting-wrapper">
      <div className="seo-setting-card">
        <div className="seo-setting-header">
          <div className="seo-setting-header-icon-box">
            <FiGlobe className="seo-setting-header-icon" />
          </div>
          <h2 className="seo-setting-header-title">SEO Settings</h2>
        </div>

        <div className="seo-setting-grid">
          <div className="seo-setting-field">
            <label className="seo-setting-label">Meta Title</label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className="seo-setting-input"
              placeholder="Enter meta title"
            />
          </div>

          <div className="seo-setting-field">
            <label className="seo-setting-label">URL Slug</label>
            <input
              type="text"
              name="urlSlug"
              value={formData.urlSlug}
              onChange={handleChange}
              className="seo-setting-input"
              placeholder="enter-url-slug"
            />
          </div>
        </div>

        <div className="seo-setting-field mt-4">
          <label className="seo-setting-label">Meta Description</label>
          <input
            type="text"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            className="seo-setting-input"
            placeholder="Enter meta description"
          />
        </div>
      </div>

      <div className="seo-setting-actions">
        <button
          type="button"
          className="seo-setting-cancel-btn"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="seo-setting-save-btn"
          onClick={handleSaveProduct}
        >
          Save Product
        </button>
      </div>
    </div>
  );
};

export default SeoSetting;