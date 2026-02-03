import express from "express";

const authRoutes = express.Router();

authRoutes.get("/signup", (req, res) => {
  res.send("SIGNUP Endpoint");
});
authRoutes.get("/login", (req, res) => {
  res.send("LOGIN Endpoint");
});

export default authRoutes;
