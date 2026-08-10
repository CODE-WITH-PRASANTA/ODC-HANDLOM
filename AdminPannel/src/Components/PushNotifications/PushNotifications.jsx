import React, { useState, useEffect, useRef } from 'react';
import { 
  FiUsers, FiUser, FiTag, FiClock, FiBold, FiItalic, FiUnderline, 
  FiList, FiCheckSquare, FiSmile, FiImage, FiUploadCloud, 
  FiBell, FiSmartphone, FiSend, FiSave, FiMinus, FiPlus, FiAlertCircle, FiChevronDown 
} from 'react-icons/fi';
import './PushNotifications.css';

export function PushNotifications() {
  const [notificationType, setNotificationType] = useState('all');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [includeAction, setIncludeAction] = useState(false);
  const [scheduleNotification, setScheduleNotification] = useState(false);
  const [importance, setImportance] = useState('high');
  const [sound, setSound] = useState('default');
  const [badgeCount, setBadgeCount] = useState(1);

  const [selectedFormat, setSelectedFormat] = useState('Normal');
  const [mediaFile, setMediaFile] = useState(null);
  const [scheduledDate, setScheduledDate] = useState('');
  const [actionButtonText, setActionButtonText] = useState('View Details');

  // Custom dropdown open states to guarantee 100% responsive alignment
  const [importanceOpen, setImportanceOpen] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const [formatOpen, setFormatOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setImportanceOpen(false);
        setSoundOpen(false);
        setFormatOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBadgeChange = (action) => {
    if (action === 'decrement' && badgeCount > 0) {
      setBadgeCount(badgeCount - 1);
    } else if (action === 'increment') {
      setBadgeCount(badgeCount + 1);
    }
  };

  const handleSend = () => {
    if (!title.trim() || !message.trim()) {
      alert('Please fill in both the Title and Message fields before sending.');
      return;
    }
    alert(`Notification Sent Successfully!\nTitle: ${title}\nType: ${notificationType}\nImportance: ${importance}\nSound: ${sound}\nBadge: ${badgeCount}${scheduleNotification ? `\nScheduled for: ${scheduledDate}` : ''}`);
  };

  const handleSaveDraft = () => {
    if (!title.trim() && !message.trim()) {
      alert('Cannot save an empty draft.');
      return;
    }
    alert('Notification saved as draft successfully!');
  };

  const handleFormat = (tag) => {
    setMessage((prev) => `${prev}[${tag}]Text[/${tag}]`);
  };

  const handleInsertEmoji = () => {
    setMessage((prev) => `${prev} 😊 `);
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        return;
      }
      setMediaFile(URL.createObjectURL(file));
    }
  };

  const importanceLabels = {
    high: 'High - Sound & alert',
    normal: 'Normal - Silent',
    low: 'Low - Minimal interruption'
  };

  const soundLabels = {
    default: 'Default',
    chime: 'Chime',
    none: 'None'
  };

  return (
    <div className="PushNotifications-container" ref={dropdownRef}>
      <div className="PushNotifications-header-section">
        <div className="PushNotifications-title-row">
          <div>
            <h1 className="PushNotifications-main-title">Push Notifications</h1>
            <p className="PushNotifications-subtitle">Create and broadcast targeted updates seamlessly</p>
          </div>
          <button type="button" className="PushNotifications-history-btn" onClick={() => alert('Opening Notification History...')}>
            <FiClock /> History
          </button>
        </div>
      </div>

      <div className="PushNotifications-grid-layout">
        <div className="PushNotifications-form-column">
          
          <div className="PushNotifications-card">
            <h2 className="PushNotifications-section-heading">
              <span className="PushNotifications-step-badge">1</span> Audience & Targeting
            </h2>
            <div className="PushNotifications-type-grid">
              <div 
                className={`PushNotifications-type-option ${notificationType === 'all' ? 'active' : ''}`}
                onClick={() => setNotificationType('all')}
              >
                <FiUsers className="PushNotifications-type-icon" />
                <div>
                  <div className="PushNotifications-type-label">All Users</div>
                  <div className="PushNotifications-type-desc">Broadcast globally</div>
                </div>
              </div>

              <div 
                className={`PushNotifications-type-option ${notificationType === 'segment' ? 'active' : ''}`}
                onClick={() => setNotificationType('segment')}
              >
                <FiUsers className="PushNotifications-type-icon" />
                <div>
                  <div className="PushNotifications-type-label">User Segment</div>
                  <div className="PushNotifications-type-desc">Target cohort</div>
                </div>
              </div>

              <div 
                className={`PushNotifications-type-option ${notificationType === 'topic' ? 'active' : ''}`}
                onClick={() => setNotificationType('topic')}
              >
                <FiTag className="PushNotifications-type-icon" />
                <div>
                  <div className="PushNotifications-type-label">Topic / Group</div>
                  <div className="PushNotifications-type-desc">Group channel</div>
                </div>
              </div>

              <div 
                className={`PushNotifications-type-option ${notificationType === 'individual' ? 'active' : ''}`}
                onClick={() => setNotificationType('individual')}
              >
                <FiUser className="PushNotifications-type-icon" />
                <div>
                  <div className="PushNotifications-type-label">Individual</div>
                  <div className="PushNotifications-type-desc">Single recipient</div>
                </div>
              </div>
            </div>
          </div>

          <div className="PushNotifications-card">
            <h2 className="PushNotifications-section-heading">
              <span className="PushNotifications-step-badge">2</span> Message Composer
            </h2>

            <div className="PushNotifications-input-group">
              <label className="PushNotifications-label">Title <span>*</span></label>
              <div className="PushNotifications-input-wrapper">
                <input 
                  type="text" 
                  maxLength={100}
                  placeholder="Enter notification title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="PushNotifications-text-input"
                />
                <span className="PushNotifications-char-counter">{title.length}/100</span>
              </div>
            </div>

            <div className="PushNotifications-input-group">
              <label className="PushNotifications-label">Message Body <span>*</span></label>
              <div className="PushNotifications-editor-box">
                <div className="PushNotifications-editor-toolbar">
                  <button type="button" onClick={() => handleFormat('b')} title="Bold"><FiBold /></button>
                  <button type="button" onClick={() => handleFormat('i')} title="Italic"><FiItalic /></button>
                  <button type="button" onClick={() => handleFormat('u')} title="Underline"><FiUnderline /></button>
                  <button type="button" onClick={() => handleFormat('list')} title="List"><FiList /></button>
                  <button type="button" onClick={() => handleFormat('task')} title="Task"><FiCheckSquare /></button>
                  <span className="PushNotifications-toolbar-divider"></span>
                  
                  {/* Custom Responsive Format Dropdown */}
                  <div className="PushNotifications-custom-dropdown-container">
                    <div 
                      className="PushNotifications-select-normal" 
                      onClick={() => { setFormatOpen(!formatOpen); setImportanceOpen(false); setSoundOpen(false); }}
                    >
                      <span>{selectedFormat}</span>
                      <FiChevronDown className="dropdown-arrow-icon" />
                    </div>
                    {formatOpen && (
                      <div className="PushNotifications-dropdown-menu">
                        <div className="PushNotifications-dropdown-item" onClick={() => { setSelectedFormat('Normal'); setFormatOpen(false); }}>Normal</div>
                        <div className="PushNotifications-dropdown-item" onClick={() => { setSelectedFormat('Heading'); setFormatOpen(false); }}>Heading</div>
                      </div>
                    )}
                  </div>

                  <div className="PushNotifications-toolbar-right">
                    <button type="button" onClick={handleInsertEmoji} title="Insert Emoji"><FiSmile /></button>
                    <button type="button" onClick={() => document.getElementById('media-upload-input').click()} title="Insert Image"><FiImage /></button>
                  </div>
                </div>
                <textarea 
                  maxLength={500}
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="PushNotifications-textarea"
                />
                <div className="PushNotifications-char-counter-bottom">{message.length}/500</div>
              </div>
            </div>

            <div className="PushNotifications-input-group">
              <label className="PushNotifications-label">Media Attachment <span>(Optional)</span></label>
              <input 
                id="media-upload-input" 
                type="file" 
                accept="image/*,.gif" 
                style={{ display: 'none' }} 
                onChange={handleMediaUpload}
              />
              <div className="PushNotifications-dropzone" onClick={() => document.getElementById('media-upload-input').click()}>
                <FiUploadCloud className="PushNotifications-upload-icon" />
                <div>
                  <span className="PushNotifications-upload-text">Click to upload</span> or drag and drop
                </div>
                <div className="PushNotifications-upload-hint">Images (JPG, PNG) or GIF (Max. 5MB)</div>
                {mediaFile && <div className="PushNotifications-upload-success">Media uploaded successfully!</div>}
              </div>
            </div>

            <div className="PushNotifications-additional-options">
              <div className="PushNotifications-option-row">
                <div>
                  <div className="PushNotifications-option-title">Include Action Button</div>
                  <div className="PushNotifications-option-desc">Add a clickable action link</div>
                </div>
                <label className="PushNotifications-switch">
                  <input 
                    type="checkbox" 
                    checked={includeAction} 
                    onChange={() => setIncludeAction(!includeAction)} 
                  />
                  <span className="PushNotifications-slider"></span>
                </label>
              </div>

              {includeAction && (
                <div className="PushNotifications-input-group action-group-sub">
                  <label className="PushNotifications-label">Button Text</label>
                  <input 
                    type="text" 
                    value={actionButtonText}
                    onChange={(e) => setActionButtonText(e.target.value)}
                    className="PushNotifications-text-input"
                    placeholder="e.g. View Details"
                  />
                </div>
              )}

              <div className="PushNotifications-option-row">
                <div>
                  <div className="PushNotifications-option-title">Schedule Notification</div>
                  <div className="PushNotifications-option-desc">Deliver at a specific time</div>
                </div>
                <label className="PushNotifications-switch">
                  <input 
                    type="checkbox" 
                    checked={scheduleNotification} 
                    onChange={() => setScheduleNotification(!scheduleNotification)} 
                  />
                  <span className="PushNotifications-slider"></span>
                </label>
              </div>

              {scheduleNotification && (
                <div className="PushNotifications-input-group schedule-group-sub">
                  <label className="PushNotifications-label">Date & Time</label>
                  <input 
                    type="datetime-local" 
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="PushNotifications-text-input"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="PushNotifications-card">
            <h2 className="PushNotifications-section-heading">
              <span className="PushNotifications-step-badge">3</span> Delivery Configurations
            </h2>

            {/* Custom Responsive Priority Level Dropdown */}
            <div className="PushNotifications-input-group">
              <label className="PushNotifications-label">Priority Level</label>
              <div className="PushNotifications-select-wrapper">
                <FiAlertCircle className="PushNotifications-select-icon-left" />
                <div 
                  className="PushNotifications-dropdown-custom"
                  onClick={() => { setImportanceOpen(!importanceOpen); setSoundOpen(false); setFormatOpen(false); }}
                >
                  <span className="dropdown-selected-text">{importanceLabels[importance]}</span>
                  <FiChevronDown className="dropdown-arrow-icon" />
                </div>
                {importanceOpen && (
                  <div className="PushNotifications-dropdown-menu">
                    <div className="PushNotifications-dropdown-item" onClick={() => { setImportance('high'); setImportanceOpen(false); }}>High - Sound & alert</div>
                    <div className="PushNotifications-dropdown-item" onClick={() => { setImportance('normal'); setImportanceOpen(false); }}>Normal - Silent</div>
                    <div className="PushNotifications-dropdown-item" onClick={() => { setImportance('low'); setImportanceOpen(false); }}>Low - Minimal interruption</div>
                  </div>
                )}
              </div>
            </div>

            <div className="PushNotifications-delivery-row">
              {/* Custom Responsive Sound Dropdown */}
              <div className="PushNotifications-input-group flex-1">
                <label className="PushNotifications-label">Sound Tone</label>
                <div className="PushNotifications-select-wrapper">
                  <FiBell className="PushNotifications-select-icon-left" />
                  <div 
                    className="PushNotifications-dropdown-custom"
                    onClick={() => { setSoundOpen(!soundOpen); setImportanceOpen(false); setFormatOpen(false); }}
                  >
                    <span className="dropdown-selected-text">{soundLabels[sound]}</span>
                    <FiChevronDown className="dropdown-arrow-icon" />
                  </div>
                  {soundOpen && (
                    <div className="PushNotifications-dropdown-menu">
                      <div className="PushNotifications-dropdown-item" onClick={() => { setSound('default'); setSoundOpen(false); }}>Default</div>
                      <div className="PushNotifications-dropdown-item" onClick={() => { setSound('chime'); setSoundOpen(false); }}>Chime</div>
                      <div className="PushNotifications-dropdown-item" onClick={() => { setSound('none'); setSoundOpen(false); }}>None</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="PushNotifications-input-group flex-1">
                <label className="PushNotifications-label">Badge Count</label>
                <div className="PushNotifications-counter-control">
                  <button 
                    type="button" 
                    onClick={() => handleBadgeChange('decrement')}
                    className="PushNotifications-counter-btn"
                  >
                    <FiMinus />
                  </button>
                  <input 
                    type="number" 
                    value={badgeCount} 
                    onChange={(e) => setBadgeCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="PushNotifications-counter-input"
                  />
                  <button 
                    type="button" 
                    onClick={() => handleBadgeChange('increment')}
                    className="PushNotifications-counter-btn"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="PushNotifications-preview-column">
          <div className="PushNotifications-card PushNotifications-preview-card">
            <h3 className="PushNotifications-preview-heading">Live Preview</h3>
            <p className="PushNotifications-preview-subtext">Real-time simulation on device</p>

            <div className="PushNotifications-phone-frame">
              <div className="PushNotifications-phone-screen">
                <div className="PushNotifications-simulated-banner">
                  <div className="PushNotifications-banner-header">
                    <div className="PushNotifications-app-info">
                      <img 
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=50&auto=format&fit=crop&q=60" 
                        alt="App Icon" 
                        className="PushNotifications-app-icon"
                      />
                      <span className="PushNotifications-app-name">ODC Handloom</span>
                    </div>
                    <span className="PushNotifications-banner-time">Just now</span>
                  </div>
                  <div className="PushNotifications-banner-body">
                    <div className="PushNotifications-banner-content-text">
                      <div className="PushNotifications-banner-title" style={selectedFormat === 'Heading' ? { fontSize: '15px', fontWeight: '800' } : {}}>
                        {title || 'Notification Title'}
                      </div>
                      <div className="PushNotifications-banner-message">
                        {message || 'This is the message content of your push notification preview.'}
                      </div>
                      {includeAction && (
                        <button type="button" className="PushNotifications-banner-action-btn">
                          {actionButtonText || 'View Details'}
                        </button>
                      )}
                    </div>
                    <img 
                      src={mediaFile || "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=100&auto=format&fit=crop&q=60"} 
                      alt="Thumbnail" 
                      className="PushNotifications-banner-thumb"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="PushNotifications-platforms">
              <div className="PushNotifications-platforms-label">Supported Platforms</div>
              <div className="PushNotifications-platforms-icons">
                <span className="PushNotifications-platform-item">
                  <span className="android-dot"></span> Android
                </span>
                <span className="PushNotifications-platform-item">
                  <FiSmartphone /> iOS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="PushNotifications-footer-bar">
        <div className="PushNotifications-summary-info">
          <div className="PushNotifications-summary-item-main">
            <img 
              src="https://images.unsplash.com/photo-1542744094-3a31243364d0?w=50&auto=format&fit=crop&q=60" 
              alt="Summary" 
              className="PushNotifications-summary-avatar"
            />
            <div>
              <div className="PushNotifications-summary-title">Summary State</div>
              <div className="PushNotifications-summary-tags">
                <span><FiUsers /> {notificationType.toUpperCase()}</span>
                <span><FiAlertCircle /> {importance.toUpperCase()}</span>
                <span><FiClock /> {scheduleNotification && scheduledDate ? 'Scheduled' : 'Instant'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="PushNotifications-footer-actions">
          <button 
            type="button" 
            onClick={handleSaveDraft} 
            className="PushNotifications-btn-secondary"
          >
            <FiSave /> Save Draft
          </button>
          <button 
            type="button" 
            onClick={handleSend} 
            className="PushNotifications-btn-primary"
          >
            <FiSend /> Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default PushNotifications;