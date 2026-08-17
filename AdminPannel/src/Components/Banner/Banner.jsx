import React, { useState, useEffect } from 'react';
import {
  Eye,
  Save,
  Upload,
  Calendar,
  Clock,
  BarChart2,
  TrendingUp,
  Sparkles,
  Copy,
  Trash2,
  FileText,
  Globe,
  Plus,
  Edit2
} from 'lucide-react';
import './Banner.css';
import API, { IMG_URL } from "../../api/axios";

const Banner = () => {
  // --- Banners Table List & Edit State ---
  const [banners, setBanners] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // --- Form States ---
  const [formData, setFormData] = useState({
    bannerTitle: "Men's Collection",
    subtitle: 'Explore New Collection',
    buttonText: 'Shop Now',
    buttonLink: '/mens-collection',
    bannerType: 'Hero Banner',
    displayPosition: 'Hero Slider',
    priority: 1,
    status: true,
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    featured: false,
    bgColor: '#FFA640',
    titleColor: '#FFFFFF',
    subtitleColor: '#FFFFFF',
    buttonColor: '#000000',
    buttonTextColor: '#FFFFFF',
    publishStartTime: '00:00',
    timezone: '(GMT+05:30) Asia/Kolkata',
    seoAltText: "Men's Collection Banner",
    seoTitle: "Men's Collection - Handlom",
    seoDescription: 'Explore the latest men\'s collection at Handlom. Best styles, best prices!',
    language: 'English'
  });

  // Display Checkboxes State
  const [displaySettings, setDisplaySettings] = useState({
    heroSlider: true,
    desktop: true,
    tablet: true,
    mobile: true,
    smallBannerSection: false,
    bottomBanner: false,
    offerSection: false
  });

  // Tags State
  const [tags, setTags] = useState(['men', 'collection', 'fashion', 'new']);
  const [newTagInput, setNewTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);

  // Preview Device Tab
  const [previewTab, setPreviewTab] = useState('desktop');

  // Image Preview State
  const [bannerImage, setBannerImage] = useState(
    'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800'
  );

  // Color Swatches
  const colorSwatches = ['#FFA640', '#0052CC', '#D93535', '#00A389', '#6554C0'];

  // Fetch Banners from Backend
  const fetchBanners = async () => {
    try {
      const response = await API.get('/banners');
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCheckboxChange = (key) => {
    setDisplaySettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
    }
  };

  const handleAddTag = () => {
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      setTags([...tags, newTagInput.trim().toLowerCase()]);
      setNewTagInput('');
      setShowTagInput(false);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Handle Form Submit (Create or Update)
  const handleSaveBanner = async () => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      data.append('displaySettings', JSON.stringify(displaySettings));
      data.append('tags', JSON.stringify(tags));
      if (selectedFile) {
        data.append('imageFile', selectedFile);
      }

      if (editingId) {
        await API.put(`/banners/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Banner updated successfully!');
      } else {
        await API.post('/banners', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Banner created successfully!');
      }

      setEditingId(null);
      setSelectedFile(null);
      fetchBanners();
    } catch (error) {
      console.error('Error saving banner:', error);
      alert('Failed to save banner.');
    }
  };

  // Handle Edit Action (Loads data into form)
  const handleEditClick = (banner) => {
    setEditingId(banner._id);
    setFormData({
      bannerTitle: banner.bannerTitle || '',
      subtitle: banner.subtitle || '',
      buttonText: banner.buttonText || '',
      buttonLink: banner.buttonLink || '',
      bannerType: banner.bannerType || 'Hero Banner',
      displayPosition: banner.displayPosition || 'Hero Slider',
      priority: banner.priority || 1,
      status: banner.status ?? true,
      startDate: banner.startDate || '',
      endDate: banner.endDate || '',
      featured: banner.featured ?? false,
      bgColor: banner.bgColor || '#FFA640',
      titleColor: banner.titleColor || '#FFFFFF',
      subtitleColor: banner.subtitleColor || '#FFFFFF',
      buttonColor: banner.buttonColor || '#000000',
      buttonTextColor: banner.buttonTextColor || '#FFFFFF',
      publishStartTime: banner.publishStartTime || '00:00',
      timezone: banner.timezone || '(GMT+05:30) Asia/Kolkata',
      seoAltText: banner.seoAltText || '',
      seoTitle: banner.seoTitle || '',
      seoDescription: banner.seoDescription || '',
      language: banner.language || 'English'
    });
    if (banner.displaySettings) {
      setDisplaySettings(banner.displaySettings);
    }
    if (banner.tags) {
      setTags(banner.tags);
    }
    if (banner.bannerImage) {
      setBannerImage(`${IMG_URL || 'http://localhost:5000'}${banner.bannerImage}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Delete Action
  const handleDeleteClick = async (id) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;
    try {
      await API.delete(`/banners/${id}`);
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  return (
    <div className="banner-page-container">
      
      {/* TOP HEADER */}
      <div className="banner-top-bar">
        <h1 className="banner-page-title">{editingId ? 'Edit Banner' : 'Add New Banner'}</h1>
        <div className="banner-top-actions">
          <button className="btn-save-changes" onClick={handleSaveBanner}>
            <Save size={16} />
            <span>{editingId ? 'Update Changes' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* MAIN LAYOUT GRID */}
      <div className="banner-grid-layout">
        
        {/* ================= LEFT / CENTER MAIN COLUMN ================= */}
        <div className="banner-main-col">
          
          {/* ROW 1: BANNER INFORMATION & BANNER IMAGE */}
          <div className="banner-row-2col">
            
            {/* CARD: BANNER INFORMATION */}
            <div className="banner-card">
              <div className="card-header-title">
                <span className="card-icon-orange">
                  <FileText size={16} />
                </span>
                <h3>Banner Information</h3>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Banner Title <span className="required-star">*</span></label>
                  <input
                    type="text"
                    name="bannerTitle"
                    value={formData.bannerTitle}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Subtitle</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Button Text</label>
                  <input
                    type="text"
                    name="buttonText"
                    value={formData.buttonText}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Button Link</label>
                  <input
                    type="text"
                    name="buttonLink"
                    value={formData.buttonLink}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label>Banner Type</label>
                  <select
                    name="bannerType"
                    value={formData.bannerType}
                    onChange={handleInputChange}
                  >
                    <option value="Hero Banner">Hero Banner</option>
                    <option value="Category Banner">Category Banner</option>
                    <option value="Offer Banner">Offer Banner</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Display Position</label>
                  <select
                    name="displayPosition"
                    value={formData.displayPosition}
                    onChange={handleInputChange}
                  >
                    <option value="Hero Slider">Hero Slider</option>
                    <option value="Sidebar">Sidebar</option>
                    <option value="Footer Banner">Footer Banner</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <input
                    type="number"
                    name="priority"
                    min="1"
                    value={formData.priority}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Status, Date Range, Featured Banner */}
              <div className="banner-status-row">
                <div className="status-toggle-wrapper">
                  <label className="toggle-title">Status</label>
                  <div className="toggle-control">
                    <label className="switch">
                      <input
                        type="checkbox"
                        name="status"
                        checked={formData.status}
                        onChange={handleInputChange}
                      />
                      <span className="slider round"></span>
                    </label>
                    <span className="toggle-label-text">
                      {formData.status ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="date-group-item">
                  <label>Start Date</label>
                  <div className="input-calendar-box">
                    <Calendar size={14} className="cal-icon" />
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="date-group-item">
                  <label>End Date</label>
                  <div className="input-calendar-box">
                    <Calendar size={14} className="cal-icon" />
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="featured-checkbox-item">
                  <label className="checkbox-featured-label">
                    <span className="star-icon">⭐</span>
                    <span className="feat-text">Featured Banner</span>
                  </label>
                  <label className="check-inline">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                    />
                    <span>Show on top</span>
                  </label>
                </div>
              </div>
            </div>

            {/* CARD: BANNER IMAGE */}
            <div className="banner-card">
              <div className="card-header-title">
                <span className="card-icon-pink">
                  <Upload size={16} />
                </span>
                <h3>Banner Image</h3>
              </div>

              <div className="drag-upload-box">
                <Upload size={28} className="upload-arrow-icon" />
                <p className="drag-title">Drag & Drop Banner Image</p>
                <p className="drag-or">or</p>
                <label className="browse-btn">
                  Browse Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    hidden
                  />
                </label>
                <p className="size-hint">Recommended size: 1920 x 600 px</p>
                <p className="size-hint">Max file size: 2MB (JPG, PNG, WEBP)</p>
              </div>

              <div className="image-preview-section">
                <label className="preview-label-sm">Image Preview</label>
                <div
                  className="banner-image-card-preview"
                  style={{ backgroundColor: formData.bgColor }}
                >
                  <img src={bannerImage} alt="Banner Preview" className="preview-bg-img" />
                  <div className="banner-overlay-content">
                    <span className="banner-tag-small">EXPLORE</span>
                    <h4 style={{ color: formData.titleColor }}>
                      {formData.bannerTitle.toUpperCase()}
                    </h4>
                    <p className="banner-hashtag">#NEWYEAR2021</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ROW 2: APPEARANCE SETTINGS, DISPLAY SETTINGS, PREVIEW */}
          <div className="banner-row-3col">
            
            {/* CARD: APPEARANCE SETTINGS */}
            <div className="banner-card">
              <div className="card-header-title">
                <span className="card-icon-orange">
                  <Sparkles size={16} />
                </span>
                <h3>Appearance Settings</h3>
              </div>

              <div className="form-group">
                <label>Background Color</label>
                <div className="color-palette-row">
                  {colorSwatches.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`color-swatch-btn ${
                        formData.bgColor === color ? 'selected' : ''
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, bgColor: color }))
                      }
                    />
                  ))}
                  <div className="hex-input-box">
                    <span>+</span>
                    <input
                      type="text"
                      name="bgColor"
                      value={formData.bgColor}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-grid-2 margin-top-12">
                <div className="form-group">
                  <label>Title Color</label>
                  <input
                    type="text"
                    name="titleColor"
                    value={formData.titleColor}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Subtitle Color</label>
                  <input
                    type="text"
                    name="subtitleColor"
                    value={formData.subtitleColor}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-grid-2 margin-top-12">
                <div className="form-group">
                  <label>Button Color</label>
                  <input
                    type="text"
                    name="buttonColor"
                    value={formData.buttonColor}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Button Text Color</label>
                  <input
                    type="text"
                    name="buttonTextColor"
                    value={formData.buttonTextColor}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* CARD: DISPLAY SETTINGS */}
            <div className="banner-card">
              <div className="card-header-title">
                <span className="card-icon-blue">
                  <Eye size={16} />
                </span>
                <h3>Display Settings</h3>
              </div>

              <div className="checkbox-list-display">
                {[
                  { key: 'heroSlider', label: 'Show on Hero Slider' },
                  { key: 'desktop', label: 'Show on Desktop' },
                  { key: 'tablet', label: 'Show on Tablet' },
                  { key: 'mobile', label: 'Show on Mobile' },
                  { key: 'smallBannerSection', label: 'Show on Small Banner Section' },
                  { key: 'bottomBanner', label: 'Show on Bottom Banner' },
                  { key: 'offerSection', label: 'Show on Offer Section' }
                ].map((item) => (
                  <label key={item.key} className="checkbox-row-item">
                    <input
                      type="checkbox"
                      checked={displaySettings[item.key]}
                      onChange={() => handleCheckboxChange(item.key)}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* CARD: PREVIEW */}
            <div className="banner-card">
              <div className="card-header-title">
                <span className="card-icon-teal">
                  <Eye size={16} />
                </span>
                <h3>Preview</h3>
              </div>

              <div className="device-tabs">
                {['desktop', 'tablet', 'mobile'].map((tab) => (
                  <button
                    key={tab}
                    className={`device-tab-btn ${previewTab === tab ? 'active' : ''}`}
                    onClick={() => setPreviewTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div
                className={`live-preview-box ${previewTab}`}
                style={{ backgroundColor: formData.bgColor }}
              >
                <img src={bannerImage} alt="Live Banner" className="live-preview-img" />
                <div className="live-preview-overlay">
                  <span className="live-explore">EXPLORE</span>
                  <h3 style={{ color: formData.titleColor }}>
                    {formData.bannerTitle.toUpperCase()}
                  </h3>
                  <p className="live-hashtag">#NEWYEAR2021</p>
                  <button
                    className="live-shop-btn"
                    style={{
                      backgroundColor: formData.buttonColor,
                      color: formData.buttonTextColor
                    }}
                  >
                    {formData.buttonText.toUpperCase()}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* ROW 3: SEO & ADDITIONAL INFORMATION */}
          <div className="banner-card">
            <div className="card-header-title">
              <span className="card-icon-purple">
                <Globe size={16} />
              </span>
              <h3>SEO & Additional Information</h3>
            </div>

            <div className="seo-grid-layout">
              <div className="form-group">
                <label>SEO Alt Text</label>
                <input
                  type="text"
                  name="seoAltText"
                  value={formData.seoAltText}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>SEO Title</label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>SEO Description</label>
                <textarea
                  rows={2}
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Tags</label>
                <div className="tags-container">
                  {tags.map((t) => (
                    <span key={t} className="tag-pill">
                      {t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="btn-remove-tag"
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  {showTagInput ? (
                    <input
                      type="text"
                      className="inline-tag-input"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                      onBlur={handleAddTag}
                      autoFocus
                    />
                  ) : (
                    <button
                      type="button"
                      className="btn-add-tag-pill"
                      onClick={() => setShowTagInput(true)}
                    >
                      <Plus size={12} /> Add
                    </button>
                  )}
                </div>

                <div className="margin-top-12">
                  <label>Language</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= RIGHT SIDEBAR COLUMN ================= */}
        <div className="banner-sidebar-col">
          
          {/* STATS CARD */}
          <div className="banner-stats-card">
            <div className="stats-card-header">
              <h3>Banner Statistics</h3>
              <BarChart2 size={20} className="stats-graph-icon" />
            </div>

            <div className="stats-metrics-list">
              <div className="stat-item-row">
                <div className="stat-label-left">
                  <span className="dot-indicator teal"></span>
                  <span>Total Banners</span>
                </div>
                <span className="stat-number">{banners.length}</span>
              </div>
            </div>
          </div>

          {/* BANNERS LIST TABLE CARD */}
          <div className="banner-card">
            <div className="card-header-title">
              <h3>Existing Banners</h3>
            </div>
            <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                    <th style={{ padding: '8px' }}>Title</th>
                    <th style={{ padding: '8px' }}>Type</th>
                    <th style={{ padding: '8px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.map((b) => (
                    <tr key={b._id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '8px' }}>{b.bannerTitle}</td>
                      <td style={{ padding: '8px' }}>{b.bannerType}</td>
                      <td style={{ padding: '8px', display: 'flex', gap: '5px' }}>
                        <button 
                          onClick={() => handleEditClick(b)} 
                          style={{ background: '#0052CC', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          <Edit2 size={12} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(b._id)} 
                          style={{ background: '#D93535', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {banners.length === 0 && (
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center', padding: '15px', color: '#777' }}>No banners found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="banner-page-footer">
        <span>© 2024 Handlom Admin Panel. All rights reserved.</span>
      </div>

    </div>
  );
};

export default Banner;