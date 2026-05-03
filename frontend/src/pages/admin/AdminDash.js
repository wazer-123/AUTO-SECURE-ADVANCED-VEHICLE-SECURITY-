import React from 'react';
import AdminNavbar from '../../Component/AdminNavbar';

const AdminDash = () => {
  return (
    <div className="d-flex">
      <AdminNavbar />
      
      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: '280px', minHeight: '100vh' }}>
        {/* Header */}
        <div className="bg-primary text-white shadow-sm p-4">
          <div className="container-fluid">
            <h4 className="m-0">Admin Dashboard</h4>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="container-fluid py-4">
          <div className="row g-4">
            {/* Welcome Card */}
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h5 className="card-title">Welcome to Admin Dashboard</h5>
                  <p className="card-text">
                    Use the navigation menu on the left to manage various aspects of the Auto Secure system.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Quick Access Cards */}
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fa fa-users text-primary me-2"></i>User Management</h5>
                  <p className="card-text">Manage users, update permissions, and view user activities.</p>
                  <a href="/admin/manage-user" className="btn btn-sm btn-outline-primary">Manage Users</a>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fa fa-car text-primary me-2"></i>Vehicle Management</h5>
                  <p className="card-text">View and manage vehicle registrations and track vehicle status.</p>
                  <a href="/admin/manage-vehicle" className="btn btn-sm btn-outline-primary">Manage Vehicles</a>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fa fa-exclamation-circle text-primary me-2"></i>Complaints</h5>
                  <p className="card-text">Review and respond to user complaints and support requests.</p>
                  <a href="/admin/view-complaints" className="btn btn-sm btn-outline-primary">View Complaints</a>
                </div>
              </div>
            </div>
            
            {/* System Status */}
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="card-title mb-0">System Status</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td width="30%"><strong>Server Status</strong></td>
                          <td><span className="badge bg-success">Online</span></td>
                        </tr>
                        <tr>
                          <td><strong>Database Connection</strong></td>
                          <td><span className="badge bg-success">Connected</span></td>
                        </tr>
                        <tr>
                          <td><strong>Last Backup</strong></td>
                          <td>Mar 09, 2025 - 02:30 AM</td>
                        </tr>
                        <tr>
                          <td><strong>System Version</strong></td>
                          <td>Auto Secure v1.2.5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;