import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middlewares/async.js";
import CoursesModel from "../models/Course.js";
import BootcampModel from "../models/Bootcamp.js";

// @dec -> GET all courses
// @route -> GET /api/v1/courses
// @route -> GET /api/v1/bootcamps/:bootcampId/courses
// @access -> public
export const getAllCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await CoursesModel.find({
      bootcamp: req.params.bootcampId
    });

    return res.status(200).json({ nbHits: courses.length, courses });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @dec -> GET a single courses
// @route -> GET /api/v1/courses/:id
// @access -> public
export const getSingleCourse = asyncHandler(async (req, res, next) => {
  const course = await CoursesModel.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description"
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ course });
});

// @dec -> Add course
// @route -> POST /api/v1/bootcamps/:bootcampId/courses
// @access -> private
export const createCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await BootcampModel.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the id: ${req.params.id}`, 404)
    );
  }

  const course = await CoursesModel.create(req.body);

  res.status(200).json({ course });
});

// @dec -> Update course
// @route -> PATCH /api/v1/courses/:id
// @access -> private
export const updateCourse = asyncHandler(async (req, res, next) => {
  const course = await CoursesModel.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id: ${req.params.id}`, 404)
    );
  }

  const updatedCourse = await CoursesModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({ course: updatedCourse });
});

// @dec -> Delete course
// @route -> DELETE /api/v1/courses/:id
// @access -> private
export const deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await CoursesModel.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id: ${req.params.id}`, 404)
    );
  }

  await course.remove();

  res.status(200).json({ message: "Course deleted successfully" });
});
