const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL password
  database: 'farms'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Middleware
app.use(bodyParser.json());

// Routes

// User Registration
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  // Hash password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).send('Error registering user');
      return;
    }
    // Insert user into database
    connection.query('INSERT INTO Users (User_name, Email, Password,location_id) VALUES (?, ?, ?)', [username, email, hash], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Error registering user');
        return;
      }
      res.json({ success: true, message: 'User registered successfully' });
    });
  });
});

// User Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Find user by username
  connection.query('SELECT * FROM Users WHERE User_name = ?', [username], (err, results) => {
    if (err) {
      console.error('Error finding user:', err);
      res.status(500).send('Error finding user');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }
    const user = results[0];
    // Compare password
    bcrypt.compare(password, user.Password, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        res.status(500).send('Error comparing passwords');
        return;
      }
      if (!result) {
        res.status(401).send('Incorrect password');
        return;
      }
      // Generate JWT token
      const token = jwt.sign({ userId: user.UserID, username: user.Username }, 'secret', { expiresIn: '1h' });
      res.json({ success: true, token });
    });
  });
});

// Product Management
// Add routes for CRUD operations on products

// Order Management
// Add routes for placing orders, viewing order history, updating order status, etc.

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
