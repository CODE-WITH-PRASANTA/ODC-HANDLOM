import React, { useState, useRef } from 'react';
import './Flashsale.css';

const initialFlashSales = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=150&q=80',
    title: 'Adidas Shoes Black',
    rating: 4.8,
    originalPrice: 7999,
    salePrice: 3499,
    discount: 56,
    createdAt: '14 May 2025, 10:30 AM',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=150&q=80',
    title: 'Armani Wide-Leg Trousers',
    rating: 4.5,
    originalPrice: 1599,
    salePrice: 1199,
    discount: 25,
    createdAt: '14 May 2025, 10:25 AM',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80',
    title: 'Zara Shoes Green',
    rating: 4.5,
    originalPrice: 5699,
    salePrice: 3999,
    discount: 25,
    createdAt: '14 May 2025, 10:20 AM',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=150&q=80',
    title: 'Wayfarer Sunglasses',
    rating: 4.6,
    originalPrice: 1599,
    salePrice: 1299,
    discount: 18,
    createdAt: '14 May 2025, 10:15 AM',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=150&q=80',
    title: 'Tissot Classic Watch',
    rating: 5.0,
    originalPrice: 69999,
    salePrice: 49999,
    discount: 28,
    createdAt: '14 May 2025, 10:10 AM',
  },
];

const Flashsale = () => {
  const defaultImage =
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80';

  // Form State
  const [productTitle, setProductTitle] = useState('Zara Shoes Green');
  const [rating, setRating] = useState(4.5);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState(
    'Premium comfort and stylish design built for everyday performance and all-day wear.'
  );
  const [originalPrice, setOriginalPrice] = useState('5699.00');
  const [salePrice, setSalePrice] = useState('3999.00');
  const [discountPercent, setDiscountPercent] = useState('25');
  
  // Image & File State
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [uploadedFileName, setUploadedFileName] = useState('zara-shoes-green.jpg');
  const [uploadedFileSize, setUploadedFileSize] = useState('245 KB');

  // Table State
  const [flashSales, setFlashSales] = useState(initialFlashSales);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState(1);

  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  // Image Upload Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setUploadedFileName(file.name);
      setUploadedFileSize(`${(file.size / 1024).toFixed(0)} KB`);
    }
  };

  // Remove Uploaded Image
  const handleRemoveImage = () => {
    setImagePreview(defaultImage);
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
    setProductTitle('');
    setRating(0);
    setDescription('');
    setOriginalPrice('');
    setSalePrice('');
    setDiscountPercent('0');
    setImagePreview(defaultImage);
    setUploadedFileName('');
    setUploadedFileSize('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Add Flash Sale to Table
  const handleSubmit = (e) => {
    e.preventDefault();
    const newSale = {
      id: flashSales.length + 1,
      image: imagePreview,
      title: productTitle || 'Untitled Product',
      rating: rating || 5.0,
      originalPrice: parseFloat(originalPrice) || 0,
      salePrice: parseFloat(salePrice) || 0,
      discount: parseInt(discountPercent, 10) || 0,
      createdAt: 'Just now',
    };

    setFlashSales([newSale, ...flashSales]);
    alert('Flash sale item added to the list successfully!');
  };

  // Delete Action
  const handleDelete = (id) => {
    setFlashSales(flashSales.filter((item) => item.id !== id));
  };

  // Scroll smoothly to form when top button clicked
  const handleScrollToForm = () => {
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
            <h1 className="header-title">Create Flash Sale</h1>
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
                /* Uploaded File Chip / Status */
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
                /* Dropzone to upload */
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
                <span>⊕</span> Add Flash Sale
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

              {/* Product Preview Card */}
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
                  <button type="button" className="btn-quick-view">
                    <svg className="quick-view-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Quick View
                  </button>
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

        {/* ---------------------------------------------------- */}
        {/* Table Section: Flash Sale List */}
        {/* ---------------------------------------------------- */}
        <section className="flashsale-list-section">
          
          <div className="list-top-bar">
            <div>
              <h2 className="list-title">Flash Sale List</h2>
              <p className="list-subtitle">Manage all your flash sale products</p>
            </div>

            <div className="list-actions-bar">
              {/* Search Bar */}
              <div className="table-search-box">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="table-search-input"
                />
                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Add New Flash Sale Button */}
              <button
                type="button"
                onClick={handleScrollToForm}
                className="btn btn-primary"
              >
                <span>+</span> Add New Flash Sale
              </button>
            </div>
          </div>

          {/* Data Table */}
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
                    <tr
                      key={item.id}
                      className={index === 2 ? 'row-highlighted' : ''}
                    >
                      <td className="col-index">{index + 1}</td>
                      <td className="col-image">
                        <div className="table-image-wrapper">
                          <img src={item.image} alt={item.title} className="table-img" />
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
                            onClick={() => alert(`Edit item: ${item.title}`)}
                          >
                            ✎
                          </button>
                          <button
                            type="button"
                            className="btn-action btn-delete"
                            title="Delete"
                            onClick={() => handleDelete(item.id)}
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

          {/* Table Footer / Pagination */}
          <div className="table-footer">
            <p className="entries-text">
              Showing 1 to {filteredSales.length} of 15 entries
            </p>
            <div className="pagination">
              <button
                type="button"
                className="page-nav-btn"
                disabled={activePage === 1}
                onClick={() => setActivePage((prev) => Math.max(prev - 1, 1))}
              >
                ‹
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  type="button"
                  key={page}
                  className={`page-num-btn ${activePage === page ? 'page-active' : ''}`}
                  onClick={() => setActivePage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                className="page-nav-btn"
                onClick={() => setActivePage((prev) => prev + 1)}
              >
                ›
              </button>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
};

export default Flashsale;