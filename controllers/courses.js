import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middlewares/async.js";
import CoursesModel from "../models/Course.js";

// @dec -> GET all courses
// @route -> GET /api/vi/courses
// @route -> GET /api/vi/bootcamps/:bootcampId/courses
// @access -> public
export const getAllCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = CoursesModel.find({ bootcamp: req.params.bootcampId });
  } else {
    query = CoursesModel.find({});
  }

  const courses = await query;

  res.status(200).json({ nbHits: courses.length, courses });
});
