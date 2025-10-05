import { successResponse, errorResponse } from "../utils/responseHandler.js";
import { createUser, findUserByEmail } from "../services/userService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password)
      return errorResponse(res, "All fields are required", 400);

    const existingUser = await findUserByEmail(email);
    if (existingUser)
      return errorResponse(res, "User already exists", 400);

    await createUser(username, email, password);
    return successResponse(res, null, "User registered successfully", 201);
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Signup failed", 500);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return errorResponse(res, "Email and password are required", 400);

    const user = await findUserByEmail(email);
    if (!user) return errorResponse(res, "Invalid credentials", 401);

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return errorResponse(res, "Invalid credentials", 401);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return successResponse(res, { token, user }, "Login successful");
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Login failed", 500);
  }
};
