const express = require('express');
const db = require('../db');
const router = express.Router();

// Add LLR
router.post('/llr', (req, res) => {
    const { llr_no, LLR_issue_date, user_id } = req.body;
    
    // Validate required fields
    if (!llr_no) {
        return res.status(400).json({ error: "LLR number cannot be null" });
    }
    if (!LLR_issue_date) {
        return res.status(400).json({ error: "LLR issue date cannot be null" });
    }
    if (!user_id) {
        return res.status(400).json({ error: "User ID cannot be null" });
    }
    
    // Check if user already has an LLR application
    const checkSql = 'SELECT * FROM llr WHERE user_id = ?';
    db.query(checkSql, [user_id], (checkErr, checkResults) => {
        if (checkErr) return res.status(500).json({ error: checkErr.message });
        
        if (checkResults.length > 0) {
            return res.status(400).json({ error: "User already has an LLR application" });
        }
        
        // Status is set to 'pending' by default
        const sql = 'INSERT INTO llr (llr_no, LLR_issue_date, user_id, status) VALUES (?, ?, ?, "pending")';
        db.query(sql, [llr_no, LLR_issue_date, user_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'LLR added successfully', id: result.insertId });
        });
    });
});

// Get all LLRs
router.get('/llr', (req, res) => {
    const sql = 'SELECT * FROM llr';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get LLR by ID
router.get('/llr/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM llr WHERE LLR_id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (results.length === 0) {
            return res.status(404).json({ error: "LLR not found" });
        }
        
        res.json(results[0]);
    });
});

// Get LLRs by user ID
router.get('/llr/user/:userId', (req, res) => {
    const { userId } = req.params;
    const sql = 'SELECT * FROM llr WHERE user_id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Update LLR
router.put('/llr/:id', (req, res) => {
    const { id } = req.params;
    const { llr_no, LLR_issue_date, user_id, status } = req.body;
    
    // Validate required fields
    if (!llr_no) {
        return res.status(400).json({ error: "LLR number cannot be null" });
    }
    
    const sql = 'UPDATE llr SET llr_no = ?, LLR_issue_date = ?, user_id = ?, status = ? WHERE LLR_id = ?';
    db.query(sql, [llr_no, LLR_issue_date, user_id, status || 'pending', id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "LLR not found" });
        }
        
        res.json({ message: 'LLR updated successfully' });
    });
});

// Delete LLR
router.delete('/llr/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM llr WHERE LLR_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "LLR not found" });
        }
        
        res.json({ message: 'LLR deleted successfully' });
    });
});

// Get latest LLR number
router.get('/llr/latest', (req, res) => {
    const sql = 'SELECT llr_no FROM llr ORDER BY LLR_id DESC LIMIT 1';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        let lastLLR = 9999; // Default starting value
        
        if (results.length > 0) {
            // Extract the numeric part from the LLR number
            const match = results[0].llr_no.match(/KALLR(\d+)/);
            if (match && match[1]) {
                lastLLR = parseInt(match[1]);
            }
        }
        
        res.json({ lastLLR });
    });
});

// Check if user has an existing LLR application
router.get('/llr/check/:userId', (req, res) => {
    const { userId } = req.params;
    const sql = 'SELECT * FROM llr WHERE user_id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        res.json({ 
            hasApplication: results.length > 0,
            application: results.length > 0 ? results[0] : null
        });
    });
});


module.exports = router;