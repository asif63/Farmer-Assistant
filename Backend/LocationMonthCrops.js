const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3007;

app.use(cors());
app.use(express.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10, // Adjust based on your requirements
  host: "localhost",
  user: "root",
  password: "",
  database: "farms"
});

// Define the endpoint to fetch crops based on criteria
app.get("/crops", async (req, res) => {
  const { month, location } = req.query;

  try {
    // Using a connection pool to handle multiple concurrent requests
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting MySQL connection:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      const query = `
        SELECT c.crop_id, c.crop_name 
        FROM location_crops lc 
        JOIN crops c ON lc.crop_id = c.crop_id 
        JOIN month_crops mc ON c.crop_id = mc.crop_id 
        JOIN month m ON mc.month_id = m.month_id 
        JOIN location l ON lc.location_id = l.location_id 
        WHERE l.location_name = ? AND m.month_name = ?;`;

      connection.query(query, [location, month], (err, results) => {
        connection.release(); // Release the connection back to the pool
        if (err) {
          console.error("Error executing SQL query:", err);
          res.status(500).send("Internal Server Error");
          return;
        }
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
