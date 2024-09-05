



const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use environment variable for the database path or default to local path for development
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'users.db');

// Create and connect to the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create tables if they don't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    age git init
INTEGER NOT NULL,
    gender TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile TEXT NOT NULL
)`);
db.run(`CREATE TABLE IF NOT EXISTS quiz (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATETIME NOT NULL,
    answer TEXT NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
)`);

module.exports = db;
