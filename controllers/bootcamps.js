import BootCampModel from "../models/Bootcamp.js";
import ErrorResponse from "../utils/errorResponse.js";

// @dec -> GET all bootcamps
// @route -> GET /api/vi/bootcamps
// @access -> public
export const getAllBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await BootCampModel.find({});
    res.status(200).json({ nbHits: bootcamps.length, bootcamps });
  } catch (err) {
    next(err);
  }
};

// @dec -> GET single bootcamp
// @route -> GET /api/vi/bootcamps/:id
// @access -> public
export const getSingleBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCampModel.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp with id of: ${req.params.id} not found`,
          404
        )
      );
    }

    res.status(200).json({ bootcamp });
  } catch (err) {
    next(err);
  }
};

// @dec -> POST create bootcamp
// @route -> POST /api/vi/bootcamps
// @access -> private
export const createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCampModel.create(req.body);
    res.status(201).json({ message: "Created successfully!!", bootcamp });
  } catch (err) {
    next(err);
  }
};

// @dec -> PATCH update bootcamp
// @route -> PATCH /api/vi/bootcamps/:id
// @access -> private
export const updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCampModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp with id of: ${req.params.id} not found`,
          404
        )
      );
    }

    res
      .status(200)
      .json({ message: "Bootcamp updated successfully", bootcamp });
  } catch (err) {
    next(err);
  }
};

// @dec -> DELETE delete bootcamp
// @route -> DELETE /api/vi/bootcamps/:id
// @access -> private
export const deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCampModel.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp with id of: ${req.params.id} not found`,
          404
        )
      );
    }

    res.status(201).json({ message: "Bootcamp deleted successfully!" });
  } catch (err) {
    next(err);
  }
};
