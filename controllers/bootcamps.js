import BootCampModel from "../models/Bootcamp.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middlewares/async.js";
import Geocoder from "../utils/geocoder.js";

// @dec -> GET all bootcamps
// @route -> GET /api/vi/bootcamps
// @access -> public
export const getAllBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query };

  // fields to exclude
  const removeFields = ["select", "sort", "limit", "page"];

  // remove excluded fields from query
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  // prepend operators with $ sign (needed for mongoose operations)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = BootCampModel.find(JSON.parse(queryStr));

  // select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // sort fields
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;

  // pagination
  const total = await BootCampModel.countDocuments();
  const pagination = {};
  if (endIdx < total) {
    pagination.next = { page: page + 1, limit };
  }

  if (startIdx > 0) {
    pagination.prev = { page: page - 1, limit };
  }

  query.skip(startIdx).limit(limit);

  const bootcamps = await query;
  res.status(200).json({ nbHits: bootcamps.length, pagination, bootcamps });
});

// @dec -> GET single bootcamp
// @route -> GET /api/vi/bootcamps/:id
// @access -> public
export const getSingleBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCampModel.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id of: ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ bootcamp });
});

// @dec -> POST create bootcamp
// @route -> POST /api/vi/bootcamps
// @access -> private
export const createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCampModel.create(req.body);
  res.status(201).json({ message: "Created successfully!!", bootcamp });
});

// @dec -> PATCH update bootcamp
// @route -> PATCH /api/vi/bootcamps/:id
// @access -> private
export const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCampModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id of: ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ message: "Bootcamp updated successfully", bootcamp });
});

// @dec -> DELETE delete bootcamp
// @route -> DELETE /api/vi/bootcamps/:id
// @access -> private
export const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCampModel.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id of: ${req.params.id} not found`, 404)
    );
  }

  res.status(201).json({ message: "Bootcamp deleted successfully!" });
});

// @dec -> GET bootcamps within a radius
// @route -> GET /api/vi/bootcamps/radius/:zipcode/:distance
// @access -> private
export const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // get lat/lng from the geocoder
  const loc = await Geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // calc radius using radians - divide distance by radius of earth (3,963mi or 6378km)
  const radius = distance / 3963;

  const bootcamps = await BootCampModel.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({ nbHits: bootcamps.length, bootcamps });
});
