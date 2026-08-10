import React, { useState, useMemo } from 'react';
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

// Initial Mock Data
const initialCategories = [
  {
    id: 1,
    name: 'Men',
    description: "Men's fashion and clothing",
    products: 120,
    status: true,
    parent: '',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 2,
    name: 'Women',
    description: "Women's fashion and clothing",
    products: 95,
    status: true,
    parent: '',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 3,
    name: 'Accessories',
    description: 'Bags, watches, and more',
    products: 60,
    status: true,
    parent: '',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 4,
    name: 'Shoes',
    description: 'Men and women shoes',
    products: 80,
    status: true,
    parent: 'Accessories',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 5,
    name: 'Watches',
    description: 'Branded watches collection',
    products: 40,
    status: true,
    parent: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=100'
  }
];

// Initial Tree Structure
const initialCategoryTree = [
  {
    name: 'Men',
    open: true,
    subcategories: ['Shirts', 'T-Shirts', 'Jeans', 'Jackets']
  },
  {
    name: 'Women',
    open: true,
    subcategories: ['Tops', 'Dresses', 'Skirts']
  },
  {
    name: 'Accessories',
    open: true,
    subcategories: ['Bags', 'Watches', 'Shoes']
  }
];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [categoryTree, setCategoryTree] = useState(initialCategoryTree);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Popup Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State (Add / Edit)
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    parent: '',
    description: '',
    image: '',
    status: true
  });

  // Toggle Category Tree Collapse
  const toggleTreeFolder = (index) => {
    setCategoryTree((prev) =>
      prev.map((item, i) => (i === index ? { ...item, open: !item.open } : item))
    );
  };

  // Form Inputs Handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  // Open Add Category Modal
  const handleOpenAddModal = () => {
    handleResetForm();
    setIsModalOpen(true);
  };

  // Save / Update Category
  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a Category Name.');
      return;
    }

    if (editingId) {
      // Edit Existing
      setCategories(
        categories.map((cat) =>
          cat.id === editingId ? { ...cat, ...formData } : cat
        )
      );
    } else {
      // Add New Category
      const newCat = {
        id: Date.now(),
        name: formData.name,
        description: formData.description || 'New category description',
        products: 0,
        status: formData.status,
        parent: formData.parent,
        image:
          formData.image ||
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=100'
      };
      setCategories([...categories, newCat]);
    }

    handleCloseModal();
  };

  // Edit Button Action
  const handleEdit = (category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      parent: category.parent || '',
      description: category.description || '',
      image: category.image || '',
      status: category.status
    });
    setIsModalOpen(true);
  };

  // Delete Action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this category?')) {
      setCategories(categories.filter((cat) => cat.id !== id));
      if (editingId === id) {
        handleCloseModal();
      }
    }
  };

  // Toggle Table Row Status
  const handleToggleStatus = (id) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, status: !cat.status } : cat
      )
    );
  };

  // Reset Form Inputs
  const handleResetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      parent: '',
      description: '',
      image: '',
      status: true
    });
  };

  // Close Modal Action
  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleResetForm();
  };

  // Add Root Category to Tree
  const handleAddRootCategory = () => {
    const name = prompt('Enter Root Category Name:');
    if (name) {
      setCategoryTree((prev) => [...prev, { name, open: true, subcategories: [] }]);
    }
  };

  // Filtered Logic
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchesSearch =
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'All Status' ||
        (statusFilter === 'Active' && cat.status) ||
        (statusFilter === 'Inactive' && !cat.status);

      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, statusFilter]);

  // Pagination Logic
  const totalEntries = filteredCategories.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="cat-container">
      {/* TOP HEADER BAR */}
      <div className="cat-header">
        <div className="cat-title-area">
          <div className="cat-badge">{categories.length}</div>
          <div>
            <h1 className="cat-title">Categories</h1>
            <p className="cat-subtitle">Organize your products into categories.</p>
          </div>
        </div>
        <button className="btn-add-header" onClick={handleOpenAddModal}>
          <Plus size={16} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* TWO COLUMN GRID LAYOUT */}
      <div className="cat-main-grid">
        {/* LEFT COLUMN: CATEGORY TREE */}
        <div className="card cat-left-col">
          <h3 className="card-heading">Category Tree</h3>

          <div className="tree-wrapper">
            {categoryTree.map((item, idx) => (
              <div key={item.name} className="tree-group">
                <div
                  className="tree-parent"
                  onClick={() => toggleTreeFolder(idx)}
                >
                  {item.open ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                  <span>{item.name}</span>
                </div>

                {item.open && (
                  <div className="tree-sub-list">
                    {item.subcategories.map((sub) => (
                      <div key={sub} className="tree-sub-item">
                        <span className="tree-line"></span>
                        <span className="tree-sub-text">{sub}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="btn-add-root" onClick={handleAddRootCategory}>
            <Plus size={14} />
            <span>Add Root Category</span>
          </button>
        </div>

        {/* RIGHT COLUMN: CATEGORIES TABLE */}
        <div className="card cat-center-col">
          {/* SEARCH & FILTER CONTROLS */}
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

          {/* TABLE CONTAINER */}
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
                {currentItems.length > 0 ? (
                  currentItems.map((cat) => (
                    <tr key={cat.id}>
                      {/* Image & Title */}
                      <td>
                        <div className="category-cell">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="cat-thumb"
                          />
                          <span className="cat-name-text">{cat.name}</span>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="cat-desc-text">{cat.description}</td>

                      {/* Products Count */}
                      <td style={{ textAlign: 'center', fontWeight: 500 }}>
                        {cat.products}
                      </td>

                      {/* Status Toggle Switch */}
                      <td style={{ textAlign: 'center' }}>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={cat.status}
                            onChange={() => handleToggleStatus(cat.id)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </td>

                      {/* Action Edit/Delete */}
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
                            onClick={() => handleDelete(cat.id)}
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

          {/* PAGINATION FOOTER */}
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

      {/* POPUP MODAL FOR ADD / EDIT CATEGORY */}
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
              {/* Category Name */}
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

              {/* Parent Category */}
              <div className="form-group">
                <label>Parent Category</label>
                <select
                  name="parent"
                  value={formData.parent}
                  onChange={handleInputChange}
                >
                  <option value="">Select Parent Category</option>
                  {categories
                    .filter((c) => c.id !== editingId)
                    .map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Description */}
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

              {/* Category Image Upload */}
              <div className="form-group">
                <label>Category Image</label>
                <div className="upload-box-wrapper">
                  {formData.image ? (
                    <div className="image-preview-container">
                      <img src={formData.image} alt="Preview" className="uploaded-preview" />
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

              {/* Status Toggle */}
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

              {/* Form Actions Buttons */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  {editingId ? 'Update Category' : 'Save Category'}
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