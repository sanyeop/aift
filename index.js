const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

// Render 환경변수 DATABASE_URL 사용
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT name FROM test LIMIT 1"
    );

    const name = result.rows[0]?.neon || "Unknown";

    res.send(`
      <html>
        <head>
          <title>Neon Test</title>
        </head>
        <body>
          <h1>HELLO ${name}</h1>
        </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB ERROR");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
