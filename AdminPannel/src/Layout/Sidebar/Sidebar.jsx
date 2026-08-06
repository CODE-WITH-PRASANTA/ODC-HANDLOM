import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
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
} from "lucide-react";

import "./Sidebar.css";

const menuSections = [
  {
    title: null,
    items: [{ label: "Dashboard", path: "/dashboard", icon: Home }]
  },
  {
    title: "PRODUCTS",
    items: [
      { label: "Products", path: "/products/all-products", icon: ShoppingBag },
      { label: "Categories", path: "/products/categories", icon: ListTree },
      { label: "Collections", path: "/products/collections", icon: Gem },
      { label: "Brands", path: "/products/brands", icon: Tag },
      { label: "Attributes", path: "/products/attributes", icon: SlidersHorizontal }
    ]
  },
  {
    title: "SALES",
    items: [
      { label: "Orders", path: "/sales/orders", icon: Package },
      { label: "Customers", path: "/sales/customers", icon: Users },
      { label: "Coupons", path: "/sales/coupons", icon: Ticket },
      { label: "Refunds", path: "/sales/refunds", icon: RotateCcw },
      { label: "Payments", path: "/sales/payments", icon: Wallet },
      { label: 'Products', path: '/addnewproduct', icon: ShoppingBag },
    ]
  },
  {
    title: "MARKETING",
    items: [
      { label: "Banner Sliders", path: "/marketing/banner-sliders", icon: ImageIcon },
      { label: "Flash Sale", path: "/marketing/flash-sale", icon: Zap },
      { label: "Newsletters", path: "/marketing/newsletters", icon: Mail },
      { label: "Push Notifications", path: "/marketing/push-notifications", icon: Bell },
      { label: 'Orders', path: '/order', icon: Package },
      { label: 'Customers', path: '/sales/customers', icon: Users },
      { label: 'Coupons', path: '/sales/coupons', icon: Ticket },
      { label: 'Refunds', path: '/refund', icon: RotateCcw },
      { label: 'Payments', path: '/sales/payments', icon: Wallet },
    ]
  },
  {
    title: "REPORTS",
    items: [
      { label: "Reports", path: "/reports/reports", icon: BarChart3 },
      { label: "Sales Analytics", path: "/reports/sales-analytics", icon: PieChart }
    ]
  },
  {
    title: "SETTINGS",
    items: [
      { label: "Store Settings", path: "/settings/store-settings", icon: Settings },
      { label: "Shipping Methods", path: "/settings/shipping-methods", icon: Truck },
      { label: "Payment Methods", path: "/settings/payment-methods", icon: CreditCard },
      { label: "Users & Roles", path: "/settings/users-roles", icon: UserCog }
    ]
  }
];

const Sidebar = ({ sidebarOpen, mobileSidebar, setMobileSidebar }) => {
  const showLabels = sidebarOpen || mobileSidebar;

  return (
    <>
      {mobileSidebar && (
        <div
          className="Sidebar-overlay"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      <aside
        className={`Sidebar ${sidebarOpen ? "expanded" : "collapsed"} ${
          mobileSidebar ? "mobile-open" : ""
        }`}
      >
        {/* Header / Logo */}
        <div className="Sidebar-header">
          <span className="Sidebar-headerDot Sidebar-headerDot-left" />
          <span className="Sidebar-headerDot Sidebar-headerDot-right" />

          <div className="Sidebar-logoMark">
            <svg viewBox="0 0 40 40" width="26">
              <circle cx="20" cy="20" r="16" fill="#C23A17" />
            </svg>
          </div>

          {showLabels && (
            <motion.div
              className="Sidebar-brandText"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h1>Odc</h1>
              <h2>HANDLOOM</h2>
              <span>HANDMADE WITH HERITAGE</span>
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <nav className="Sidebar-nav">
          {menuSections.map((section, index) => (
            <div className="SidebarSection" key={section.title ?? `section-${index}`}>
              {section.title && showLabels && (
                <div className="SidebarSection-title">{section.title}</div>
              )}

              <ul className="Sidebar-menu">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li key={item.path} className="SidebarItem">
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `SidebarItem-link ${isActive ? "active" : ""}`
                        }
                        onClick={() => setMobileSidebar(false)}
                        title={!showLabels ? item.label : undefined}
                      >
                        <Icon size={18} className="SidebarItem-icon" />
                        {showLabels && <span>{item.label}</span>}
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
              <span className="SidebarPlan-badge">ACTIVE</span>
            </div>

            <p className="SidebarPlan-expiry">Renews on Dec 31, 2026</p>

            <button className="SidebarPlan-upgradeBtn" type="button">
              Upgrade Plan
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;