import React, { useState, useEffect, useRef } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiChevronDown, 
  FiEye, 
  FiEdit2, 
  FiMoreVertical, 
  FiChevronLeft, 
  FiChevronRight, 
  FiX, 
  FiCheck, 
  FiTrash2, 
  FiPackage, 
  FiTruck, 
  FiClock, 
  FiXCircle, 
  FiRotateCcw,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCreditCard,
  FiCheckCircle
} from 'react-icons/fi';
import './SalesOrder.css';

const initialOrdersData = [
  { 
    id: 1, 
    orderId: '#ORD-1250', 
    customerName: 'Rohit Sharma', 
    email: 'rohitsharma@email.com', 
    phone: '+91 98765 43210', 
    date: '20 May 2025', 
    time: '10:30 AM', 
    channel: 'Online Store', 
    amount: '$129.99', 
    paymentStatus: 'Paid', 
    paymentMethod: 'Credit Card', 
    paymentCardNum: '•••• •••• •••• 4242', 
    status: 'Delivered', 
    itemsCount: 3, 
    itemsSubtotal: '$115.00', 
    shippingCost: '$10.00', 
    taxAmount: '$4.99', 
    discountAmount: '-$10.00',
    shippingAddress: '123, MG Road, Near Metro Station, Bangalore, Karnataka - 560001, India',
    thumbnails: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=100&q=80'
    ],
    timeline: [
      { title: 'Order Placed', date: '20 May 2025, 10:30 AM', completed: true },
      { title: 'Payment Confirmed', date: '20 May 2025, 10:31 AM', completed: true },
      { title: 'Order Packed', date: '20 May 2025, 02:15 PM', completed: true },
      { title: 'Order Delivered', date: '22 May 2025, 11:45 AM', completed: true }
    ]
  },
  { 
    id: 2, 
    orderId: '#ORD-1249', 
    customerName: 'Priya Patel', 
    email: 'priyapatel@email.com', 
    phone: '+91 91234 56789', 
    date: '20 May 2025', 
    time: '09:15 AM', 
    channel: 'Mobile App', 
    amount: '$89.50', 
    paymentStatus: 'Paid', 
    paymentMethod: 'UPI', 
    paymentCardNum: 'priya@upi', 
    status: 'Processing', 
    itemsCount: 2, 
    itemsSubtotal: '$79.50', 
    shippingCost: '$10.00', 
    taxAmount: '$0.00', 
    discountAmount: '$0.00',
    shippingAddress: '45, Park Street, Kolkata, West Bengal - 700016, India',
    thumbnails: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
    ],
    timeline: [
      { title: 'Order Placed', date: '20 May 2025, 09:15 AM', completed: true },
      { title: 'Payment Confirmed', date: '20 May 2025, 09:16 AM', completed: true },
      { title: 'Order Packed', date: 'Processing...', completed: false },
      { title: 'Order Delivered', date: 'Pending', completed: false }
    ]
  },
  { 
    id: 3, 
    orderId: '#ORD-1248', 
    customerName: 'Amit Kumar', 
    email: 'amitkumar@email.com', 
    phone: '+91 99887 76655', 
    date: '19 May 2025', 
    time: '08:45 PM', 
    channel: 'Online Store', 
    amount: '$249.00', 
    paymentStatus: 'Paid', 
    paymentMethod: 'Net Banking', 
    paymentCardNum: 'HDFC Bank •••• 5521', 
    status: 'Delivered', 
    itemsCount: 4, 
    itemsSubtotal: '$229.00', 
    shippingCost: '$15.00', 
    taxAmount: '$5.00', 
    discountAmount: '$0.00',
    shippingAddress: '78, Connaught Place, New Delhi, Delhi - 110001, India',
    thumbnails: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80'
    ],
    timeline: [
      { title: 'Order Placed', date: '19 May 2025, 08:45 PM', completed: true },
      { title: 'Payment Confirmed', date: '19 May 2025, 08:46 PM', completed: true },
      { title: 'Order Packed', date: '20 May 2025, 10:00 AM', completed: true },
      { title: 'Order Delivered', date: '21 May 2025, 01:00 PM', completed: true }
    ]
  },
  { 
    id: 4, 
    orderId: '#ORD-1247', 
    customerName: 'Sneha Reddy', 
    email: 'sneha.reddy@email.com', 
    phone: '+91 90000 11122', 
    date: '19 May 2025', 
    time: '06:20 PM', 
    channel: 'POS Store', 
    amount: '$59.99', 
    paymentStatus: 'COD', 
    paymentMethod: 'Cash on Delivery', 
    paymentCardNum: 'Cash Payment', 
    status: 'Pending', 
    itemsCount: 2, 
    itemsSubtotal: '$59.99', 
    shippingCost: '$0.00', 
    taxAmount: '$0.00', 
    discountAmount: '$0.00',
    shippingAddress: '12, Banjara Hills, Hyderabad, Telangana - 500034, India',
    thumbnails: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
    ],
    timeline: [
      { title: 'Order Placed', date: '19 May 2025, 06:20 PM', completed: true },
      { title: 'Payment Confirmed', date: 'Pending COD', completed: false },
      { title: 'Order Packed', date: 'Pending', completed: false },
      { title: 'Order Delivered', date: 'Pending', completed: false }
    ]
  },
  { 
    id: 5, 
    orderId: '#ORD-1246', 
    customerName: 'Vikram Singh', 
    email: 'vikramsingh@email.com', 
    phone: '+91 87654 32100', 
    date: '18 May 2025', 
    time: '04:10 PM', 
    channel: 'Online Store', 
    amount: '$120.00', 
    paymentStatus: 'Paid', 
    paymentMethod: 'Credit Card', 
    paymentCardNum: '•••• •••• •••• 9812', 
    status: 'Shipped', 
    itemsCount: 3, 
    itemsSubtotal: '$105.00', 
    shippingCost: '$15.00', 
    taxAmount: '$0.00', 
    discountAmount: '$0.00',
    shippingAddress: '56, FC Road, Pune, Maharashtra - 411004, India',
    thumbnails: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
    ],
    timeline: [
      { title: 'Order Placed', date: '18 May 2025, 04:10 PM', completed: true },
      { title: 'Payment Confirmed', date: '18 May 2025, 04:12 PM', completed: true },
      { title: 'Order Packed', date: '19 May 2025, 11:00 AM', completed: true },
      { title: 'Order Delivered', date: 'In Transit', completed: false }
    ]
  },
  { 
    id: 6, 
    orderId: '#ORD-1245', 
    customerName: 'Neha Gupta', 
    email: 'nehagupta@email.com', 
    phone: '+91 90909 87654', 
    date: '18 May 2025', 
    time: '01:30 PM', 
    channel: 'Mobile App', 
    amount: '$70.00', 
    paymentStatus: 'Paid', 
    paymentMethod: 'UPI', 
    paymentCardNum: 'neha@ybl', 
    status: 'Delivered', 
    itemsCount: 2, 
    itemsSubtotal: '$60.00', 
    shippingCost: '$10.00', 
    taxAmount: '$0.00', 
    discountAmount: '$0.00',
    shippingAddress: '90, MI Road, Jaipur, Rajasthan - 302001, India',
    thumbnails: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'
    ],
    timeline: [
      { title: 'Order Placed', date: '18 May 2025, 01:30 PM', completed: true },
      { title: 'Payment Confirmed', date: '18 May 2025, 01:31 PM', completed: true },
      { title: 'Order Packed', date: '18 May 2025, 04:00 PM', completed: true },
      { title: 'Order Delivered', date: '20 May 2025, 10:00 AM', completed: true }
    ]
  },
  { 
    id: 7, 
    orderId: '#ORD-1244', 
    customerName: 'Arjun Mehta', 
    email: 'arjunmehta@email.com', 
    phone: '+91 78945 61234', 
    date: '17 May 2025', 
    time: '11:15 AM', 
    channel: 'Online Store', 
    amount: '$199.99', 
    paymentStatus: 'Paid', 
    paymentMethod: 'Net Banking', 
    paymentCardNum: 'ICICI Bank •••• 1109', 
    status: 'Cancelled', 
    itemsCount: 1, 
    itemsSubtotal: '$189.99', 
    shippingCost: '$10.00', 
    taxAmount: '$0.00', 
    discountAmount: '$0.00',
    shippingAddress: '34, SG Highway, Ahmedabad, Gujarat - 380054, India',
    thumbnails: [
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80'
    ],
    timeline: [
      { title: 'Order Placed', date: '17 May 2025, 11:15 AM', completed: true },
      { title: 'Payment Confirmed', date: '17 May 2025, 11:16 AM', completed: true },
      { title: 'Order Cancelled', date: '17 May 2025, 02:00 PM', completed: true }
    ]
  },
  { 
    id: 8, 
    orderId: '#ORD-1243', 
    customerName: 'Kavya Nair', 
    email: 'kavya.nair@email.com', 
    phone: '+91 81234 56780', 
    date: '17 May 2025', 
    time: '09:05 AM', 
    channel: 'Mobile App', 
    amount: '$45.50', 
    paymentStatus: 'Refunded', 
    paymentMethod: 'UPI', 
    paymentCardNum: 'kavya@paytm', 
    status: 'Returned', 
    itemsCount: 1, 
    itemsSubtotal: '$45.50', 
    shippingCost: '$0.00', 
    taxAmount: '$0.00', 
    discountAmount: '$0.00',
    shippingAddress: '18, MG Road, Kochi, Kerala - 682016, India',
    thumbnails: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80'
    ],
    timeline: [
      { title: 'Order Delivered', date: '19 May 2025', completed: true },
      { title: 'Return Requested', date: '20 May 2025', completed: true },
      { title: 'Refund Processed', date: '21 May 2025', completed: true }
    ]
  },
  { 
    id: 9, 
    orderId: '#ORD-1242', 
    customerName: 'Manish Verma', 
    email: 'manishverma@email.com', 
    phone: '+91 99876 54321', 
    date: '16 May 2025', 
    time: '07:45 PM', 
    channel: 'Online Store', 
    amount: '$299.00', 
    paymentStatus: 'Paid', 
    paymentMethod: 'Credit Card', 
    paymentCardNum: '•••• •••• •••• 1234', 
    status: 'Delivered', 
    itemsCount: 5, 
    itemsSubtotal: '$284.00', 
    shippingCost: '$15.00', 
    taxAmount: '$0.00', 
    discountAmount: '$0.00',
    shippingAddress: '22, Mall Road, Kanpur, Uttar Pradesh - 208001, India',
    thumbnails: [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'
    ],
    timeline: [
      { title: 'Order Placed', date: '16 May 2025, 07:45 PM', completed: true },
      { title: 'Payment Confirmed', date: '16 May 2025, 07:46 PM', completed: true },
      { title: 'Order Delivered', date: '18 May 2025, 12:30 PM', completed: true }
    ]
  },
  { 
    id: 10, 
    orderId: '#ORD-1241', 
    customerName: 'Pooja Shah', 
    email: 'poojashah@email.com', 
    phone: '+91 93456 78901', 
    date: '16 May 2025', 
    time: '05:20 PM', 
    channel: 'POS Store', 
    amount: '$32.99', 
    paymentStatus: 'COD', 
    paymentMethod: 'Cash on Delivery', 
    paymentCardNum: 'Cash Payment', 
    status: 'Pending', 
    itemsCount: 1, 
    itemsSubtotal: '$32.99', 
    shippingCost: '$0.00', 
    taxAmount: '$0.00', 
    discountAmount: '$0.00',
    shippingAddress: '67, Satellite Road, Surat, Gujarat - 395007, India',
    thumbnails: [
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80'
    ],
    timeline: [
      { title: 'Order Placed', date: '16 May 2025, 05:20 PM', completed: true },
      { title: 'Pending Fulfillment', date: '16 May 2025', completed: false }
    ]
  }
];

