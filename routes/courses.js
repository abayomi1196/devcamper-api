import { Router } from "express";
import {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse
} from "../controllers/courses.js";

import CoursesModel from "../models/Course.js";
import advancedResults from "../middlewares/advancedResults.js";
import { protectRoute } from "../middlewares/auth.js";

const router = Router({ mergeParams: true });

// get all courses - augmented with middleware for pagination/sorting/limiting
router.get(
  "/",
  advancedResults(CoursesModel, {
    path: "bootcamp",
    select: "name description"
  }),
  getAllCourses
);

// get single course
router.get("/:id", getSingleCourse);

// add course
router.post("/", protectRoute, createCourse);

// update course
router.patch("/:id", protectRoute, updateCourse);

// delete course
router.delete("/:id", protectRoute, deleteCourse);

export default router;
