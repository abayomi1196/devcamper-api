import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import colors from "colors";

// load env files
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/error.js";

// router files
import BootcampRouter from "./routes/bootcamps.js";
import CoursesRouter from "./routes/courses.js";

// initialize app
const app = express();

// allow body parser for json
app.use(express.json());

// setup custom middlewares for dev request logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// setup routes
app.use("/api/v1/bootcamps", BootcampRouter);
app.use("/api/v1/courses", CoursesRouter);

// middleware for error handling
app.use(errorHandler);

const PORT = process.env.PORT || 8888;

// connect to DB
connectDB();

app.listen(
  PORT,
  console.log(
    `Local server setup in ${process.env.NODE_ENV} on port: ${PORT}`.yellow.bold
  )
);
