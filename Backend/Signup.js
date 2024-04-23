const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Create MySQL connection
const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "farms"
});

// Connect to MySQL database
con.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Create users table if not exists with unique constraint on email column
const createTableQuery = `
CREATE TABLE IF NOT EXISTS Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE,
    Email VARCHAR(100) UNIQUE,
    Password VARCHAR(100),
    location_id INT,
    Role ENUM('user', 'admin') DEFAULT 'user',
    FOREIGN KEY (location_id) REFERENCES Location(location_id)
);

`;

con.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error creating users table:', err);
    } else {
        console.log("Table 'users' created or already exists");
    }
});

// Handle signup request
app.post('/farms', (req, res) => {
    const { username, email, password, locationId } = req.body;

    // Check if the email already exists in the database
    con.query('SELECT COUNT(*) AS count FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error('Error checking for existing email:', err);
            res.status(500).json({ message: 'An error occurred while signing up. Please try again later.' });
        } else {
            const emailCount = result[0].count;
            if (emailCount > 0) {
                // If email already exists, send a message to the client
                res.status(400).json({ message: 'Email already registered. Please use a different email.' });
            } else {
                // If email doesn't exist, proceed with user registration
                // Insert user data into users table along with the received locationId
                con.query('INSERT INTO users (username, email, password, location_id) VALUES (?, ?, ?, ?)', [username, email, password, locationId], (err, result) => {
                    if (err) {
                        console.error('Error inserting user into database:', err);
                        res.status(500).json({ message: 'An error occurred while signing up. Please try again later.' });
                    } else {
                        console.log('User inserted into database with ID:', result.insertId);
                        res.status(201).json({ message: 'Registration Successful!' });
                    }
                });
            }
        }
    });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
