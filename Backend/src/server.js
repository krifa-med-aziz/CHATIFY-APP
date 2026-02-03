import express from "express";
import authRoutes from "./routes/authRoute.js";
import messageRoutes from "./routes/messageRoute.js";

import dotenv from "dotenv";
import path from "path";

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//make ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
