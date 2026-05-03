import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any session-related data
    localStorage.removeItem('userToken'); // Remove stored tokens if any
    navigate('/'); // Redirect to login page
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}   sx={{ backgroundColor: '#FFD700', color: 'black', '&:hover': { backgroundColor: '#FFD700' } }} fullWidth>
      Logout
    </Button>
  );
};

export default LogoutButton;
