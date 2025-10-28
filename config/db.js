const mysql = require("mysql2/promise");
require("dotenv").config();

console.log("🔧 Initializing database connection...");

// Support both local and Railway environments
let dbConfig = {};

if (process.env.MYSQLHOST) {
  // Railway or custom .env setup
  dbConfig = {
    host: process.env.MYSQLHOST,
    port: parseInt(process.env.MYSQLPORT) || 3306,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
  };
} else if (process.env.DATABASE_URL || process.env.MYSQL_URL) {
  // Fallback if Railway provides a single connection string
  const url = new URL(process.env.DATABASE_URL || process.env.MYSQL_URL);
  dbConfig = {
    host: url.hostname,
    port: url.port || 3306,
    user: url.username,
    password: url.password,
    database: url.pathname.replace("/", ""),
  };
} else {
  // Local development defaults
  dbConfig = {
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "country_db",
  };
}

dbConfig = {
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Validate required fields
if (!dbConfig.host || !dbConfig.user || !dbConfig.database) {
  console.error("❌ Missing required database configuration!");
  console.error("Config used:", dbConfig);
  process.exit(1);
}

// Create pool
const pool = mysql.createPool(dbConfig);

// Test connection
pool
  .getConnection()
  .then((conn) => {
    console.log("✅ Database connected successfully!");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    console.log("DB Config:", dbConfig);
    process.exit(1);
  });

module.exports = pool;
