import React, { useState, useMemo } from 'react';
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

// Initial Mock Data matching your reference design
const initialCollections = [
  {
    id: 1,
    name: "Men's Collection",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=200",
    type: "Manual",
    products: 320,
    status: "Active",
    sortOrder: 1,
    dateCreated: "20 May 2025"
  },
  {
    id: 2,
    name: "Women's Collection",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    type: "Manual",
    products: 280,
    status: "Active",
    sortOrder: 2,
    dateCreated: "20 May 2025"
  },
  {
    id: 3,
    name: "Sports Collection",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=200",
    type: "Automatic",
    products: 150,
    status: "Active",
    sortOrder: 3,
    dateCreated: "19 May 2025"
  },
  {
    id: 4,
    name: "Bags Collection",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=200",
    type: "Manual",
    products: 95,
    status: "Active",
    sortOrder: 4,
    dateCreated: "18 May 2025"
  },
  {
    id: 5,
    name: "Sunglasses Collection",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=200",
    type: "Manual",
    products: 80,
    status: "Inactive",
    sortOrder: 5,
    dateCreated: "17 May 2025"
  },
  {
    id: 6,
    name: "Backpack Collection",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=200",
    type: "Manual",
    products: 60,
    status: "Active",
    sortOrder: 6,
    dateCreated: "16 May 2025"
  },
  {
    id: 7,
    name: "Coupon Collection",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=200",
    type: "Automatic",
    products: "-",
    status: "Inactive",
    sortOrder: 7,
    dateCreated: "15 May 2025"
  },
  {
    id: 8,
    name: "New Arrivals",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=200",
    type: "Automatic",
    products: 260,
    status: "Active",
    sortOrder: 8,
    dateCreated: "14 May 2025"
  }
];

const Collections = () => {
  const [collections, setCollections] = useState(initialCollections);
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
    products: 0,
    image: ''
  });

  // KPI Metrics Calculation
  const totalCollectionsCount = collections.length;
  const activeCollectionsCount = collections.filter(c => c.status === 'Active').length;
  const inactiveCollectionsCount = collections.filter(c => c.status === 'Inactive').length;
  const totalProductsCount = collections.reduce((acc, curr) => {
    return acc + (typeof curr.products === 'number' ? curr.products : 0);
  }, 0);

  // Filter & Search Logic
  const filteredCollections = useMemo(() => {
    return collections.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesType = typeFilter === 'All' || item.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [collections, searchTerm, statusFilter, typeFilter]);

  // Pagination Logic
  const totalEntries = filteredCollections.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCollections.slice(indexOfFirstItem, indexOfLastItem);

  // Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentItems.map(item => item.id));
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this collection?")) {
      setCollections(collections.filter(item => item.id !== id));
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleOpenAddModal = () => {
    setEditingCollection(null);
    setFormData({
      name: '',
      type: 'Manual',
      status: 'Active',
      products: 0,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingCollection(item);
    setFormData({
      name: item.name,
      type: item.type,
      status: item.status,
      products: item.products === '-' ? 0 : item.products,
      image: item.image
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleSaveCollection = (e) => {
    e.preventDefault();
    if (editingCollection) {
      setCollections(collections.map(c => 
        c.id === editingCollection.id 
          ? { ...c, ...formData, products: Number(formData.products) }
          : c
      ));
    } else {
      const newCollection = {
        id: Date.now(),
        name: formData.name,
        image: formData.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200",
        type: formData.type,
        products: Number(formData.products) || "-",
        status: formData.status,
        sortOrder: collections.length + 1,
        dateCreated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      setCollections([newCollection, ...collections]);
    }
    setIsModalOpen(false);
  };

  const handleExportCSV = () => {
    const csvHeader = "ID,Name,Type,Products,Status,Date Created\n";
    const csvRows = collections.map(c => `${c.id},"${c.name}",${c.type},${c.products},${c.status},"${c.dateCreated}"`).join("\n");
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
          
          {/* Total Collections */}
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

          {/* Active Collections */}
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

          {/* Inactive Collections */}
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

          {/* Total Products */}
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

          {/* Add New Collection Button */}
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={16} className="search-icon" />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select-dropdown"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
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
                  <th>Collection Name</th>
                  <th>Image</th>
                  <th>Type</th>
                  <th>Products</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Sort Order</th>
                  <th>Date Created</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={item.id}>
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.id)}
                          onChange={() => handleSelectRow(item.id)}
                        />
                      </td>
                      <td style={{ textAlign: 'center', color: '#6b7280', fontWeight: 500 }}>
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td>
                        <div className="collection-banner">
                          <img src={item.image} alt={item.name} />
                          <div className="banner-overlay">
                            <span>{item.name}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontWeight: 500, color: '#1f2937' }}>{item.name}</td>
                      <td>
                        <span className={`badge ${item.type.toLowerCase()}`}>
                          {item.type}
                        </span>
                      </td>
                      <td style={{ fontWeight: 500 }}>{item.products}</td>
                      <td>
                        <span className={`badge ${item.status.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="sort-order-box">
                          <GripVertical size={14} color="#9ca3af" />
                          <span>{item.sortOrder}</span>
                        </div>
                      </td>
                      <td style={{ color: '#6b7280', fontSize: '12px' }}>{item.dateCreated}</td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="action-buttons">
                          <button className="action-btn edit" onClick={() => handleOpenEditModal(item)} title="Edit">
                            <Edit3 size={15} />
                          </button>
                          <button className="action-btn delete" onClick={() => handleDelete(item.id)} title="Delete">
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
                  {formData.image && <img src={formData.image} alt="Preview" className="upload-preview" />}
                  <label className="upload-btn">
                    <Upload size={16} />
                    <span>Upload Banner Image</span>
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
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingCollection ? 'Update' : 'Save'}
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