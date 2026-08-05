import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import "./PreviewProduct.css";

// Sample images matching the reference gallery
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&fit=crop",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&fit=crop",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&fit=crop",
];

const PreviewProduct = ({ onClose }) => {
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("S");

  const sizes = ["S", "M", "L", "XL"];
  const tags = ["#Top", "#Armani", "#Summer", "#Casual", "#Women"];

  // Close Button Handler
  const handleClose = () => {
    if (onClose) {
      onClose(); // Triggers modal close callback if passed
    } else {
      navigate(-1); // Navigates back in history if opened via route /previewproduct
    }
  };

  return (
    <div className="preview-product-overlay" onClick={handleClose}>
      <div 
        className="preview-product-card" 
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the card
      >
        {/* Close Button */}
        <button
          type="button"
          className="preview-product-close-btn"
          onClick={handleClose}
          aria-label="Close"
        >
          <IoClose />
        </button>

        <div className="preview-product-body">
          {/* Left Column: Gallery */}
          <div className="preview-product-gallery">
            <div className="preview-product-main-image-wrap">
              <img
                src={GALLERY_IMAGES[activeImageIndex]}
                alt="Main Product Visual"
                className="preview-product-main-image"
              />
            </div>
            <div className="preview-product-thumbs">
              {GALLERY_IMAGES.map((imgUrl, index) => (
                <div
                  key={index}
                  className={`preview-product-thumb-item ${
                    activeImageIndex === index ? "active" : ""
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={imgUrl} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="preview-product-details">
            {/* Breadcrumb Header */}
            <div className="preview-product-header-meta">
              <span className="preview-product-brand">ARMANI</span>
              <span className="preview-product-category">TOPS › T-SHIRTS</span>
            </div>

            {/* Product Title */}
            <h1 className="preview-product-title">Armani Veni Vidi Vici</h1>

            {/* Price Tag Line */}
            <div className="preview-product-price-row">
              <span className="preview-product-price">₹1299</span>
              <span className="preview-product-strike-price">₹1499</span>
              <span className="preview-product-tax-badge">Incl. GST 18%</span>
            </div>

            {/* Short Subtitle */}
            <p className="preview-product-short-desc">
              Premium designer top with soft breathable fabric.
            </p>

            {/* Size Selector */}
            <div className="preview-product-section">
              <label className="preview-product-label">Select Size</label>
              <div className="preview-product-sizes-row">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`preview-product-size-btn ${
                      selectedSize === size ? "active" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Specs Grid */}
            <div className="preview-product-section">
              <label className="preview-product-label">Product Specs</label>
              <div className="preview-product-specs-box">
                <div className="preview-product-spec-item">
                  <span className="spec-key">SKU:</span>
                  <span className="spec-val">ARM-VVV-001</span>
                </div>
                <div className="preview-product-spec-item">
                  <span className="spec-key">Stock:</span>
                  <span className="spec-val">150 units</span>
                </div>
                <div className="preview-product-spec-item">
                  <span className="spec-key">Collection:</span>
                  <span className="spec-val">Summer Collection</span>
                </div>
                <div className="preview-product-spec-item">
                  <span className="spec-key">Status:</span>
                  <span className="spec-val">Published</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="preview-product-section">
              <label className="preview-product-label">Tags</label>
              <div className="preview-product-tags-row">
                {tags.map((tag, idx) => (
                  <span key={idx} className="preview-product-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Full Description */}
            <div className="preview-product-section">
              <label className="preview-product-label">Full Description</label>
              <div className="preview-product-description-box">
                <p>
                  Elegant and stylish top made from premium quality fabric.
                  Perfect for casual daily wear and summer outings.
                </p>
                <ul>
                  <li>Soft and breathable fabric</li>
                  <li>Comfortable regular fit</li>
                  <li>Easy to pair with any outfit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewProduct;