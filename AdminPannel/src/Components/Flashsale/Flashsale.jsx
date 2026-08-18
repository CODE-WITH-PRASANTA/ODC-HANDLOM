import React, { useState, useRef, useEffect } from 'react';
import './Flashsale.css';

const Flashsale = () => {
  const defaultImage =
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80';

  // Form State & Editing ID
  const [editingId, setEditingId] = useState(null);
  const [productTitle, setProductTitle] = useState('');
  const [rating, setRating] = useState(4.5);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('0');
  
  // Image & File State
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedFileSize, setUploadedFileSize] = useState('');

  // Table State
  const [flashSales, setFlashSales] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState(1);

  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  // Fetch Flash Sales from Backend on Load
  const fetchFlashSales = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/flashsales');
      const data = await response.json();
      setFlashSales(data);
    } catch (error) {
      console.error('Error fetching flash sales:', error);
    }
  };

  useEffect(() => {
    fetchFlashSales();
  }, []);

  // Image Upload Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setUploadedFileName(file.name);
      setUploadedFileSize(`${(file.size / 1024).toFixed(0)} KB`);
    }
  };

  // Remove Uploaded Image
  const handleRemoveImage = () => {
    setImagePreview(defaultImage);
    setSelectedFile(null);
    setUploadedFileName('');
    setUploadedFileSize('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Auto Discount Percentage Calculation
  const handlePriceChange = (orig, sale) => {
    const o = parseFloat(orig);
    const s = parseFloat(sale);
    if (o && s && o > s) {
      const disc = Math.round(((o - s) / o) * 100);
      setDiscountPercent(disc.toString());
    } else {
      setDiscountPercent('0');
    }
  };

  // Reset Form
  const handleReset = () => {
    setEditingId(null);
    setProductTitle('');
    setRating(4.5);
    setDescription('');
    setOriginalPrice('');
    setSalePrice('');
    setDiscountPercent('0');
    setImagePreview(defaultImage);
    setSelectedFile(null);
    setUploadedFileName('');
    setUploadedFileSize('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Submit Form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', productTitle);
    formData.append('rating', rating);
    formData.append('description', description);
    formData.append('originalPrice', originalPrice);
    formData.append('salePrice', salePrice);
    formData.append('discount', discountPercent);
    formData.append('image', imagePreview);
    if (selectedFile) {
      formData.append('imageFile', selectedFile);
    }

    try {
      if (editingId) {
        // Update Request
        const response = await fetch(`http://localhost:5000/api/flashsales/${editingId}`, {
          method: 'PUT',
          body: formData,
        });
        if (response.ok) {
          alert('Flash sale item updated successfully!');
          fetchFlashSales();
          handleReset();
        }
      } else {
        // Create Request
        const response = await fetch('http://localhost:5000/api/flashsales', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          alert('Flash sale item added successfully!');
          fetchFlashSales();
          handleReset();
        }
      }
    } catch (error) {
      console.error('Error saving flash sale item:', error);
      alert('Failed to save flash sale item.');
    }
  };

  // Handle Edit Click - Load data into form
  const handleEditClick = (item) => {
    setEditingId(item._id);
    setProductTitle(item.title);
    setRating(item.rating);
    setDescription(item.description || '');
    setOriginalPrice(item.originalPrice.toString());
    setSalePrice(item.salePrice.toString());
    setDiscountPercent(item.discount.toString());
    setImagePreview(item.image.startsWith('/uploads') ? `http://localhost:5000${item.image}` : item.image);
    setUploadedFileName('');
    setUploadedFileSize('');
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Delete Action
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this flash sale item?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/flashsales/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchFlashSales();
      }
    } catch (error) {
      console.error('Error deleting flash sale item:', error);
    }
  };

  // Scroll smoothly to form
  const handleScrollToForm = () => {
    handleReset();
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter products by search query
  const filteredSales = flashSales.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flashsale-page">
      <div className="flashsale-container">
        
        {/* Top Header */}
        <header className="flashsale-header">
          <div className="header-title-wrap">
            <span className="header-icon">⚡</span>
            <h1 className="header-title">{editingId ? 'Edit Flash Sale' : 'Create Flash Sale'}</h1>
          </div>
          <p className="header-subtitle">Add product details for flash sale</p>
        </header>

        {/* Form & Live Preview Section */}
        <div className="flashsale-grid" ref={formRef}>
          
          {/* Left Form Section */}
          <form className="flashsale-form" onSubmit={handleSubmit}>
            
            {/* 1. Product Information */}
            <section className="form-section">
              <h2 className="section-title">1. Product Information</h2>

              <div className="form-group">
                <label className="form-label">
                  Product Title <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  placeholder="Enter product title"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Rating <span className="req-star">*</span>
                </label>
                <div className="rating-container">
                  <div className="stars-wrapper">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={`star-btn ${
                          (hoverRating || rating) >= star ? 'star-active' : 'star-inactive'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <span className="rating-badge-text">
                    {rating > 0 ? rating.toFixed(1) : '4.5'}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Description <span className="req-star">*</span>
                </label>
                <div className="textarea-wrapper">
                  <textarea
                    rows={3}
                    maxLength={200}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description..."
                    className="form-textarea"
                    required
                  />
                  <span className="char-counter">{description.length} / 200</span>
                </div>
              </div>
            </section>

            {/* 2. Pricing Details */}
            <section className="form-section">
              <h2 className="section-title">2. Pricing Details</h2>

              <div className="pricing-grid">
                <div className="form-group">
                  <label className="form-label">
                    Original Price <span className="req-star">*</span>
                  </label>
                  <div className="input-icon-wrapper">
                    <span className="input-prefix">₹</span>
                    <input
                      type="text"
                      value={originalPrice}
                      onChange={(e) => {
                        setOriginalPrice(e.target.value);
                        handlePriceChange(e.target.value, salePrice);
                      }}
                      placeholder="Enter original price"
                      className="form-input input-with-prefix"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Sale Price <span className="req-star">*</span>
                  </label>
                  <div className="input-icon-wrapper">
                    <span className="input-prefix">₹</span>
                    <input
                      type="text"
                      value={salePrice}
                      onChange={(e) => {
                        setSalePrice(e.target.value);
                        handlePriceChange(originalPrice, e.target.value);
                      }}
                      placeholder="Enter sale price"
                      className="form-input input-with-prefix"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Discount Percentage <span className="req-star">*</span>
                </label>
                <div className="input-icon-wrapper">
                  <input
                    type="number"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    placeholder="Enter discount percentage"
                    className="form-input input-with-suffix"
                  />
                  <span className="input-suffix">%</span>
                </div>
              </div>
            </section>

            {/* 3. Product Image */}
            <section className="form-section">
              <h2 className="section-title">3. Product Image</h2>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                onChange={handleImageChange}
                className="hidden-file-input"
              />

              {uploadedFileName ? (
                <div className="uploaded-file-card">
                  <div className="uploaded-file-info">
                    <img src={imagePreview} alt="thumb" className="uploaded-thumbnail" />
                    <div>
                      <p className="uploaded-name">{uploadedFileName}</p>
                      <p className="uploaded-size">{uploadedFileSize}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="btn-remove-file"
                    title="Remove file"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div
                  className="upload-dropzone"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="upload-icon-circle">
                    <svg className="svg-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <div className="upload-text-wrap">
                    <p className="upload-primary-text">Upload Product Image</p>
                    <p className="upload-secondary-text">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>
              )}
            </section>

            {/* Actions */}
            <div className="form-actions-right">
              <button type="button" onClick={handleReset} className="btn btn-reset">
                Reset
              </button>
              <button type="submit" className="btn btn-primary">
                <span>⊕</span> {editingId ? 'Update Flash Sale' : 'Add Flash Sale'}
              </button>
            </div>
          </form>

          {/* Right Live Preview Section */}
          <aside className="flashsale-preview-sidebar">
            <div className="preview-card-wrapper">
              <div className="preview-header">
                <h3 className="preview-title">Preview</h3>
                <p className="preview-subtitle">This is how your flash sale item will appear</p>
              </div>

              <div className="product-card">
                <div className="card-image-box">
                  {discountPercent && discountPercent !== '0' && (
                    <span className="badge-discount">-{discountPercent}%</span>
                  )}
                  <img
                    src={imagePreview}
                    alt={productTitle || 'Product'}
                    className="preview-image"
                  />
                </div>

                <div className="card-content">
                  <div className="card-rating">
                    <span>★</span>
                    <span>{rating > 0 ? rating.toFixed(1) : '4.5'}</span>
                  </div>

                  <h4 className="card-product-title">
                    {productTitle || 'Product Title'}
                  </h4>

                  <p className="card-description">
                    {description || 'Product description will appear here...'}
                  </p>

                  <div className="card-prices">
                    <span className="sale-price-text">
                      ₹{salePrice ? Number(salePrice).toLocaleString('en-IN') : '0.00'}
                    </span>
                    {originalPrice && (
                      <span className="original-price-text">
                        ₹{Number(originalPrice).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </aside>

        </div>

        {/* Table Section: Flash Sale List */}
        <section className="flashsale-list-section">
          
          <div className="list-top-bar">
            <div>
              <h2 className="list-title">Flash Sale List</h2>
              <p className="list-subtitle">Manage all your flash sale products</p>
            </div>

            <div className="list-actions-bar">
              <div className="table-search-box">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="table-search-input"
                />
              </div>

              <button
                type="button"
                onClick={handleScrollToForm}
                className="btn btn-primary"
              >
                <span>+</span> Add New Flash Sale
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="flashsale-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Product Title</th>
                  <th>Rating</th>
                  <th>Original Price</th>
                  <th>Sale Price</th>
                  <th>Discount</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.length > 0 ? (
                  filteredSales.map((item, index) => (
                    <tr key={item._id}>
                      <td className="col-index">{index + 1}</td>
                      <td className="col-image">
                        <div className="table-image-wrapper">
                          <img 
                            src={item.image.startsWith('/uploads') ? `http://localhost:5000${item.image}` : item.image} 
                            alt={item.title} 
                            className="table-img" 
                          />
                        </div>
                      </td>
                      <td className="col-title">{item.title}</td>
                      <td className="col-rating">
                        <span className="star-rating-cell">★ {Number(item.rating).toFixed(1)}</span>
                      </td>
                      <td className="col-orig-price">
                        ₹{item.originalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="col-sale-price">
                        ₹{item.salePrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="col-discount">
                        <span className="discount-pill">-{item.discount}%</span>
                      </td>
                      <td className="col-date">{item.createdAt}</td>
                      <td className="col-actions">
                        <div className="action-buttons-group">
                          <button
                            type="button"
                            className="btn-action btn-edit"
                            title="Edit"
                            onClick={() => handleEditClick(item)}
                          >
                            ✎
                          </button>
                          <button
                            type="button"
                            className="btn-action btn-delete"
                            title="Delete"
                            onClick={() => handleDelete(item._id)}
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="no-data-cell">
                      No flash sale products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <p className="entries-text">
              Showing 1 to {filteredSales.length} of {flashSales.length} entries
            </p>
          </div>

        </section>

      </div>
    </div>
  );
};

export default Flashsale;