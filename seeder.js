import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import mongoose from "mongoose";
import colors from "colors";

// load models
import BootcampModel from "./models/Bootcamp.js";

// connect to DB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI);

// read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

// import data into DB
const importData = async () => {
  try {
    await BootcampModel.create(bootcamps);
    console.log("Data imported..".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// delete data
const deleteData = async () => {
  try {
    await BootcampModel.deleteMany();
    console.log("Data deleted...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-import") {
  importData();
} else if (process.argv[2] === "-delete") {
  deleteData();
}
