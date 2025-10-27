const mysql = require("mysql2/promise");

console.log("🔧 Initializing database connection...");

if (!process.env.MYSQL_URL) {
  console.error("❌ MYSQL_URL environment variable is not set!");
}

const pool = mysql.createPool({
  uri: process.env.MYSQL_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection
pool
  .getConnection()
  .then(() => {
    console.log("✅ Database connected successfully via MYSQL_URL");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
    console.log("MYSQL_URL:", process.env.MYSQL_URL ? "is set" : "is NOT set");
  });

module.exports = pool;
