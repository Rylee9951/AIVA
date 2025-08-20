const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 4000;

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'your_postgres_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_password',
  port: 5432,
});

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Express + PostgreSQL!');
});

// Example: Get users from "users" table
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
