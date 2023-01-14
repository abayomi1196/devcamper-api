import jwt from "jsonwebtoken";

import asyncHandler from "./async.js";
import ErrorResponse from "../utils/errorResponse.js";
import UserModel from "../models/User.js";

// protect routes
export const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized", 401));
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await UserModel.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized", 401));
  }
});

// role-specific access
export const authorizeRoute =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(`User role: ${req.user.role} is unauthorized`, 403)
      );
    }

    next();
  };
