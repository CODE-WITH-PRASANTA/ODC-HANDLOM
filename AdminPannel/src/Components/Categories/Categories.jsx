import React, { useState } from 'react';
import './Categories.css';
import {
  FiSearch,
  FiChevronDown,
  FiChevronRight,
  FiFolder,
  FiTag,
  FiUploadCloud,
  FiPlus,
  FiTrash2,
  FiMoreHorizontal,
  FiSave,
  FiX,
  FiDownload
} from 'react-icons/fi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Categories = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeStatus, setActiveStatus] = useState('Active');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Tree collapse state
  const [expandedNodes, setExpandedNodes] = useState({
    Men: true,
    Women: true,
    Accessories: false,
    Footwear: false,
    HomeLiving: false,
    Sales: false,
  });

  const categoryData = [
    { id: 1, name: 'Men', products: 120, status: 'Active', createdAt: 'May 12, 2024', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60' },
    { id: 2, name: 'Women', products: 95, status: 'Active', createdAt: 'May 10, 2024', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60' },
    { id: 3, name: 'Accessories', products: 54, status: 'Active', createdAt: 'May 09, 2024', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&auto=format&fit=crop&q=60' },
    { id: 4, name: 'Footwear', products: 38, status: 'Active', createdAt: 'May 11, 2024', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&auto=format&fit=crop&q=60' },
    { id: 5, name: 'Home & Living', products: 16, status: 'Active', createdAt: 'May 12, 2024', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=100&auto=format&fit=crop&q=60' },
    { id: 6, name: 'Sales', products: 0, status: 'Inactive', createdAt: 'May 13, 2024', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=100&auto=format&fit=crop&q=60' },
  ];

  const toggleModal = () => setShowAddModal(!showAddModal);

  const toggleTreeNode = (nodeKey) => {
    setExpandedNodes(prev => ({ ...prev, [nodeKey]: !prev[nodeKey] }));
  };

  // Chart configuration matching exact design colors
  const chartData = {
    labels: ['Men', 'Women', 'Accessories', 'Footwear', 'Others'],
    datasets: [
      {
        data: [33.33, 22.22, 16.67, 11.11, 16.67],
        backgroundColor: [
          '#D32F2F', // Men (Red)
          '#FFC107', // Women (Yellow)
          '#2E7D32', // Accessories (Green)
          '#AB47BC', // Footwear (Purple)
          '#5C6BC0', // Others (Blue)
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${context.parsed}%`,
        },
      },
    },
    maintainAspectRatio: false,
  };

  const filteredCategories = categoryData.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* Main Content Area */}
      <main className="main-content">
        {/* Page Title & Main Actions */}
        <div className="page-header">
          <div className="page-title-group">
            <h1>Categories</h1>
            <p>Manage your product categories and organize your store structure.</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary" onClick={toggleModal}>
              <FiPlus /> Add Category
            </button>
            <button className="btn btn-secondary">
              <FiDownload /> Export
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-bg">
              <FiTag />
            </div>
            <div className="stat-info">
              <span className="stat-label">Total Categories</span>
              <h2 className="stat-value">18</h2>
              <span className="stat-subtext">+2 this week added</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-bg">
              <FiFolder />
            </div>
            <div className="stat-info">
              <span className="stat-label">Active Categories</span>
              <h2 className="stat-value">15</h2>
              <span className="stat-subtext">+3 this week active</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-bg">
              <FiFolder />
            </div>
            <div className="stat-info">
              <span className="stat-label">Inactive Categories</span>
              <h2 className="stat-value">245</h2>
              <span className="stat-subtext">+8 this week inactive</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-bg">
              <FiFolder />
            </div>
            <div className="stat-info">
              <span className="stat-label">Total Subcategories</span>
              <h2 className="stat-value text-medium">No sub-categories</h2>
              <span className="stat-subtext">+0 this week</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-bg">
              <FiTag />
            </div>
            <div className="stat-info">
              <span className="stat-label">Products in Categories</span>
              <h2 className="stat-value">3</h2>
              <span className="stat-subtext">+1 this week product</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="content-grid">
          {/* Left Side: Table Area */}
          <div className="table-card">
            <div className="table-toolbar">
              <div className="dropdown-filter">
                <select defaultValue="All Categories">
                  <option>All Categories</option>
                </select>
                <FiChevronDown className="select-arrow" />
              </div>
              <div className="table-search">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search Category here..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="table-wrapper">
              <table className="categories-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>#</th>
                    <th>Category</th>
                    <th>Products</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th style={{ textAlign: 'right', paddingRight: '20px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((item, idx) => (
                    <tr key={item.id}>
                      <td>{idx + 1}</td>
                      <td>
                        <div className="category-cell">
                          <img src={item.img} alt={item.name} className="cat-thumb" />
                          <span className="cat-name">{item.name}</span>
                        </div>
                      </td>
                      <td>{item.products}</td>
                      <td>
                        <span className={`status-badge ${item.status.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>{item.createdAt}</td>
                      <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                        <button className="action-dots-btn">
                          <FiMoreHorizontal />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination-wrapper">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn next"><FiChevronRight /></button>
            </div>
          </div>

          {/* Right Side Cards */}
          <div className="sidebar-cards">
            {/* Category Tree */}
            <div className="card category-tree-card">
              <h3 className="card-title">Category Tree</h3>
              <div className="tree-container">
                <div className="tree-header-item">All Categories</div>
                <div className="tree-root">
                  {/* Men Node */}
                  <div className="tree-node">
                    <div className="tree-item" onClick={() => toggleTreeNode('Men')}>
                      {expandedNodes.Men ? <FiChevronDown className="tree-arrow" /> : <FiChevronRight className="tree-arrow" />}
                      <FiFolder className="folder-icon" />
                      <span>Men</span>
                    </div>
                    {expandedNodes.Men && (
                      <div className="tree-children">
                        <div className="tree-subitem"><FiFolder className="folder-icon" /> Top Wear</div>
                        <div className="tree-subitem"><FiFolder className="folder-icon" /> Bottom Wear</div>
                        <div className="tree-subitem"><FiFolder className="folder-icon" /> Accessories</div>
                      </div>
                    )}
                  </div>

                  {/* Women Node */}
                  <div className="tree-node">
                    <div className="tree-item" onClick={() => toggleTreeNode('Women')}>
                      {expandedNodes.Women ? <FiChevronDown className="tree-arrow" /> : <FiChevronRight className="tree-arrow" />}
                      <FiFolder className="folder-icon" />
                      <span>Women</span>
                    </div>
                    {expandedNodes.Women && (
                      <div className="tree-children">
                        <div className="tree-subitem"><FiFolder className="folder-icon" /> Top Wear</div>
                        <div className="tree-subitem"><FiFolder className="folder-icon" /> Dresses</div>
                        <div className="tree-subitem"><FiFolder className="folder-icon" /> Accessories</div>
                      </div>
                    )}
                  </div>

                  {/* Closed Nodes */}
                  {['Accessories', 'Footwear', 'Home & Living', 'Sales'].map((node) => (
                    <div className="tree-node" key={node}>
                      <div className="tree-item" onClick={() => toggleTreeNode(node)}>
                        <FiChevronRight className="tree-arrow" />
                        <FiFolder className="folder-icon" />
                        <span>{node}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Overview & Quick Actions) */}
            <div className="right-subcolumn">
              {/* Category Overview */}
              <div className="card category-overview-card">
                <h3 className="card-title">Category Overview</h3>
                <div className="overview-content">
                  <div className="donut-chart-container">
                    <Doughnut data={chartData} options={chartOptions} />
                    <div className="chart-center-text">
                      <span className="total-count">18</span>
                      <span className="total-text">Total</span>
                    </div>
                  </div>

                  <div className="chart-legend-list">
                    <div className="legend-item">
                      <span className="dot dot-men"></span>
                      <span className="legend-label">Men</span>
                      <span className="legend-value">33.33%</span>
                    </div>
                    <div className="legend-item">
                      <span className="dot dot-women"></span>
                      <span className="legend-label">Women</span>
                      <span className="legend-value">22.22%</span>
                    </div>
                    <div className="legend-item">
                      <span className="dot dot-acc"></span>
                      <span className="legend-label">Accessories</span>
                      <span className="legend-value">16.67%</span>
                    </div>
                    <div className="legend-item">
                      <span className="dot dot-footwear"></span>
                      <span className="legend-label">Footwear</span>
                      <span className="legend-value">11.11%</span>
                    </div>
                    <div className="legend-item">
                      <span className="dot dot-others"></span>
                      <span className="legend-label">Others</span>
                      <span className="legend-value">16.67%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card quick-actions-card">
                <h3 className="card-title">Quick Actions</h3>
                <div className="quick-actions-grid">
                  <button className="action-box add" onClick={toggleModal}>
                    <div className="box-icon"><FiPlus /></div>
                    <span>Add Category</span>
                  </button>
                  <button className="action-box remove">
                    <div className="box-icon"><FiTrash2 /></div>
                    <span>Remove</span>
                  </button>
                  <button className="action-box import">
                    <div className="box-icon"><FiUploadCloud /></div>
                    <span>Import Categories</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Category Modal Popup */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={toggleModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrapper">
                <div className="modal-icon-bg">
                  <FiTag />
                </div>
                <div>
                  <h2>Add Category</h2>
                  <p>Create a new product category to organize your store.</p>
                </div>
              </div>
              <button className="modal-close-btn" onClick={toggleModal}>
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              {/* Category Name */}
              <div className="form-group">
                <label>Category Name <span className="required">*</span></label>
                <div className="input-with-icon">
                  <input type="text" placeholder="Enter category name" />
                  <FiFolder className="field-icon" />
                </div>
              </div>

              {/* Parent Category */}
              <div className="form-group">
                <label>Parent Category</label>
                <div className="select-with-icon">
                  <select defaultValue="">
                    <option value="" disabled>Select parent category (optional)</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="accessories">Accessories</option>
                  </select>
                  <FiChevronDown className="field-icon" />
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label>Description</label>
                <div className="textarea-wrapper">
                  <textarea
                    placeholder="Enter category description (optional)"
                    maxLength={200}
                  ></textarea>
                  <span className="char-counter">0 / 200</span>
                </div>
              </div>

              {/* Upload Image */}
              <div className="form-group">
                <label>Category Image</label>
                <div className="upload-dropzone">
                  <FiUploadCloud className="dropzone-icon" />
                  <p className="dropzone-text">
                    <strong>Click to upload</strong> or drag and drop
                  </p>
                  <p className="dropzone-subtext">PNG, JPG or WEBP (Max. 2MB)</p>
                </div>
              </div>

              {/* Status Radio Buttons */}
              <div className="form-group">
                <label>Status <span className="required">*</span></label>
                <div className="status-radio-grid">
                  <label
                    className={`status-card-radio ${activeStatus === 'Active' ? 'active' : ''}`}
                    onClick={() => setActiveStatus('Active')}
                  >
                    <div className="radio-circle">
                      {activeStatus === 'Active' && <div className="radio-inner" />}
                    </div>
                    <div className="radio-details">
                      <span className="radio-title">Active</span>
                      <span className="radio-desc">Category will be visible</span>
                    </div>
                  </label>

                  <label
                    className={`status-card-radio ${activeStatus === 'Inactive' ? 'active' : ''}`}
                    onClick={() => setActiveStatus('Inactive')}
                  >
                    <div className="radio-circle">
                      {activeStatus === 'Inactive' && <div className="radio-inner" />}
                    </div>
                    <div className="radio-details">
                      <span className="radio-title">Inactive</span>
                      <span className="radio-desc">Category will be hidden</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-footer">
              <button className="btn btn-cancel" onClick={toggleModal}>
                Cancel
              </button>
              <button className="btn btn-save" onClick={toggleModal}>
                <FiSave /> Save Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;