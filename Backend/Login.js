const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(express.static('images'));
app.use('/uploads', express.static('uploads'))

app.use(express.json());
app.use(cors());

let loggedInUserEmail = null; // Variable to store logged-in user's email temporarily

// Define storage for uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './images'); // Save images to the "uploads" directory
    },
    filename: function (req, file, cb) {
     return  cb(null,`${Date.now()}_${file.originalname}` ); // Use the original filename for the uploaded image
    }
  });
const upload = multer({ storage});
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

// Handle login request
app.post('/farms', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

    con.query(sql, [email, password], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.length > 0) {
            loggedInUserEmail = email; // Store logged-in user's email
            console.log("user email:",loggedInUserEmail);
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// Endpoint to fetch user data by email
app.get('/dashboard', (req, res) => {
    if (!loggedInUserEmail) {
        console.log(loggedInUserEmail);
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    console.log(loggedInUserEmail);

    const sql = `SELECT * FROM users WHERE email = ?`;
    con.query(sql, [loggedInUserEmail], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.length > 0) {
            const user = result[0];
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});


app.post('/uploadImg', upload.single('image'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const imagePath = req.file.filename;
    if (!loggedInUserEmail) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Get the file path of the uploaded image
    
    console.log("imagePath", imagePath);
     // Send the image path to the frontend
     res.json({ imagePath });
   
    // Update the user's profile image path in the database
    const updateSql = `UPDATE users SET user_image = ? WHERE email = ?`;
    con.query(updateSql, [imagePath, loggedInUserEmail], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            //res.json({ message: 'Profile image updated successfully' });
        }
    });
});


// Start the server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
