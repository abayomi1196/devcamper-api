import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.js";

const router = Router();

// register user
router.post("/register", registerUser);

// login user
router.post("/login", loginUser);

export default router;
