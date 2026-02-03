const express = require("express");

const messgaeRoutes = express.Router();

messgaeRoutes.get("/send", (req, res) => {
  res.send("SEND Endpoint");
});

module.exports = messgaeRoutes;
