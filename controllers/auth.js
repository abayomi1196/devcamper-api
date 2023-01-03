import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middlewares/async.js";
import UserModel from "../models/User.js";

//@desc -> Register user
//@router -> POST /api/v1/auth/register
//@access -> Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // create user
  await UserModel.create({ name, email, password, role });

  res.status(200).json({ message: "User created successfully" });
});
