// ProductPreview.jsx
import React, { useState } from 'react';
import { 
  FiEye, 
  FiSave, 
  FiSend, 
  FiFolder, 
  FiTag, 
  FiBookmark, 
  FiImage, 
  FiChevronDown, 
  FiCalendar, 
  FiPlus, 
  FiX 
} from 'react-icons/fi';
import './ProductPreview.css';

const ProductPreview = () => {
  const [publishData, setPublishData] = useState({
    status: 'Published',
    visibility: 'Public',
    publishedAt: '20 May 2025, 10:30 AM',
  });

  const [categories, setCategories] = useState({
    men: true,
    women: false,
    bags: true,
    backpacks: true,
    handbags: false,
    laptopBags: false,
    accessories: false,
  });

  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  const [brandData, setBrandData] = useState({
    brand: 'Nike',
  });
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');

  const [tags, setTags] = useState(['Bag', 'Sports', 'Travel', 'Nike']);
  const [tagInput, setTagInput] = useState('');

  const [featuredImage, setFeaturedImage] = useState(
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80'
  );

  const handleCategoryChange = (key) => {
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      alert(`New Category "${newCategoryName}" added successfully!`);
      setNewCategoryName('');
      setShowAddCategory(false);
    }
  };

  const handleAddBrandSubmit = (e) => {
    e.preventDefault();
    if (newBrandName.trim()) {
      setBrandData({ brand: newBrandName });
      alert(`New Brand "${newBrandName}" added successfully!`);
      setNewBrandName('');
      setShowAddBrand(false);
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(URL.createObjectURL(file));
    }
  };

  const handleSaveProduct = () => {
    alert('Product changes saved successfully!');
  };

  const handlePreviewProduct = () => {
    alert('Opening product preview mode...');
  };

  return (
    <div className="product-preview-sidebar-wrapper">
      {/* Top action buttons matching the layout reference */}
      <div className="product-preview-top-actions">
        <button type="button" className="product-preview-top-btn preview" onClick={handlePreviewProduct}>
          <FiEye className="product-preview-btn-icon" /> Preview Product
        </button>
        <button type="button" className="product-preview-top-btn save" onClick={handleSaveProduct}>
          <FiSave className="product-preview-btn-icon" /> Save Product
        </button>
      </div>

      <div className="product-preview-sidebar-container">
        {/* Publish Card */}
        <div className="product-preview-card">
          <div className="product-preview-header">
            <div className="product-preview-header-icon-box blue">
              <FiSend className="product-preview-header-icon" />
            </div>
            <h2 className="product-preview-header-title">Publish</h2>
          </div>

          <div className="product-preview-field">
            <label className="product-preview-label">Status</label>
            <div className="product-preview-select-wrapper">
              <select
                value={publishData.status}
                onChange={(e) => setPublishData({ ...publishData, status: e.target.value })}
                className="product-preview-select"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Pending">Pending</option>
              </select>
              <FiChevronDown className="product-preview-select-arrow" />
            </div>
          </div>

          <div className="product-preview-field mt-3">
            <label className="product-preview-label">Visibility</label>
            <div className="product-preview-select-wrapper">
              <select
                value={publishData.visibility}
                onChange={(e) => setPublishData({ ...publishData, visibility: e.target.value })}
                className="product-preview-select"
              >
                <option value="Public">Public</option>
                <option value="Password Protected">Password Protected</option>
                <option value="Private">Private</option>
              </select>
              <FiChevronDown className="product-preview-select-arrow" />
            </div>
          </div>

          <div className="product-preview-field mt-3">
            <label className="product-preview-label">Published At</label>
            <div className="product-preview-input-icon-wrapper">
              <input
                type="text"
                value={publishData.publishedAt}
                onChange={(e) => setPublishData({ ...publishData, publishedAt: e.target.value })}
                className="product-preview-input"
              />
              <FiCalendar className="product-preview-input-suffix-icon" />
            </div>
          </div>

          <div className="product-preview-published-status-box mt-3">
            <span className="product-preview-status-check">✓ Published</span>
            <span className="product-preview-status-text">Product is live on the store</span>
          </div>
        </div>

        {/* Product Categories Card */}
        <div className="product-preview-card mt-4">
          <div className="product-preview-header">
            <div className="product-preview-header-icon-box purple">
              <FiFolder className="product-preview-header-icon" />
            </div>
            <h2 className="product-preview-header-title">Product Categories</h2>
          </div>

          <div className="product-preview-categories-list">
            <label className="product-preview-checkbox-label">
              <input
                type="checkbox"
                checked={categories.men}
                onChange={() => handleCategoryChange('men')}
              />
              <span>Men</span>
            </label>

            <label className="product-preview-checkbox-label">
              <input
                type="checkbox"
                checked={categories.women}
                onChange={() => handleCategoryChange('women')}
              />
              <span>Women</span>
            </label>

            <label className="product-preview-checkbox-label">
              <input
                type="checkbox"
                checked={categories.bags}
                onChange={() => handleCategoryChange('bags')}
              />
              <span>Bags</span>
            </label>

            <div className="product-preview-sub-categories">
              <label className="product-preview-checkbox-label">
                <input
                  type="checkbox"
                  checked={categories.backpacks}
                  onChange={() => handleCategoryChange('backpacks')}
                />
                <span>Backpacks</span>
              </label>

              <label className="product-preview-checkbox-label">
                <input
                  type="checkbox"
                  checked={categories.handbags}
                  onChange={() => handleCategoryChange('handbags')}
                />
                <span>Handbags</span>
              </label>

              <label className="product-preview-checkbox-label">
                <input
                  type="checkbox"
                  checked={categories.laptopBags}
                  onChange={() => handleCategoryChange('laptopBags')}
                />
                <span>Laptop Bags</span>
              </label>
            </div>

            <label className="product-preview-checkbox-label mt-2">
              <input
                type="checkbox"
                checked={categories.accessories}
                onChange={() => handleCategoryChange('accessories')}
              />
              <span>Accessories</span>
            </label>
          </div>

          {showAddCategory ? (
            <form onSubmit={handleAddCategorySubmit} className="product-preview-inline-form mt-3">
              <input
                type="text"
                placeholder="New category name..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="product-preview-input"
                autoFocus
              />
              <button type="submit" className="product-preview-small-submit-btn">Add</button>
            </form>
          ) : (
            <button
              type="button"
              className="product-preview-action-btn mt-3"
              onClick={() => setShowAddCategory(true)}
            >
              <FiPlus /> Add New Category
            </button>
          )}
        </div>

        {/* Product Brands Card */}
        <div className="product-preview-card mt-4">
          <div className="product-preview-header">
            <div className="product-preview-header-icon-box orange">
              <FiBookmark className="product-preview-header-icon" />
            </div>
            <h2 className="product-preview-header-title">Product Brands</h2>
          </div>

          <div className="product-preview-field">
            <div className="product-preview-select-wrapper">
              <select
                value={brandData.brand}
                onChange={(e) => setBrandData({ brand: e.target.value })}
                className="product-preview-select"
              >
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option>
                <option value="ODC Handloom">ODC Handloom</option>
              </select>
              <FiChevronDown className="product-preview-select-arrow" />
            </div>
          </div>

          {showAddBrand ? (
            <form onSubmit={handleAddBrandSubmit} className="product-preview-inline-form mt-3">
              <input
                type="text"
                placeholder="New brand name..."
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                className="product-preview-input"
                autoFocus
              />
              <button type="submit" className="product-preview-small-submit-btn">Add</button>
            </form>
          ) : (
            <button
              type="button"
              className="product-preview-action-btn mt-3"
              onClick={() => setShowAddBrand(true)}
            >
              <FiPlus /> Add New Brand
            </button>
          )}
        </div>

        {/* Product Tags Card */}
        <div className="product-preview-card mt-4">
          <div className="product-preview-header">
            <div className="product-preview-header-icon-box red">
              <FiTag className="product-preview-header-icon" />
            </div>
            <h2 className="product-preview-header-title">Product Tags</h2>
          </div>

          <div className="product-preview-field">
            <input
              type="text"
              placeholder="Add tags..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="product-preview-input"
            />
          </div>

          <div className="product-preview-tags-container mt-3">
            {tags.map((tag, idx) => (
              <span key={idx} className="product-preview-tag-badge">
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="product-preview-tag-remove">
                  <FiX />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Featured Image Card */}
        <div className="product-preview-card mt-4">
          <div className="product-preview-header">
            <div className="product-preview-header-icon-box yellow">
              <FiImage className="product-preview-header-icon" />
            </div>
            <h2 className="product-preview-header-title">Featured Image</h2>
          </div>

          <div className="product-preview-image-box">
            <img src={featuredImage} alt="Featured" className="product-preview-featured-img" />
            <label className="product-preview-change-img-btn">
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;