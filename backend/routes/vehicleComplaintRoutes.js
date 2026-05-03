const express = require('express');
const db = require('../db');
const router = express.Router();

// Add FIR
router.post('/firs', (req, res) => {
    const { fir_no, vehicle_number, chase_no, model, brand, color, varient, fuel_type, owner_name, phone_no, lost_place, lost_date, status } = req.body;
    const sql = 'INSERT INTO fir_details (fir_no, vehicle_number, chase_no, model, brand, color, varient, fuel_type, owner_name, phone_no, lost_place, lost_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [fir_no, vehicle_number, chase_no, model, brand, color, varient, fuel_type, owner_name, phone_no, lost_place, lost_date, status], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('FIR added successfully');
    });
});

// Get FIRs
router.get('/firs', (req, res) => {
    const sql = 'SELECT * FROM fir_details';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Update FIR
// Update FIR (partial update)
router.put('/firs/:id', (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    
    // First get the current data
    db.query('SELECT * FROM fir_details WHERE fir_id = ?', [id], (selectErr, results) => {
        if (selectErr) return res.status(500).send(selectErr);
        if (results.length === 0) return res.status(404).send('FIR not found');
        
        // Merge existing data with update data
        const currentData = results[0];
        const updatedData = { ...currentData, ...updateData };
        
        // Update with merged data
        const sql = 'UPDATE fir_details SET fir_no = ?, vehicle_number = ?, chase_no = ?, model = ?, brand = ?, color = ?, varient = ?, fuel_type = ?, owner_name = ?, phone_no = ?, lost_place = ?, lost_date = ?, status = ? WHERE fir_id = ?';
        db.query(sql, [
            updatedData.fir_no, 
            updatedData.vehicle_number, 
            updatedData.chase_no, 
            updatedData.model, 
            updatedData.brand, 
            updatedData.color, 
            updatedData.varient, 
            updatedData.fuel_type, 
            updatedData.owner_name, 
            updatedData.phone_no, 
            updatedData.lost_place, 
            updatedData.lost_date, 
            updatedData.status, 
            id
        ], (updateErr) => {
            if (updateErr) return res.status(500).send(updateErr);
            res.send('FIR updated successfully');
        });
    });
});

// Delete FIR
router.delete('/firs/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM fir_details WHERE fir_id = ?';
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('FIR deleted successfully');
    });
});

module.exports = router;
