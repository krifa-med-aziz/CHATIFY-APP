import express from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/messageController.js";
import { arcjetProtection } from "../middleware/arcjetMiddleware.js";

const messgaeRoutes = express.Router();

messgaeRoutes.use(arcjetProtection, protectedRoute);
messgaeRoutes.get("/contact", getAllContacts);
messgaeRoutes.get("/chats", getChatPartners);
messgaeRoutes.get("/:id", getMessagesByUserId);
messgaeRoutes.post("/send/:id", sendMessage);

export default messgaeRoutes;
