import express from "express";
import {
  signUp,
  login,
  logout,
  updateProfile,
} from "../controllers/authController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";
import { arcjetProtection } from "../middleware/arcjetMiddleware.js";

const authRoutes = express.Router();

authRoutes.use(arcjetProtection);

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.put("/update-profile", protectedRoute, updateProfile);
authRoutes.get("/check", protectedRoute, (req, res) =>
  res.status(200).json(req.user),
);

export default authRoutes;
