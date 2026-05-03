import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography, MenuItem } from '@mui/material';
import axios from 'axios';
import PoliceNavbar from '../../Component/PoliceNavbar';

const AddFIR = () => {
    const [formData, setFormData] = useState({
        fir_no: '',
        vehicle_number: '',
        chase_no: '',
        model: '',
        brand: '',
        color: '',
        varient: '',
        fuel_type: '',
        owner_name: '',
        phone_no: '',
        lost_place: '',
        lost_date: '',
        status: 'pending'
    });

    useEffect(() => {
        const nextFIRNumber = getNextFIRNumber();
        setFormData((prevFormData) => ({
            ...prevFormData,
            fir_no: nextFIRNumber
        }));
    }, []);

    const getNextFIRNumber = () => {
        const currentNumber = localStorage.getItem('firNumber') || '0';
        const nextNumber = parseInt(currentNumber, 10) + 1;
        localStorage.setItem('firNumber', nextNumber.toString());
        return nextNumber.toString().padStart(6, '0'); // Pad with zeros to ensure a fixed length
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/firs', formData);
            console.log(response.data);
            alert('FIR submitted successfully!');
            
            // Reset form after successful submission
            const nextFIRNumber = getNextFIRNumber();
            setFormData({
                fir_no: nextFIRNumber,
                vehicle_number: '',
                chase_no: '',
                model: '',
                brand: '',
                color: '',
                varient: '',
                fuel_type: '',
                owner_name: '',
                phone_no: '',
                lost_place: '',
                lost_date: '',
                status: 'pending'
            });
        } catch (error) {
            console.error('There was an error submitting the form!', error);
            alert('Failed to submit FIR');
        }
    };

    return (
        <>
          <PoliceNavbar />
          
          <div className="content-wrapper" style={{
            marginLeft: '280px',
            padding: '30px',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh'
          }}>
            <div className="content-header mb-4">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-12">
                    <h1 className="m-0"><i className="fa fa-file-alt text-primary me-2"></i>Lodge FIR (First Information Report)</h1>
                  </div>
                </div>
              </div>
            </div>
    
            <div className="content">
              <div className="container-fluid">
                <div className="card shadow-sm">
                  <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <TextField
                              required
                              name="fir_no"
                              label="FIR Number"
                              fullWidth
                              value={formData.fir_no}
                              onChange={handleChange}
                              variant="outlined"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <TextField
                              required
                              name="vehicle_number"
                              label="Vehicle Number"
                              fullWidth
                              value={formData.vehicle_number}
                              onChange={handleChange}
                              variant="outlined"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <TextField
                              required
                              name="chase_no"
                              label="Chase Number"
                              fullWidth
                              value={formData.chase_no}
                              onChange={handleChange}
                              variant="outlined"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <TextField
                              required
                              name="model"
                              label="Model"
                              fullWidth
                              value={formData.model}
                              onChange={handleChange}
                              variant="outlined"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <TextField
                              required
                              name="brand"
                              label="Brand"
                              fullWidth
                              value={formData.brand}
                              onChange={handleChange}
                              variant="outlined"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <TextField
                              required
                              name="color"
                              label="Color"
                              fullWidth
                              value={formData.color}
                              onChange={handleChange}
                              variant="outlined"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <TextField
                              required
                              name="varient"
                              label="Variant"
                              fullWidth
                              value={formData.varient}
                              onChange={handleChange}
                              variant="outlined"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <TextField
                              required
                              name="fuel_type"
                              label="Fuel Type"
                              select
                              fullWidth
                              value={formData.fuel_type}
                              onChange={handleChange}
                              variant="outlined"
                            >
                              <MenuItem value="Petrol">Petrol</MenuItem>
                              <MenuItem value="Diesel">Diesel</MenuItem>
                              <MenuItem value="CNG">CNG</MenuItem>
                              <MenuItem value="Electric">Electric</MenuItem>
                              <MenuItem value="Hybrid">Hybrid</MenuItem>
                            </TextField>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <TextField
                              required
                              name="owner_name"
                              label="Owner Name"
                              fullWidth
                              value={formData.owner_name}
                              onChange={handleChange}
                              variant="outlined"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <TextField
                              required
                              name="phone_no"
                              label="Phone Number"
                              fullWidth
                              value={formData.phone_no}
                              onChange={handleChange}
                              variant="outlined"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <TextField
                              required
                              name="lost_place"
                              label="Place of Loss"
                              fullWidth
                              value={formData.lost_place}
                              onChange={handleChange}
                              variant="outlined"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <TextField
                              required
                              name="lost_date"
                              label="Date of Loss"
                              type="date"
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                              value={formData.lost_date}
                              onChange={handleChange}
                              variant="outlined"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <TextField
                              required
                              readOnly
                              name="status"
                              label="Status"
                              fullWidth
                              value={formData.status}
                              onChange={handleChange}
                              variant="outlined"
                            />
                          </div>
                        </div>
                        <div className="col-12 mt-4">
                          <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            size="large"
                            className="px-4 py-2"
                          >
                            <i className="fa fa-save me-2"></i>Submit FIR
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
};

export default AddFIR;