const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

const DB_HOST = process.env.DB_HOST || "mysql";
const DB_USER = "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "rootpassword";
const DB_NAME = "tasksdb";

let db;

// 🔁 Retry MySQL connection until ready
function connectDB() {
  db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
  });

  db.connect(err => {
    if (err) {
      console.error("⏳ MySQL not ready, retrying in 3s...");
      setTimeout(connectDB, 3000);
      return;
    }

    console.log("✅ Connected to MySQL");

    // Create table if not exists
    db.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL
      )
    `);

    console.log("📦 Table ready");

    // Routes (registered only after DB is ready)
    app.get("/api/tasks", (req, res) => {
      db.query("SELECT * FROM tasks", (err, results) => {
        if (err) {
          console.error("❌ SELECT error:", err);
          return res.status(500).json([]);
        }
        res.json(results);
      });
    });

    app.post("/api/tasks", (req, res) => {
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({ error: "Title required" });
      }

      db.query(
        "INSERT INTO tasks (title) VALUES (?)",
        [title],
        err => {
          if (err) {
            console.error("❌ INSERT error:", err);
            return res.status(500).json({ error: "Insert failed" });
          }
          res.json({ success: true });
        }
      );
    });
  });
}

// Start DB connection
connectDB();

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
