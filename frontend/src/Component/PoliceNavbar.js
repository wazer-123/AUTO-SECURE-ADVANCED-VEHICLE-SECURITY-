import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const PoliceNavbar = () => {
  const handleClick = () => {
    window.open("http://127.0.0.1:5000", "_blank");
  };
  return (
    <div className="bg-white border-end shadow-sm" style={{ width: '280px', height: '100vh', position: 'fixed', left: 0 }}>
      <div className="d-flex flex-column h-100">
        {/* Logo/Brand Header */}
        <div className="border-bottom p-3">
          <h2 className="m-0"><i className="fa fa-shield-alt text-primary me-2"></i>Auto Secure</h2>
        </div>
        
        {/* Navigation Links */}
        <div className="py-2 flex-grow-1 overflow-auto">
          <div className="nav flex-column">
            <Link to="/PoliceDash" className="nav-link py-3 border-bottom">
              <i className="fa fa-tachometer-alt me-2 text-primary"></i> Dashboard
            </Link>
            <Link to="/police/add-fir" className="nav-link py-3 border-bottom">
              <i className="fa fa-file-alt me-2 text-primary"></i> Lodge FIR
            </Link>
            <Link to="/police/apply-emission-test" className="nav-link py-3 border-bottom">
              <i className="fa fa-leaf me-2 text-primary"></i> Apply Emission Test
            </Link>
            <Link to="/police/approve-llr" className="nav-link py-3 border-bottom">
              <i className="fa fa-id-card me-2 text-primary"></i> Approve LLR
            </Link>
            <Link to="/police/approve-dl-renewal" className="nav-link py-3 border-bottom">
              <i className="fa fa-address-card me-2 text-primary"></i> Approve DL Renewal
            </Link>
            <Link onClick={handleClick} className="nav-link py-3 border-bottom">
              <i className="fa fa-file-alt me-2 text-primary"></i> Vehicle Number Detection
            </Link>
               <Link to="/police/settings" className="nav-link py-3 border-bottom">
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

export default PoliceNavbar;