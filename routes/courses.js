import { Router } from "express";
import { getAllCourses } from "../controllers/courses.js";

const router = Router({ mergeParams: true });

// get all courses
router.get("/", getAllCourses);

export default router;
