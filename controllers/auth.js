import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middlewares/async.js";
import UserModel from "../models/User.js";

//@desc -> Register user
//@router -> POST /api/v1/auth/register
//@access -> Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // create user
  const user = await UserModel.create({ name, email, password, role });

  // create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ message: "User created successfully", token });
});

//@desc -> Login user
//@router -> POST /api/v1/auth/login
//@access -> Public
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // validate email / password
  if (!email || !password) {
    return next(new ErrorResponse(`Please provide email and password`, 400));
  }

  // check for user
  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }

  // validate user's entered password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }

  // create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ message: "Logged in successfully", token });
});
