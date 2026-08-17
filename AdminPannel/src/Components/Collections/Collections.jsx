import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  Search,
  Plus,
  Filter,
  Download,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Layers,
  CheckCircle2,
  XCircle,
  Package,
  X,
  Upload
} from 'lucide-react';
import './Collections.css';

const API_BASE_URL = 'http://localhost:5000/api/collections';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [selectedRows, setSelectedRows] = useState([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Manual',
    status: 'Active',
    products: 0
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // 1. Fetch Collections from Backend
  const fetchCollections = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE_URL);
      if (res.data && res.data.success) {
        setCollections(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching collections:', err);
      alert('Failed to load collections from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  // KPI Metrics Calculation
  const totalCollectionsCount = collections.length;
  const activeCollectionsCount = collections.filter(c => c.status === 'Active').length;
  const inactiveCollectionsCount = collections.filter(c => c.status === 'Inactive').length;
  const totalProductsCount = collections.reduce((acc, curr) => {
    return acc + (typeof curr.products === 'number' ? curr.products : 0);
  }, 0);

  // Filter & Search & Sort Logic
  const filteredCollections = useMemo(() => {
    let result = collections.filter((item) => {
      const name = item.name || '';
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesType = typeFilter === 'All' || item.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });

    if (sortBy === 'Newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'Oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'Name') {
      result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    return result;
  }, [collections, searchTerm, statusFilter, typeFilter, sortBy]);

  // Pagination Logic
  const totalEntries = filteredCollections.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCollections.slice(indexOfFirstItem, indexOfLastItem);

  // Row Selection Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentItems.map(item => item._id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Modal Open Handlers
  const handleOpenAddModal = () => {
    setEditingCollection(null);
    setFormData({
      name: '',
      type: 'Manual',
      status: 'Active',
      products: 0
    });
    setImageFile(null);
    setImagePreview('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingCollection(item);
    setFormData({
      name: item.name || '',
      type: item.type || 'Manual',
      status: item.status || 'Active',
      products: item.products || 0
    });
    setImageFile(null);
    setImagePreview(item.image || '');
    setIsModalOpen(true);
  };

  // Save / Update Collection
  const handleSaveCollection = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter Collection Name.');
      return;
    }

    const payload = new FormData();
    payload.append('name', formData.name.trim());
    payload.append('type', formData.type);
    payload.append('status', formData.status);
    payload.append('products', Number(formData.products) || 0);

    if (imageFile) {
      payload.append('image', imageFile);
    }

    try {
      setSaving(true);
      if (editingCollection) {
        // UPDATE (PUT)
        const res = await axios.put(`${API_BASE_URL}/${editingCollection._id}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (res.data && res.data.success) {
          setCollections(prev =>
            prev.map(c => (c._id === editingCollection._id ? res.data.data : c))
          );
        }
      } else {
        // CREATE (POST)
        const res = await axios.post(API_BASE_URL, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (res.data && res.data.success) {
          setCollections(prev => [res.data.data, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving collection:', err);
      alert(err.response?.data?.message || 'Error saving collection.');
    } finally {
      setSaving(false);
    }
  };

  // Delete Action
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this collection?')) return;

    try {
      const res = await axios.delete(`${API_BASE_URL}/${id}`);
      if (res.data && res.data.success) {
        setCollections(prev => prev.filter(item => item._id !== id));
        setSelectedRows(prev => prev.filter(rowId => rowId !== id));
      }
    } catch (err) {
      console.error('Error deleting collection:', err);
      alert('Failed to delete collection.');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const csvHeader = "ID,Name,Type,Products,Status,Date Created\n";
    const csvRows = collections
      .map(c => `${c._id},"${c.name}",${c.type},${c.products},${c.status},"${new Date(c.createdAt).toLocaleDateString()}"`)
      .join("\n");
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'collections.csv';
    a.click();
  };

  return (
    <div className="collections-container">
      <div className="collections-wrapper">
        
        {/* TOP STATS CARDS & ADD BUTTON */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">Total Collections</span>
              <span className="stat-value">{totalCollectionsCount}</span>
              <span className="stat-subtext">All collections</span>
            </div>
            <div className="stat-icon blue">
              <Layers size={20} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">Active Collections</span>
              <span className="stat-value">{activeCollectionsCount}</span>
              <span className="stat-subtext">Currently active</span>
            </div>
            <div className="stat-icon green">
              <CheckCircle2 size={20} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">Inactive Collections</span>
              <span className="stat-value">{inactiveCollectionsCount}</span>
              <span className="stat-subtext">Currently inactive</span>
            </div>
            <div className="stat-icon red">
              <XCircle size={20} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">Total Products</span>
              <span className="stat-value">{totalProductsCount.toLocaleString()}</span>
              <span className="stat-subtext">In collections</span>
            </div>
            <div className="stat-icon purple">
              <Package size={20} />
            </div>
          </div>

          <button className="add-btn" onClick={handleOpenAddModal}>
            <Plus size={18} />
            <span>Add New Collection</span>
          </button>
        </div>

        {/* CONTROLS BAR */}
        <div className="controls-card">
          <div className="controls-left">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search collections..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <Search size={16} className="search-icon" />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="select-dropdown"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="select-dropdown"
            >
              <option value="All">All Types</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>

            <button className="btn-secondary">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>

          <div className="controls-right">
            <div className="sort-wrapper">
              <label>Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select-dropdown"
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Name">Name</option>
              </select>
            </div>

            <button className="btn-secondary" onClick={handleExportCSV}>
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="table-card">
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '40px', textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={currentItems.length > 0 && selectedRows.length === currentItems.length}
                    />
                  </th>
                  <th style={{ width: '40px', textAlign: 'center' }}>#</th>
                  <th>Image</th>
                  <th>Collection Name</th>
                  <th>Type</th>
                  <th>Products</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Sort Order</th>
                  <th>Date Created</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="no-data">Loading collections...</td>
                  </tr>
                ) : currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={item._id}>
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item._id)}
                          onChange={() => handleSelectRow(item._id)}
                        />
                      </td>
                      <td style={{ textAlign: 'center', color: '#6b7280', fontWeight: 500 }}>
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td>
                        <div className="collection-banner">
                          <img
                            src={item.image || FALLBACK_IMAGE}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = FALLBACK_IMAGE;
                            }}
                          />
                          <div className="banner-overlay">
                            <span>{item.name}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontWeight: 500, color: '#1f2937' }}>{item.name}</td>
                      <td>
                        <span className={`badge ${item.type ? item.type.toLowerCase() : 'manual'}`}>
                          {item.type}
                        </span>
                      </td>
                      <td style={{ fontWeight: 500 }}>{item.products}</td>
                      <td>
                        <span className={`badge ${item.status ? item.status.toLowerCase() : 'active'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="sort-order-box">
                          <GripVertical size={14} color="#9ca3af" />
                          <span>{item.sortOrder || index + 1}</span>
                        </div>
                      </td>
                      <td style={{ color: '#6b7280', fontSize: '12px' }}>
                        {new Date(item.createdAt || Date.now()).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="action-buttons">
                          <button className="action-btn edit" onClick={() => handleOpenEditModal(item)} title="Edit">
                            <Edit3 size={15} />
                          </button>
                          <button className="action-btn delete" onClick={() => handleDelete(item._id)} title="Delete">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="no-data">
                      No collections found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER / PAGINATION */}
          <div className="table-footer">
            <span className="entries-info">
              Showing <strong>{totalEntries === 0 ? 0 : indexOfFirstItem + 1}</strong> to{" "}
              <strong>{Math.min(indexOfLastItem, totalEntries)}</strong> of{" "}
              <strong>{totalEntries}</strong> entries
            </span>

            <div className="pagination-wrapper">
              <div className="pagination-controls">
                <button
                  className="page-btn nav"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`page-btn ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="page-btn nav"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="select-dropdown page-select"
              >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
              </select>
            </div>
          </div>
        </div>

      </div>

      {/* MODAL DIALOGUE */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={18} />
            </button>
            <h3>{editingCollection ? 'Edit Collection' : 'Add New Collection'}</h3>

            <form onSubmit={handleSaveCollection} className="modal-form">
              <div className="form-group">
                <label>Collection Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Summer Essentials"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Collection Image</label>
                <div className="upload-box">
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="upload-preview" />
                  )}
                  <label className="upload-btn">
                    <Upload size={16} />
                    <span>{imagePreview ? 'Change Banner Image' : 'Upload Banner Image'}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Products Count</label>
                <input
                  type="number"
                  min="0"
                  value={formData.products}
                  onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)} disabled={saving}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={saving}>
                  {saving ? 'Saving...' : editingCollection ? 'Update' : 'Save'}
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