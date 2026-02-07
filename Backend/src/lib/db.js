import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("DATABASE connected sucessfuly :", conn.connection.host);
  } catch (err) {
    console.log(`DATABASE connection filed , erorr:${err.message}`);
  }
};
