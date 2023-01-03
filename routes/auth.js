import { Router } from "express";
import { registerUser } from "../controllers/auth.js";

const router = Router();

// register user
router.post("/register", registerUser);

export default router;
