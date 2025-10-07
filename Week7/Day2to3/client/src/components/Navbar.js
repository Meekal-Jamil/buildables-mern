import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { toggleSidebar } from '../redux/slices/uiSlice';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="sidebar-toggle" onClick={handleToggleSidebar}>
          ☰
        </button>
        <h1 className="navbar-title">TaskTracker Pro</h1>
      </div>
      
      <div className="navbar-right">
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;