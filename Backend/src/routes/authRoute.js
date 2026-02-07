import express from "express";
import { signUp, login, logout } from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);

export default authRoutes;
