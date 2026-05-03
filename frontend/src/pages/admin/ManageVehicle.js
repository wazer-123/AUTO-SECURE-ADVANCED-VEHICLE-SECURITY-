import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import AdminNavbar from '../../Component/AdminNavbar';

const ManageVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [owners, setOwners] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ owner_id: '', vehicle_number: '', model: '', color: '', rfid_tag: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editVehicleId, setEditVehicleId] = useState(null);
    const namePattern = /^[a-zA-Z]+$/;
    useEffect(() => {
        fetchVehicles();
        fetchUsers();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/vehicles'); // API endpoint to fetch vehicles
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/users');
            setOwners(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleOpen = () => {
        setIsEditing(false);
        setFormData({ owner_id: '', vehicle_number: '', model: '', color: '', rfid_tag: '' });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (isEditing) {
                // Update vehicle
                await axios.put(`http://localhost:5000/api/vehicles/${editVehicleId}`, formData);
            } else {
                if(formData.owner_id===''){
                    alert('owner id is required');
                    return;
                }
                if (!namePattern.test(formData.name)){
                    alert ('name can only contain letters and spaces.');
                    return;
                }
                if(formData.vehicle_number===''){
                    alert('vehicle number is required');
                    return;
                }
                if(formData.model===''){
                    alert('model is required');
                    return;
                }
                if(formData.color===''){
                    alert('color is required');
                    return;
                }
                if(formData.rfid_tag===''){
                    alert('rfid tag is required');
                    return;
                }
                // Add new vehicle
                await axios.post('http://localhost:5000/api/vehicles', formData);
            }
            fetchVehicles();
            handleClose();
        } catch (error) {
            console.error('Error saving vehicle:', error);
        }
    };

    const handleEdit = (vehicle_id) => {
        const vehicle = vehicles.find((vehicle) => vehicle.vehicle_id === vehicle_id);
        setFormData({ owner_id: vehicle.owner_id, vehicle_number: vehicle.vehicle_number, model: vehicle.model, color: vehicle.color, rfid_tag: vehicle.rfid_tag });
        setEditVehicleId(vehicle_id);
        setIsEditing(true);
        setOpen(true);
    };

    const handleDelete = async (vehicle_id) => {
        try {
            await axios.delete(`http://localhost:5000/api/vehicles/${vehicle_id}`);
            fetchVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    const columns = [
        { field: 'vehicle_id', headerName: 'ID', width: 90 },
        { 
            field: 'owner_id', 
            headerName: 'Owner', 
            width: 150,
            renderCell: (params) => {
                const owner = owners.find((owner) => owner.user_id === params.value);
                return owner ? owner.name : 'Unknown';
            }
        },
        { field: 'vehicle_number', headerName: 'Vehicle Number', width: 150 },
        { field: 'model', headerName: 'Model', width: 150 },
        { field: 'color', headerName: 'Color', width: 150 },
        { field: 'rfid_tag', headerName: 'RFID Tag', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.row.vehicle_id)} color="primary">
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.vehicle_id)} color="secondary">
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
              <h4 className="m-0">Manage Vehicles</h4>
            </div>
          </div>
          
          {/* Page Content */}
          <div className="container-fluid py-4">
            <div className="row mb-4">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="card-title mb-0">Vehicle List</h5>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleOpen}
                        className="btn btn-primary"
                      >
                        <i className="fa fa-plus me-2"></i>Add Vehicle
                      </Button>
                    </div>
                    
                    <div style={{ height: 400, width: '100%' }}>
                      <DataGrid 
                        rows={vehicles} 
                        columns={columns} 
                        pageSize={5} 
                        checkboxSelection 
                        getRowId={(row) => row.vehicle_id}
                        className="border-0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add/Edit Vehicle Dialog */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle className="bg-light border-bottom">
            {isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}
          </DialogTitle>
          <DialogContent className="pt-4">
            <FormControl fullWidth margin="dense" className="mb-3">
              <InputLabel>Owner</InputLabel>
              <Select
                name="owner_id"
                value={formData.owner_id}
                onChange={handleChange}
                displayEmpty
              >
                {owners.length > 0 ? (
                  owners.map((owner) => (
                    <MenuItem key={owner.user_id} value={owner.user_id}>
                      {owner.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Owners Available</MenuItem>
                )}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Vehicle Number"
              name="vehicle_number"
              value={formData.vehicle_number}
              onChange={handleChange}
              fullWidth
              required
              className="mb-3"
            />
            <TextField
              margin="dense"
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              fullWidth
              required
              className="mb-3"
            />
            <TextField
              margin="dense"
              label="Color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              fullWidth
              required
              className="mb-3"
            />
            <TextField
              margin="dense"
              label="RFID Tag"
              name="rfid_tag"
              value={formData.rfid_tag}
              onChange={handleChange}
              fullWidth
              required
              className="mb-3"
            />
          </DialogContent>
          <DialogActions className="p-3 border-top">
            <Button onClick={handleClose} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary" variant="contained">
              {isEditing ? 'Update Vehicle' : 'Add Vehicle'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
};

export default ManageVehicles;
