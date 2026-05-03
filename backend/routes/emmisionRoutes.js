const express = require('express');
const db = require('../db');
const router = express.Router();

// Add Emission Test
router.post('/emission_test', (req, res) => {
    const { Vehicle_no, Date_of_Emission_test } = req.body;
    const sql = 'INSERT INTO Emission_Test (Vehicle_no, Date_of_Emission_test) VALUES (?, ?)';
    db.query(sql, [Vehicle_no, Date_of_Emission_test], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Emission test added successfully');
    });
});

// Get Emission Tests
router.get('/emission_test', (req, res) => {
    const sql = 'SELECT * FROM Emission_Test';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Update Emission Test
router.put('/emission_test/:id', (req, res) => {
    const { id } = req.params;
    const { Vehicle_no, Date_of_Emission_test } = req.body;
    const sql = 'UPDATE Emission_Test SET Vehicle_no = ?, Date_of_Emission_test = ? WHERE Test_id = ?';
    db.query(sql, [Vehicle_no, Date_of_Emission_test, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Emission test updated successfully');
    });
});

// Delete Emission Test
router.delete('/emission_test/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Emission_Test WHERE Test_id = ?';
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Emission test deleted successfully');
    });
});

// Get Emission Tests by User ID
router.get('/emission_test/user/:user_id', (req, res) => {
    const { user_id } = req.params;
    const sql = `
        SELECT et.* 
        FROM Emission_Test et
        JOIN Vehicles v ON et.Vehicle_no = v.vehicle_number
        WHERE v.owner_id = ?
    `;
    db.query(sql, [user_id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

module.exports = router;
