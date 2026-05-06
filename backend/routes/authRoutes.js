const express = require('express');
const db = require('../db');
const router = express.Router();

// Register
router.post('/register', (req, res) => {
  let { name, email, password, role } = req.body;

  
  if (!role) {
    role = "Staff";  // or "user" (your choice)
  }

  const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';

  db.query(sql, [name, email, password, role], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Registration successful');
  });
});

// Login
// router.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
//   db.query(sql, [email, password], (err, result) => {
//     if (err) return res.status(500).send(err);
//     if (result.length > 0) {
//       res.json({ success: true, role: result[0].role });
//     } else {
//       res.status(401).send('Invalid credentials');
//     }
//   });
// });


router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT user_id, role FROM users WHERE email = ? AND password = ?';
  
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length > 0) {
      res.json({ success: true, user_id: result[0].user_id, role: result[0].role });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});


// Change Password for Admin
router.post('/change-password', (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const sql = 'SELECT * FROM users WHERE role = "Admin"';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send('Error occurred');

    const user = result[0]; // Assuming there's only one admin user
    if (user) {
      if (user.password === currentPassword) {
        const updateSql = 'UPDATE users SET password = ? WHERE user_id = ?';
        db.query(updateSql, [newPassword, user.user_id], (err) => {
          if (err) return res.status(500).send('Failed to update password');
          res.json({ success: true });
        });
      } else {
        res.status(401).send('Incorrect current password');
      }
    } else {
      res.status(404).send('User not found');
    }
  });
});

// Change Password for User
router.post('/change-password-staff', (req, res) => {
  console.log('CHANGE PASSWORD ENDPOINT CALLED');
  const { currentPassword, newPassword, userId } = req.body; // Add userId to the request
  console.log('currentPassword', currentPassword);
  console.log('newPassword', newPassword);
  console.log('userId', userId);
  // Get the specific user by ID
  const sql = 'SELECT * FROM users WHERE user_id = ? AND role = "Staff"';
  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Error occurred' });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = result[0];
    
    if (user.password === currentPassword) {
      const updateSql = 'UPDATE users SET password = ? WHERE user_id = ?';
      db.query(updateSql, [newPassword, userId], (err) => {
        if (err) return res.status(500).json({ success: false, message: 'Failed to update password' });
        res.json({ success: true });
      });
    } else {
      res.status(401).json({ success: false, message: 'Incorrect current password' });
    }
  });
});

router.post('/change-password-police', (req, res) => {
  console.log('CHANGE PASSWORD ENDPOINT CALLED');
  const { currentPassword, newPassword, userId } = req.body; // Add userId to the request
  console.log('currentPassword', currentPassword);
  console.log('newPassword', newPassword);
  console.log('userId', userId);
  // Get the specific user by ID
  const sql = 'SELECT * FROM users WHERE user_id = ? AND role = "Police"';
  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Error occurred' });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = result[0];
    
    if (user.password === currentPassword) {
      const updateSql = 'UPDATE users SET password = ? WHERE user_id = ?';
      db.query(updateSql, [newPassword, userId], (err) => {
        if (err) return res.status(500).json({ success: false, message: 'Failed to update password' });
        res.json({ success: true });
      });
    } else {
      res.status(401).json({ success: false, message: 'Incorrect current password' });
    }
  });
});


// Get Users
router.get('/users', (req, res) => {
  const sql = 'SELECT user_id, name, email, role FROM users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});
// Get Police Users
router.get('/users/police', (req, res) => {
  const sql = 'SELECT user_id, name, email, role FROM users WHERE role = "Police"';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Delete User
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE user_id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('User deleted successfully');
  });
});

// Update User
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ?, role = ? WHERE user_id = ?';
  db.query(sql, [name, email, role, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('User updated successfully');
  });
});

// Get User by ID
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT user_id, name, email, role FROM users WHERE user_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).send('User not found');
    }
  });
});

module.exports = router;
