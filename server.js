import express from "express";
import dotenv from "dotenv";

// custom middleware
import logger from "./middlewares/logger.js";

// router files
import BootcampRouter from "./routes/bootcamps.js";

// load env files
dotenv.config({ path: "./config/config.env" });

// initialize app
const app = express();

// setup custom middlewares
app.use(logger);

// setup routes
app.use("/api/v1/bootcamps", BootcampRouter);

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server setup in ${process.env.NODE_ENV} on port: ${PORT}`)
);
