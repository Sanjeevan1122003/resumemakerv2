// src/dashboard/DashboardLayout.js
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaFileAlt,
  FaDownload,
  FaUser,
  FaSignOutAlt,
  FaPalette
} from 'react-icons/fa';
import './Dashboard.css';
import { userAPI, authAPI } from '../service/api'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (authAPI.isAuthenticated()) {
        try {
          const result = await userAPI.getUserDetails();
          if (result) {
            setUser(result);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserData();
  }, []);
  const handleLogout = () => {
    try {
      authAPI.logout();
      navigate('/login');
    } catch (err) {
      alert(err?.message || 'Logout failed');
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems = [
    { path: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/dashboard/templates', icon: <FaPalette />, label: 'Templates' },
    { path: '/dashboard/resumes', icon: <FaFileAlt />, label: 'My Resumes' },
  ];

  return (
    <div className="dashboard-container">
      {/* Desktop Sidebar - Hidden on mobile/tablet */}
      <aside className={`sidebar d-none d-lg-flex ${sidebarOpen ? 'open' : 'closed'} shadow`}>
        <div className="sidebar-header">
          <button className="sidebar-toggle btn btn-link text-decoration-none" onClick={toggleSidebar}>
            {sidebarOpen ? (
              <div className="logo-section">
                <FaFileAlt className="logo-icon" />
                <h2 className="logo-text">Resume Maker</h2>
              </div>
            ) : <FaBars className='text-dark' />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
              end
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className="user-profile-btn"
          >
            <div className="user-avatar">
              <FaUser />
            </div>
            {sidebarOpen && (
              <div className="user-info">
                <div className="user-name">{user.username}</div>
                <div className="user-email">{user.email}</div>
              </div>
            )}
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation - Show on mobile & tablet */}
      <nav className="mobile-bottom-nav d-lg-none">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? 'active' : ''}`
            }
            end
          >
            <span className="mobile-nav-icon">{item.icon}</span>
          </NavLink>
        ))}

        <button
          className="mobile-nav-link"
          onClick={handleLogout}
        >
          <span className="mobile-nav-icon"><FaSignOutAlt /></span>
        </button>
      </nav>

      {/* Main Content */}
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;