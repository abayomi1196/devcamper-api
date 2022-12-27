import express from "express";
import dotenv from "dotenv";

// load env files
dotenv.config({ path: "./config/config.env" });

// initialize app
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server setup in ${process.env.NODE_ENV} on port: ${PORT}`)
);
