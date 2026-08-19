import React, { useState, useMemo } from 'react';

const INITIAL_USERS = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Super Admin', status: 'Active', lastLogin: '21/10/2025 09:21 PM' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Manager', status: 'Active', lastLogin: '21/11/2025 02:37 PM' },
  { id: 3, name: 'Mike Brown', email: 'mike.brown@example.com', role: 'Support', status: 'Inactive', lastLogin: '21/10/2025 02:34 PM' },
  { id: 4, name: 'Mike Brown', email: 'mike.brown@example.com', role: 'Support', status: 'Inactive', lastLogin: '21/10/2025 12:28 PM' },
  { id: 5, name: 'Jane Smith', email: 'mike.smith@example.com', role: 'Support', status: 'Active', lastLogin: '21/01/2025 12:02 PM' },
  { id: 6, name: 'Mike Brown', email: 'mike.brown@example.com', role: 'Support', status: 'Inactive', lastLogin: '21/03/2025 12:11 PM' },
];

const ROLES = ['Super Admin', 'Manager', 'Support'];

const UsersRole = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Support',
    status: 'Active',
  });

  // Filter & Search Logic
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === 'All' || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'Support', status: 'Active' });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    setIsModalOpen(true);
  };

  // Save User (Add / Edit)
  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? { ...u, ...formData }
            : u
        )
      );
    } else {
      const now = new Date();
      const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      const newUser = {
        id: Date.now(),
        ...formData,
        lastLogin: formattedDate,
      };
      setUsers([newUser, ...users]);
    }
    setIsModalOpen(false);
  };

  // Delete User
  const handleDeleteUser = (id) => {
    if (window.confirm('क्या आप वाकई इस यूज़र को हटाना चाहते हैं?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // Badge Color Style
  const getBadgeStyle = (role) => {
    switch (role) {
      case 'Super Admin':
        return { backgroundColor: '#b7812f', color: '#fff' };
      case 'Manager':
        return { backgroundColor: '#2f74b5', color: '#fff' };
      case 'Support':
      default:
        return { backgroundColor: '#439352', color: '#fff' };
    }
  };

  return (
    <div style={styles.container}>
      {/* Top Breadcrumb */}
      <div style={styles.breadcrumb}>
        <span>🏠</span>
        <span style={styles.breadcrumbSep}>›</span>
        <span>Settings</span>
        <span style={styles.breadcrumbSep}>›</span>
        <span style={styles.breadcrumbActive}>Users Roles</span>
      </div>

      {/* Header Info Box */}
      <div style={styles.infoBox}>
        <h2 style={styles.infoTitle}>Users & Roles Page</h2>
        <p style={styles.infoSubtitle}>This page is ready for your content!</p>
      </div>

      {/* Main Table Card */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Users and Roles Management</h3>
        </div>

        {/* Toolbar: Add Button, Search & Role Filter */}
        <div style={styles.toolbar}>
          <button style={styles.addButton} onClick={handleOpenAddModal}>
            <span style={styles.plusIcon}>+</span> Add New User
          </button>

          <div style={styles.filterGroup}>
            <div style={styles.searchBox}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Filter by name or role"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={styles.roleSelect}
            >
              <option value="All">Role filter</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Responsive Table Container */}
        <div style={styles.tableResponsive}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>User Name</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Last Login</th>
                <th style={{ ...styles.th, textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.userName}>{user.name}</div>
                      <div style={styles.userEmail}>{user.email}</div>
                    </td>
                    <td style={styles.td}>
                      <span style={{ ...styles.badge, ...getBadgeStyle(user.role) }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.statusWrap}>
                        <span
                          style={{
                            ...styles.statusDot,
                            backgroundColor: user.status === 'Active' ? '#22c55e' : '#9ca3af',
                          }}
                        />
                        <span style={styles.statusText}>{user.status}</span>
                      </div>
                    </td>
                    <td style={styles.td}>{user.lastLogin}</td>
                    <td style={{ ...styles.td, textAlign: 'center' }}>
                      <div style={styles.actionButtons}>
                        <button
                          style={styles.iconBtn}
                          onClick={() => handleOpenEditModal(user)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          style={styles.iconBtn}
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={styles.noData}>कोई रिकॉर्ड नहीं मिला</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={styles.pagination}>
          <button style={styles.pageBtn} onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
            Previous
          </button>
          <button style={{ ...styles.pageBtn, ...styles.activePageBtn }}>1</button>
          <button style={styles.pageBtn}>2</button>
          <button style={styles.pageBtn}>3</button>
          <button style={styles.pageBtn} onClick={() => setCurrentPage((p) => p + 1)}>
            Next
          </button>
        </div>
      </div>

      {/* Add / Edit Popup Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{editingUser ? 'Edit User' : 'Add New User'}</h3>
              <button style={styles.closeBtn} onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSaveUser} style={styles.modalForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>User Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={styles.modalInput}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={styles.modalInput}
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={styles.modalSelect}
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={styles.modalSelect}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div style={styles.modalActions}>
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.submitBtn}>
                  {editingUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles Matching Handloom Design Reference
const styles = {
  container: {
    padding: '24px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#334155',
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    color: '#64748b',
    marginBottom: '16px',
  },
  breadcrumbSep: {
    margin: '0 8px',
  },
  breadcrumbActive: {
    color: '#852d19',
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#ffffff',
    padding: '20px 24px',
    borderRadius: '12px',
    border: '1px solid #edf2f7',
    marginBottom: '24px',
  },
  infoTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 6px 0',
  },
  infoSubtitle: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    border: '1px solid #e2e8f0',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
  },
  cardHeader: {
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '20px',
  },
  addButton: {
    backgroundColor: '#f6d9a3',
    color: '#5c3811',
    border: '1px solid #e2bd7e',
    padding: '10px 20px',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  plusIcon: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  filterGroup: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fef7ee',
    border: '1px solid #f1dec1',
    borderRadius: '10px',
    padding: '6px 14px',
    minWidth: '240px',
  },
  searchIcon: {
    fontSize: '13px',
    color: '#8c7653',
    marginRight: '8px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontSize: '13px',
    color: '#475569',
    width: '100%',
  },
  roleSelect: {
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    padding: '8px 16px',
    fontSize: '13px',
    color: '#475569',
    outline: 'none',
    cursor: 'pointer',
  },
  tableResponsive: {
    overflowX: 'auto',
    borderRadius: '10px',
    border: '1px solid #f1f5f9',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '14px',
  },
  thRow: {
    backgroundColor: '#fdfbf7',
    borderBottom: '1px solid #f1dec1',
  },
  th: {
    padding: '14px 18px',
    fontWeight: '600',
    color: '#334155',
    whiteSpace: 'nowrap',
  },
  tr: {
    borderBottom: '1px solid #f1f5f9',
  },
  td: {
    padding: '14px 18px',
    verticalAlign: 'middle',
    color: '#334155',
  },
  userName: {
    fontWeight: '600',
    color: '#1e293b',
  },
  userEmail: {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '2px',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  statusWrap: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  statusText: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#475569',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '4px',
    borderRadius: '4px',
  },
  noData: {
    padding: '30px',
    textAlign: 'center',
    color: '#94a3b8',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '6px',
    marginTop: '20px',
  },
  pageBtn: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    color: '#475569',
  },
  activePageBtn: {
    backgroundColor: '#f7ebd2',
    borderColor: '#e8cb94',
    color: '#784617',
    fontWeight: '600',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    width: '100%',
    maxWidth: '480px',
    padding: '24px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
  },
  modalTitle: {
    margin: 0,
    fontSize: '18px',
    color: '#1e293b',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#64748b',
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
  },
  formRow: {
    display: 'flex',
    gap: '12px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#475569',
  },
  modalInput: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    outline: 'none',
  },
  modalSelect: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#fff',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '12px',
  },
  cancelBtn: {
    padding: '10px 18px',
    backgroundColor: '#f1f5f9',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    color: '#475569',
  },
  submitBtn: {
    padding: '10px 18px',
    backgroundColor: '#f6d9a3',
    border: '1px solid #e2bd7e',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    color: '#5c3811',
  },
};

export default UsersRole;