const express = require('express');
const db = require('../db');
const router = express.Router();

// Add Document Verification
router.post('/document-verifications', (req, res) => {
    const { vehicle_id, document_name, status } = req.body;
    const sql = 'INSERT INTO document_verification (vehicle_id, document_name, status) VALUES (?, ?, ?)';
    db.query(sql, [vehicle_id, document_name, status], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Document verification added successfully');
    });
});

// Get Document Verifications
router.get('/document-verifications', (req, res) => {
    const sql = 'SELECT * FROM document_verification';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Update Document Verification
router.put('/document-verifications/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const sql = 'UPDATE document_verification SET status = ? WHERE document_id = ?';
    db.query(sql, [status, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Document verification updated successfully');
    });
});

// Delete Document Verification
router.delete('/document-verifications/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM document_verification WHERE document_id = ?';
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Document verification deleted successfully');
    });
});

module.exports = router;
