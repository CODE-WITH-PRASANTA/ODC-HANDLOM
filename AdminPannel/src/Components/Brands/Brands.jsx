import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  X
} from 'lucide-react';
import './Brands.css';
import API, { IMG_URL } from "../../api/axios";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [stats, setStats] = useState({ totalBrands: 0, activeBrands: 0, inactiveBrands: 0 });

  // Filters & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal Open/Close State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: true
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // Fetch data from backend using custom API client
  const fetchBrands = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append('search', searchTerm);
      if (statusFilter && statusFilter !== 'All Status') queryParams.append('status', statusFilter);

      const response = await API.get(`/brands?${queryParams.toString()}`);
      const result = response.data;
      
      if (result.success) {
        setBrands(result.data || []);
        setStats(result.stats || { totalBrands: 0, activeBrands: 0, inactiveBrands: 0 });
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [searchTerm, statusFilter]);

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Upload Logo Action with cleanup
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Open Add Brand Modal
  const handleOpenAddModal = () => {
    handleResetForm();
    setIsModalOpen(true);
  };

  // Save / Update Brand Backend Integration
  const handleSaveBrand = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a Brand Name.');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('status', formData.status);
    if (selectedFile) {
      data.append('logo', selectedFile);
    }

    try {
      let response;
      if (editingId) {
        response = await API.put(`/brands/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        response = await API.post('/brands', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      const result = response.data;
      if (result.success) {
        await fetchBrands();
        handleCloseModal();
      } else {
        alert(result.message || 'Error saving brand');
      }
    } catch (error) {
      console.error('Error saving brand:', error);
      alert('Network error while saving brand.');
    }
  };

  // Edit Action
  const handleEdit = (brand) => {
    setEditingId(brand._id);
    setFormData({
      name: brand.name,
      description: brand.description || '',
      status: brand.status
    });
    setPreviewUrl(brand.logo ? `${IMG_URL}${brand.logo}` : '');
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  // Delete Action
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this brand?')) {
      try {
        const response = await API.delete(`/brands/${id}`);
        const result = response.data;
        if (result.success) {
          fetchBrands();
        }
      } catch (error) {
        console.error('Error deleting brand:', error);
      }
    }
  };

  // Status Toggle
  const handleToggleStatus = async (id) => {
    try {
      const response = await API.patch(`/brands/${id}/status`);
      const result = response.data;
      if (result.success) {
        fetchBrands();
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  // Reset Form Inputs
  const handleResetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      status: true
    });
    setSelectedFile(null);
    setPreviewUrl('');
  };

  // Close Modal Action
  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleResetForm();
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = brands.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(brands.length / itemsPerPage) || 1;

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
        <button className="btn-add-header" onClick={handleOpenAddModal}>
          <Plus size={16} />
          <span>Add New Brand</span>
        </button>
      </div>

      {/* TWO COLUMN GRID */}
      <div className="brands-main-grid">
        {/* LEFT COLUMN */}
        <div className="brands-left-col">
          <div className="card stats-card">
            <h3 className="card-heading">Brand Stats</h3>
            <div className="stats-list">
              <div className="stat-row">
                <span className="stat-label">Total Brands</span>
                <span className="stat-badge neutral">{stats.totalBrands}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Active Brands</span>
                <span className="stat-badge green">{stats.activeBrands}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Inactive Brands</span>
                <span className="stat-badge red">{stats.inactiveBrands}</span>
              </div>
            </div>
          </div>

          <div className="card note-card">
            <div className="note-header">
              <FileText size={18} className="note-icon" />
              <h4>Note</h4>
            </div>
            <p>Only active brands will be visible on the storefront.</p>
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
                    <tr key={brand._id}>
                      <td>
                        <div className="brand-logo-cell">
                          <img
                            src={brand.logo ? `${IMG_URL}${brand.logo}` : 'https://placehold.co/100'}
                            alt={brand.name}
                            className="brand-logo-img"
                          />
                        </div>
                      </td>
                      <td className="brand-desc-text">{brand.description}</td>
                      <td style={{ textAlign: 'center', fontWeight: 500 }}>
                        {brand.products || 0}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={brand.status}
                            onChange={() => handleToggleStatus(brand._id)}
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
                            onClick={() => handleDelete(brand._id)}
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
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, brands.length)} of {brands.length} brands
            </span>

            <div className="pagination">
              <button
                className="page-nav"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>

              <span className="page-num active">{currentPage} / {totalPages}</span>

              <button
                className="page-nav"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP MODAL FOR ADD / EDIT BRAND */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingId ? 'Edit Brand' : 'Add New Brand'}</h3>
              <button className="btn-close-modal" onClick={handleCloseModal}>
                <X size={18} />
              </button>
            </div>

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
                  placeholder="Enter tagline or description..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Brand Logo (Supports WebP / PNG / JPG)</label>
                <div className="upload-box-wrapper">
                  {previewUrl ? (
                    <div className="image-preview-container">
                      <img src={previewUrl} alt="Preview" className="uploaded-preview" />
                      <label className="reupload-btn">
                        Change Logo
                        <input
                          type="file"
                          accept="image/webp, image/png, image/jpeg"
                          onChange={handleLogoUpload}
                          hidden
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="upload-area">
                      <Upload size={22} className="upload-icon" />
                      <span>Click to Upload Logo</span>
                      <input
                        type="file"
                        accept="image/webp, image/png, image/jpeg"
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
                  onClick={handleCloseModal}
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
      )}
    </div>
  );
};

export default Brands;