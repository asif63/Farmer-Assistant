const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "farms",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Define the endpoint to fetch crops based on criteria
app.get("/crops", async (req, res) => {
  const { month, soil, location } = req.query;

  try {
    const query = `
    SELECT c.crop_id, c.crop_name 
    FROM location_crops lc 
    JOIN crops c ON lc.crop_id = c.crop_id 
    JOIN location l ON lc.location_id = l.location_id 
    WHERE l.location_name = ?; 
    `;

    const results = await queryDatabase(query, [location]);
    res.json(results);
  } catch (error) {
    console.error("Error fetching crops:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Helper function for querying the database with parameters
const queryDatabase = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
