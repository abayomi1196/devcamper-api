import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middlewares/async.js";
import UserModel from "../models/User.js";

// get token from model, create cookie & send res
const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedJwtToken();

  // setup cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({ token });
};

//@desc -> Register user
//@router -> POST /api/v1/auth/register
//@access -> Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // create user
  const user = await UserModel.create({ name, email, password, role });

  // create token
  sendTokenResponse(user, 200, res);
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

  sendTokenResponse(user, 200, res);
});
