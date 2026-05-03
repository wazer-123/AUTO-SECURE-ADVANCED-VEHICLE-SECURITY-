import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import AdminNavbar from '../../Component/AdminNavbar';

const ViewComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ description: '', status: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editComplaintId, setEditComplaintId] = useState(null);

    useEffect(() => {
        fetchComplaints();
        fetchVehicles();
        fetchUsers();
    }, []);

    const fetchComplaints = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/firs');
            setComplaints(response.data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/vehicles');
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
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
                await axios.put(`http://localhost:5000/api/firs/${editComplaintId}`, formData);
                fetchComplaints();
                handleClose();
            }
        } catch (error) {
            console.error('Error updating complaint:', error);
        }
    };

    const handleEdit = (fir_id) => {
        const complaint = complaints.find((complaint) => complaint.fir_id === fir_id);
        setFormData({ description: complaint.description, status: complaint.status });
        setEditComplaintId(fir_id);
        setIsEditing(true);
        setOpen(true);
    };

    const handleDelete = async (fir_id) => {
        try {
            await axios.delete(`http://localhost:5000/api/firs/${fir_id}`);
            fetchComplaints();
        } catch (error) {
            console.error('Error deleting complaint:', error);
        }
    };

    const columns = [
        { field: 'fir_id', headerName: 'ID', width: 90 },
        { field: 'fir_no', headerName: 'FIR No', width: 150 },
        { field: 'vehicle_number', headerName: 'Vehicle Number', width: 150 },
        { field: 'chase_no', headerName: 'Chase No', width: 150 },
        { field: 'model', headerName: 'Model', width: 150 },
        { field: 'brand', headerName: 'Brand', width: 150 },
        { field: 'color', headerName: 'Color', width: 150 },
        { field: 'varient', headerName: 'Varient', width: 150 },
        { field: 'fuel_type', headerName: 'Fuel Type', width: 150 },
        { field: 'owner_name', headerName: 'Owner Name', width: 150 },
        { field: 'phone_no', headerName: 'Phone No', width: 150 },
        { field: 'lost_place', headerName: 'Lost Place', width: 150 },
        // { field: 'lost_date', headerName: 'Lost Date', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.row.fir_id)} color="primary">
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.fir_id)} color="secondary">
                        <Delete />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <div style={{ display: 'flex' }}>
            <AdminNavbar />
            <div style={{ marginLeft: '270px', padding: '20px', width: '79%' }}>
            <div className="bg-primary text-white shadow-sm p-4">
            <div className="container-fluid">
              <h4 className="m-0">View Complaints</h4>
            </div>
          </div>
          
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={complaints} columns={columns} pageSize={5} checkboxSelection getRowId={(row) => row.fir_id} />
                </div>

                {/* Edit Complaint Dialog */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Complaint</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Resolved">Resolved</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default ViewComplaints;
