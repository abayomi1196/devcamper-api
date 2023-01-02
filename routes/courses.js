import { Router } from "express";
import {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse
} from "../controllers/courses.js";

const router = Router({ mergeParams: true });

// get all courses
router.get("/", getAllCourses);

// get single course
router.get("/:id", getSingleCourse);

// add course
router.post("/", createCourse);

// update course
router.patch("/:id", updateCourse);

// delete course
router.delete("/:id", deleteCourse);

export default router;
