import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Filter,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import './Attribute.css';

// Initial Mock Data matching reference image exactly
const initialAttributes = [
  { id: 1, name: 'Color', group: 'General', type: 'Dropdown', values: '6 values', rawValues: 'Red\nBlue\nBlack\nGreen\nWhite\nYellow', status: true },
  { id: 2, name: 'Size', group: 'Size & Fit', type: 'Dropdown', values: '5 values', rawValues: 'S\nM\nL\nXL\nXXL', status: true },
  { id: 3, name: 'Material', group: 'Material', type: 'Dropdown', values: '7 values', rawValues: 'Cotton\nPolyester\nLeather\nSilk\nWool\nDenim\nLinen', status: true },
  { id: 4, name: 'Gender', group: 'General', type: 'Dropdown', values: '3 values', rawValues: 'Men\nWomen\nUnisex', status: true },
  { id: 5, name: 'Brand', group: 'General', type: 'Dropdown', values: '12 values', rawValues: 'Nike\nAdidas\nPuma\nReebok', status: true },
  { id: 6, name: 'Weight', group: 'Specifications', type: 'Text', values: '-', rawValues: '', status: true },
  { id: 7, name: 'Warranty', group: 'Specifications', type: 'Text', values: '-', rawValues: '', status: true }
];

const initialGroups = [
  { name: 'General', count: 8 },
  { name: 'Specifications', count: 14 },
  { name: 'Material', count: 6 },
  { name: 'Size & Fit', count: 5 },
  { name: 'Color', count: 4 }
];

const Attribute = () => {
  const [attributes, setAttributes] = useState(initialAttributes);
  const [groups] = useState(initialGroups);

  // Filters & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState('All Groups');
  const [selectedSidebarGroup, setSelectedSidebarGroup] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Form / Add / Edit State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    group: '',
    type: 'Dropdown',
    valuesText: 'Red\nBlue\nBlack\nGreen',
    status: true
  });

  // Handle Form Change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Create or Update Attribute
  const handleSaveAttribute = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.group) {
      alert('Please fill in Attribute Name and Group.');
      return;
    }

    const valueLines = formData.valuesText
      .split('\n')
      .map((v) => v.trim())
      .filter(Boolean);
      
    const formattedValues = formData.type === 'Dropdown' && valueLines.length > 0 
      ? `${valueLines.length} values` 
      : '-';

    if (editingId) {
      // Edit mode
      setAttributes(
        attributes.map((attr) =>
          attr.id === editingId
            ? {
                ...attr,
                name: formData.name,
                group: formData.group,
                type: formData.type,
                values: formattedValues,
                rawValues: formData.valuesText,
                status: formData.status
              }
            : attr
        )
      );
    } else {
      // Add mode
      const newAttr = {
        id: Date.now(),
        name: formData.name,
        group: formData.group,
        type: formData.type,
        values: formattedValues,
        rawValues: formData.valuesText,
        status: formData.status
      };
      setAttributes([...attributes, newAttr]);
    }

    handleCancelForm();
  };

  const handleEdit = (attr) => {
    setEditingId(attr.id);
    setFormData({
      name: attr.name,
      group: attr.group,
      type: attr.type,
      valuesText: attr.rawValues || '',
      status: attr.status
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this attribute?')) {
      setAttributes(attributes.filter((attr) => attr.id !== id));
      if (editingId === id) {
        handleCancelForm();
      }
    }
  };

  const handleToggleStatus = (id) => {
    setAttributes(
      attributes.map((attr) =>
        attr.id === id ? { ...attr, status: !attr.status } : attr
      )
    );
  };

  const handleCancelForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      group: '',
      type: 'Dropdown',
      valuesText: 'Red\nBlue\nBlack\nGreen',
      status: true
    });
  };

  // Filter Logic
  const filteredAttributes = useMemo(() => {
    return attributes.filter((attr) => {
      const matchesSearch = attr.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDropdownGroup =
        selectedGroupFilter === 'All Groups' || attr.group === selectedGroupFilter;

      const matchesSidebarGroup =
        !selectedSidebarGroup || attr.group === selectedSidebarGroup;

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
          <div className="attr-badge">1</div>
          <div>
            <h1 className="attr-title">Attributes</h1>
            <p className="attr-subtitle">
              Manage product attributes used for filters and product details.
            </p>
          </div>
        </div>
        <button className="btn-add-header" onClick={handleCancelForm}>
          <Plus size={16} />
          <span>Add New Attribute</span>
        </button>
      </div>

      {/* THREE COLUMN / RESPONSIVE GRID LAYOUT */}
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
            <p>
              Attributes help customers find the right product by refining their search.
            </p>
          </div>
        </div>

        {/* CENTER COLUMN: ATTRIBUTES TABLE */}
        <div className="card attr-center-col">
          
          {/* CONTROL BAR: SEARCH & DROPDOWN FILTER */}
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
                  <option key={g.name} value={g.name}>
                    {g.name}
                  </option>
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
                    <tr key={attr.id}>
                      <td className="font-semibold text-dark">{attr.name}</td>
                      <td>{attr.group}</td>
                      <td>{attr.type}</td>
                      <td>{attr.values}</td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={attr.status}
                            onChange={() => handleToggleStatus(attr.id)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </td>
                      <td>
                        <div className="action-buttons-cell">
                          <button
                            className="btn-action edit"
                            onClick={() => handleEdit(attr)}
                            title="Edit Attribute"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            className="btn-action delete"
                            onClick={() => handleDelete(attr.id)}
                            title="Remove Attribute"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data-cell">
                      No attributes found.
                    </td>
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

        {/* RIGHT COLUMN: ADD / EDIT ATTRIBUTE FORM */}
        <div className="card attr-right-col">
          <h3 className="card-heading">
            {editingId ? 'Edit Attribute' : 'Add New Attribute'}
          </h3>

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
                  <option key={g.name} value={g.name}>
                    {g.name}
                  </option>
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
                  rows={5}
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
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancelForm}
              >
                Cancel
              </button>
              <button type="submit" className="btn-save">
                {editingId ? 'Update Attribute' : 'Save Attribute'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Attribute;