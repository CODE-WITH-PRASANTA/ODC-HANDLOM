import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Search,
  Sun,
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
  CheckCircle,
  Package,
  ShoppingBag,
  UserPlus,
  ChevronDown
} from 'lucide-react';
import './Topbar.css';

const notificationsData = [
  { id: 1, title: 'New Order Received', time: '2 min ago', icon: ShoppingBag, color: '#2563EB' },
  { id: 2, title: 'New User Registered', time: '5 min ago', icon: UserPlus, color: '#22C55E' },
  { id: 3, title: 'Inventory Updated', time: '20 min ago', icon: Package, color: '#F59E0B' },
  { id: 4, title: 'Payment Successful', time: '1 hour ago', icon: CheckCircle, color: '#16A34A' },
];

const Topbar = ({ toggleSidebar }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [isCompact, setIsCompact] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const handleResize = () => setIsCompact(mq.matches);
    handleResize();
    mq.addEventListener('change', handleResize);
    return () => mq.removeEventListener('change', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="Topbar">
      <div className="Topbar-left">
        <button className="Topbar-toggleBtn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <Menu size={22} />
        </button>

        <div className="SearchBar">
          <input
            type="text"
            placeholder={isCompact ? 'Search...' : 'Search for orders, products, customers...'}
            className="SearchBar-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="SearchBar-btn" aria-label="Search">
            <Search size={17} />
          </button>
        </div>
      </div>

      <div className="Topbar-right">
        {/* Theme Toggle */}
        <button
          className="IconBtn"
          onClick={() => setIsDark(!isDark)}
          aria-label="Toggle theme"
        >
          <Sun size={19} />
        </button>

        {/* Notification Container */}
        <div className="Notification" ref={notificationRef}>
          <button
            className="IconBtn"
            onClick={() => setNotificationOpen(!notificationOpen)}
            aria-label="Notifications"
          >
            <Bell size={19} />
            <span className="Notification-badge">{notificationsData.length}</span>
          </button>

          <AnimatePresence>
            {notificationOpen && (
              <motion.div
                className="NotificationItem-popup"
                initial={{ opacity: 0, scale: 0.85, translateY: -10 }}
                animate={{ opacity: 1, scale: 1, translateY: 0 }}
                exit={{ opacity: 0, scale: 0.85, translateY: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="NotificationItem-header">
                  <h3>Notifications</h3>
                </div>
                <div className="NotificationItem-list">
                  {notificationsData.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={item.id} className="NotificationItem-single">
                        <div className="NotificationItem-iconWrapper" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                          <IconComponent size={16} />
                        </div>
                        <div className="NotificationItem-content">
                          <p className="NotificationItem-title">{item.title}</p>
                          <span className="NotificationItem-time">{item.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="NotificationItem-footer">
                  <button>View All</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="ProfileMenu" ref={profileRef}>
          <div
            className="ProfileMenu-trigger"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="ProfileMenu-avatar">
              <User size={17} />
            </div>
            <div className="ProfileMenu-info">
              <span className="ProfileMenu-name">Admin User</span>
              <span className="ProfileMenu-role">Super Admin</span>
            </div>
            <ChevronDown size={16} className={`ProfileMenu-chevron ${profileOpen ? 'open' : ''}`} />
          </div>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                className="ProfileMenu-dropdown"
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <button className="ProfileMenu-item">
                  <User size={16} /> My Profile
                </button>
                <button className="ProfileMenu-item">
                  <Settings size={16} /> Settings
                </button>
                <button className="ProfileMenu-item">
                  <HelpCircle size={16} /> Help
                </button>
                <div className="ProfileMenu-divider" />
                <button className="ProfileMenu-item danger">
                  <LogOut size={16} /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Topbar;