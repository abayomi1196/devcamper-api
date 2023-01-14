import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser
} from "../controllers/auth.js";
import { protectRoute } from "../middlewares/auth.js";

const router = Router();

// register user
router.post("/register", registerUser);

// login user
router.post("/login", loginUser);

// get logged in user
router.get("/me", protectRoute, getCurrentUser);

export default router;
