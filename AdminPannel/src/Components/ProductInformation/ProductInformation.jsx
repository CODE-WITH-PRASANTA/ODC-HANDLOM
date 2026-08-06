import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { FiInfo } from 'react-icons/fi';
import './ProductInformation.css';

const ProductInformation = () => {
  const [formData, setFormData] = useState({
    productName: "Nike Bag",
    sku: "NKB-00125",
    shortDescription: "Rolex's powerhouse calibre 3235 Perpetual movement. An upgrade from the calibre 3135 movement.",
    description: "The Nike Sportswear RPM Backpack offers ample storage for your daily commute. Padded shoulder straps and a back panel help you carry your gear comfortably, while multiple pockets help you stay organized.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      description: content,
    }));
  };

  return (
    <div className="ProductInformation-container">
      <div className="ProductInformation-card">
        {/* Header Title */}
        <div className="ProductInformation-header">
          <span className="ProductInformation-headerIconWrapper">
            <FiInfo className="ProductInformation-headerIcon" />
          </span>
          <h2 className="ProductInformation-title">Basic Information</h2>
        </div>

        {/* Row 1: Product Name & SKU */}
        <div className="ProductInformation-row">
          <div className="ProductInformation-group">
            <label className="ProductInformation-label">
              Product Name <span className="ProductInformation-required">*</span>
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="ProductInformation-input"
            />
          </div>

          <div className="ProductInformation-group">
            <label className="ProductInformation-label">
              SKU (Stock Keeping Unit)
            </label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="ProductInformation-input"
            />
          </div>
        </div>

        {/* Row 2: Short Description */}
        <div className="ProductInformation-group">
          <label className="ProductInformation-label">Short Description</label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="ProductInformation-input"
          />
        </div>

        {/* Row 3: Description with TinyMCE Text Editor */}
        <div className="ProductInformation-group">
          <label className="ProductInformation-label">Description</label>
          <div className="ProductInformation-editorWrapper">
            <Editor
              apiKey="8hswbe7bfeeneui9eb9gjgsym8ku30nx5gwre9808ajdzniu" // Use 'no-api-key' for free local testing, or register on TinyMCE for a free key
              value={formData.description}
              onEditorChange={handleEditorChange}
              init={{
                height: 220,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; margin: 12px; }'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;