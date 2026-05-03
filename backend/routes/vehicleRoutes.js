const express = require('express');
const db = require('../db');
const router = express.Router();

// Add Vehicle
router.post('/vehicles', (req, res) => {
    const { owner_id, vehicle_number, model, color, rfid_tag } = req.body;
    const sql = 'INSERT INTO vehicles (owner_id, vehicle_number, model, color, rfid_tag) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [owner_id, vehicle_number, model, color, rfid_tag], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Vehicle added successfully');
    });
});

// Get Vehicles
router.get('/vehicles', (req, res) => {
    const sql = 'SELECT * FROM vehicles';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Update Vehicle
router.put('/vehicles/:id', (req, res) => {
    const { id } = req.params;
    const { vehicle_number, model, color, rfid_tag } = req.body;
    const sql = 'UPDATE vehicles SET vehicle_number = ?, model = ?, color = ?, rfid_tag = ? WHERE vehicle_id = ?';
    db.query(sql, [vehicle_number, model, color, rfid_tag, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Vehicle updated successfully');
    });
});

// Delete Vehicle
router.delete('/vehicles/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM vehicles WHERE vehicle_id = ?';
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Vehicle deleted successfully');
    });
});

module.exports = router;
