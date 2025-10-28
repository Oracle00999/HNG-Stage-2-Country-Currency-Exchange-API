const mysql = require("mysql2/promise");

console.log("🔧 Initializing database connection...");

// Extract DB config from environment variables
const dbConfig = {
  host: process.env.MYSQLHOST || "mysql.railway.internal",
  port: parseInt(process.env.MYSQLPORT) || 3306,
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "railway",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Validate required fields
if (
  !dbConfig.host ||
  !dbConfig.user ||
  !dbConfig.password ||
  !dbConfig.database
) {
  console.error("❌ Missing required database configuration!");
  console.error("Check these environment variables:", [
    "MYSQLHOST",
    "MYSQLPORT",
    "MYSQLUSER",
    "MYSQLPASSWORD",
    "MYSQLDATABASE",
  ]);
  process.exit(1); // Exit if missing critical config
}

// Create pool
const pool = mysql.createPool(dbConfig);

// Test connection (optional, but good for debugging)
pool
  .getConnection()
  .then((connection) => {
    console.log("✅ Database connected successfully!");
    connection.release(); // Release the connection back to pool
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
    console.log("DB Config:", dbConfig);
    console.log("Environment Variables:", {
      MYSQLHOST: process.env.MYSQLHOST,
      MYSQLPORT: process.env.MYSQLPORT,
      MYSQLUSER: process.env.MYSQLUSER,
      MYSQLPASSWORD: process.env.MYSQLPASSWORD ? "*****" : "NOT SET",
      MYSQLDATABASE: process.env.MYSQLDATABASE,
    });
    process.exit(1); // Exit on connection failure
  });

module.exports = pool;
