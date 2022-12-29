import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";

import connectDB from "./config/db.js";

// router files
import BootcampRouter from "./routes/bootcamps.js";

// initialize app
const app = express();

// allow body parser for json
app.use(express.json());

// load env files
dotenv.config({ path: "./config/config.env" });

// setup custom middlewares for dev request logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// setup routes
app.use("/api/v1/bootcamps", BootcampRouter);

const PORT = process.env.PORT || 8888;

// connect to DB
connectDB();

app.listen(
  PORT,
  console.log(
    `Local server setup in ${process.env.NODE_ENV} on port: ${PORT}`.yellow.bold
  )
);
