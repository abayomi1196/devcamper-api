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
router.post("/", createCourse);

// update course
router.patch("/:id", updateCourse);

// delete course
router.delete("/:id", deleteCourse);

export default router;
