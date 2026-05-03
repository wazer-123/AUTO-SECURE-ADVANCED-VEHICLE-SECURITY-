const express = require('express');
const db = require('../db');
const router = express.Router();

// Add Vehicle Tax
router.post('/vehicle_tax', (req, res) => {
    const { vehicle_id, amount_due, due_date, status } = req.body;
    const sql = 'INSERT INTO vehicle_tax (vehicle_id, amount_due, due_date, status) VALUES (?, ?, ?, ?)';
    db.query(sql, [vehicle_id, amount_due, due_date, status], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Vehicle tax added successfully');
    });
});

// Get Vehicle Taxes
router.get('/vehicle_tax', (req, res) => {
    const sql = 'SELECT * FROM vehicle_tax';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Update Vehicle Tax
router.put('/vehicle_tax/:id', (req, res) => {
    const { id } = req.params;
    const { amount_due, due_date, status } = req.body;
    const sql = 'UPDATE vehicle_tax SET amount_due = ?, due_date = ?, status = ? WHERE tax_id = ?';
    db.query(sql, [amount_due, due_date, status, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Vehicle tax updated successfully');
    });
});

// Delete Vehicle Tax
router.delete('/vehicle_tax/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM vehicle_tax WHERE tax_id = ?';
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Vehicle tax deleted successfully');
    });
});

module.exports = router;
