import React, { useState, useEffect, useRef } from 'react';
import './RecentOrders.css';

const initialOrdersData = [
  {
    id: 'Order - 0-10027C009',
    name: 'Handmade Choker Set',
    date: 'Apr 03, 2023',
    status: 'Delivered',
    amount: '₹ 2,299',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&auto=format&fit=crop&q=80',
    shippingAddress: '123 Heritage Lane, Jaipur, RJ 302001',
    paymentMethod: 'UPI / Google Pay',
  },
  {
    id: 'Order - 0-10027C008',
    name: 'Handloom Banarasi Saree',
    date: 'Apr 02, 2023',
    status: 'Shipped',
    amount: '₹ 3,999',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&auto=format&fit=crop&q=80',
    shippingAddress: '45 Park Street, Kolkata, WB 700016',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'Order - 0-10027C007',
    name: 'Handcrafted Juttis',
    date: 'Mar 30, 2023',
    status: 'Processing',
    amount: '₹ 899',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=100&auto=format&fit=crop&q=80',
    shippingAddress: '88 MG Road, Bengaluru, KA 560001',
    paymentMethod: 'Net Banking',
  },
  {
    id: 'Order - 0-10027C006',
    name: 'Handcrafted Kurta',
    date: 'Mar 28, 2023',
    status: 'Delivered',
    amount: '₹ 1,499',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=100&auto=format&fit=crop&q=80',
    shippingAddress: '12 Ring Road, New Delhi, DL 110011',
    paymentMethod: 'Cash on Delivery',
  },
];

