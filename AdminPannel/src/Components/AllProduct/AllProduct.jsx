// AllProduct.jsx
import React, { useState } from 'react';
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
  FiMoreVertical,
  FiCheck,
  FiAlertTriangle
} from 'react-icons/fi';
import './AllProduct.css';

const AllProduct = () => {
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

  // Products Data State
  const [productsList, setProductsList] = useState([
    { id: 1, name: 'Handloom Silk Saree', desc: 'Premium quality silk saree', sku: 'SKU12345', category: 'Sarees', price: '₹2,499', stock: 50, status: 'Active', rating: 4.8, reviews: 324, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&auto=format&fit=crop&q=80' },
    { id: 2, name: 'Cotton Handloom Dupatta', desc: 'Pure cotton handloom dupatta', sku: 'SKU12346', category: 'Dupattas', price: '₹899', stock: 30, status: 'Active', rating: 4.7, reviews: 210, image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=100&auto=format&fit=crop&q=80' },
    { id: 3, name: 'Ikat Dress Material', desc: 'Premium ikat cotton material', sku: 'SKU12347', category: 'Dress Materials', price: '₹1,299', stock: 75, status: 'Active', rating: 4.6, reviews: 178, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100&auto=format&fit=crop&q=80' },
    { id: 4, name: 'Handwoven Table Runner', desc: 'Elegant handwoven runner', sku: 'SKU12348', category: 'Home Textiles', price: '₹699', stock: 20, status: 'Active', rating: 4.5, reviews: 126, image: 'https://images.unsplash.com/photo-1590736963159-1c0c327220d5?w=100&auto=format&fit=crop&q=80' },
    { id: 5, name: 'Cotton Cushion Cover', desc: 'Handloom cotton cushion cover', sku: 'SKU12349', category: 'Home Decor', price: '₹499', stock: 0, status: 'Out of Stock', rating: 4.4, reviews: 98, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=100&auto=format&fit=crop&q=80' },
    { id: 6, name: 'Handloom Cotton Stole', desc: 'Soft & comfortable stole', sku: 'SKU12350', category: 'Stoles', price: '₹599', stock: 15, status: 'Active', rating: 4.3, reviews: 87, image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=100&auto=format&fit=crop&q=80' },
    { id: 7, name: 'Handloom Bedspread', desc: 'King size handloom bedspread', sku: 'SKU12351', category: 'Bedspreads', price: '₹1,899', stock: 10, status: 'Active', rating: 4.2, reviews: 65, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=100&auto=format&fit=crop&q=80' },
    { id: 8, name: 'Handloom Cotton Kurta', desc: "Men's handloom cotton kurta", sku: 'SKU12352', category: 'Men Wear', price: '₹1,199', stock: 22, status: 'Active', rating: 4.1, reviews: 54, image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=100&auto=format&fit=crop&q=80' }
  ]);

  // Selected checkboxes state
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  // Modal State for "Add New Product"
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    desc: '',
    sku: '',
    category: 'Sarees',
    price: '',
    stock: '',
    status: 'Active'
  });

  // Modal State for "Delete Confirmation"
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Handle Select All Checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(currentItems.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  // Handle Individual Checkbox
  const handleSelectOne = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(item => item !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  // Open Delete Confirmation Modal
  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  // Confirm Delete Product
  const confirmDelete = () => {
    if (productToDelete) {
      setProductsList(productsList.filter(p => p.id !== productToDelete.id));
      setSelectedProducts(selectedProducts.filter(item => item !== productToDelete.id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  // Handle Edit Product (loads into add modal for simplicity)
  const handleEdit = (product) => {
    setNewProduct({
      name: product.name,
      desc: product.desc,
      sku: product.sku,
      category: product.category,
      price: product.price.replace('₹', '').replace(',', ''),
      stock: product.stock,
      status: product.status
    });
    setShowAddModal(true);
  };

  // Handle Add New Product Submit
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const formattedProduct = {
      id: Date.now(),
      name: newProduct.name,
      desc: newProduct.desc || 'Handloom artisan product',
      sku: newProduct.sku || `SKU${Math.floor(10000 + Math.random() * 90000)}`,
      category: newProduct.category,
      price: `₹${Number(newProduct.price).toLocaleString('en-IN')}`,
      stock: Number(newProduct.stock) || 10,
      status: newProduct.status,
      rating: 4.5,
      reviews: 12,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&auto=format&fit=crop&q=80'
    };

    setProductsList([formattedProduct, ...productsList]);
    setNewProduct({ name: '', desc: '', sku: '', category: 'Sarees', price: '', stock: '', status: 'Active' });
    setShowAddModal(false);
  };

  // Filter Logic
  const filteredProducts = productsList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'Status: All' || product.status === statusFilter.replace('Status: ', '');
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / perPage) || 1;
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Export / Download Report Function
  const handleExportReport = () => {
    const reportText = productsList.map(p => 
      `Name: ${p.name} | SKU: ${p.sku} | Category: ${p.category} | Price: ${p.price} | Stock: ${p.stock} | Status: ${p.status} | Rating: ${p.rating}`
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

          {/* Add New Product Header Button */}
          <button 
            className="allproduct-add-btn"
            onClick={() => setShowAddModal(true)}
          >
            <FiPlus className="allproduct-icon" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Top 4 Summary Cards Grid */}
      <div className="allproduct-metrics-grid">
        <div className="allproduct-metric-card">
          <div className="allproduct-metric-icon-box pink">
            <FiBox />
          </div>
          <div className="allproduct-metric-content">
            <span className="allproduct-metric-title">Total Products</span>
            <h3 className="allproduct-metric-value">1,248</h3>
            <span className="allproduct-metric-sub">Active Products<br /><b>1,125</b></span>
          </div>
        </div>

        <div className="allproduct-metric-card">
          <div className="allproduct-metric-icon-box green">
            <FiTag />
          </div>
          <div className="allproduct-metric-content">
            <span className="allproduct-metric-title">Out of Stock</span>
            <h3 className="allproduct-metric-value">45</h3>
            <span className="allproduct-metric-sub">Low Stock<br /><b>78</b></span>
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
            <h3 className="allproduct-metric-value product-name-val">Handloom Silk Saree</h3>
            <div className="allproduct-rating-row">
              <span className="stars">★★★★★</span>
              <b>4.8</b> <small>(324)</small>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card Section */}
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
            {/* Category Dropdown */}
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

            {/* Collections Dropdown */}
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

            {/* Brands Dropdown */}
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

            {/* Status Dropdown */}
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

            <button className="allproduct-filter-icon-btn">
              <FiFilter /> Filter
            </button>

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
              {currentItems.length > 0 ? (
                currentItems.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectOne(product.id)}
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
                    <td className="price-cell">{product.price}</td>
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
                        <button className="action-icon-btn" title="View"><FiEye /></button>
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
              {totalPages > 5 && <span>...</span>}
              {totalPages > 5 && (
                <button 
                  className={currentPage === totalPages ? 'active' : ''}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              )}
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

      {/* Bottom Heritage Banner */}
      <div className="allproduct-banner-card">
        <div className="allproduct-banner-content">
          <div className="allproduct-banner-text">
            <h3>We weave tradition, you sell heritage.</h3>
            <p>Add new products and bring the magic of handloom to more lives.</p>
            <div className="allproduct-ornament-divider"></div>
          </div>
          <div className="allproduct-banner-img-wrapper">
            <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=80" alt="Handloom Banner" />
          </div>
        </div>
      </div>

      {/* Add New Product Modal Popup */}
      {showAddModal && (
        <div className="allproduct-modal-overlay">
          <div className="allproduct-modal-content">
            <div className="allproduct-modal-header">
              <h2>Add New Product</h2>
              <button onClick={() => setShowAddModal(false)}><FiX /></button>
            </div>
            <form onSubmit={handleAddProductSubmit} className="allproduct-modal-form">
              <div className="allproduct-form-group">
                <label>Product Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Kanchipuram Silk Saree" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  required 
                />
              </div>

              <div className="allproduct-form-group">
                <label>Description</label>
                <input 
                  type="text" 
                  placeholder="Short description" 
                  value={newProduct.desc}
                  onChange={(e) => setNewProduct({...newProduct, desc: e.target.value})}
                />
              </div>

              <div className="allproduct-form-row">
                <div className="allproduct-form-group">
                  <label>Category *</label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
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
                    placeholder="e.g. SKU99881" 
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                  />
                </div>
              </div>

              <div className="allproduct-form-row">
                <div className="allproduct-form-group">
                  <label>Price (₹) *</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 2499" 
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    required 
                  />
                </div>
                <div className="allproduct-form-group">
                  <label>Stock Quantity</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 50" 
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  />
                </div>
              </div>

              <div className="allproduct-modal-actions">
                <button type="button" className="allproduct-cancel-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="allproduct-submit-btn">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Remove / Delete Confirmation Modal Popup */}
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