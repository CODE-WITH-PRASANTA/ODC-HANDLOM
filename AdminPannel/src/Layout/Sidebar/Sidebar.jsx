import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  ShoppingBag,
  ListTree,
  Gem,
  Tag,
  SlidersHorizontal,
  Package,
  Users,
  Ticket,
  RotateCcw,
  Wallet,
  Image as ImageIcon,
  Zap,
  Mail,
  Bell,
  BarChart3,
  PieChart,
  Settings,
  Truck,
  CreditCard,
  UserCog,
  Sparkles
} from 'lucide-react';
import './Sidebar.css';

const menuSections = [
  {
    title: null,
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: Home }
    ]
  },
  {
    title: 'PRODUCTS',
    items: [
      { label: 'Products', path: '/products/all-products', icon: ShoppingBag },
      { label: 'AllProduct', path: 'products/add-new', icon: ShoppingBag },

      { label: 'Categories', path: '/products/categories', icon: ListTree },
      { label: 'Collections', path: '/products/collections', icon: Gem },
      { label: 'Brands', path: '/products/brands', icon: Tag },
      { label: 'Attributes', path: '/products/attributes', icon: SlidersHorizontal },
    ]
  },
  {
    title: 'SALES',
    items: [
      { label: 'Orders', path: '/sales/orders', icon: Package },
       { label: 'Customers', path: '/sales/customers', icon: Users },
      { label: 'Coupons', path: '/sales/coupons', icon: Ticket },
      { label: 'Refunds', path: '/sales/refunds', icon: RotateCcw },
      { label: 'Payments', path: '/sales/payments', icon: Wallet },
    ]
  },
  {
    title: 'MARKETING',
    items: [
      { label: 'Banner Sliders', path: '/marketing/banner-sliders', icon: ImageIcon },
      { label: 'Flash Sale', path: '/marketing/flash-sale', icon: Zap },
      { label: 'Newsletters', path: '/marketing/newsletters', icon: Mail },
      { label: 'Push Notifications', path: '/marketing/push-notifications', icon: Bell },
    ]
  },
  {
    title: 'REPORTS',
    items: [
      { label: 'Reports', path: '/reports/reports', icon: BarChart3 },
      
    ]
  },
  {
    title: 'SETTINGS',
    items: [
      { label: 'Store Settings', path: '/settings/store-settings', icon: Settings },
      { label: 'Shipping Methods', path: '/settings/shipping-methods', icon: Truck },
      { label: 'Payment Methods', path: '/settings/payment-methods', icon: CreditCard },
      { label: 'Users & Roles', path: '/settings/users-roles', icon: UserCog },
    ]
  }
];

const Sidebar = ({ sidebarOpen, mobileSidebar, setMobileSidebar }) => {
  const location = useLocation();
  const showLabels = sidebarOpen || mobileSidebar;

  return (
    <>
      {mobileSidebar && (
        <div
          className="Sidebar-overlay"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      <aside className={`Sidebar ${sidebarOpen ? 'expanded' : 'collapsed'} ${mobileSidebar ? 'mobile-open' : ''}`}>
        {/* Header / Logo card */}
        <div className="Sidebar-header">
          <span className="Sidebar-headerDot Sidebar-headerDot-left" />
          <span className="Sidebar-headerDot Sidebar-headerDot-right" />
          <div className="Sidebar-logoMark" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="26" height="26">
              <path
                d="M20 4 C 24 10, 32 12, 32 20 C 32 28, 24 30, 20 36 C 16 30, 8 28, 8 20 C 8 12, 16 10, 20 4 Z"
                fill="url(#logoGrad)"
              />
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#EA7A2E" />
                  <stop offset="100%" stopColor="#C23A17" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <AnimatePresence>
            {showLabels && (
              <motion.div
                className="Sidebar-brandText"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <h1>Gdc</h1>
                <h2>HANDLOOM</h2>
                <span>HANDMADE WITH HERITAGE</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="Sidebar-nav">
          {menuSections.map((section, idx) => (
            <div key={idx} className="SidebarSection">
              {section.title && showLabels && (
                <div className="SidebarSection-title">{section.title}</div>
              )}
              {section.title && !showLabels && (
                <div className="SidebarSection-divider" />
              )}
              <ul className="Sidebar-menu">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path} className="SidebarItem">
                      <NavLink
                        to={item.path}
                        className={`SidebarItem-link ${isActive ? 'active' : ''}`}
                        title={!showLabels ? item.label : ''}
                        onClick={() => setMobileSidebar(false)}
                      >
                        <Icon className="SidebarItem-icon" size={18} />
                        {showLabels && (
                          <span className="SidebarItem-text">{item.label}</span>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Premium Plan Card */}
        {showLabels && (
          <div className="SidebarPlan">
            <div className="SidebarPlan-top">
              <div className="SidebarPlan-titleRow">
                <Sparkles size={14} className="SidebarPlan-icon" />
                <span className="SidebarPlan-title">Premium Plan</span>
              </div>
              <span className="SidebarPlan-badge">Active</span>
            </div>
            <p className="SidebarPlan-expiry">Expires on 25 Dec, 2025</p>
            <button className="SidebarPlan-upgradeBtn">Upgrade Plan</button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;