const RecentOrders = () => {
  const [orders, setOrders] = useState(initialOrdersData);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const menuRef = useRef(null);

  // Close open dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleActionMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  // Handlers
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setActiveMenuId(null);
  };

  const handleEditOrder = (order) => {
    setEditingOrder({ ...order });
    setActiveMenuId(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setOrders((prev) =>
      prev.map((o) => (o.id === editingOrder.id ? editingOrder : o))
    );
    setEditingOrder(null);
  };

  const handleDeletePrompt = (order) => {
    setDeleteCandidate(order);
    setActiveMenuId(null);
  };

  const confirmDelete = () => {
    if (deleteCandidate) {
      setOrders((prev) => prev.filter((o) => o.id !== deleteCandidate.id));
      setDeleteCandidate(null);
    }
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setEditingOrder(null);
    setDeleteCandidate(null);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="RecentOrders-container">
      <div className="RecentOrders-card">
        {/* Header */}
        <div className="RecentOrders-header">
          <div className="RecentOrders-title-group">
            <h2 className="RecentOrders-title">Recent Orders</h2>
            <span className="RecentOrders-badge">{orders.length} Orders</span>
          </div>

          <div className="RecentOrders-actions">
            <button
              className="RecentOrders-view-all"
              onClick={() => setShowAllOrders(true)}
            >
              View All Orders <span className="RecentOrders-arrow">&rarr;</span>
            </button>
          </div>
        </div>

        {/* Responsive Desktop Table */}
        <div className="RecentOrders-table-wrapper desktop-only">
          <table className="RecentOrders-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th className="RecentOrders-text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="RecentOrders-product">
                      <img
                        src={order.image}
                        alt={order.name}
                        className="RecentOrders-product-img"
                      />
                      <span className="RecentOrders-product-name">{order.name}</span>
                    </div>
                  </td>
                  <td className="RecentOrders-order-id">{order.id}</td>
                  <td className="RecentOrders-date">{order.date}</td>
                  <td>
                    <span className={`RecentOrders-status status-${order.status.toLowerCase()}`}>
                      <span className="RecentOrders-status-dot"></span>
                      {order.status}
                    </span>
                  </td>
                  <td className="RecentOrders-amount">{order.amount}</td>
                  <td className="RecentOrders-text-right RecentOrders-action-cell">
                    <button
                      className="RecentOrders-btn-menu"
                      onClick={(e) => toggleActionMenu(order.id, e)}
                      title="Actions"
                    >
                      &#8285;
                    </button>
                    {activeMenuId === order.id && (
                      <div className="RecentOrders-dropdown" ref={menuRef}>
                        <button onClick={() => handleViewOrder(order)}>
                          <span className="RecentOrders-icon">&#128065;</span> View
                        </button>
                        <button onClick={() => handleEditOrder(order)}>
                          <span className="RecentOrders-icon">&#9998;</span> Edit
                        </button>
                        <button
                          className="RecentOrders-delete-opt"
                          onClick={() => handleDeletePrompt(order)}
                        >
                          <span className="RecentOrders-icon">&#128465;</span> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet Layout */}
        <div className="RecentOrders-mobile-list mobile-only">
          {orders.map((order) => (
            <div key={order.id} className="RecentOrders-mobile-card">
              <div className="RecentOrders-mobile-header">
                <img
                  src={order.image}
                  alt={order.name}
                  className="RecentOrders-product-img"
                />
                <div className="RecentOrders-mobile-info">
                  <h3 className="RecentOrders-product-name">{order.name}</h3>
                  <span className="RecentOrders-order-id">{order.id}</span>
                </div>
                <span className={`RecentOrders-status status-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="RecentOrders-mobile-body">
                <div>
                  <span className="RecentOrders-mobile-label">Date</span>
                  <span className="RecentOrders-mobile-value">{order.date}</span>
                </div>
                <div>
                  <span className="RecentOrders-mobile-label">Amount</span>
                  <span className="RecentOrders-mobile-value RecentOrders-amount">{order.amount}</span>
                </div>
              </div>

              <div className="RecentOrders-mobile-footer">
                <button
                  className="RecentOrders-btn-action RecentOrders-btn-view-m"
                  onClick={() => handleViewOrder(order)}
                >
                  &#128065; View
                </button>
                <button
                  className="RecentOrders-btn-action RecentOrders-btn-edit-m"
                  onClick={() => handleEditOrder(order)}
                >
                  &#9998; Edit
                </button>
                <button
                  className="RecentOrders-btn-action RecentOrders-btn-delete-m"
                  onClick={() => handleDeletePrompt(order)}
                >
                  &#128465; Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Details Modal */}
      {selectedOrder && (
        <div className="RecentOrders-modal-overlay" onClick={closeModal}>
          <div className="RecentOrders-modal" onClick={(e) => e.stopPropagation()}>
            <div className="RecentOrders-modal-header">
              <h3>Order Details</h3>
              <button className="RecentOrders-modal-close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="RecentOrders-modal-body">
              <div className="RecentOrders-modal-summary">
                <img src={selectedOrder.image} alt={selectedOrder.name} />
                <div>
                  <h4>{selectedOrder.name}</h4>
                  <p className="RecentOrders-modal-order-id">{selectedOrder.id}</p>
                  <span className={`RecentOrders-status status-${selectedOrder.status.toLowerCase()}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <hr className="RecentOrders-modal-divider" />

              <div className="RecentOrders-modal-grid">
                <div className="RecentOrders-detail-item">
                  <label>Order Date</label>
                  <p>{selectedOrder.date}</p>
                </div>
                <div className="RecentOrders-detail-item">
                  <label>Total Amount</label>
                  <p className="RecentOrders-highlight">{selectedOrder.amount}</p>
                </div>
                <div className="RecentOrders-detail-item">
                  <label>Payment Method</label>
                  <p>{selectedOrder.paymentMethod}</p>
                </div>
                <div className="RecentOrders-detail-item RecentOrders-full-col">
                  <label>Shipping Address</label>
                  <p>{selectedOrder.shippingAddress}</p>
                </div>
              </div>
            </div>
            <div className="RecentOrders-modal-footer">
              <button className="RecentOrders-btn-secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="RecentOrders-modal-overlay" onClick={closeModal}>
          <div className="RecentOrders-modal" onClick={(e) => e.stopPropagation()}>
            <div className="RecentOrders-modal-header">
              <h3>Edit Order</h3>
              <button className="RecentOrders-modal-close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="RecentOrders-modal-body">
                <div className="RecentOrders-form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    value={editingOrder.name}
                    onChange={(e) =>
                      setEditingOrder({ ...editingOrder, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="RecentOrders-form-group">
                  <label>Status</label>
                  <select
                    value={editingOrder.status}
                    onChange={(e) =>
                      setEditingOrder({ ...editingOrder, status: e.target.value })
                    }
                  >
                    <option value="Delivered">Delivered</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Processing">Processing</option>
                  </select>
                </div>
                <div className="RecentOrders-form-group">
                  <label>Amount</label>
                  <input
                    type="text"
                    value={editingOrder.amount}
                    onChange={(e) =>
                      setEditingOrder({ ...editingOrder, amount: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="RecentOrders-form-group">
                  <label>Shipping Address</label>
                  <textarea
                    rows="2"
                    value={editingOrder.shippingAddress}
                    onChange={(e) =>
                      setEditingOrder({ ...editingOrder, shippingAddress: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="RecentOrders-modal-footer">
                <button
                  type="button"
                  className="RecentOrders-btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="RecentOrders-btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteCandidate && (
        <div className="RecentOrders-modal-overlay" onClick={closeModal}>
          <div className="RecentOrders-modal RecentOrders-modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="RecentOrders-modal-header">
              <h3>Confirm Delete</h3>
              <button className="RecentOrders-modal-close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="RecentOrders-modal-body">
              <p>Are you sure you want to delete <strong>{deleteCandidate.name}</strong> ({deleteCandidate.id})?</p>
            </div>
            <div className="RecentOrders-modal-footer">
              <button className="RecentOrders-btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="RecentOrders-btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All Orders Database Drawer */}
      {showAllOrders && (
        <div className="RecentOrders-drawer-overlay">
          <div className="RecentOrders-drawer">
            <div className="RecentOrders-drawer-header">
              <h2>All Orders Database</h2>
              <button
                className="RecentOrders-modal-close"
                onClick={() => setShowAllOrders(false)}
              >
                &times;
              </button>
            </div>

            <div className="RecentOrders-drawer-controls">
              <input
                type="text"
                placeholder="Search by Product or Order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="RecentOrders-search-input"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="RecentOrders-filter-select"
              >
                <option value="All">All Statuses</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
                <option value="Processing">Processing</option>
              </select>
            </div>

            <div className="RecentOrders-table-wrapper">
              <table className="RecentOrders-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th className="RecentOrders-text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <div className="RecentOrders-product">
                            <img
                              src={order.image}
                              alt={order.name}
                              className="RecentOrders-product-img"
                            />
                            <span className="RecentOrders-product-name">
                              {order.name}
                            </span>
                          </div>
                        </td>
                        <td className="RecentOrders-order-id">{order.id}</td>
                        <td className="RecentOrders-date">{order.date}</td>
                        <td>
                          <span
                            className={`RecentOrders-status status-${order.status.toLowerCase()}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="RecentOrders-amount">{order.amount}</td>
                        <td className="RecentOrders-text-right RecentOrders-action-cell">
                          <button
                            className="RecentOrders-btn-menu"
                            onClick={(e) => toggleActionMenu(`drawer-${order.id}`, e)}
                          >
                            &#8285;
                          </button>
                          {activeMenuId === `drawer-${order.id}` && (
                            <div className="RecentOrders-dropdown" ref={menuRef}>
                              <button onClick={() => handleViewOrder(order)}>
                                <span className="RecentOrders-icon">&#128065;</span> View
                              </button>
                              <button onClick={() => handleEditOrder(order)}>
                                <span className="RecentOrders-icon">&#9998;</span> Edit
                              </button>
                              <button
                                className="RecentOrders-delete-opt"
                                onClick={() => handleDeletePrompt(order)}
                              >
                                <span className="RecentOrders-icon">&#128465;</span> Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="RecentOrders-text-center RecentOrders-py-4">
                        No orders matching your search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;