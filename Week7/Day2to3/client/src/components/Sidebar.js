import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css';

const Sidebar = () => {
  const { sidebarOpen } = useSelector((state) => state.ui);

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <nav className="sidebar-nav">
        <NavLink to="/" className="nav-link">
          <span className="nav-icon">📈</span>
          Dashboard
        </NavLink>
        <NavLink to="/tasks" className="nav-link">
          <span className="nav-icon">📝</span>
          Tasks
        </NavLink>
        <NavLink to="/categories" className="nav-link">
          <span className="nav-icon">📁</span>
          Categories
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;