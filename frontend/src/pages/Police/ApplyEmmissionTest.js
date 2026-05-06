import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import axios from 'axios';
import PoliceNavbar from '../../Component/PoliceNavbar';

const ApplyEmissionTest = () => {
    const [formData, setFormData] = useState({
        Vehicle_no: '',
        Date_of_Emission_test: ''
    });

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

    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/emission_test`,
        formData
    );

    console.log(response.data);

    alert('Emission test submitted successfully!');
            
            // Reset form after successful submission
            setFormData({
                Vehicle_no: '',
                Date_of_Emission_test: ''
            });
        } catch (error) {
            console.error('There was an error submitting the form!', error);
            if (error.response && error.response.data) {
                console.error('Server error details:', error.response.data);
            }
            alert('Failed to submit emission test');
        }
    };

    return (
        <>
          <PoliceNavbar />
          
          <div className="content-area" style={{
            marginLeft: '280px',
            padding: '20px',
            width: 'calc(100% - 280px)',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa'
          }}>
            <div className="container py-4">
              <div className="card shadow-sm">
                <div className="card-header bg-white">
                  <h4 className="mb-0">
                    <i className="fa fa-leaf text-primary me-2"></i>
                    Apply Emission Test
                  </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="Vehicle_no" className="form-label">Vehicle Number</label>
                          <input
                            type="text"
                            className="form-control"
                            id="Vehicle_no"
                            name="Vehicle_no"
                            value={formData.Vehicle_no}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="Date_of_Emission_test" className="form-label">Date of Emission Test</label>
                          <input
                            type="date"
                            className="form-control"
                            id="Date_of_Emission_test"
                            name="Date_of_Emission_test"
                            value={formData.Date_of_Emission_test}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button type="submit" className="btn btn-primary">
                        <i className="fa fa-check-circle me-2"></i>Submit Emission Test
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      );
};

export default ApplyEmissionTest;