import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Filter,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText
} from 'lucide-react';
import './Brands.css';

// Initial Mock Data with working Google CDN Logo Links
const initialBrands = [
  {
    id: 1,
    name: 'Nike',
    description: 'Just Do It',
    products: 45,
    status: true,
    logo: 'https://cdn.iconscout.com/icon/free/png-256/free-nike-logo-icon-download-in-svg-png-gif-file-formats--brand-app-social-media-pack-logos-icons-226404.png'
  },
  {
    id: 2,
    name: 'Adidas',
    description: 'Impossible is Nothing',
    products: 38,
    status: true,
    logo: 'https://cdn.iconscout.com/icon/free/png-256/free-adidas-logo-icon-download-in-svg-png-gif-file-formats--app-social-media-company-brand-pack-logos-icons-226402.png'
  },
  {
    id: 3,
    name: 'Puma',
    description: 'Forever Faster',
    products: 22,
    status: true,
    logo: 'https://cdn.iconscout.com/icon/free/png-256/free-puma-logo-icon-download-in-svg-png-gif-file-formats--brand-fashion-app-social-media-pack-logos-icons-226408.png'
  },
  {
    id: 4,
    name: 'Rolex',
    description: 'A Crown for Every Achievement',
    products: 18,
    status: true,
    logo: 'https://upload.wikimedia.org/wikipedia/en/9/95/Rolex_logo.svg'
  },
  {
    id: 5,
    name: 'Fossil',
    description: 'Vintage Inspired',
    products: 15,
    status: true,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Fossil_Group_logo.svg'
  },
  {
    id: 6,
    name: 'Reebok',
    description: 'Life is Not a Spectator Sport',
    products: 12,
    status: false,
    logo: 'https://cdn.iconscout.com/icon/free/png-256/free-reebok-logo-icon-download-in-svg-png-gif-file-formats--company-brand-social-media-pack-logos-icons-226406.png'
  }
];

