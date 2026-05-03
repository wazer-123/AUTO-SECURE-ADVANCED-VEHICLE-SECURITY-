import React from 'react';
import PoliceNavbar from '../../Component/PoliceNavbar';

const PoliceDash = () => {
  return (
    <div className="d-flex">
      <PoliceNavbar />
      
      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: '280px', minHeight: '100vh' }}>
        {/* Header */}
        <div className="bg-primary text-white shadow-sm p-4">
          <div className="container-fluid">
            <h4 className="m-0">Police Dashboard</h4>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="container-fluid py-4">
          <div className="row g-4">
            {/* Welcome Card */}
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h5 className="card-title">Welcome to Police Dashboard</h5>
                  <p className="card-text">
                    Use the navigation menu on the left to manage various police operations in the Auto Shield system.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Quick Access Cards */}
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fa fa-file-alt text-primary me-2"></i>FIR Management</h5>
                  <p className="card-text">Lodge new FIRs and manage existing reports in the system.</p>
                  <a href="/police/add-fir" className="btn btn-sm btn-outline-primary">Lodge FIR</a>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fa fa-leaf text-primary me-2"></i>Emission Tests</h5>
                  <p className="card-text">Apply for new emission tests and view test history.</p>
                  <a href="/police/apply-emission-test" className="btn btn-sm btn-outline-primary">Apply Test</a>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fa fa-id-card text-primary me-2"></i>License Approvals</h5>
                  <p className="card-text">Review and approve LLR applications and DL renewals.</p>
                  <a href="/police/approve-llr" className="btn btn-sm btn-outline-primary">Manage Licenses</a>
                </div>
              </div>
            </div>
            
            {/* Activity Summary */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliceDash;