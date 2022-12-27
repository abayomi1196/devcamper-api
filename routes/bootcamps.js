import { Router } from "express";

import {
  getAllBootcamps,
  createBootcamp,
  deleteBootcamp,
  getSingleBootcamp,
  updateBootcamp
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

export default router;
