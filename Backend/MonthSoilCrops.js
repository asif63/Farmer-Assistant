const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const port = 3008;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  connectionLimit: 10,
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
  const { month, soil} = req.query;

  try {
    const query = `
    SELECT c.crop_id, c.crop_name 
    FROM month_crops mc 
    JOIN crops c ON mc.crop_id = c.crop_id 
    JOIN soil_crops sc ON c.crop_id = sc.crop_id 
    JOIN soil s ON sc.soil_id = s.soil_id 
    JOIN month m ON mc.month_id = m.month_id 
    WHERE m.month_name = ? AND s.soil_name = ?;
    `;

    const results = await queryDatabase(query, [month, soil]);
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
