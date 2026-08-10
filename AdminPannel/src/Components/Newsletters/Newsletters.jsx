import React, { useState } from 'react';
import { 
  FiMail, FiSend, FiTrendingUp, FiMousePointer, FiSearch, FiFilter, 
  FiPlus, FiUpload, FiLayout, FiUsers, FiTrash2, FiChevronLeft, FiChevronRight, FiAward, FiX
} from 'react-icons/fi';
import './Newsletters.css';

export function Newsletters() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    subject: '',
    status: 'Draft',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60'
  });

  const [csvFile, setCsvFile] = useState(null);
  const [importSuccess, setImportSuccess] = useState('');

  const [newslettersData, setNewslettersData] = useState([
    { id: 1, title: 'New Collection Launch', subtitle: 'Special launch...', subject: 'Explore Our New Handloom Collection', status: 'Sent', subscribers: '12,458', openRate: '45.8%', clickRate: '13.2%', date: '16 May 2025\n10:30 AM', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60' },
    { id: 2, title: 'Festive Season Offer', subtitle: 'Exclusive festive offers...', subject: 'Festive Offers You Can\'t Miss!', status: 'Sent', subscribers: '12,150', openRate: '41.2%', clickRate: '11.8%', date: '09 May 2025\n09:15 AM', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=100&auto=format&fit=crop&q=60' },
    { id: 3, title: 'Our Weaving Heritage', subtitle: 'The story behind weaves...', subject: 'The Heritage Behind Every Weave', status: 'Sent', subscribers: '11,982', openRate: '38.6%', clickRate: '10.6%', date: '02 May 2025\n11:45 AM', image: 'https://images.unsplash.com/photo-1542744094-3a31243364d0?w=100&auto=format&fit=crop&q=60' },
    { id: 4, title: 'Summer Sale 2025', subtitle: 'Up to 30% off...', subject: 'Summer Sale is Now Live!', status: 'Sent', subscribers: '11,765', openRate: '40.1%', clickRate: '12.1%', date: '25 Apr 2025\n10:00 AM', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&auto=format&fit=crop&q=60' },
    { id: 5, title: 'Handloom Care Guide', subtitle: 'Tips to make last long...', subject: 'How to Take Care of Your Handloom', status: 'Draft', subscribers: '-', openRate: '-', clickRate: '-', date: '-', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&auto=format&fit=crop&q=60' },
  ]);

  const [subscribersList, setSubscribersList] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@email.com', date: '16 May 2025', status: 'Active' },
    { id: 2, name: 'Priya Sharma', email: 'priya.sharma@email.com', date: '16 May 2025', status: 'Active' },
    { id: 3, name: 'Ramesh Patel', email: 'ramesh.patel@email.com', date: '15 May 2025', status: 'Active' },
    { id: 4, name: 'Anita Verma', email: 'anita.verma@email.com', date: '15 May 2025', status: 'Active' },
    { id: 5, name: 'Vikash Singh', email: 'vikash.singh@email.com', date: '15 May 2025', status: 'Active' },
  ]);

  const templatesList = [
    { id: 1, name: 'Modern Minimalist', category: 'Handloom & Apparel', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=60' },
    { id: 2, name: 'Festive Special', category: 'Seasonal Sales', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=150&auto=format&fit=crop&q=60' },
    { id: 3, name: 'Heritage Story', category: 'Brand Storytelling', image: 'https://images.unsplash.com/photo-1542744094-3a31243364d0?w=150&auto=format&fit=crop&q=60' },
  ];

  const topNewsletters = [
    { title: 'New Collection Launch', openRate: '45.8%', clickRate: '13.2%', width: '90%', color: '#10b981' },
    { title: 'Festive Season Offer', openRate: '41.2%', clickRate: '11.8%', width: '80%', color: '#f59e0b' },
    { title: 'Summer Sale 2025', openRate: '40.1%', clickRate: '12.1%', width: '75%', color: '#3b82f6' },
    { title: 'Our Weaving Heritage', openRate: '38.6%', clickRate: '10.6%', width: '65%', color: '#8b5cf6' },
  ];

  const handleSelectAll = (e) => {
    setSelectedRows(e.target.checked ? newslettersData.map(item => item.id) : []);
  };

  const handleSelectRow = (id) => {
    setSelectedRows(selectedRows.includes(id) ? selectedRows.filter(rowId => rowId !== id) : [...selectedRows, id]);
  };

  const handleDeleteDraft = (id) => {
    setNewslettersData(newslettersData.filter(item => item.id !== id));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.subject) return;

    const newEntry = {
      id: Date.now(),
      title: formData.title,
      subtitle: formData.subtitle || 'No subtitle provided',
      subject: formData.subject,
      status: formData.status,
      subscribers: formData.status === 'Sent' ? '12,000' : '-',
      openRate: formData.status === 'Sent' ? '40.0%' : '-',
      clickRate: formData.status === 'Sent' ? '11.0%' : '-',
      date: formData.status === 'Sent' ? 'Today' : '-',
      image: formData.image
    };

    setNewslettersData([newEntry, ...newslettersData]);
    setActiveModal(null);
    setFormData({ title: '', subtitle: '', subject: '', status: 'Draft', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60' });
  };

  const handleImportSubmit = (e) => {
    e.preventDefault();
    if (!csvFile) return;
    setImportSuccess('Subscribers successfully imported!');
    setTimeout(() => {
      setImportSuccess('');
      setActiveModal(null);
      setCsvFile(null);
    }, 1200);
  };

  const handleSelectTemplate = (tmpl) => {
    setFormData({
      ...formData,
      title: tmpl.name + ' Campaign',
      subtitle: 'Generated from template',
      subject: 'Explore ' + tmpl.name,
      image: tmpl.image
    });
    setActiveModal('create');
  };

  const filteredNewsletters = newslettersData.filter(item => {
    if (activeTab === 'Drafts' && item.status !== 'Draft') return false;
    if (activeTab === 'Scheduled' && item.status !== 'Scheduled') return false;
    if (activeTab === 'Sent' && item.status !== 'Sent') return false;
    if (activeTab === 'Archived' && item.status !== 'Archived') return false;
    
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && !item.subject.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="Newsletters-container">
      {/* Top Header Bar */}
      <div className="Newsletters-header-bar">
        <h1 className="Newsletters-main-heading">Newsletters Dashboard</h1>
        <button type="button" className="Newsletters-create-btn-corner" onClick={() => setActiveModal('create')}>
          Create Newsletter +
        </button>
      </div>

      {/* Top Stats Header */}
      <div className="Newsletters-top-header">
        <div className="Newsletters-stat-card">
          <div className="Newsletters-stat-icon-wrapper blue"><FiMail /></div>
          <div className="Newsletters-stat-content">
            <span className="Newsletters-stat-label">Total Subscribers</span>
            <div className="Newsletters-stat-row">
              <h2 className="Newsletters-stat-value">12,458</h2>
              <span className="Newsletters-stat-badge positive">+18.6%</span>
            </div>
            <div className="Newsletters-stat-chart-line blue"></div>
          </div>
        </div>

        <div className="Newsletters-stat-card">
          <div className="Newsletters-stat-icon-wrapper green"><FiSend /></div>
          <div className="Newsletters-stat-content">
            <span className="Newsletters-stat-label">Newsletters Sent</span>
            <div className="Newsletters-stat-row">
              <h2 className="Newsletters-stat-value">86</h2>
              <span className="Newsletters-stat-badge positive">+12.4%</span>
            </div>
            <div className="Newsletters-stat-chart-line green"></div>
          </div>
        </div>

        <div className="Newsletters-stat-card">
          <div className="Newsletters-stat-icon-wrapper purple"><FiTrendingUp /></div>
          <div className="Newsletters-stat-content">
            <span className="Newsletters-stat-label">Open Rate</span>
            <div className="Newsletters-stat-row">
              <h2 className="Newsletters-stat-value">42.8%</h2>
              <span className="Newsletters-stat-badge positive">+5.3%</span>
            </div>
            <div className="Newsletters-stat-chart-line purple"></div>
          </div>
        </div>

        <div className="Newsletters-stat-card">
          <div className="Newsletters-stat-icon-wrapper cyan"><FiMousePointer /></div>
          <div className="Newsletters-stat-content">
            <span className="Newsletters-stat-label">Click Rate</span>
            <div className="Newsletters-stat-row">
              <h2 className="Newsletters-stat-value">12.6%</h2>
              <span className="Newsletters-stat-badge positive">+3.1%</span>
            </div>
            <div className="Newsletters-stat-chart-line cyan"></div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="Newsletters-main-grid">
        {/* Left Column: Table Management */}
        <div className="Newsletters-table-section">
          <div className="Newsletters-table-header-toolbar">
            <div className="Newsletters-tabs">
              {['All', 'Drafts', 'Scheduled', 'Sent', 'Archived'].map((tab) => (
                <button 
                  key={tab}
                  type="button" 
                  className={`Newsletters-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="Newsletters-toolbar-actions">
              <div className="Newsletters-filter-dropdown-wrapper">
                <button 
                  type="button" 
                  className="Newsletters-filter-btn" 
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <FiFilter /> Filter
                </button>
                {filterOpen && (
                  <div className="Newsletters-filter-dropdown">
                    <div onClick={() => { setActiveTab('All'); setFilterOpen(false); }}>Show All</div>
                    <div onClick={() => { setActiveTab('Sent'); setFilterOpen(false); }}>Filter Sent Only</div>
                    <div onClick={() => { setActiveTab('Drafts'); setFilterOpen(false); }}>Filter Drafts Only</div>
                  </div>
                )}
              </div>
              <div className="Newsletters-search-wrapper">
                <FiSearch className="Newsletters-search-icon" />
                <input 
                  type="text" 
                  placeholder="Search newsletter..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="Newsletters-search-input"
                />
              </div>
            </div>
          </div>

          <div className="Newsletters-table-container">
            <table className="Newsletters-data-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input type="checkbox" onChange={handleSelectAll} checked={selectedRows.length === newslettersData.length && newslettersData.length > 0} />
                  </th>
                  <th>Newsletter</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Subscribers</th>
                  <th>Open Rate</th>
                  <th>Click Rate</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNewsletters.map((item) => (
                  <tr key={item.id} className={selectedRows.includes(item.id) ? 'selected' : ''}>
                    <td>
                      <input type="checkbox" checked={selectedRows.includes(item.id)} onChange={() => handleSelectRow(item.id)} />
                    </td>
                    <td>
                      <div className="Newsletters-item-cell">
                        <img src={item.image} alt={item.title} className="Newsletters-cell-thumb" />
                        <div>
                          <div className="Newsletters-cell-title">{item.title}</div>
                          <div className="Newsletters-cell-subtitle">{item.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="Newsletters-subject-text">{item.subject}</span></td>
                    <td><span className={`Newsletters-status-pill ${item.status.toLowerCase()}`}>{item.status}</span></td>
                    <td>{item.subscribers}</td>
                    <td>{item.openRate}</td>
                    <td>{item.clickRate}</td>
                    <td><span className="Newsletters-date-text">{item.date}</span></td>
                    <td>
                      <div className="Newsletters-action-icons">
                        <button type="button" title="Delete" onClick={() => handleDeleteDraft(item.id)}><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredNewsletters.length === 0 && (
                  <tr>
                    <td colSpan="9" className="Newsletters-empty-row">No newsletters found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="Newsletters-table-footer">
            <span className="Newsletters-pagination-info">Showing {filteredNewsletters.length} newsletters</span>
            <div className="Newsletters-pagination-controls">
              <button type="button" className="Newsletters-page-nav" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}><FiChevronLeft /></button>
              <button type="button" className="Newsletters-page-num active">1</button>
              <button type="button" className="Newsletters-page-nav" onClick={() => setCurrentPage(currentPage + 1)}><FiChevronRight /></button>
              <select value={rowsPerPage} onChange={(e) => setRowsPerPage(e.target.value)} className="Newsletters-rows-select">
                <option value="5">5 / page</option>
                <option value="10">10 / page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar & Quick Actions */}
        <div className="Newsletters-sidebar-column">
          <div className="Newsletters-card">
            <h3 className="Newsletters-card-title">Subscriber Overview</h3>
            <div className="Newsletters-donut-container">
              <div className="Newsletters-donut-chart-mock">
                <div className="Newsletters-donut-inner">
                  <strong>12,458</strong>
                  <span>Total</span>
                </div>
              </div>
              <div className="Newsletters-donut-legend">
                <div className="Newsletters-legend-item"><span className="dot green"></span><span>Active <small>82.2%</small></span></div>
                <div className="Newsletters-legend-item"><span className="dot yellow"></span><span>Unsubscribed <small>10.0%</small></span></div>
                <div className="Newsletters-legend-item"><span className="dot red"></span><span>Bounced <small>7.8%</small></span></div>
              </div>
            </div>
          </div>

          <div className="Newsletters-card">
            <h3 className="Newsletters-card-title">Quick Actions</h3>
            <div className="Newsletters-quick-actions-list">
              <button type="button" className="Newsletters-quick-action-item" onClick={() => setActiveModal('create')}>
                <div className="Newsletters-qa-icon orange"><FiPlus /></div>
                <div className="Newsletters-qa-text"><strong>Create Newsletter</strong><span>Design new item</span></div>
              </button>
              <button type="button" className="Newsletters-quick-action-item" onClick={() => setActiveModal('import')}>
                <div className="Newsletters-qa-icon green"><FiUpload /></div>
                <div className="Newsletters-qa-text"><strong>Import Subscribers</strong><span>Upload via CSV</span></div>
              </button>
              <button type="button" className="Newsletters-quick-action-item" onClick={() => setActiveModal('templates')}>
                <div className="Newsletters-qa-icon purple"><FiLayout /></div>
                <div className="Newsletters-qa-text"><strong>View Templates</strong><span>Pre-designed layouts</span></div>
              </button>
              <button type="button" className="Newsletters-quick-action-item" onClick={() => setActiveModal('subscribers')}>
                <div className="Newsletters-qa-icon blue"><FiUsers /></div>
                <div className="Newsletters-qa-text"><strong>Subscriber List</strong><span>Manage all users</span></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="Newsletters-bottom-grid">
        <div className="Newsletters-card">
          <div className="Newsletters-card-header-row">
            <h3 className="Newsletters-card-title flex-align"><FiUsers /> Recent Subscribers</h3>
            <button type="button" className="Newsletters-view-all-btn" onClick={() => setActiveModal('subscribers')}>View All</button>
          </div>
          <div className="Newsletters-table-container plain">
            <table className="Newsletters-data-table plain">
              <thead>
                <tr><th>Name</th><th>Email</th><th>Status</th></tr>
              </thead>
              <tbody>
                {subscribersList.slice(0, 4).map((sub, idx) => (
                  <tr key={idx}>
                    <td className="font-semibold">{sub.name}</td>
                    <td className="text-muted">{sub.email}</td>
                    <td><span className="Newsletters-status-pill active">{sub.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="Newsletters-card">
          <div className="Newsletters-card-header-row">
            <h3 className="Newsletters-card-title flex-align"><FiAward /> Top Performing</h3>
          </div>
          <div className="Newsletters-table-container plain">
            <table className="Newsletters-data-table plain">
              <thead>
                <tr><th>Newsletter</th><th>Open</th><th>Click</th></tr>
              </thead>
              <tbody>
                {topNewsletters.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="Newsletters-top-perf-title">{item.title}</div>
                      <div className="Newsletters-perf-bar-bg"><div className="Newsletters-perf-bar-fill" style={{ width: item.width, background: item.color }}></div></div>
                    </td>
                    <td className="font-semibold">{item.openRate}</td>
                    <td className="font-semibold">{item.clickRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'create' && (
        <div className="Newsletters-modal-overlay">
          <div className="Newsletters-modal-content">
            <div className="Newsletters-modal-header">
              <h2>Create Newsletter</h2>
              <button type="button" className="Newsletters-modal-close" onClick={() => setActiveModal(null)}><FiX /></button>
            </div>
            <form onSubmit={handleCreateSubmit} className="Newsletters-form">
              <div className="Newsletters-form-group"><label>Title *</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required /></div>
              <div className="Newsletters-form-group"><label>Subtitle</label><input type="text" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} /></div>
              <div className="Newsletters-form-group"><label>Subject *</label><input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required /></div>
              <div className="Newsletters-form-group"><label>Status</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}><option value="Draft">Draft</option><option value="Sent">Sent</option></select></div>
              <div className="Newsletters-modal-actions"><button type="button" className="Newsletters-btn-secondary" onClick={() => setActiveModal(null)}>Cancel</button><button type="submit" className="Newsletters-btn-primary">Save</button></div>
            </form>
          </div>
        </div>
      )}

      {activeModal === 'import' && (
        <div className="Newsletters-modal-overlay">
          <div className="Newsletters-modal-content">
            <div className="Newsletters-modal-header">
              <h2>Import CSV</h2>
              <button type="button" className="Newsletters-modal-close" onClick={() => setActiveModal(null)}><FiX /></button>
            </div>
            <form onSubmit={handleImportSubmit} className="Newsletters-form">
              <div className="Newsletters-form-group"><input type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files[0])} required /></div>
              {importSuccess && <div className="Newsletters-success-msg">{importSuccess}</div>}
              <div className="Newsletters-modal-actions"><button type="button" className="Newsletters-btn-secondary" onClick={() => setActiveModal(null)}>Cancel</button><button type="submit" className="Newsletters-btn-primary">Import</button></div>
            </form>
          </div>
        </div>
      )}

      {activeModal === 'templates' && (
        <div className="Newsletters-modal-overlay">
          <div className="Newsletters-modal-content Newsletters-modal-large">
            <div className="Newsletters-modal-header">
              <h2>Templates</h2>
              <button type="button" className="Newsletters-modal-close" onClick={() => setActiveModal(null)}><FiX /></button>
            </div>
            <div className="Newsletters-templates-grid">
              {templatesList.map(tmpl => (
                <div key={tmpl.id} className="Newsletters-template-card">
                  <img src={tmpl.image} alt={tmpl.name} />
                  <div className="Newsletters-template-info">
                    <strong>{tmpl.name}</strong>
                    <button type="button" className="Newsletters-btn-primary" onClick={() => handleSelectTemplate(tmpl)}>Use</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeModal === 'subscribers' && (
        <div className="Newsletters-modal-overlay">
          <div className="Newsletters-modal-content Newsletters-modal-large">
            <div className="Newsletters-modal-header">
              <h2>All Subscribers</h2>
              <button type="button" className="Newsletters-modal-close" onClick={() => setActiveModal(null)}><FiX /></button>
            </div>
            <div className="Newsletters-table-container">
              <table className="Newsletters-data-table plain">
                <thead><tr><th>Name</th><th>Email</th><th>Action</th></tr></thead>
                <tbody>
                  {subscribersList.map((sub) => (
                    <tr key={sub.id}>
                      <td>{sub.name}</td>
                      <td>{sub.email}</td>
                      <td><button type="button" onClick={() => setSubscribersList(subscribersList.filter(s => s.id !== sub.id))}><FiTrash2 /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Newsletters;