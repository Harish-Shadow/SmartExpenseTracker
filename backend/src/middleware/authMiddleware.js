import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/responseHandler.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return errorResponse(res, "Access denied, no token provided", 403);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return errorResponse(res, "Invalid token", 401);
  }
};
