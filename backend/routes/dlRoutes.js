const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all LLRs with a specific status
router.get('/llr/status/:status', (req, res) => {
    const { status } = req.params;
    
    // Join with users table to get applicant name
    const sql = `
        SELECT l.*, u.name as user_name
        FROM llr l
        LEFT JOIN users u ON l.user_id = u.user_id
        WHERE l.status = ?
    `;
    
    db.query(sql, [status], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new DL
router.post('/dl', (req, res) => {
    const { 
        dl_no, 
        user_id, 
        llr_id, 
        issue_date, 
        expiry_date, 
        variants, 
        amount, 
        payment_status 
    } = req.body;
    
    // Validate required fields
    if (!dl_no) return res.status(400).json({ error: "DL number cannot be null" });
    if (!user_id) return res.status(400).json({ error: "User ID cannot be null" });
    if (!llr_id) return res.status(400).json({ error: "LLR ID cannot be null" });
    
    // Check if DL number already exists
    const checkSql = 'SELECT * FROM driving_license WHERE dl_no = ?';
    db.query(checkSql, [dl_no], (checkErr, checkResults) => {
        if (checkErr) return res.status(500).json({ error: checkErr.message });
        
        if (checkResults.length > 0) {
            return res.status(400).json({ error: "DL number already exists" });
        }
        
        const sql = `
            INSERT INTO driving_license (
                dl_no, 
                user_id, 
                llr_id, 
                issue_date, 
                expiry_date, 
                variants, 
                amount, 
                payment_status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        db.query(
            sql, 
            [dl_no, user_id, llr_id, issue_date, expiry_date, variants, amount, payment_status], 
            (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ 
                    message: 'Driving License created successfully', 
                    id: result.insertId 
                });
            }
        );
    });
});

// Get all DLs
router.get('/dl', (req, res) => {
    const sql = `
        SELECT dl.*, u.name as user_name
        FROM driving_license dl
        LEFT JOIN users u ON dl.user_id = u.user_id
    `;
    
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get DL by ID
router.get('/dl/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT dl.*, u.name as user_name, u.email, u.phone, u.address
        FROM driving_license dl
        LEFT JOIN users u ON dl.user_id = u.user_id
        WHERE dl.dl_id = ?
    `;
    
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (results.length === 0) {
            return res.status(404).json({ error: "Driving License not found" });
        }
        
        res.json(results[0]);
    });
});

// Get DL by User ID
router.get('/dl/user/:userId', (req, res) => {
    const { userId } = req.params;
    const sql = `
        SELECT dl.*, u.name as user_name
        FROM driving_license dl
        LEFT JOIN users u ON dl.user_id = u.user_id
        WHERE dl.user_id = ?
    `;
    
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Update payment status
router.put('/dl/:id/payment', (req, res) => {
    const { id } = req.params;
    const { payment_status } = req.body;
    
    if (!payment_status) {
        return res.status(400).json({ error: "Payment status cannot be null" });
    }
    
    const sql = 'UPDATE driving_license SET payment_status = ? WHERE dl_id = ?';
    db.query(sql, [payment_status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Driving License not found" });
        }
        
        res.json({ message: 'Payment status updated successfully' });
    });
});

// Update DL
router.put('/dl/:id', (req, res) => {
    const { id } = req.params;
    const { 
        dl_no, 
        user_id, 
        llr_id, 
        issue_date, 
        expiry_date, 
        variants, 
        amount, 
        payment_status 
    } = req.body;
    
    if (!dl_no) {
        return res.status(400).json({ error: "DL number cannot be null" });
    }
    
    const sql = `
        UPDATE driving_license 
        SET dl_no = ?, user_id = ?, llr_id = ?, issue_date = ?, 
            expiry_date = ?, variants = ?, amount = ?, payment_status = ?
        WHERE dl_id = ?
    `;
    
    db.query(
        sql, 
        [dl_no, user_id, llr_id, issue_date, expiry_date, variants, amount, payment_status, id], 
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Driving License not found" });
            }
            
            res.json({ message: 'Driving License updated successfully' });
        }
    );
});

// Delete DL
router.delete('/dl/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM driving_license WHERE dl_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Driving License not found" });
        }
        
        res.json({ message: 'Driving License deleted successfully' });
    });
});

module.exports = router;