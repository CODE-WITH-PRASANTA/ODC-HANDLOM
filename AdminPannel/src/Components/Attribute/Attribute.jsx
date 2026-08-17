import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Plus,
  Filter,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  X
} from 'lucide-react';
import './Attribute.css';
import API, { IMG_URL } from "../../api/axios";

const initialGroups = [
  { name: 'General', count: 8 },
  { name: 'Specifications', count: 14 },
  { name: 'Material', count: 6 },
  { name: 'Size & Fit', count: 5 },
  { name: 'Color', count: 4 }
];

const Attribute = () => {
  const [attributes, setAttributes] = useState([]);
  const [groups] = useState(initialGroups);

  // Filters & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState('All Groups');
  const [selectedSidebarGroup, setSelectedSidebarGroup] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    group: '',
    type: 'Dropdown',
    valuesText: 'Red\nBlue\nBlack\nGreen',
    status: true
  });

  // Fetch initial data from backend using centralized API instance
  useEffect(() => {
    fetchAttributes();
  }, []);

  const fetchAttributes = async () => {
    try {
      const response = await API.get('/attributes');
      setAttributes(response.data);
    } catch (error) {
      console.error('Error fetching attributes:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleOpenAddModal = () => {
    handleResetForm();
    setIsModalOpen(true);
  };

  // Save / Update Attribute via API
  const handleSaveAttribute = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.group) {
      alert('Please fill in Attribute Name and Group.');
      return;
    }

    const payload = {
      name: formData.name,
      group: formData.group,
      type: formData.type,
      rawValues: formData.valuesText,
      status: formData.status
    };

    try {
      if (editingId) {
        // Edit mode API call
        const response = await API.put(`/attributes/${editingId}`, payload);
        const updatedAttr = response.data;
        setAttributes(attributes.map((attr) => (attr._id === editingId ? updatedAttr : attr)));
      } else {
        // Add mode API call
        const response = await API.post('/attributes', payload);
        const newAttr = response.data;
        setAttributes([newAttr, ...attributes]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving attribute:', error);
    }
  };

  const handleEdit = (attr) => {
    setEditingId(attr._id);
    setFormData({
      name: attr.name,
      group: attr.group,
      type: attr.type,
      valuesText: attr.rawValues || '',
      status: attr.status
    });
    setIsModalOpen(true);
  };

  // Delete Attribute via API
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this attribute?')) {
      try {
        await API.delete(`/attributes/${id}`);
        setAttributes(attributes.filter((attr) => attr._id !== id));
        if (editingId === id) handleCloseModal();
      } catch (error) {
        console.error('Error deleting attribute:', error);
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const attrToUpdate = attributes.find(a => a._id === id);
      const response = await API.put(`/attributes/${id}`, { ...attrToUpdate, status: !currentStatus });
      const updatedAttr = response.data;
      setAttributes(attributes.map((attr) => (attr._id === id ? updatedAttr : attr)));
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const handleResetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      group: '',
      type: 'Dropdown',
      valuesText: 'Red\nBlue\nBlack\nGreen',
      status: true
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleResetForm();
  };

  // Search & Filter Logic
  const filteredAttributes = useMemo(() => {
    return attributes.filter((attr) => {
      const matchesSearch = attr.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDropdownGroup = selectedGroupFilter === 'All Groups' || attr.group === selectedGroupFilter;
      const matchesSidebarGroup = !selectedSidebarGroup || attr.group === selectedSidebarGroup;
      return matchesSearch && matchesDropdownGroup && matchesSidebarGroup;
    });
  }, [attributes, searchTerm, selectedGroupFilter, selectedSidebarGroup]);

  // Pagination Logic
  const totalEntries = filteredAttributes.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAttributes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="attr-container">
      {/* HEADER BAR */}
      <div className="attr-header">
        <div className="attr-title-area">
          <div className="attr-badge">{attributes.length}</div>
          <div>
            <h1 className="attr-title">Attributes</h1>
            <p className="attr-subtitle">Manage product attributes used for filters and product details.</p>
          </div>
        </div>
        <button className="btn-add-header" onClick={handleOpenAddModal}>
          <Plus size={16} />
          <span>Add New Attribute</span>
        </button>
      </div>

      {/* TWO COLUMN GRID LAYOUT */}
      <div className="attr-main-grid">
        {/* LEFT COLUMN: GROUPS & TIPS */}
        <div className="attr-left-col">
          <div className="card group-card">
            <h3 className="card-heading">Attribute Groups</h3>
            <div className="group-list">
              <div 
                className={`group-item ${selectedSidebarGroup === null ? 'active' : ''}`}
                onClick={() => setSelectedSidebarGroup(null)}
              >
                <span>All Attributes</span>
                <span className="group-count">{attributes.length}</span>
              </div>
              {groups.map((grp) => (
                <div
                  key={grp.name}
                  className={`group-item ${selectedSidebarGroup === grp.name ? 'active' : ''}`}
                  onClick={() => setSelectedSidebarGroup(grp.name)}
                >
                  <span>{grp.name}</span>
                  <span className="group-count">{grp.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card tips-card">
            <div className="tips-header">
              <Lightbulb size={20} className="tips-icon" />
              <h4>Tips</h4>
            </div>
            <p>Attributes help customers find the right product by refining their search.</p>
          </div>
        </div>

        {/* CENTER COLUMN: ATTRIBUTES TABLE */}
        <div className="card attr-center-col">
          {/* CONTROL BAR */}
          <div className="table-controls">
            <div className="search-input-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search attributes..."
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
                value={selectedGroupFilter}
                onChange={(e) => {
                  setSelectedGroupFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All Groups">All Groups</option>
                {groups.map((g) => (
                  <option key={g.name} value={g.name}>{g.name}</option>
                ))}
              </select>

              <button className="btn-filter-icon">
                <Filter size={15} />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* TABLE CONTAINER */}
          <div className="table-wrapper">
            <table className="attributes-table">
              <thead>
                <tr>
                  <th>Attribute Name</th>
                  <th>Group</th>
                  <th>Type</th>
                  <th>Values</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((attr) => (
                    <tr key={attr._id}>
                      <td className="font-semibold text-dark">{attr.name}</td>
                      <td>{attr.group}</td>
                      <td>{attr.type}</td>
                      <td>{attr.values}</td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={attr.status}
                            onChange={() => handleToggleStatus(attr._id, attr.status)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </td>
                      <td>
                        <div className="action-buttons-cell">
                          <button className="btn-action edit" onClick={() => handleEdit(attr)} title="Edit Attribute">
                            <Edit3 size={15} />
                          </button>
                          <button className="btn-action delete" onClick={() => handleDelete(attr._id)} title="Remove Attribute">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data-cell">No attributes found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER */}
          <div className="table-footer">
            <span className="footer-info">
              Showing {totalEntries === 0 ? 0 : indexOfFirstItem + 1} to{' '}
              {Math.min(indexOfLastItem, totalEntries)} of {totalEntries} attributes
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

      {/* POPUP MODAL FOR ADD / EDIT ATTRIBUTE */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingId ? 'Edit Attribute' : 'Add New Attribute'}</h3>
              <button className="btn-close-modal" onClick={handleCloseModal}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveAttribute} className="attribute-form">
              <div className="form-group">
                <label>Attribute Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Color"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Attribute Group</label>
                <select
                  name="group"
                  value={formData.group}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Group</option>
                  {groups.map((g) => (
                    <option key={g.name} value={g.name}>{g.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Attribute Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="Dropdown">Dropdown</option>
                  <option value="Text">Text</option>
                  <option value="Multiple Select">Multiple Select</option>
                </select>
              </div>

              {formData.type === 'Dropdown' && (
                <div className="form-group">
                  <label>Values (Add one per line)</label>
                  <textarea
                    name="valuesText"
                    rows={4}
                    value={formData.valuesText}
                    onChange={handleInputChange}
                    placeholder="Red&#10;Blue&#10;Black&#10;Green"
                  />
                </div>
              )}

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
                <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  {editingId ? 'Update Attribute' : 'Save Attribute'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attribute;