const Brands = () => {
  const [brands, setBrands] = useState(initialBrands);

  // Filters & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: '',
    status: true
  });

  // Calculate Stats Dynamically
  const totalBrandsCount = 24;
  const activeBrandsCount = brands.filter((b) => b.status).length + 15;
  const inactiveBrandsCount = 4;

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Upload Logo Action
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const logoUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, logo: logoUrl }));
    }
  };

  // Save / Update Brand
  const handleSaveBrand = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a Brand Name.');
      return;
    }

    if (editingId) {
      setBrands(
        brands.map((b) =>
          b.id === editingId
            ? { ...b, ...formData }
            : b
        )
      );
    } else {
      const newBrand = {
        id: Date.now(),
        name: formData.name,
        description: formData.description || 'Brand tag line',
        products: 0,
        status: formData.status,
        logo:
          formData.logo ||
          'https://cdn.iconscout.com/icon/free/png-256/free-nike-logo-icon-download-in-svg-png-gif-file-formats--brand-app-social-media-pack-logos-icons-226404.png'
      };
      setBrands([newBrand, ...brands]);
    }

    handleCancelForm();
  };

  // Edit Action
  const handleEdit = (brand) => {
    setEditingId(brand.id);
    setFormData({
      name: brand.name,
      description: brand.description || '',
      logo: brand.logo || '',
      status: brand.status
    });
  };

  // Delete Action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this brand?')) {
      setBrands(brands.filter((b) => b.id !== id));
      if (editingId === id) {
        handleCancelForm();
      }
    }
  };

  // Status Toggle
  const handleToggleStatus = (id) => {
    setBrands(
      brands.map((b) =>
        b.id === id ? { ...b, status: !b.status } : b
      )
    );
  };

  // Reset Form
  const handleCancelForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      logo: '',
      status: true
    });
  };

  // Filter Logic
  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const matchesSearch =
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'All Status' ||
        (statusFilter === 'Active' && brand.status) ||
        (statusFilter === 'Inactive' && !brand.status);

      return matchesSearch && matchesStatus;
    });
  }, [brands, searchTerm, statusFilter]);

  // Pagination Logic
  const totalEntries = filteredBrands.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBrands.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="brands-container">
      {/* HEADER BAR */}
      <div className="brands-header">
        <div className="brands-title-area">
          <div>
            <h1 className="brands-title">Brands</h1>
            <p className="brands-subtitle">Manage all product brands.</p>
          </div>
        </div>
        <button className="btn-add-header" onClick={handleCancelForm}>
          <Plus size={16} />
          <span>Add New Brand</span>
        </button>
      </div>

      {/* THREE COLUMN GRID */}
      <div className="brands-main-grid">
        
        {/* LEFT COLUMN */}
        <div className="brands-left-col">
          <div className="card stats-card">
            <h3 className="card-heading">Brand Stats</h3>
            
            <div className="stats-list">
              <div className="stat-row">
                <span className="stat-label">Total Brands</span>
                <span className="stat-badge neutral">{totalBrandsCount}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Active Brands</span>
                <span className="stat-badge green">{activeBrandsCount}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Inactive Brands</span>
                <span className="stat-badge red">{inactiveBrandsCount}</span>
              </div>
            </div>
          </div>

          <div className="card note-card">
            <div className="note-header">
              <FileText size={18} className="note-icon" />
              <h4>Note</h4>
            </div>
            <p>
              Only active brands will be visible on the storefront.
            </p>
          </div>
        </div>

        {/* CENTER COLUMN: TABLE */}
        <div className="card brands-center-col">
          
          <div className="table-controls">
            <div className="search-input-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="filter-actions">
              <select
                className="select-filter"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button className="btn-filter-icon">
                <Filter size={15} />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="brands-table">
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Description</th>
                  <th style={{ textAlign: 'center' }}>Products</th>
                  <th style={{ textAlign: 'center' }}>Status</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((brand) => (
                    <tr key={brand.id}>
                      <td>
                        <div className="brand-logo-cell">
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="brand-logo-img"
                          />
                        </div>
                      </td>

                      <td className="brand-desc-text">{brand.description}</td>

                      <td style={{ textAlign: 'center', fontWeight: 500 }}>
                        {brand.products}
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={brand.status}
                            onChange={() => handleToggleStatus(brand.id)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </td>

                      <td>
                        <div className="action-buttons-cell">
                          <button
                            className="btn-action edit"
                            onClick={() => handleEdit(brand)}
                            title="Edit Brand"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            className="btn-action delete"
                            onClick={() => handleDelete(brand.id)}
                            title="Remove Brand"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data-cell">
                      No brands found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <span className="footer-info">
              Showing 1 to {currentItems.length} of 24 brands
            </span>

            <div className="pagination">
              <button
                className="page-nav"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>

              <button
                className={`page-num ${currentPage === 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button
                className={`page-num ${currentPage === 2 ? 'active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button
                className={`page-num ${currentPage === 3 ? 'active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>

              <span className="page-ellipsis">...</span>

              <button
                className={`page-num ${currentPage === 5 ? 'active' : ''}`}
                onClick={() => setCurrentPage(5)}
              >
                5
              </button>

              <button
                className="page-nav"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, 5))}
                disabled={currentPage === 5}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FORM */}
        <div className="card brands-right-col">
          <h3 className="card-heading">
            {editingId ? 'Edit Brand' : 'Add New Brand'}
          </h3>

          <form onSubmit={handleSaveBrand} className="brand-form">
            <div className="form-group">
              <label>Brand Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Nike"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                rows={3}
                placeholder="Enter description..."
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Brand Logo</label>
              <div className="upload-box-wrapper">
                {formData.logo ? (
                  <div className="image-preview-container">
                    <img src={formData.logo} alt="Preview" className="uploaded-preview" />
                    <label className="reupload-btn">
                      Change
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        hidden
                      />
                    </label>
                  </div>
                ) : (
                  <label className="upload-area">
                    <Upload size={22} className="upload-icon" />
                    <span>Upload Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      hidden
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="form-group toggle-group">
              <label>Status</label>
              <div className="status-inline">
                <label className="switch">
                  <input
                    type="checkbox"
                    name="status"
                    checked={formData.status}
                    onChange={handleInputChange}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="status-label-text">
                  {formData.status ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancelForm}
              >
                Cancel
              </button>
              <button type="submit" className="btn-save">
                {editingId ? 'Update Brand' : 'Save Brand'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Brands;