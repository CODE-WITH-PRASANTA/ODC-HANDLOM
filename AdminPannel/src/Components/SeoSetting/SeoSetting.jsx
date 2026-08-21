import React from "react";
import { FiGlobe } from "react-icons/fi";
import "./SeoSetting.css";

const SeoSetting = ({
  formData,
  setFormData,
  onSaveProduct,
  saving,
}) => {
  // ==========================================
  // Handle Input Change
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // Cancel SEO
  // ==========================================

  const handleCancel = () => {
    setFormData({
      metaTitle: "",
      urlSlug: "",
      metaDescription: "",
    });
  };

  // ==========================================
  // Save Product
  // ==========================================

  const handleSave = () => {
    if (onSaveProduct) {
      onSaveProduct();
    }
  };

  return (
    <div className="seo-setting-wrapper">

      <div className="seo-setting-card">

        <div className="seo-setting-header">

          <div className="seo-setting-header-icon-box">
            <FiGlobe className="seo-setting-header-icon" />
          </div>

          <h2 className="seo-setting-header-title">
            SEO Settings
          </h2>

        </div>

        <div className="seo-setting-grid">

          {/* Meta Title */}

          <div className="seo-setting-field">

            <label className="seo-setting-label">
              Meta Title
            </label>

            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className="seo-setting-input"
              placeholder="Enter meta title"
            />

          </div>

          {/* URL Slug */}

          <div className="seo-setting-field">

            <label className="seo-setting-label">
              URL Slug
            </label>

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

        {/* Meta Description */}

        <div className="seo-setting-field mt-4">

          <label className="seo-setting-label">
            Meta Description
          </label>

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

      {/* Actions */}

      <div className="seo-setting-actions">

        {/* Cancel */}

        <button
          type="button"
          className="seo-setting-cancel-btn"
          onClick={handleCancel}
          disabled={saving}
        >
          Cancel
        </button>

        {/* Save Product */}

        <button
          type="button"
          className="seo-setting-save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Product"}
        </button>

      </div>

    </div>
  );
};

export default SeoSetting;