const SalesOrder = () => {
  const [orders, setOrders] = useState(initialOrdersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [paymentFilter, setPaymentFilter] = useState('All Payment');
  const [channelFilter, setChannelFilter] = useState('All Channel');

  const [selectedOrder, setSelectedOrder] = useState(orders[0]); // Default first item selected like screenshot
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // Bulk Actions Popup Modal State
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkActionType, setBulkActionType] = useState('Update Status');
  const [bulkStatusValue, setBulkStatusValue] = useState('Delivered');
  const [bulkNote, setBulkNote] = useState('');

  const menuRef = useRef(null);

  // Click outside to close action menu dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter Logic
  const filteredOrders = orders.filter((item) => {
    const matchesSearch = 
      item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
    const matchesPayment = paymentFilter === 'All Payment' || item.paymentStatus === paymentFilter;
    const matchesChannel = channelFilter === 'All Channel' || item.channel === channelFilter;

    return matchesSearch && matchesStatus && matchesPayment && matchesChannel;
  });

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage) || 1;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredOrders.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false);
      setSelectedRows([]);
    } else {
      setSelectAll(true);
      setSelectedRows(currentRows.map(o => o.id));
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rId => rId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Export CSV Action
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Order ID,Customer Name,Email,Phone,Date,Channel,Amount,Payment Status,Status"]
      .concat(filteredOrders.map(o => `${o.orderId},${o.customerName},${o.email},${o.phone},${o.date},${o.channel},${o.amount},${o.paymentStatus},${o.status}`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_orders_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Edit Modal triggers
  const handleOpenEdit = (order, e) => {
    e.stopPropagation();
    setEditingOrder({ ...order });
    setShowEditModal(true);
    setActiveMenuId(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setOrders(orders.map(o => o.id === editingOrder.id ? editingOrder : o));
    if (selectedOrder && selectedOrder.id === editingOrder.id) {
      setSelectedOrder(editingOrder);
    }
    setShowEditModal(false);
    setEditingOrder(null);
  };

  // Single Action Menu Handlers
  const handleUpdateStatus = (id, newStatus, e) => {
    e.stopPropagation();
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
    setActiveMenuId(null);
  };

  const handleDeleteOrder = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(o => o.id !== id));
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder(null);
      }
    }
    setActiveMenuId(null);
  };

  // Bulk Actions Submit
  const handleBulkSubmit = (e) => {
    e.preventDefault();
    if (selectedRows.length === 0) {
      alert('Please select at least one order to perform bulk actions.');
      return;
    }

    if (bulkActionType === 'Update Status') {
      setOrders(orders.map(o => selectedRows.includes(o.id) ? { ...o, status: bulkStatusValue } : o));
      if (selectedOrder && selectedRows.includes(selectedOrder.id)) {
        setSelectedOrder(prev => ({ ...prev, status: bulkStatusValue }));
      }
    } else if (bulkActionType === 'Delete Orders') {
      if (window.confirm(`Are you sure you want to delete ${selectedRows.length} selected orders?`)) {
        setOrders(orders.filter(o => !selectedRows.includes(o.id)));
        setSelectedOrder(null);
      }
    } else if (bulkActionType === 'Mark as Paid') {
      setOrders(orders.map(o => selectedRows.includes(o.id) ? { ...o, paymentStatus: 'Paid' } : o));
    }

    setShowBulkModal(false);
    setSelectedRows([]);
    setSelectAll(false);
    setBulkNote('');
  };

  return (
    <div className="sales-order-wrapper">
      
      {/* Top Metric Cards (Matched exactly with reference screenshot) */}
      <div className="sales-order-metrics-grid">
        <div className="sales-order-metric-card">
          <div className="sales-order-metric-icon-box pink">
            <FiPackage className="sales-order-metric-icon" />
          </div>
          <div className="sales-order-metric-content">
            <span className="sales-order-metric-title">Total Orders</span>
            <h3 className="sales-order-metric-value">1,245</h3>
            <span className="sales-order-metric-sub">All orders</span>
          </div>
        </div>

        <div className="sales-order-metric-card">
          <div className="sales-order-metric-icon-box green">
            <FiCheckCircle className="sales-order-metric-icon" />
          </div>
          <div className="sales-order-metric-content">
            <span className="sales-order-metric-title">Delivered</span>
            <h3 className="sales-order-metric-value">842</h3>
            <span className="sales-order-metric-sub green-text">67.71%</span>
          </div>
        </div>

        <div className="sales-order-metric-card">
          <div className="sales-order-metric-icon-box orange">
            <FiClock className="sales-order-metric-icon" />
          </div>
          <div className="sales-order-metric-content">
            <span className="sales-order-metric-title">Processing</span>
            <h3 className="sales-order-metric-value">263</h3>
            <span className="sales-order-metric-sub orange-text">21.12%</span>
          </div>
        </div>

        <div className="sales-order-metric-card">
          <div className="sales-order-metric-icon-box red">
            <FiXCircle className="sales-order-metric-icon" />
          </div>
          <div className="sales-order-metric-content">
            <span className="sales-order-metric-title">Cancelled</span>
            <h3 className="sales-order-metric-value">78</h3>
            <span className="sales-order-metric-sub red-text">6.27%</span>
          </div>
        </div>

        <div className="sales-order-metric-card">
          <div className="sales-order-metric-icon-box purple">
            <FiRotateCcw className="sales-order-metric-icon" />
          </div>
          <div className="sales-order-metric-content">
            <span className="sales-order-metric-title">Returned</span>
            <h3 className="sales-order-metric-value">62</h3>
            <span className="sales-order-metric-sub purple-text">4.98%</span>
          </div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="sales-order-action-bar">
        <div className="sales-order-search-wrapper">
          <FiSearch className="sales-order-search-icon" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="sales-order-search-input"
          />
        </div>

        <div className="sales-order-filters-group">
          <select 
            value={statusFilter} 
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="sales-order-dropdown"
          >
            <option value="All Status">All Status</option>
            <option value="Delivered">Delivered</option>
            <option value="Processing">Processing</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Returned">Returned</option>
          </select>

          <select 
            value={paymentFilter} 
            onChange={(e) => { setPaymentFilter(e.target.value); setCurrentPage(1); }}
            className="sales-order-dropdown"
          >
            <option value="All Payment">All Payment</option>
            <option value="Paid">Paid</option>
            <option value="COD">COD</option>
            <option value="Refunded">Refunded</option>
          </select>

          <select 
            value={channelFilter} 
            onChange={(e) => { setChannelFilter(e.target.value); setCurrentPage(1); }}
            className="sales-order-dropdown"
          >
            <option value="All Channel">All Channel</option>
            <option value="Online Store">Online Store</option>
            <option value="Mobile App">Mobile App</option>
            <option value="POS Store">POS Store</option>
          </select>

          <button 
            type="button" 
            className="sales-order-btn secondary"
            onClick={() => { setStatusFilter('All Status'); setPaymentFilter('All Payment'); setChannelFilter('All Channel'); setSearchTerm(''); setCurrentPage(1); }}
          >
            <FiFilter /> Filter
          </button>

          <button 
            type="button" 
            className="sales-order-btn secondary"
            onClick={handleExport}
          >
            <FiDownload /> Export
          </button>

          <button 
            type="button" 
            className="sales-order-btn bulk"
            onClick={() => setShowBulkModal(true)}
          >
            Bulk Actions <FiChevronDown />
          </button>
        </div>
      </div>

      {/* Main Layout Area */}
      <div className={`sales-order-content-layout ${selectedOrder ? 'with-panel' : 'full-width'}`}>
        
        {/* Table Section */}
        <div className="sales-order-table-container">
          <table className="sales-order-table">
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox" 
                    checked={selectAll} 
                    onChange={handleSelectAll} 
                  />
                </th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((order) => (
                  <tr 
                    key={order.id} 
                    className={selectedOrder?.id === order.id ? 'active-row' : ''}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(order.id)}
                        onChange={() => handleSelectRow(order.id)}
                      />
                    </td>
                    <td className="sales-order-id-cell">{order.orderId}</td>
                    <td>
                      <div className="sales-order-customer-cell">
                        <span className="sales-order-cust-name">{order.customerName}</span>
                        <span className="sales-order-cust-email">{order.email}</span>
                      </div>
                    </td>
                    <td>
                      <div className="sales-order-date-cell">
                        <span>{order.date}</span>
                        <span className="sales-order-time-text">{order.time}</span>
                      </div>
                    </td>
                    <td className="sales-order-amount">{order.amount}</td>
                    <td>
                      <div className="sales-order-payment-cell">
                        <span className={`sales-order-pay-status ${order.paymentStatus.toLowerCase()}`}>
                          {order.paymentStatus === 'Paid' ? <FiCheck size={12} /> : null} {order.paymentStatus}
                        </span>
                        <span className="sales-order-pay-method">{order.paymentMethod}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`sales-order-status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="sales-order-items-thumbnails">
                        {order.thumbnails.map((thumb, i) => (
                          <img key={i} src={thumb} alt="item" className="sales-order-thumb" />
                        ))}
                        {order.itemsCount > order.thumbnails.length && (
                          <span className="sales-order-more-items">+{order.itemsCount - order.thumbnails.length} items</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="sales-order-action-icons" onClick={(e) => e.stopPropagation()}>
                        <button type="button" onClick={() => setSelectedOrder(order)} title="View Details" aria-label="View">
                          <FiEye />
                        </button>
                        <button type="button" onClick={(e) => handleOpenEdit(order, e)} title="Edit Order" aria-label="Edit">
                          <FiEdit2 />
                        </button>
                        <div className="sales-order-menu-wrapper" ref={activeMenuId === order.id ? menuRef : null}>
                          <button 
                            type="button" 
                            title="More Options"
                            aria-label="More"
                            onClick={() => setActiveMenuId(activeMenuId === order.id ? null : order.id)}
                          >
                            <FiMoreVertical />
                          </button>
                          {activeMenuId === order.id && (
                            <div className="sales-order-action-dropdown">
                              <button onClick={(e) => handleUpdateStatus(order.id, 'Delivered', e)}>
                                <FiCheck style={{ color: '#16a34a' }} /> Mark Delivered
                              </button>
                              <button onClick={(e) => handleUpdateStatus(order.id, 'Processing', e)}>
                                <FiClock style={{ color: '#ca8a04' }} /> Mark Processing
                              </button>
                              <button onClick={(e) => handleUpdateStatus(order.id, 'Cancelled', e)}>
                                <FiXCircle style={{ color: '#dc2626' }} /> Cancel Order
                              </button>
                              <button onClick={(e) => handleDeleteOrder(order.id, e)} className="delete-action">
                                <FiTrash2 /> Delete Order
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                    No matching orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className="sales-order-pagination-footer">
            <span className="sales-order-pagination-info">
              Showing {filteredOrders.length > 0 ? indexOfFirstRow + 1 : 0} to {Math.min(indexOfLastRow, filteredOrders.length)} of {filteredOrders.length} orders
            </span>
            <div className="sales-order-pagination-controls">
              <button 
                type="button" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
              >
                <FiChevronLeft />
              </button>
              
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                if (
                  pageNum === 1 || 
                  pageNum === totalPages || 
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button 
                      key={pageNum}
                      type="button" 
                      className={currentPage === pageNum ? 'active' : ''}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  pageNum === currentPage - 2 || 
                  pageNum === currentPage + 2
                ) {
                  return <span key={pageNum} style={{ padding: '0 4px', color: '#64748b' }}>...</span>;
                }
                return null;
              })}

              <button 
                type="button" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
              >
                <FiChevronRight />
              </button>

              <select 
                value={rowsPerPage} 
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="sales-order-rows-select"
              >
                <option value="5">5 / page</option>
                <option value="10">10 / page</option>
                <option value="20">20 / page</option>
                <option value="50">50 / page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Side Order Details Panel */}
        {selectedOrder && (
          <div className="sales-order-details-panel">
            <div className="sales-order-details-header">
              <div className="sales-order-title-flex">
                <h3>Order {selectedOrder.orderId}</h3>
                <span className={`sales-order-status-badge ${selectedOrder.status.toLowerCase()}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <button 
                type="button" 
                className="sales-order-close-panel"
                onClick={() => setSelectedOrder(null)}
                title="Close panel"
                aria-label="Close"
              >
                <FiX />
              </button>
            </div>

            <div className="sales-order-sub-date-text">
              {selectedOrder.date} at {selectedOrder.time} • {selectedOrder.channel}
            </div>

            <div className="sales-order-details-body">
              
              {/* Customer Details Section */}
              <div className="sales-order-section-block">
                <div className="sales-order-section-label">Customer Details</div>
                <div className="sales-order-customer-card-box">
                  <div className="sales-order-cust-avatar-row">
                    <div className="sales-order-avatar-initials">
                      {selectedOrder.customerName.charAt(0)}
                    </div>
                    <div>
                      <span className="sales-order-panel-cust-name">{selectedOrder.customerName}</span>
                      <span className="sales-order-panel-cust-email">{selectedOrder.email}</span>
                    </div>
                  </div>
                  <div className="sales-order-cust-contact-row">
                    <span><FiPhone size={13} /> {selectedOrder.phone}</span>
                    <span><FiMail size={13} /> {selectedOrder.email}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address Section */}
              <div className="sales-order-section-block">
                <div className="sales-order-section-label">Shipping Address</div>
                <div className="sales-order-address-box">
                  <FiMapPin className="sales-order-addr-icon" />
                  <span className="sales-order-addr-text">{selectedOrder.shippingAddress}</span>
                </div>
              </div>

              {/* Order Summary Section */}
              <div className="sales-order-section-block">
                <div className="sales-order-section-label">Order Summary</div>
                <div className="sales-order-summary-box">
                  <div className="sales-order-summary-row">
                    <span>Items ({selectedOrder.itemsCount})</span>
                    <span>{selectedOrder.itemsSubtotal}</span>
                  </div>
                  <div className="sales-order-summary-row">
                    <span>Shipping</span>
                    <span>{selectedOrder.shippingCost}</span>
                  </div>
                  <div className="sales-order-summary-row">
                    <span>Tax</span>
                    <span>{selectedOrder.taxAmount}</span>
                  </div>
                  <div className="sales-order-summary-row">
                    <span>Discount</span>
                    <span className="sales-order-discount-val">{selectedOrder.discountAmount}</span>
                  </div>
                  <div className="sales-order-summary-divider"></div>
                  <div className="sales-order-summary-row total-row">
                    <span>Total Amount</span>
                    <span className="sales-order-total-price">{selectedOrder.amount}</span>
                  </div>
                </div>
              </div>

              {/* Payment Information Section */}
              <div className="sales-order-section-block">
                <div className="sales-order-section-label">Payment Information</div>
                <div className="sales-order-payment-card-box">
                  <div className="sales-order-pay-info-top">
                    <FiCreditCard />
                    <span>Paid via {selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="sales-order-pay-info-bottom">
                    <span className="sales-order-card-num">{selectedOrder.paymentCardNum}</span>
                    <span className="sales-order-paid-pill">Paid {selectedOrder.amount}</span>
                  </div>
                </div>
              </div>

              {/* Order Timeline Section */}
              <div className="sales-order-section-block">
                <div className="sales-order-section-label">Order Timeline</div>
                <div className="sales-order-timeline-box">
                  {selectedOrder.timeline.map((step, idx) => (
                    <div key={idx} className={`sales-order-timeline-step ${step.completed ? 'completed' : ''}`}>
                      <div className="sales-order-timeline-dot"></div>
                      <div className="sales-order-timeline-content">
                        <span className="sales-order-timeline-title">{step.title}</span>
                        <span className="sales-order-timeline-date">{step.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="sales-order-details-footer">
              <button 
                type="button" 
                className="sales-order-full-details-btn"
                onClick={() => alert(`Opening full receipt view for ${selectedOrder.orderId}`)}
              >
                <FiEye /> View Order Details
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Order Modal */}
      {showEditModal && editingOrder && (
        <div className="sales-order-modal-overlay">
          <div className="sales-order-modal-content">
            <div className="sales-order-modal-header">
              <h2>Edit Order {editingOrder.orderId}</h2>
              <button type="button" onClick={() => setShowEditModal(false)} className="sales-order-close-modal" aria-label="Close">
                <FiX />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="sales-order-modal-form">
              <div className="sales-order-modal-field">
                <label>Customer Name</label>
                <input 
                  type="text" 
                  value={editingOrder.customerName}
                  onChange={(e) => setEditingOrder({...editingOrder, customerName: e.target.value})}
                  required 
                />
              </div>
              <div className="sales-order-modal-field">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={editingOrder.email}
                  onChange={(e) => setEditingOrder({...editingOrder, email: e.target.value})}
                  required 
                />
              </div>
              <div className="sales-order-modal-field">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  value={editingOrder.phone}
                  onChange={(e) => setEditingOrder({...editingOrder, phone: e.target.value})}
                  required 
                />
              </div>
              <div className="sales-order-modal-field">
                <label>Order Status</label>
                <select 
                  value={editingOrder.status}
                  onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value})}
                >
                  <option value="Delivered">Delivered</option>
                  <option value="Processing">Processing</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Returned">Returned</option>
                </select>
              </div>
              <div className="sales-order-modal-field">
                <label>Payment Status</label>
                <select 
                  value={editingOrder.paymentStatus}
                  onChange={(e) => setEditingOrder({...editingOrder, paymentStatus: e.target.value})}
                >
                  <option value="Paid">Paid</option>
                  <option value="COD">COD</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
              <div className="sales-order-modal-field">
                <label>Shipping Address</label>
                <textarea 
                  rows="2"
                  value={editingOrder.shippingAddress}
                  onChange={(e) => setEditingOrder({...editingOrder, shippingAddress: e.target.value})}
                ></textarea>
              </div>
              <div className="sales-order-modal-actions">
                <button type="button" className="sales-order-btn secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="sales-order-btn primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Actions Popup Modal */}
      {showBulkModal && (
        <div className="sales-order-modal-overlay">
          <div className="sales-order-modal-content">
            <div className="sales-order-modal-header">
              <h2>Bulk Actions ({selectedRows.length} Orders Selected)</h2>
              <button type="button" onClick={() => setShowBulkModal(false)} className="sales-order-close-modal" aria-label="Close">
                <FiX />
              </button>
            </div>
            <form onSubmit={handleBulkSubmit} className="sales-order-modal-form">
              <div className="sales-order-modal-field">
                <label>Select Bulk Action</label>
                <select 
                  value={bulkActionType}
                  onChange={(e) => setBulkActionType(e.target.value)}
                >
                  <option value="Update Status">Update Order Status</option>
                  <option value="Mark as Paid">Mark as Paid</option>
                  <option value="Delete Orders">Delete Selected Orders</option>
                </select>
              </div>

              {bulkActionType === 'Update Status' && (
                <div className="sales-order-modal-field">
                  <label>New Status</label>
                  <select 
                    value={bulkStatusValue}
                    onChange={(e) => setBulkStatusValue(e.target.value)}
                  >
                    <option value="Delivered">Delivered</option>
                    <option value="Processing">Processing</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Returned">Returned</option>
                  </select>
                </div>
              )}

              <div className="sales-order-modal-field">
                <label>Admin Note / Reason</label>
                <textarea 
                  rows="3"
                  placeholder="Enter any internal notes for this bulk operation..."
                  value={bulkNote}
                  onChange={(e) => setBulkNote(e.target.value)}
                ></textarea>
              </div>

              <div className="sales-order-modal-actions">
                <button type="button" className="sales-order-btn secondary" onClick={() => setShowBulkModal(false)}>Cancel</button>
                <button type="submit" className="sales-order-btn primary">Apply to {selectedRows.length} Orders</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default SalesOrder;