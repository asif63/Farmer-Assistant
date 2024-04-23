const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "farms"
})
const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    location_id INT NOT NULL,
    FOREIGN KEY (location_id) REFERENCES Location(location_id)
  )
`;

con.query(createTableQuery, (err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Table 'login' created or already exists");
    }
});
app.post('/farms', (req, res) => {
    const { username, email, password, locationId } = req.body;
  
    // Insert user data into users table along with the received locationId
    con.query('INSERT INTO users (username, email, password, location_id) VALUES (?, ?, ?, ?)', [username, email, password, locationId], (err, result) => {
      if (err) {
        console.error('Error inserting user into database:', err);
        res.status(500).json({ message: 'An error occurred while signing up. Please try again later.' });
      } else {
        console.log('User inserted into database with ID:', result.insertId);
        res.status(201).json({ message: 'User created successfully' });
      }
    });
  });

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    con.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], 
        (err, result) => {
            if(err){
                req.setEncoding({err: err});
            }else{
                if(result.length > 0){
                    res.send(result);
                }else{
                    res.send({message: "WRONG USERNAME OR PASSWORD!"})
                }
            }
        }
    )
})

app.listen(3001, () => {
    console.log("running backend server");
})