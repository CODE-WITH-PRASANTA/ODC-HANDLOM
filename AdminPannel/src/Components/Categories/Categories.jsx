import React, { useState, useEffect, useMemo } from 'react';
import api from '../../api/axios'; 
import {
  Search,
  Plus,
  Filter,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Upload,
  X
} from 'lucide-react';
import './Categories.css';

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    parent: '',
    description: '',
    status: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // 1. Fetch Categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get('/categories');
      if (res.data && res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      alert('Failed to load categories from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Category Tree State
  const [treeState, setTreeState] = useState([]);

  useEffect(() => {
    const rootCats = categories.filter((c) => !c.parent);
    const dynamicTree = rootCats.map((root) => ({
      name: root.name,
      open: true,
      subcategories: categories
        .filter((sub) => sub.parent === root.name)
        .map((sub) => sub.name)
    }));
    setTreeState(dynamicTree);
  }, [categories]);

  const toggleTreeFolder = (index) => {
    setTreeState((prev) =>
      prev.map((item, i) => (i === index ? { ...item, open: !item.open } : item))
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleResetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      parent: '',
      description: '',
      status: true
    });
    setImageFile(null);
    setImagePreview('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleResetForm();
  };

  // Save / Update Category
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a Category Name.');
      return;
    }

    const payload = new FormData();
    payload.append('name', formData.name.trim());
    payload.append('parent', formData.parent.trim());
    payload.append('description', formData.description.trim());
    payload.append('status', formData.status);
    if (imageFile) {
      payload.append('image', imageFile);
    }

    try {
      setSaving(true);
      if (editingId) {
        // UPDATE (PUT)
        const res = await api.put(`/categories/${editingId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (res.data && res.data.success) {
          setCategories((prev) =>
            prev.map((cat) => (cat._id === editingId ? res.data.data : cat))
          );
        }
      } else {
        // CREATE (POST)
        const res = await api.post('/categories', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (res.data && res.data.success) {
          setCategories((prev) => [res.data.data, ...prev]);
        }
      }
      handleCloseModal();
    } catch (err) {
      console.error('Error saving category:', err);
      alert(err.response?.data?.message || 'Error saving category.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setFormData({
      name: cat.name || '',
      parent: cat.parent || '',
      description: cat.description || '',
      status: Boolean(cat.status)
    });
    setImagePreview(cat.image || '');
    setImageFile(null);
    setIsModalOpen(true);
  };

  // Delete Category
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      const res = await api.delete(`/categories/${id}`);
      if (res.data && res.data.success) {
        setCategories((prev) => prev.filter((cat) => cat._id !== id));
        if (editingId === id) handleCloseModal();
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      alert('Failed to delete category.');
    }
  };

  // Toggle Status
  const handleToggleStatus = async (id) => {
    try {
      const res = await api.patch(`/categories/${id}/status`);
      if (res.data && res.data.success) {
        setCategories((prev) =>
          prev.map((cat) => (cat._id === id ? res.data.data : cat))
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status.');
    }
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const name = cat.name || '';
      const desc = cat.description || '';
      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desc.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'All Status' ||
        (statusFilter === 'Active' && cat.status) ||
        (statusFilter === 'Inactive' && !cat.status);

      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, statusFilter]);

  const totalEntries = filteredCategories.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="cat-container">
      {/* HEADER */}
      <div className="cat-header">
        <div className="cat-title-area">
          <div className="cat-badge">{categories.length}</div>
          <div>
            <h1 className="cat-title">Categories</h1>
            <p className="cat-subtitle">Organize your products into categories.</p>
          </div>
        </div>
        <button
          className="btn-add-header"
          onClick={() => {
            handleResetForm();
            setIsModalOpen(true);
          }}
        >
          <Plus size={16} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="cat-main-grid">
        {/* CATEGORY TREE */}
        <div className="card cat-left-col">
          <h3 className="card-heading">Category Tree</h3>

          <div className="tree-wrapper">
            {treeState.length > 0 ? (
              treeState.map((item, idx) => (
                <div key={`${item.name}-${idx}`} className="tree-group">
                  <div className="tree-parent" onClick={() => toggleTreeFolder(idx)}>
                    {item.open ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                    <span>{item.name}</span>
                  </div>

                  {item.open && (
                    <div className="tree-sub-list">
                      {item.subcategories.length > 0 ? (
                        item.subcategories.map((sub, sIdx) => (
                          <div key={`${sub}-${sIdx}`} className="tree-sub-item">
                            <span className="tree-line"></span>
                            <span className="tree-sub-text">{sub}</span>
                          </div>
                        ))
                      ) : (
                        <span className="tree-sub-text" style={{ fontStyle: 'italic', paddingLeft: 12 }}>
                          No subcategories
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p style={{ fontSize: '12px', color: '#9CA3AF' }}>No categories created yet.</p>
            )}
          </div>
        </div>

        {/* TABLE & CONTROLS */}
        <div className="card cat-center-col">
          <div className="table-controls">
            <div className="search-input-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search categories..."
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
            <table className="categories-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Description</th>
                  <th style={{ textAlign: 'center' }}>Products</th>
                  <th style={{ textAlign: 'center' }}>Status</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="no-data-cell">
                      Loading data...
                    </td>
                  </tr>
                ) : currentItems.length > 0 ? (
                  currentItems.map((cat) => (
                    <tr key={cat._id}>
                      <td>
                        <div className="category-cell">
                          <img
                            src={cat.image || PLACEHOLDER_IMAGE}
                            alt={cat.name}
                            className="cat-thumb"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = PLACEHOLDER_IMAGE;
                            }}
                          />
                          <span className="cat-name-text">{cat.name}</span>
                        </div>
                      </td>
                      <td className="cat-desc-text">{cat.description || '-'}</td>
                      <td style={{ textAlign: 'center', fontWeight: 500 }}>
                        {cat.products || 0}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={Boolean(cat.status)}
                            onChange={() => handleToggleStatus(cat._id)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </td>
                      <td>
                        <div className="action-buttons-cell">
                          <button
                            className="btn-action edit"
                            onClick={() => handleEdit(cat)}
                            title="Edit Category"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            className="btn-action delete"
                            onClick={() => handleDelete(cat._id)}
                            title="Remove Category"
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
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="table-footer">
            <span className="footer-info">
              Showing {totalEntries === 0 ? 0 : indexOfFirstItem + 1} to{' '}
              {Math.min(indexOfLastItem, totalEntries)} of {totalEntries} categories
            </span>

            <div className="pagination">
              <button
                className="page-nav"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`page-num ${currentPage === p ? 'active' : ''}`}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              ))}

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

      {/* POPUP MODAL */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingId ? 'Edit Category' : 'Add New Category'}</h3>
              <button className="btn-close-modal" onClick={handleCloseModal}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="category-form">
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Men's Fashion"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Updated: Parent Category Input Box instead of Select */}
              <div className="form-group">
                <label>Parent Category</label>
                <input
                  type="text"
                  name="parent"
                  placeholder="e.g. Electronics (leave blank for none)"
                  value={formData.parent}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Enter category description..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Category Image</label>
                <div className="upload-box-wrapper">
                  {imagePreview ? (
                    <div className="image-preview-container">
                      <img src={imagePreview} alt="Preview" className="uploaded-preview" />
                      <label className="reupload-btn">
                        Change Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          hidden
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="upload-area">
                      <Upload size={22} className="upload-icon" />
                      <span>Click to Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
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
                  disabled={saving}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Update Category' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;