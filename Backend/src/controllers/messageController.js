import cloudinary from "../lib/cloudinary.js";
import Message from "../models/messageModel.js";
import { User } from "../models/userModel.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (err) {
    console.log("Error in getAllContact : ", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in getMessagesByUserId : ", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
      res.status(400).json({ message: "Text or image is required!" });
    }

    if (senderId.equals(receiverId)) {
      res.status(400).json({ message: "Cannot send messages to yourself!" });
    }

    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      res.status(404).json({ message: "Receiver not found!" });
    }

    let image_url;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      image_url = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: image_url,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in sendMessage : ", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnersIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    ];
    const chatPartners = await User.find({
      _id: { $in: chatPartnersIds },
    }).select("-password");

    res.status(200).json(chatPartners);
  } catch (err) {
    console.log("Error in getChatPartners : ", err);
    res.status(500).json({ message: "Server error" });
  }
};
