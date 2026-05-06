import React, { use, useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PoliceNavbar from '../../Component/PoliceNavbar';
const SettingsPolice = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any session-related data
    localStorage.removeItem('userToken'); // Remove stored tokens if any
    navigate('/'); // Redirect to login page
  };

  const handlePasswordChange = async () => {
    const userId = localStorage.getItem('user_id');
    console.log('userId', userId);
    
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

  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/auth/change-password-police`,
    {
      currentPassword,
      newPassword,
      userId,
    }
  );

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
    <>
    <div>
<PoliceNavbar />
<div style={{
            marginLeft: '280px',}}>
        <div className="container  mt-4">
            <h2>Change Password</h2>
        <Container maxWidth="sm" backgroundColor="#f7f9f6" sx={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', minHeight: '80vh'}}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '30vh',
                }}
            >
                <Box sx={{ width: '100%', mt: 4 }}>
                   
                    {errorMessage && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {errorMessage}
                        </Alert>
                    )}
                    {successMessage && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {successMessage}
                        </Alert>
                    )}
                    <TextField
                        label="Current Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#FFD700', color: 'black', '&:hover': { backgroundColor: '#FFD700' } }}
                        fullWidth
                        onClick={handlePasswordChange}
                    >
                        Change Password
                    </Button>
                </Box>
            </Box>
        </Container>
        </div>
        </div>
            </div>
    </>
);
};

export default SettingsPolice;
