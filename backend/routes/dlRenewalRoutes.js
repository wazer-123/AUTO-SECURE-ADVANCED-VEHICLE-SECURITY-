const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust path to your database connection

// Create a new DL renewal application
router.post('/renewal', (req, res) => {
    const { 
        dl_no, name, phone_no, dob, address, 
        valid_from, valid_to, amount, user_id 
    } = req.body;

    // Validate required fields
    if (!dl_no || !name || !phone_no || !dob || !address || !valid_from || !valid_to || !amount || !user_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Create renewal record with pending status
    const renewalData = {
        dl_no,
        name,
        phone_no,
        dob,
        address,
        valid_from,
        valid_to,
        amount,
        status: 'pending',
        user_id
    };

    const sql = 'INSERT INTO dl_renewal SET ?';

    db.query(sql, renewalData, (err, result) => {
        if (err) {
            console.error('Failed to submit renewal application:', err);
            return res.status(500).json({ error: 'Failed to submit renewal application' });
        }
        
        return res.status(201).json({ 
            message: 'Renewal application submitted successfully', 
            renewal_id: result.insertId 
        });
    });
});

// Check if user has an existing renewal application
router.get('/renewal/check/:userId', (req, res) => {
    const { userId } = req.params;
    
    const sql = `
        SELECT * FROM dl_renewal
        WHERE user_id = ?
        ORDER BY renewal_id DESC
        LIMIT 1
    `;
    
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error checking existing renewal:', err);
            return res.status(500).json({ error: 'Error checking existing renewal application' });
        }
        
        if (results.length > 0) {
            return res.json({ 
                hasRenewal: true, 
                renewal: results[0] 
            });
        }
        
        return res.json({ hasRenewal: false });
    });
});

// Get all renewal applications (for admin panel)
router.get('/renewal', (req, res) => {
    const sql = `
        SELECT r.*, u.name as user_name 
        FROM dl_renewal r
        LEFT JOIN users u ON r.user_id = u.user_id
        ORDER BY r.renewal_id DESC
    `;
    
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Update renewal application status
// router.put('/renewal/:renewalId', (req, res) => {
//     const { renewalId } = req.params;
//     const { status } = req.body;
    
//     if (!status) {
//         return res.status(400).json({ error: 'Status is required' });
//     }
    
//     const sql = 'UPDATE dl_renewal SET status = ? WHERE renewal_id = ?';
    
//     db.query(sql, [status, renewalId], (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
        
//         // If approved, update the driving license validity dates
//         if (status.toLowerCase() === 'approved') {
//             // First get the renewal information
//             db.query('SELECT * FROM dl_renewal WHERE renewal_id = ?', [renewalId], (err, results) => {
//                 if (err) return res.status(500).json({ error: err.message });
                
//                 if (results.length > 0) {
//                     const renewal = results[0];
//                     // Update the driving license with new validity dates
//                     db.query(
//                         'UPDATE driving_license SET valid_from = ?, valid_to = ? WHERE dl_no = ?',
//                         [renewal.valid_from, renewal.valid_to, renewal.dl_no],
//                         (err, result) => {
//                             if (err) return res.status(500).json({ error: err.message });
//                         }
//                     );
//                 }
//             });
//         }
        
//         res.json({ message: 'Renewal application status updated successfully' });
//     });
// });

router.put('/renewal/:renewalId', (req, res) => {
    const { renewalId } = req.params;
    const { status } = req.body;
    
    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }
    
    const sql = 'UPDATE dl_renewal SET status = ? WHERE renewal_id = ?';
    
    db.query(sql, [status, renewalId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        
        // If approved, update the driving license validity dates
        if (status.toLowerCase() === 'approved') {
            // First get the renewal information
            db.query('SELECT * FROM dl_renewal WHERE renewal_id = ?', [renewalId], (err, results) => {
                if (err) {
                    console.error('Error fetching renewal details:', err);
                    return res.status(500).json({ error: err.message });
                }
                
                if (results.length > 0) {
                    const renewal = results[0];
                    // Update the driving license with new validity dates
                    db.query(
                        'UPDATE driving_license SET issue_date = ?, expiry_date = ? WHERE dl_no = ?',
                        [renewal.valid_from, renewal.valid_to, renewal.dl_no],
                        (err, result) => {
                            if (err) {
                                console.error('Error updating license dates:', err);
                                return res.status(500).json({ error: err.message });
                            }
                            return res.json({ message: 'Renewal application approved and license updated successfully' });
                        }
                    );
                } else {
                    return res.status(404).json({ error: 'Renewal application not found' });
                }
            });
        } else {
            // For non-approval statuses, send response here
            return res.json({ message: 'Renewal application status updated successfully' });
        }
    });
});

// Get specific renewal application by ID
router.get('/renewal/:renewalId', (req, res) => {
    const { renewalId } = req.params;
    
    const sql = `
        SELECT r.*, u.name as user_name 
        FROM dl_renewal r
        LEFT JOIN users u ON r.user_id = u.user_id
        WHERE r.renewal_id = ?
    `;
    
    db.query(sql, [renewalId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Renewal application not found' });
        }
        
        res.json(results[0]);
    });
});

module.exports = router;