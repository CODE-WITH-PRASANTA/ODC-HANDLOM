import React, { useState, useEffect, useRef } from 'react';
import { 
  FiShoppingBag, 
  FiUser, 
  FiMapPin, 
  FiShare2, 
  FiFileText, 
  FiSearch, 
  FiMail, 
  FiBell, 
  FiTool, 
  FiSave, 
  FiX, 
  FiClock, 
  FiShield, 
  FiUpload, 
  FiTrash2, 
  FiChevronDown 
} from 'react-icons/fi';
import storeLogoImage from '../../assets/logo.png'; // Update path if needed based on your project structure
import './StoreSettings.css';

const StoreSettings = () => {
  // Navigation / Active Section State
  const [activeSection, setActiveSection] = useState('Store Profile');

  // Store Profile State
  const [storeName, setStoreName] = useState('ODC Handloom');
  const [tagline, setTagline] = useState('Crafted with Heritage');
  const [storeEmail, setStoreEmail] = useState('hello@odchandloom.in');
  const [storePhone, setStorePhone] = useState('+91 98765 43210');
  const [storeCurrency, setStoreCurrency] = useState('INR (₹) - Indian Rupee');
  const [defaultLanguage, setDefaultLanguage] = useState('English');
  const [storeDescription, setStoreDescription] = useState('ODC Handloom is dedicated to preserving the rich heritage of handloom craftsmanship. We offer authentic, handmade products crafted by skilled artisans with love and tradition.');
  const [storeLogo, setStoreLogo] = useState(storeLogoImage);

  // Admin Profile State
  const [fullName, setFullName] = useState('Admin User');
  const [emailAddress, setEmailAddress] = useState('admin@odchandloom.in');
  const [role, setRole] = useState('Super Administrator');
  const [password, setPassword] = useState('********');
  const [adminPhoto, setAdminPhoto] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60');

  // Timezone State
  const [timezone, setTimezone] = useState('(GMT +05:30) Asia/Kolkata');
  const [currentTime, setCurrentTime] = useState('');

  // UI Toggle States (Right form visibility & Breadcrumb toggle)
  const [isRightFormVisible, setIsRightFormVisible] = useState(true);
  const [showBreadcrumb, setShowBreadcrumb] = useState(true);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  // File input refs for uploading photos
  const logoInputRef = useRef(null);
  const adminPhotoInputRef = useRef(null);

  // Clock effect
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handlers for Store Logo
  const handleLogoChangeClick = () => {
    logoInputRef.current.click();
  };

  const handleLogoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setStoreLogo(imageUrl);
    }
  };

  const handleLogoRemove = () => {
    setStoreLogo('');
  };

  // Handlers for Admin Photo
  const handleAdminPhotoChangeClick = () => {
    adminPhotoInputRef.current.click();
  };

  const handleAdminPhotoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAdminPhoto(imageUrl);
    }
  };

  const handleAdminPhotoRemove = () => {
    setAdminPhoto('');
  };

  // Save Changes Action
  const handleSaveChanges = () => {
    alert('Store settings saved successfully!');
  };

  // Enable 2FA Action
  const handleEnable2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
    alert(is2FAEnabled ? '2FA Disabled' : '2FA Enabled successfully!');
  };

  return (
    <div className="store-settings-container">
      {/* Top Header Bar with Save Changes */}
      <div className="store-settings-header-top">
        {showBreadcrumb ? (
          <div className="store-settings-breadcrumb">
             &gt;  &gt;  
          </div>
        ) : (
          <div></div>
        )}
        <button className="store-settings-save-top-btn" onClick={handleSaveChanges}>
          <FiSave /> Save Changes
        </button>
      </div>

      <div className="store-settings-main-layout">
        {/* Left Sidebar Navigation */}
        <div className="store-settings-sidebar">
          <button 
            className={`store-settings-nav-item ${activeSection === 'Store Profile' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('Store Profile');
              setShowBreadcrumb(true);
            }}
          >
            <FiShoppingBag className="store-settings-nav-icon" /> Store Profile
          </button>
          <button 
            className={`store-settings-nav-item ${activeSection === 'Contact Information' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('Contact Information');
              setShowBreadcrumb(false);
            }}
          >
            <FiUser className="store-settings-nav-icon" /> Contact Information
          </button>
          <button 
            className={`store-settings-nav-item ${activeSection === 'Store Address' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('Store Address');
              setShowBreadcrumb(false);
            }}
          >
            <FiMapPin className="store-settings-nav-icon" /> Store Address
          </button>
          <button 
            className={`store-settings-nav-item ${activeSection === 'Social Links' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('Social Links');
              setShowBreadcrumb(false);
            }}
          >
            <FiShare2 className="store-settings-nav-icon" /> Social Links
          </button>
          <button 
            className={`store-settings-nav-item ${activeSection === 'Store Policies' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('Store Policies');
              setShowBreadcrumb(false);
            }}
          >
            <FiFileText className="store-settings-nav-icon" /> Store Policies
          </button>
          <button 
            className={`store-settings-nav-item ${activeSection === 'SEO Settings' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('SEO Settings');
              setShowBreadcrumb(false);
            }}
          >
            <FiSearch className="store-settings-nav-icon" /> SEO Settings
          </button>
          <button 
            className={`store-settings-nav-item ${activeSection === 'Email Settings' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('Email Settings');
              setShowBreadcrumb(false);
            }}
          >
            <FiMail className="store-settings-nav-icon" /> Email Settings
          </button>
          <button 
            className={`store-settings-nav-item ${activeSection === 'Notification Settings' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('Notification Settings');
              setShowBreadcrumb(false);
            }}
          >
            <FiBell className="store-settings-nav-icon" /> Notification Settings
          </button>
          <button 
            className={`store-settings-nav-item ${activeSection === 'Maintenance Mode' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('Maintenance Mode');
              setShowBreadcrumb(false);
            }}
          >
            <FiTool className="store-settings-nav-icon" /> Maintenance Mode
          </button>
        </div>

        {/* Right Content Area */}
        <div className="store-settings-content-area">
          
          {/* Store Profile Section */}
          <div className="store-settings-card store-profile-card">
            <div className="store-settings-card-header">
              <div className="store-settings-card-title-wrapper">
                <FiShoppingBag className="store-settings-card-icon" />
                <div>
                  <h3>Store Profile</h3>
                  <p>Update your store details and profile information</p>
                </div>
              </div>
              <button 
                className="store-settings-close-card-btn" 
                onClick={() => setIsRightFormVisible(!isRightFormVisible)}
                title="Toggle Right Panel Layout"
              >
                <FiX />
              </button>
            </div>

            <div className={`store-profile-body-grid ${!isRightFormVisible ? 'expanded' : ''}`}>
              {/* Left Column: Logo & Upload */}
              <div className="store-logo-section">
                <label className="store-settings-label">Store Logo</label>
                <div className="store-logo-preview-box">
                  {storeLogo ? (
                    <img src={storeLogo} alt="Store Logo" className="store-logo-img" />
                  ) : (
                    <div className="store-logo-placeholder"><FiShoppingBag size={40} /></div>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={logoInputRef} 
                  style={{ display: 'none' }} 
                  accept="image/png, image/jpeg, image/webp" 
                  onChange={handleLogoFileChange} 
                />
                <div className="store-logo-actions">
                  <button className="store-settings-btn-primary" onClick={handleLogoChangeClick}>
                    <FiUpload /> Change Logo
                  </button>
                  <button className="store-settings-btn-secondary" onClick={handleLogoRemove}>
                    <FiTrash2 /> Remove
                  </button>
                </div>
                <span className="store-settings-hint">
                  Recommended size: 512x512px<br />JPG, PNG or WEBP. Max size 2MB
                </span>
              </div>

              {/* Right Column: Inputs */}
              {isRightFormVisible && (
                <div className="store-form-fields-section">
                  <div className="store-settings-row-2">
                    <div className="store-settings-field">
                      <label className="store-settings-label">Store Name <span>*</span></label>
                      <input 
                        type="text" 
                        className="store-settings-input" 
                        value={storeName} 
                        onChange={(e) => setStoreName(e.target.value)} 
                      />
                    </div>
                    <div className="store-settings-field">
                      <label className="store-settings-label">Tagline</label>
                      <input 
                        type="text" 
                        className="store-settings-input" 
                        value={tagline} 
                        onChange={(e) => setTagline(e.target.value)} 
                      />
                    </div>
                  </div>

                  <div className="store-settings-row-2">
                    <div className="store-settings-field">
                      <label className="store-settings-label">Store Email <span>*</span></label>
                      <input 
                        type="email" 
                        className="store-settings-input" 
                        value={storeEmail} 
                        onChange={(e) => setStoreEmail(e.target.value)} 
                      />
                    </div>
                    <div className="store-settings-field">
                      <label className="store-settings-label">Store Phone <span>*</span></label>
                      <input 
                        type="text" 
                        className="store-settings-input" 
                        value={storePhone} 
                        onChange={(e) => setStorePhone(e.target.value)} 
                      />
                    </div>
                  </div>

                  <div className="store-settings-row-2">
                    <div className="store-settings-field">
                      <label className="store-settings-label">Store Currency <span>*</span></label>
                      <div className="store-settings-select-wrapper">
                        <select 
                          className="store-settings-select" 
                          value={storeCurrency} 
                          onChange={(e) => setStoreCurrency(e.target.value)}
                        >
                          <option value="INR (₹) - Indian Rupee">INR (₹) - Indian Rupee</option>
                          <option value="USD ($) - US Dollar">USD ($) - US Dollar</option>
                          <option value="EUR (€) - Euro">EUR (€) - Euro</option>
                          <option value="GBP (£) - British Pound">GBP (£) - British Pound</option>
                        </select>
                        <FiChevronDown className="store-select-arrow" />
                      </div>
                    </div>
                    <div className="store-settings-field">
                      <label className="store-settings-label">Default Language <span>*</span></label>
                      <div className="store-settings-select-wrapper">
                        <select 
                          className="store-settings-select" 
                          value={defaultLanguage} 
                          onChange={(e) => setDefaultLanguage(e.target.value)}
                        >
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                        </select>
                        <FiChevronDown className="store-select-arrow" />
                      </div>
                    </div>
                  </div>

                  <div className="store-settings-field">
                    <label className="store-settings-label">Store Description</label>
                    <textarea 
                      className="store-settings-textarea" 
                      rows="4" 
                      value={storeDescription} 
                      onChange={(e) => setStoreDescription(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section: Admin Profile & Timezone */}
          <div className="store-settings-bottom-grid">
            
            {/* Admin Profile Card */}
            <div className="store-settings-card admin-profile-card">
              <div className="store-settings-card-header">
                <div className="store-settings-card-title-wrapper">
                  <FiUser className="store-settings-card-icon" />
                  <div>
                    <h3>Admin Profile</h3>
                    <p>Manage your admin account details</p>
                  </div>
                </div>
              </div>

              <div className="admin-profile-body">
                <div className="admin-avatar-section">
                  <div className="admin-avatar-preview-box">
                    {adminPhoto ? (
                      <img src={adminPhoto} alt="Admin Profile" className="admin-avatar-img" />
                    ) : (
                      <div className="admin-avatar-placeholder"><FiUser size={40} /></div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={adminPhotoInputRef} 
                    style={{ display: 'none' }} 
                    accept="image/png, image/jpeg, image/webp" 
                    onChange={handleAdminPhotoFileChange} 
                  />
                  <div className="admin-avatar-actions">
                    <button className="store-settings-btn-primary" onClick={handleAdminPhotoChangeClick}>
                      <FiUpload /> Change Photo
                    </button>
                    <button className="store-settings-btn-secondary" onClick={handleAdminPhotoRemove}>
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                  <span className="store-settings-hint">JPG, PNG or WEBP, Max size 2MB</span>
                </div>

                <div className="admin-form-fields">
                  <div className="store-settings-row-2">
                    <div className="store-settings-field">
                      <label className="store-settings-label">Full Name <span>*</span></label>
                      <input 
                        type="text" 
                        className="store-settings-input" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                      />
                    </div>
                    <div className="store-settings-field">
                      <label className="store-settings-label">Email Address <span>*</span></label>
                      <input 
                        type="email" 
                        className="store-settings-input" 
                        value={emailAddress} 
                        onChange={(e) => setEmailAddress(e.target.value)} 
                      />
                    </div>
                  </div>

                  <div className="store-settings-row-2">
                    <div className="store-settings-field">
                      <label className="store-settings-label">Role</label>
                      <div className="store-settings-select-wrapper">
                        <select 
                          className="store-settings-select" 
                          value={role} 
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="Super Administrator">Super Administrator</option>
                          <option value="Store Manager">Store Manager</option>
                          <option value="Inventory Control">Inventory Control</option>
                        </select>
                        <FiChevronDown className="store-select-arrow" />
                      </div>
                    </div>
                    <div className="store-settings-field">
                      <label className="store-settings-label">Password</label>
                      <input 
                        type="password" 
                        className="store-settings-input" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                      />
                    </div>
                  </div>

                  <div className="admin-password-action-row">
                    <button className="store-settings-btn-secondary" onClick={() => alert('Password change link sent!')}>
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Timezone Card */}
            <div className="store-settings-card timezone-card">
              <div className="store-settings-card-header">
                <div className="store-settings-card-title-wrapper">
                  <FiClock className="store-settings-card-icon" />
                  <div>
                    <h3>Store Timezone</h3>
                    <p>Set your store timezone</p>
                  </div>
                </div>
              </div>

              <div className="timezone-body">
                <div className="store-settings-field">
                  <label className="store-settings-label">Timezone <span>*</span></label>
                  <div className="store-settings-select-wrapper">
                    <select 
                      className="store-settings-select" 
                      value={timezone} 
                      onChange={(e) => setTimezone(e.target.value)}
                    >
                      <option value="(GMT +05:30) Asia/Kolkata">(GMT +05:30) Asia/Kolkata</option>
                      <option value="(GMT +00:00) UTC">(GMT +00:00) UTC</option>
                      <option value="(GMT -05:00) Eastern Time">(GMT -05:00) Eastern Time</option>
                      <option value="(GMT +01:00) Central European Time">(GMT +01:00) Central European Time</option>
                    </select>
                    <FiChevronDown className="store-select-arrow" />
                  </div>
                </div>

                <div className="current-time-display-box">
                  <div className="clock-icon-circle">
                    <FiClock size={22} />
                  </div>
                  <div>
                    <span className="current-time-label">Current Store Time</span>
                    <span className="current-time-date">Monday, 11 August 2026</span>
                    <span className="current-time-value">{currentTime || '03:15 PM'}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Secure Your Account Banner */}
          <div className="store-settings-card secure-account-banner">
            <div className="secure-banner-left">
              <div className="secure-shield-icon">
                <FiShield size={22} />
              </div>
              <div>
                <h4>Secure Your Account</h4>
                <p>Two-factor authentication adds an extra layer of security to your account.</p>
              </div>
            </div>
            <button className="store-settings-btn-secondary secure-action-btn" onClick={handleEnable2FA}>
              {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StoreSettings;