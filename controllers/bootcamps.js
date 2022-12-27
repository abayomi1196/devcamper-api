// @dec -> GET all bootcamps
// @route -> GET /api/vi/bootcamps
// @access -> public
export const getAllBootcamps = (req, res, next) => {
  res.status(200).json({ message: "Show all bootcamps!" });
};

// @dec -> GET single bootcamp
// @route -> GET /api/vi/bootcamps/:id
// @access -> public
export const getSingleBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ message: `Get specific bootcamp with id: ${req.params.id}!` });
};

// @dec -> POST create bootcamp
// @route -> POST /api/vi/bootcamps
// @access -> private
export const createBootcamp = (req, res, next) => {
  res.status(200).json({ message: `Create Bootcamp!` });
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
