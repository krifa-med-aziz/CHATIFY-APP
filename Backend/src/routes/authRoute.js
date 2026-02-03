const express = require("express");

const authRoutes = express.Router();

authRoutes.get("/signup", (req, res) => {
  res.send("SIGNUP Endpoint");
});
authRoutes.get("/login", (req, res) => {
  res.send("LOGIN Endpoint");
});

module.exports = authRoutes;
