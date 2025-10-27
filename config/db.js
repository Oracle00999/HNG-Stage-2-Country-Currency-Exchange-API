const mysql = require("mysql2/promise");
require("dotenv").config();

// Debug: Check what environment variables are available
console.log("🔍 Database Environment Variables:");
console.log("- MYSQL_URL:", process.env.MYSQL_URL ? "set" : "not set");
console.log("- MYSQLHOST:", process.env.MYSQLHOST || "not set");
console.log("- MYSQLDATABASE:", process.env.MYSQLDATABASE || "not set");
console.log("- MYSQLUSER:", process.env.MYSQLUSER || "not set");
console.log("- MYSQLPORT:", process.env.MYSQLPORT || "not set");

let dbConfig;

if (process.env.MYSQL_URL) {
  // Use the connection URL
  dbConfig = {
    uri: process.env.MYSQL_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
} else if (process.env.MYSQLHOST) {
  // Use individual environment variables
  dbConfig = {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
} else {
  // Fallback for local development
  dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "countries_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
}

const pool = mysql.createPool(dbConfig);

// Test connection
pool
  .getConnection()
  .then((connection) => {
    console.log("✅ Successfully connected to MySQL database!");
    console.log(`📊 Database: ${process.env.MYSQLDATABASE || "from URL"}`);
    connection.release();
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
  });

module.exports = pool;
