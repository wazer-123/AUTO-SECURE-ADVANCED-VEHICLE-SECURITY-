import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import AdminNavbar from '../../Component/AdminNavbar';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Staff', station_id: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
  try {

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/users`
    );

    setUsers(response.data);

  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
  const handleOpen = () => {
    setIsEditing(false);
    setFormData({ name: '', email: '', password: '', role: 'Staff' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("Name is required");
      return false;
    }
        const namepattern=/^[a-zA-Z\s]+$/;
        if(!namepattern.test(formData.name)){
          alert("user name should be letter");
          return;
  
  }
    if (!formData.email.trim()) {
      alert("Email is required");
      return false;
    }
    if (!isEditing && !formData.password.trim()) {
      alert("Password is required");
      return false;
    }
    if (!formData.role.trim()) {
      alert("Role is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {

  try {

    if (isEditing) {

      if (!validateForm()) {
        return;
      }

      // Update user
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/auth/users/${editUserId}`,
        formData
      );

    } else {

      if (!validateForm()) {
        return;
      }

      // Add new user
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        formData
      );
    }

    fetchUsers();
    handleClose();

  } catch (error) {
    console.error('Error saving user:', error);
  }
};

  const handleEdit = (user_id) => {
    const user = users.find((user) => user.user_id === user_id);
    setFormData({ name: user.name, email: user.email, password: '', role: user.role});
    setEditUserId(user_id);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (user_id) => {

  try {

    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/auth/users/${user_id}`
    );

    fetchUsers();

  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

  const columns = [
    { field: 'user_id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.user_id)} color="primary">
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.user_id)} color="secondary">
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div className="d-flex">
    <AdminNavbar />
    
    {/* Main Content */}
    <div className="flex-grow-1" style={{ marginLeft: '280px', minHeight: '100vh' }}>
      {/* Header */}
      <div className="bg-primary text-white shadow-sm p-4">
        <div className="container-fluid">
          <h4 className="m-0">Manage Users</h4>
        </div>
      </div>
      
      {/* Page Content */}
      <div className="container-fluid py-4">
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="card-title mb-0">User List</h5>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleOpen}
                    className="btn btn-primary"
                  >
                    <i className="fa fa-plus me-2"></i>Add User
                  </Button>
                </div>
                
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid 
                    rows={users} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                    getRowId={(row) => row.user_id} 
                    className="border-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Add/Edit User Dialog */}
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle className="bg-light border-bottom">
        {isEditing ? 'Edit User' : 'Add New User'}
      </DialogTitle>
      <DialogContent className="pt-4">
        <TextField
          margin="dense"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          className="mb-3"
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          className="mb-3"
        />
        {!isEditing && (
          <TextField
            margin="dense"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            className="mb-3"
          />
        )}
        <TextField
          margin="dense"
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          fullWidth
          className="mb-3"
        />
      </DialogContent>
      <DialogActions className="p-3 border-top">
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {isEditing ? 'Update User' : 'Add User'}
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  );
};

export default ManageUsers;
