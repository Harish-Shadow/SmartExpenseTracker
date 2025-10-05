import express from "express";
import { signup, login } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { successResponse } from "../utils/responseHandler.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Protected route example
router.get("/me", verifyToken, (req, res) => {
  return successResponse(res, { user: req.user }, "User data fetched");
});

export default router;
