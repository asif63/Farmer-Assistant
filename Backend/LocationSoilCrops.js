const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const port = 3010;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: "localhost",
  user: "root",
  password: "",
  database: "farms",
});

// Define the endpoint to fetch crops based on criteria
app.get("/crops", async (req, res) => {
  const { soil, location } = req.query;


  try {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      const query = `
        SELECT c.crop_id, c.crop_name 
        FROM location_crops lc 
        JOIN crops c ON lc.crop_id = c.crop_id 
        JOIN soil_crops sc ON c.crop_id = sc.crop_id 
        JOIN soil s ON sc.soil_id = s.soil_id 
        JOIN location l ON lc.location_id = l.location_id 
        WHERE l.location_name = ? AND s.soil_name = ?;    
      `;

      // Execute the query using the acquired connection
      connection.query(query, [location, soil], (err, results) => {
        // Release the connection back to the pool
        connection.release();

        if (err) {
          console.error("Error executing query:", err);
          res.status(500).send("Internal Server Error");
          return;
        }

        // Send the query results
        res.json(results);
      });
    });
  } catch (error) {
    console.error("Error fetching crops:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
