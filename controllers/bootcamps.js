import BootCampModel from "../models/Bootcamp.js";

// @dec -> GET all bootcamps
// @route -> GET /api/vi/bootcamps
// @access -> public
export const getAllBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await BootCampModel.find({});
    res.status(200).json({ bootcamps });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong!" });
  }
};

// @dec -> GET single bootcamp
// @route -> GET /api/vi/bootcamps/:id
// @access -> public
export const getSingleBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCampModel.findById(req.params.id);
    if (!bootcamp) {
      return res
        .status(404)
        .json({ message: `Bootcamp with id: ${req.params.id} not found.` });
    }
    res.status(200).json({ bootcamp });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong!" });
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
    console.log(err);
    res.status(400).json({ message: "Something went wrong!!" });
  }
};

// @dec -> PATCH update bootcamp
// @route -> PATCH /api/vi/bootcamps/:id
// @access -> private
export const updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ message: `Update bootcamp with id: ${req.params.id}!` });
};

// @dec -> DELETE delete bootcamp
// @route -> DELETE /api/vi/bootcamps/:id
// @access -> private
export const deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ message: `Delete bootcamp with id: ${req.params.id}!` });
};
