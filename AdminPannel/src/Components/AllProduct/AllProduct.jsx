import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FiBox, 
  FiTag, 
  FiEye, 
  FiStar, 
  FiCalendar, 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiEdit2, 
  FiTrash2, 
  FiChevronLeft, 
  FiChevronRight, 
  FiX, 
  FiAlertTriangle
} from 'react-icons/fi';
import './AllProduct.css';

const API_BASE_URL = 'http://localhost:5000/api/products';

const AllProduct = () => {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Calendar date range state
  const [dateRange, setDateRange] = useState('01 May 2025 - 31 May 2025');
  const [showCalendar, setShowCalendar] = useState(false);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [collectionFilter, setCollectionFilter] = useState('All Collections');
  const [brandFilter, setBrandFilter] = useState('All Brands');
  const [statusFilter, setStatusFilter] = useState('Status: All');

  // Dropdowns visibility state
  const [showCategoryDrop, setShowCategoryDrop] = useState(false);
  const [showCollectionDrop, setShowCollectionDrop] = useState(false);
  const [showBrandDrop, setShowBrandDrop] = useState(false);
  const [showStatusDrop, setShowStatusDrop] = useState(false);

  // Selected checkboxes state
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  // Edit / Add Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const initialFormState = {
    name: '',
    desc: '',
    sku: '',
    category: 'Sarees',
    price: '',
    stock: '',
    status: 'Active'
  };
  const [formData, setFormData] = useState(initialFormState);

  // Delete Confirmation Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // 1. Fetch Products from Backend (Handles both { success, data } and raw array formats)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE_URL);
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setProductsList(res.data.data);
      } else if (Array.isArray(res.data)) {
        setProductsList(res.data);
      } else {
        setProductsList([]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Add or Edit Product Submit
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    try {
      const payload = {
        name: formData.name.trim(),
        desc: formData.desc.trim(),
        sku: formData.sku.trim() || undefined,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock) || 0,
        status: Number(formData.stock) === 0 ? 'Out of Stock' : (formData.status || 'Active')
      };

      if (isEditing && currentProductId) {
        await axios.put(`${API_BASE_URL}/${currentProductId}`, payload);
      } else {
        await axios.post(API_BASE_URL, payload);
      }

      await fetchProducts(); // List refresh
      closeModal();          // Modal close and reset
    } catch (err) {
      console.error('Error saving product:', err.response?.data || err.message);
      alert('Product save karne mein error aayi: ' + (err.response?.data?.message || err.message));
    }
  };
  // Open modal for Create
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setCurrentProductId(null);
    setFormData(initialFormState);
    setShowModal(true);
  };

  // Open modal for Edit with prepopulated values
  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProductId(product._id);
    setFormData({
      name: product.name,
      desc: product.desc || '',
      sku: product.sku || '',
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentProductId(null);
    setFormData(initialFormState);
  };

  // 3. Delete Product Flow
  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await axios.delete(`${API_BASE_URL}/${productToDelete._id}`);
        fetchProducts();
        setSelectedProducts(prev => prev.filter(id => id !== productToDelete._id));
      } catch (err) {
        console.error('Error deleting product:', err);
      } finally {
        setShowDeleteModal(false);
        setProductToDelete(null);
      }
    }
  };

  // Checkbox handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(currentItems.map(p => p._id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(item => item !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  // Filter Logic
  const filteredProducts = productsList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (product.sku && product.sku.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'All Categories' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'Status: All' || product.status === statusFilter.replace('Status: ', '');
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / perPage) || 1;
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Metrics Data Calculations
  const totalCount = productsList.length;
  const activeCount = productsList.filter(p => p.status === 'Active').length;
  const outOfStockCount = productsList.filter(p => p.stock === 0 || p.status === 'Out of Stock').length;
  const lowStockCount = productsList.filter(p => p.stock > 0 && p.stock <= 15).length;

  // Export Report Function
  const handleExportReport = () => {
    const reportText = productsList.map(p => 
      `Name: ${p.name} | SKU: ${p.sku} | Category: ${p.category} | Price: ₹${p.price} | Stock: ${p.stock} | Status: ${p.status} | Rating: ${p.rating}`
    ).join('\n');

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Products_Export_${dateRange.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="allproduct-container">
      {/* Top Header Section */}
      <div className="allproduct-header">
        <div className="allproduct-breadcrumb">
          Dashboard <span>›</span> Products
        </div>
        <div className="allproduct-actions-header">
          {/* Calendar Picker */}
          <div className="allproduct-calendar-wrapper">
            <button 
              className="allproduct-calendar-btn"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <FiCalendar className="allproduct-icon" />
              <span>{dateRange}</span>
            </button>
            {showCalendar && (
              <div className="allproduct-calendar-dropdown">
                <p>Select Date Range:</p>
                <input 
                  type="text" 
                  value={dateRange} 
                  onChange={(e) => setDateRange(e.target.value)}
                />
                <button 
                  className="allproduct-apply-date"
                  onClick={() => setShowCalendar(false)}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          <button 
            className="allproduct-add-btn"
            onClick={handleOpenAddModal}
          >
            <FiPlus className="allproduct-icon" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="allproduct-metrics-grid">
        <div className="allproduct-metric-card">
          <div className="allproduct-metric-icon-box pink">
            <FiBox />
          </div>
          <div className="allproduct-metric-content">
            <span className="allproduct-metric-title">Total Products</span>
            <h3 className="allproduct-metric-value">{totalCount}</h3>
            <span className="allproduct-metric-sub">Active Products<br /><b>{activeCount}</b></span>
          </div>
        </div>

        <div className="allproduct-metric-card">
          <div className="allproduct-metric-icon-box green">
            <FiTag />
          </div>
          <div className="allproduct-metric-content">
            <span className="allproduct-metric-title">Out of Stock</span>
            <h3 className="allproduct-metric-value">{outOfStockCount}</h3>
            <span className="allproduct-metric-sub">Low Stock<br /><b>{lowStockCount}</b></span>
          </div>
        </div>

        <div className="allproduct-metric-card">
          <div className="allproduct-metric-icon-box purple">
            <FiEye />
          </div>
          <div className="allproduct-metric-content">
            <span className="allproduct-metric-title">Total Views</span>
            <h3 className="allproduct-metric-value">45,678</h3>
            <span className="allproduct-metric-sub green-text">This Month</span>
          </div>
        </div>

        <div className="allproduct-metric-card">
          <div className="allproduct-metric-icon-box gold">
            <FiStar />
          </div>
          <div className="allproduct-metric-content">
            <span className="allproduct-metric-title">Top Rated Product</span>
            <h3 className="allproduct-metric-value product-name-val">{productsList[0]?.name || 'N/A'}</h3>
            <div className="allproduct-rating-row">
              <span className="stars">★★★★★</span>
              <b>{productsList[0]?.rating || '5.0'}</b> <small>({productsList[0]?.reviews || 0})</small>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="allproduct-table-card">
        {/* Filters and Search Bar */}
        <div className="allproduct-table-filter-bar">
          <div className="allproduct-search-wrapper">
            <FiSearch className="allproduct-search-icon" />
            <input 
              type="text" 
              placeholder="Search by product name, SKU or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="allproduct-filter-dropdowns">
            <div className="allproduct-dropdown-container">
              <button className="allproduct-filter-btn" onClick={() => setShowCategoryDrop(!showCategoryDrop)}>
                {categoryFilter} ▾
              </button>
              {showCategoryDrop && (
                <div className="allproduct-dropdown-menu">
                  {['All Categories', 'Sarees', 'Dupattas', 'Dress Materials', 'Home Textiles', 'Home Decor', 'Stoles', 'Bedspreads', 'Men Wear'].map(cat => (
                    <span key={cat} onClick={() => { setCategoryFilter(cat); setShowCategoryDrop(false); }}>{cat}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="allproduct-dropdown-container">
              <button className="allproduct-filter-btn" onClick={() => setShowCollectionDrop(!showCollectionDrop)}>
                {collectionFilter} ▾
              </button>
              {showCollectionDrop && (
                <div className="allproduct-dropdown-menu">
                  {['All Collections', 'Summer Edit 2025', 'Festive Heritage', 'Handloom Specials'].map(col => (
                    <span key={col} onClick={() => { setCollectionFilter(col); setShowCollectionDrop(false); }}>{col}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="allproduct-dropdown-container">
              <button className="allproduct-filter-btn" onClick={() => setShowBrandDrop(!showBrandDrop)}>
                {brandFilter} ▾
              </button>
              {showBrandDrop && (
                <div className="allproduct-dropdown-menu">
                  {['All Brands', 'Varanasi Weaves', 'Kanchipuram Artisans', 'Bengal Handloom', 'Ikat Hub'].map(brand => (
                    <span key={brand} onClick={() => { setBrandFilter(brand); setShowBrandDrop(false); }}>{brand}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="allproduct-dropdown-container">
              <button className="allproduct-filter-btn" onClick={() => setShowStatusDrop(!showStatusDrop)}>
                {statusFilter} ▾
              </button>
              {showStatusDrop && (
                <div className="allproduct-dropdown-menu">
                  {['Status: All', 'Status: Active', 'Status: Out of Stock'].map(st => (
                    <span key={st} onClick={() => { setStatusFilter(st); setShowStatusDrop(false); }}>{st}</span>
                  ))}
                </div>
              )}
            </div>

            <button className="allproduct-export-btn" onClick={handleExportReport}>
              <FiDownload /> Export
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="allproduct-table-responsive">
          <table className="allproduct-data-table">
            <thead>
              <tr>
                <th style={{ width: '30px' }}>
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll} 
                    checked={currentItems.length > 0 && selectedProducts.length === currentItems.length}
                  />
                </th>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '30px' }}>Loading products...</td>
                </tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedProducts.includes(product._id)}
                        onChange={() => handleSelectOne(product._id)}
                      />
                    </td>
                    <td className="allproduct-product-cell">
                      <img src={product.image} alt={product.name} />
                      <div className="product-info-text">
                        <b>{product.name}</b>
                        <span>{product.desc}</span>
                      </div>
                    </td>
                    <td className="sku-cell">{product.sku}</td>
                    <td>
                      <span className="allproduct-category-badge">{product.category}</span>
                    </td>
                    <td className="price-cell">₹{product.price?.toLocaleString('en-IN')}</td>
                    <td>
                      <span className={`stock-val ${product.stock === 0 ? 'out' : ''}`}>{product.stock}</span>
                    </td>
                    <td>
                      <span className={`allproduct-status-pill ${product.status === 'Active' ? 'active' : 'out-of-stock'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <div className="allproduct-table-rating">
                        <span>★★★★★</span>
                        <b>{product.rating}</b>
                        <small>({product.reviews})</small>
                      </div>
                    </td>
                    <td>
                      <div className="allproduct-actions-cell">
                        <button className="action-icon-btn" onClick={() => handleEdit(product)} title="Edit"><FiEdit2 /></button>
                        <button 
                          className="action-icon-btn delete-btn" 
                          onClick={() => openDeleteModal(product)} 
                          title="Remove Product"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: '#7d6e65' }}>
                    No products found matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="allproduct-pagination-footer">
          <span>Showing {filteredProducts.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products</span>
          
          <div className="allproduct-pagination-controls-wrapper">
            <div className="allproduct-pagination-controls">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <FiChevronLeft />
              </button>
              {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                <button 
                  key={i + 1}
                  className={currentPage === i + 1 ? 'active' : ''}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <FiChevronRight />
              </button>
            </div>

            <div className="allproduct-per-page-selector">
              <span>Per Page:</span>
              <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={8}>8</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {showModal && (
        <div className="allproduct-modal-overlay">
          <div className="allproduct-modal-content">
            <div className="allproduct-modal-header">
              <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={closeModal}><FiX /></button>
            </div>
            <form onSubmit={handleSubmitProduct} className="allproduct-modal-form">
              <div className="allproduct-form-group">
                <label>Product Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Kanchipuram Silk Saree" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>

              <div className="allproduct-form-group">
                <label>Description</label>
                <input 
                  type="text" 
                  placeholder="Short description" 
                  value={formData.desc}
                  onChange={(e) => setFormData({...formData, desc: e.target.value})}
                />
              </div>

              <div className="allproduct-form-row">
                <div className="allproduct-form-group">
                  <label>Category *</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Sarees">Sarees</option>
                    <option value="Dupattas">Dupattas</option>
                    <option value="Dress Materials">Dress Materials</option>
                    <option value="Home Textiles">Home Textiles</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Stoles">Stoles</option>
                  </select>
                </div>
                <div className="allproduct-form-group">
                  <label>SKU Code</label>
                  <input 
                    type="text" 
                    placeholder="Auto-generated if empty" 
                    value={formData.sku}
                    onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  />
                </div>
              </div>

              <div className="allproduct-form-row">
                <div className="allproduct-form-group">
                  <label>Price (₹) *</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 2499" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required 
                  />
                </div>
                <div className="allproduct-form-group">
                  <label>Stock Quantity</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 50" 
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  />
                </div>
              </div>

              <div className="allproduct-modal-actions">
                <button type="button" className="allproduct-cancel-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="allproduct-submit-btn">{isEditing ? 'Update Product' : 'Save Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Remove / Delete Confirmation Modal */}
      {showDeleteModal && productToDelete && (
        <div className="allproduct-modal-overlay">
          <div className="allproduct-modal-content delete-modal">
            <div className="delete-modal-icon-wrapper">
              <FiAlertTriangle className="delete-warning-icon" />
            </div>
            <h2 className="delete-modal-title">Remove Product?</h2>
            <p className="delete-modal-desc">
              Are you sure you want to remove <strong>"{productToDelete.name}"</strong>? This action cannot be undone.
            </p>
            <div className="allproduct-modal-actions">
              <button 
                type="button" 
                className="allproduct-cancel-btn" 
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="allproduct-confirm-delete-btn" 
                onClick={confirmDelete}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProduct;