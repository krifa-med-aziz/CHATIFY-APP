import z from "zod";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import { generateToken } from "../lib/utils.js";

const signUpSchema = z.object({
  fullName: z.string().min(1, "FullName is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const validation = signUpSchema.safeParse(req.body);

    if (!validation.success) {
      const formattedErrors = validation.error.issues.reduce((acc, curr) => {
        const field = curr.path[0];
        if (field) acc[field] = curr.message;
        return acc;
      }, {});

      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res
        .status(201)
        .json({ user: newUser, message: "User created successfully" });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.log("Error in signup controller :", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  res.send("login route");
};

export const logout = async (req, res) => {
  res.send("logout route");
};
