import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import axios from 'axios';
import AdminNavbar from '../../Component/AdminNavbar';

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePasswordChange = async () => {
    // Basic validation
    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMessage('Password should be at least 6 characters long.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/change-password', {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        setSuccessMessage('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrorMessage('');
      } else {
        setErrorMessage('Incorrect current password.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="d-flex">
      <AdminNavbar />
      
      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: '280px', minHeight: '100vh' }}>
        {/* Header */}
        <div className="bg-primary text-white shadow-sm p-4">
          <div className="container-fluid">
            <h4 className="m-0">Settings</h4>
          </div>
        </div>
        
        {/* Page Content */}
        <div className="container-fluid py-4">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="card-title mb-0">Change Password</h5>
                </div>
                <div className="card-body p-4">
                  {errorMessage && (
                    <div className="alert alert-danger mb-4" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  {successMessage && (
                    <div className="alert alert-success mb-4" role="alert">
                      {successMessage}
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                    <TextField
                      id="currentPassword"
                      type="password"
                      fullWidth
                      variant="outlined"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      size="small"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <TextField
                      id="newPassword"
                      type="password"
                      fullWidth
                      variant="outlined"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      size="small"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                    <TextField
                      id="confirmPassword"
                      type="password"
                      fullWidth
                      variant="outlined"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      size="small"
                    />
                  </div>
                  
                  <div className="d-grid">
                  <Button
  variant="contained"
  sx={{ backgroundColor: '#FFD700', color: 'black', '&:hover': { backgroundColor: '#FFD700' } }}
  fullWidth
  onClick={handlePasswordChange}
>
  Change Password
</Button>

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

export default Settings;
