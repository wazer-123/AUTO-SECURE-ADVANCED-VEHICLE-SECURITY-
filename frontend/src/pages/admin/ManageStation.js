import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import AdminNavbar from '../../Component/AdminNavbar';

const ManageStation = () => {
    const [stations, setStations] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentStation, setCurrentStation] = useState({ id: '', name: '', phone: '' });
    const [isEditing, setIsEditing] = useState(false);
    const namePattern = /^[a-zA-Z]+$/;

    // Fetch stations
    const fetchStations = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/stations');
            setStations(response.data);
        } catch (error) {
            console.error('Error fetching stations:', error);
        }
    };

    useEffect(() => {
        fetchStations();
    }, []);

    // Handle dialog open/close
    const handleOpen = (station = { id: '', name: '', phone: '' }) => {
        setCurrentStation(station);
        setIsEditing(Boolean(station.id));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentStation({ id: '', name: '', phone: '' });
    };

    // Add or update station
    const handleSave = async () => {
        const { id, name, phone } = currentStation;

        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/stations/${id}`, { station_name: name, phone_number: phone });
            } else {
                if(currentStation.name===''){
                    alert('name is required');
                    return;
                }
        if (!namePattern.test(currentStation.name)){
            alert ('name can only contain letters and spaces.');
            return;
        }
        if(currentStation.id===''){
            alert('id is required');
            return;
        }
        if(currentStation.phone===''){
            alert('phone number is empty');
            return;
        }
                await axios.post('http://localhost:5000/api/stations', { station_name: name, phone_number: phone });
            }
            fetchStations();
            handleClose();
        } catch (error) {
            console.error('Error saving station:', error);
        }
    };

    // Delete station
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this station?')) {
            try {
                await axios.delete(`http://localhost:5000/api/stations/${id}`);
                fetchStations();
            } catch (error) {
                console.error('Error deleting station:', error);
            }
        }
    };

    return (
        <>
            <AdminNavbar />
            <div style={{ marginLeft: '270px', padding: '20px', width: '80%' }}>
                <Box p={3}>
                    <Typography variant="h4" gutterBottom>
                        Manage Stations
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => handleOpen()} style={{ marginBottom: '20px' }}>
                        Add Station
                    </Button>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stations.map((station) => (
                                    <TableRow key={station.station_id}>
                                        <TableCell>{station.station_id}</TableCell>
                                        <TableCell>{station.station_name}</TableCell>
                                        <TableCell>{station.phone_number}</TableCell>
                                        <TableCell align="right">
                                            <IconButton color="primary" onClick={() => handleOpen({ id: station.station_id, name: station.station_name, phone: station.phone_number })}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="secondary" onClick={() => handleDelete(station.station_id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Add/Edit Station Dialog */}
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{isEditing ? 'Edit Station' : 'Add Station'}</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Name"
                                fullWidth
                                value={currentStation.name}
                                onChange={(e) => setCurrentStation({ ...currentStation, name: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="Phone Number"
                                fullWidth
                                value={currentStation.phone}
                                onChange={(e) => setCurrentStation({ ...currentStation, phone: e.target.value })}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSave} variant="contained" color="primary">
                                {isEditing ? 'Update' : 'Add'}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </div>
        </>
    );
};

export default ManageStation;
