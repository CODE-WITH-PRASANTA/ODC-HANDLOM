import React, { useState } from 'react';
import { FiUploadCloud, FiX } from 'react-icons/fi';
import { BsCardImage } from 'react-icons/bs';
import './ProductImages.css';

const ProductImages = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80',
      isCover: true,
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=500&q=80',
      isCover: false,
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1546938576-6e666548332d?auto=format&fit=crop&w=500&q=80',
      isCover: false,
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1581605440669-e2be0c84c6c0?auto=format&fit=crop&w=500&q=80',
      isCover: false,
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&w=500&q=80',
      isCover: false,
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80',
      isCover: false,
    },
  ]);

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      isCover: images.length === 0 && index === 0,
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      isCover: images.length === 0 && index === 0,
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemove = (id) => {
    setImages((prevImages) => {
      const filtered = prevImages.filter((img) => img.id !== id);
      // If we removed the cover image, make the first available image the new cover
      if (filtered.length > 0 && !filtered.some((img) => img.isCover)) {
        filtered[0].isCover = true;
      }
      return filtered;
    });
  };

  return (
    <div className="product-images-wrapper">
      <div className="product-images-container">
        <div className="product-images-header">
          <div className="product-images-header-icon-box">
            <BsCardImage className="product-images-header-icon" />
          </div>
          <h2 className="product-images-header-title">Product Images</h2>
        </div>

        <div className="product-images-body">
          <div
            className="product-images-dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="product-images-dropzone-content">
              <FiUploadCloud className="product-images-upload-cloud-icon" />
              <p className="product-images-dropzone-text">Drag & Drop images here</p>
              <span className="product-images-dropzone-or">or</span>
              <label className="product-images-browse-btn">
                Browse Files
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFilesChange}
                  className="product-images-file-input"
                />
              </label>
              <p className="product-images-dropzone-formats">JPG, PNG, WEBP (Max. 5MB each)</p>
            </div>
          </div>

          <div className="product-images-grid">
            {images.map((img) => (
              <div className="product-images-card" key={img.id}>
                <img src={img.url} alt="Product preview" className="product-images-card-img" />
                <button
                  type="button"
                  className="product-images-card-remove"
                  onClick={() => handleRemove(img.id)}
                  aria-label="Remove image"
                >
                  <FiX className="product-images-remove-icon" />
                </button>
                {img.isCover && <span className="product-images-card-cover-badge">Cover</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;