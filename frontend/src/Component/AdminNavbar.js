import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const AdminNavbar = () => {
  return (
    <div className="bg-white border-end shadow-sm" style={{ width: '280px', height: '100vh', position: 'fixed', left: 0 }}>
      <div className="d-flex flex-column h-100">
        {/* Logo/Brand Header */}
        <div className="border-bottom p-3">
          <h2 className="m-0"><i className="fa fa-car text-primary me-2"></i>Auto Secure</h2>
        </div>
        
        {/* Navigation Links */}
        <div className="py-2 flex-grow-1 overflow-auto">
          <div className="nav flex-column">
            <Link to="/AdminDash" className="nav-link py-3 border-bottom">
              <i className="fa fa-tachometer-alt me-2 text-primary"></i> Dashboard
            </Link>
            <Link to="/admin/manage-user" className="nav-link py-3 border-bottom">
              <i className="fa fa-users me-2 text-primary"></i> Manage Users
            </Link>
            <Link to="/admin/manage-vehicle" className="nav-link py-3 border-bottom">
              <i className="fa fa-car me-2 text-primary"></i> Manage Vehicles
            </Link>
            <Link to="/admin/view-complaints" className="nav-link py-3 border-bottom">
              <i className="fa fa-exclamation-circle me-2 text-primary"></i> View Complaints
            </Link>
            <Link to="/admin/settings" className="nav-link py-3 border-bottom">
              <i className="fa fa-cog me-2 text-primary"></i> Settings
            </Link>
          </div>
        </div>
        
        {/* Logout Button at Bottom */}
        <div className="mt-auto border-top p-3">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;