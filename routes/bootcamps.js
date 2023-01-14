import { Router } from "express";

import {
  getAllBootcamps,
  createBootcamp,
  deleteBootcamp,
  getSingleBootcamp,
  updateBootcamp,
  getBootcampsInRadius,
  uploadBootcampPhoto
} from "../controllers/bootcamps.js";

// include other resource routers
import courseRouter from "./courses.js";

import BootcampsModel from "../models/Bootcamp.js";
// middleware
import advancedResults from "../middlewares/advancedResults.js";
import { protectRoute } from "../middlewares/auth.js";

// initialize router
const router = Router();

// re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

// get all bootcamps
router.get("/", advancedResults(BootcampsModel, "courses"), getAllBootcamps);

// create bootcamp
router.post("/", protectRoute, createBootcamp);

// update bootcamp
router.patch("/:id", protectRoute, updateBootcamp);

// get single bootcamp
router.get("/:id", getSingleBootcamp);

// delete bootcamp
router.delete("/:id", protectRoute, deleteBootcamp);

// upload bootcamp photo
router.patch("/:id/photo", protectRoute, uploadBootcampPhoto);

//get all bootcamps in a specified radius
router.get("/radius/:zipcode/:distance", getBootcampsInRadius);

export default router;
