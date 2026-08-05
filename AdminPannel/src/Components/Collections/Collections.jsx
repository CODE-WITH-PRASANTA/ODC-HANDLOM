import React, { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Download, 
  ShoppingBag, 
  Folder, 
  Home, 
  Eye, 
  Trophy, 
  Search, 
  MoreHorizontal, 
  ChevronRight, 
  X, 
  CloudUpload, 
  Save, 
  ListOrdered, 
  FolderPlus 
} from 'lucide-react';
import './Collections.css';

const initialCollections = [
  { id: 1, name: 'Summer Collection', products: 24, status: 'Active', views: '3,560', date: 'May 20, 2024', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&auto=format&fit=crop&q=60' },
  { id: 2, name: 'New Arrivals', products: 18, status: 'Active', views: '2,860', date: 'May 18, 2024', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&auto=format&fit=crop&q=60' },
  { id: 3, name: "Men's Essentials", products: 22, status: 'Active', views: '2,450', date: 'May 15, 2024', img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=100&auto=format&fit=crop&q=60' },
  { id: 4, name: "Women's Festive", products: 16, status: 'Active', views: '1,980', date: 'May 12, 2024', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&auto=format&fit=crop&q=60' },
  { id: 5, name: 'Best Sellers', products: 12, status: 'Active', views: '1,560', date: 'May 10, 2024', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&auto=format&fit=crop&q=60' },
  { id: 6, name: 'Under ₹999', products: 10, status: 'Inactive', views: '980', date: 'May 08, 2024', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=100&auto=format&fit=crop&q=60' },
];

const Collections = () => {
  const [collections, setCollections] = useState(initialCollections);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All Collections');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    status: 'Active',
    displayOrder: 0,
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'name' ? { slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') } : {})
    }));
  };

  const handleSaveCollection = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const newEntry = {
      id: Date.now(),
      name: formData.name,
      products: 0,
      status: formData.status,
      views: '0',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop&q=60'
    };

    setCollections([newEntry, ...collections]);
    setIsModalOpen(false);
    setFormData({ name: '', slug: '', description: '', status: 'Active', displayOrder: 0, image: null });
  };

  const filteredCollections = collections.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterType === 'Active') return matchesSearch && item.status === 'Active';
    if (filterType === 'Inactive') return matchesSearch && item.status === 'Inactive';
    return matchesSearch;
  });

  return (
    <div className="collections-container">
      {/* Header */}
      <header className="collections-header">
        <div className="header-title">
          <h1>Collections</h1>
          <p>Create and manage product collections to highlight special themes and offers.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Add Collection
          </button>
          <button className="btn btn-secondary">
            <Upload size={16} /> Import
          </button>
          <button className="btn btn-secondary">
            <Download size={16} /> Export
          </button>
        </div>
      </header>

      {/* Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon icon-rose">
            <ShoppingBag size={18} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Total Collections</span>
            <div className="metric-value">12</div>
            <span className="metric-trend trend-up">↑ 2 vs last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon icon-amber">
            <Folder size={18} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Active Collections</span>
            <div className="metric-value">9</div>
            <span className="metric-trend trend-up">↑ 1 vs last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon icon-purple">
            <Home size={18} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Products in Collections</span>
            <div className="metric-value">156</div>
            <span className="metric-trend trend-up">↑ 18 vs last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon icon-blue">
            <Eye size={18} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Total Views</span>
            <div className="metric-value">24,560</div>
            <span className="metric-trend trend-up">↑ 28% vs last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon icon-gold">
            <Trophy size={18} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Top Collection</span>
            <div className="metric-value-text">Summer Collection</div>
            <span className="metric-subtext">3,560 Views</span>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="main-grid">
        {/* Left Column: Table Container */}
        <div className="table-section">
          <div className="table-toolbar">
            <select className="select-dropdown" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="All Collections">All Collections</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="search-input-wrapper">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search collections..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="collections-table">
              <thead>
                <tr>
                  <th>Collection</th>
                  <th>Products</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th>Created At</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCollections.map((row) => (
                  <tr key={row.id}>
                    <td className="cell-collection">
                      <img src={row.img} alt={row.name} className="collection-img" />
                      <span className="collection-name">{row.name}</span>
                    </td>
                    <td>{row.products}</td>
                    <td>
                      <span className={`badge badge-${row.status.toLowerCase()}`}>
                        {row.status}
                      </span>
                    </td>
                    <td>{row.views}</td>
                    <td>{row.date}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button className="btn-icon">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn nav-btn"><ChevronRight size={16} /></button>
          </div>
        </div>

        {/* Right Column Layout */}
        <div className="sidebar-section">
          <div className="widgets-top-row">
            {/* Collection Types Widget */}
            <div className="sidebar-card">
              <h3 className="card-title">Collection Types</h3>
              <ul className="types-list">
                <li className="active">
                  <span>All Collections</span>
                  <span className="count">12</span>
                </li>
                <li>
                  <span>Active</span>
                  <span className="count">9</span>
                </li>
                <li>
                  <span>Inactive</span>
                  <span className="count">3</span>
                </li>
                <li>
                  <span>Featured</span>
                  <span className="count">5</span>
                </li>
              </ul>
            </div>

            {/* Donut Chart Widget */}
            <div className="sidebar-card">
              <h3 className="card-title">Collections Overview</h3>
              <div className="chart-wrapper">
                <div className="donut-chart">
                  <div className="chart-center">
                    <span className="chart-number">12</span>
                    <span className="chart-text">Total</span>
                  </div>
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="dot dot-active"></span>
                    <span className="legend-label">Active</span>
                    <span className="legend-value">9 (75%)</span>
                  </div>
                  <div className="legend-item">
                    <span className="dot dot-inactive"></span>
                    <span className="legend-label">Inactive</span>
                    <span className="legend-value">3 (25%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Row */}
          <div className="sidebar-card quick-actions-card">
            <h3 className="card-title">Quick Actions</h3>
            <div className="quick-actions-grid">
              <button className="quick-action-btn" onClick={() => setIsModalOpen(true)}>
                <div className="qa-icon"><FolderPlus size={20} /></div>
                <span>Add Collection</span>
              </button>
              <button className="quick-action-btn">
                <div className="qa-icon"><ListOrdered size={20} /></div>
                <span>Reorder Collections</span>
              </button>
              <button className="quick-action-btn">
                <div className="qa-icon"><Folder size={20} /></div>
                <span>Create Collection Group</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Collection Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>

            <div className="modal-header">
              <div className="modal-title-icon">
                <FolderPlus size={20} />
              </div>
              <div>
                <h2>Add Collection</h2>
                <p>Create a new collection to highlight special themes.</p>
              </div>
            </div>

            <form onSubmit={handleSaveCollection} className="modal-form">
              <div className="form-group">
                <label>Collection Name <span className="required">*</span></label>
                <div className="input-with-icon">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Enter collection name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <FolderPlus size={18} className="field-icon" />
                </div>
              </div>

              <div className="form-group">
                <label>Slug (URL)</label>
                <input 
                  type="text" 
                  name="slug"
                  placeholder="enter-collection-slug" 
                  value={formData.slug}
                  onChange={handleInputChange}
                />
                <span className="field-hint">URL-friendly version. Use lowercase letters, numbers and hyphens.</span>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description"
                  placeholder="Enter collection description (optional)" 
                  rows={3}
                  maxLength={300}
                  value={formData.description}
                  onChange={handleInputChange}
                />
                <span className="char-count">{formData.description.length} / 300</span>
              </div>

              <div className="form-group">
                <label>Collection Image / Banner <span className="required">*</span></label>
                <div className="file-upload-box">
                  <CloudUpload size={28} />
                  <p><strong>Click to upload</strong> or drag and drop</p>
                  <span>PNG, JPG or WEBP (Recommended: 1200x600px)</span>
                </div>
              </div>

              <div className="form-group">
                <label>Status <span className="required">*</span></label>
                <div className="radio-group">
                  <label className={`radio-card ${formData.status === 'Active' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="status" 
                      value="Active" 
                      checked={formData.status === 'Active'}
                      onChange={handleInputChange}
                    />
                    <div className="radio-content">
                      <strong>Active</strong>
                      <span>Category will be visible</span>
                    </div>
                  </label>

                  <label className={`radio-card ${formData.status === 'Inactive' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="status" 
                      value="Inactive" 
                      checked={formData.status === 'Inactive'}
                      onChange={handleInputChange}
                    />
                    <div className="radio-content">
                      <strong>Inactive</strong>
                      <span>Collection will be hidden</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Display Order</label>
                <input 
                  type="number" 
                  name="displayOrder"
                  value={formData.displayOrder}
                  onChange={handleInputChange}
                />
                <span className="field-hint">Lower numbers will display first.</span>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-cancel" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-save">
                  <Save size={16} /> Save Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collections;