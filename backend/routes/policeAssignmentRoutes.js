const express = require('express');
const db = require('../db');
const router = express.Router();

// Add Police Assignment
router.post('/police-assignments', (req, res) => {
    const { complaint_id, police_id, status } = req.body;
    const sql = 'INSERT INTO police_assignment (complaint_id, police_id, status) VALUES (?, ?, ?)';
    db.query(sql, [complaint_id, police_id, status], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Police assignment added successfully');
    });
});

// Get Police Assignments
router.get('/police-assignments', (req, res) => {
    const sql = 'SELECT * FROM police_assignment';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Update Police Assignment
router.put('/police-assignments/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const sql = 'UPDATE police_assignment SET status = ? WHERE assignment_id = ?';
    db.query(sql, [status, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Police assignment updated successfully');
    });
});

// Delete Police Assignment
router.delete('/police-assignments/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM police_assignment WHERE assignment_id = ?';
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Police assignment deleted successfully');
    });
});

module.exports = router;
