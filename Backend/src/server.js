const express = require("express");
const authRoutes = require("./routes/authRoute");
const messageRoutes = require("./routes/messageRoute");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
