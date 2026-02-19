import express from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/messageController.js";

const messageRoutes = express.Router();

messageRoutes.use(protectedRoute);
messageRoutes.get("/contacts", getAllContacts);
messageRoutes.get("/chats", getChatPartners);
messageRoutes.get("/:id", getMessagesByUserId);
messageRoutes.post("/send/:id", sendMessage);

export default messageRoutes;
