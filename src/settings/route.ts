import express from "express";

const app = express();

app.get("/ping", async (req, res) => {
  const database = await client.query("SELECT 1 + 1").then(() => "up").catch(() => "down");

  res.send({
    environment: 'developement',
    database,
  });
});

