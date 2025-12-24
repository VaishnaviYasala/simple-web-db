const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(express.static("public"));

// Database
const db = new sqlite3.Database("./database.db");

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )
`);

// Save data
app.post("/save", (req, res) => {
  const { name, email } = req.body;

  db.run(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    () => res.send({ message: "Saved successfully" })
  );
});

// Get data
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    res.send(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
