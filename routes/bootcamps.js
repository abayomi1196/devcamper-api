import { Router } from "express";

import {
  getAllBootcamps,
  createBootcamp,
  deleteBootcamp,
  getSingleBootcamp,
  updateBootcamp,
  getBootcampsInRadius
} from "../controllers/bootcamps.js";

// initialize router
const router = Router();

// get all bootcamps
router.get("/", getAllBootcamps);

// create bootcamp
router.post("/", createBootcamp);

// update bootcamp
router.patch("/:id", updateBootcamp);

// get single bootcamp
router.get("/:id", getSingleBootcamp);

// delete bootcamp
router.delete("/:id", deleteBootcamp);

//get all bootcamps in a specified radius
router.get("/radius/:zipcode/:distance", getBootcampsInRadius);

export default router;
