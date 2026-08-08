import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import './MainLayout.css';

// Reusable Breadcrumb inside Layout
const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const formatPathName = (name) => {
    return name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <nav className="Breadcrumb" aria-label="Breadcrumb">
      <ol className="Breadcrumb-list">
        <li className="Breadcrumb-item">
          <Link to="/dashboard" className="Breadcrumb-link">
            <Home size={14} />
          </Link>
        </li>
        {pathnames.length > 0 && <ChevronRight size={14} className="Breadcrumb-separator" />}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="Breadcrumb-item">
              {isLast ? (
                <span className="Breadcrumb-current">{formatPathName(value)}</span>
              ) : (
                <>
                  <Link to={to} className="Breadcrumb-link">
                    {formatPathName(value)}
                  </Link>
                  <ChevronRight size={14} className="Breadcrumb-separator" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// Breakpoint kept in one place so JS logic syncs with Sidebar.css / MainLayout.css
const DESKTOP_BREAKPOINT = 1024;

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= DESKTOP_BREAKPOINT : true
  );
  const [mobileSidebar, setMobileSidebar] = useState(false);

  // Handle responsive resizing, debounced so it doesn't fire on every pixel
  useEffect(() => {
    let resizeTimer;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth < DESKTOP_BREAKPOINT) {
          setSidebarOpen(false);
        } else {
          setSidebarOpen(true);
          setMobileSidebar(false);
        }
      }, 120);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileSidebar ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileSidebar]);

  const toggleSidebar = () => {
    if (window.innerWidth < DESKTOP_BREAKPOINT) {
      setMobileSidebar((prev) => !prev);
    } else {
      setSidebarOpen((prev) => !prev);
    }
  };

  return (
    <div className="MainLayout">
      <Sidebar
        sidebarOpen={sidebarOpen}
        mobileSidebar={mobileSidebar}
        setMobileSidebar={setMobileSidebar}
      />
      <div className={`MainContent-wrapper ${sidebarOpen ? 'expanded' : 'collapsed'}`}>
        <Topbar toggleSidebar={toggleSidebar} />
        <main className="MainContent">
          <Breadcrumb />
          <div className="MainContent-outlet">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;