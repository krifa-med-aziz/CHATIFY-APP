import express from "express";

const messgaeRoutes = express.Router();

messgaeRoutes.get("/send", (req, res) => {
  res.send("SEND Endpoint");
});

export default messgaeRoutes;
