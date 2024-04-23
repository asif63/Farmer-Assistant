const axios = require("axios");
const nodemailer = require("nodemailer");
const mysql = require("mysql");

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "farms",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: "Gmail", // Change to your email service provider
  auth: {
    user: "farmer.assistant.2024@gmail.com", // Change to your email address
    pass: "farmer2024", // Change to your email password or app-specific password
  },
});

const sendCloudyWeatherEmails = async () => {
  try {
    // Fetch user data with location from database
    const query = `
      SELECT u.email, l.location_name
      FROM users u
      INNER JOIN location l ON u.location_id = l.location_id
    `;
    const users = await getUsersFromDatabase(query);

    // Fetch weather data and send emails for each user
    for (const user of users) {
      const weatherResponse = await axios.get(
        "http://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: "58e52ffaed5848f7934df39d23758681",
            q: user.location_name, // Use the user's preferred location
          },
        }
      );

      const cloudiness = weatherResponse.data.current.cloud;

      // Check if it's cloudy (customize threshold as needed)
      if (cloudiness >= 50) {
        await sendEmail(
          user.email,
          "Cloudy Weather Alert",
          "It is cloudy in your area. ☁️"
        );
      }
    }
  } catch (error) {
    console.error("Error sending cloudy weather emails:", error);
  }
};

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: "farmer.assistant.2024@gmail.com", // Change to your email address
      to: to,
      subject: subject,
      text: text,
    });
    console.log("Email sent to", to);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const getUsersFromDatabase = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

// Run the function periodically (e.g., every hour)
setInterval(sendCloudyWeatherEmails, 36000000);
