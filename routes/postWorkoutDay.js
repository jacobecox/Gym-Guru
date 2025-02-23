import express from "express";
import User from "../models/user.js"
import authMiddleware from "../controllers/authMiddleware.js";

const router = express.Router();

app.post("/workout-plan", authMiddleware, async (req, res) => {
  const { userId, day } = req.body;

  if (!userId || !day) {
    return res.status(400).json({ message: "User ID and day name are required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the workout day already exists
    const existingDay = user.workoutPlan.find((d) => d.day === day);

    if (existingDay) {
      return res.status(400).json({ message: "Workout day already exists" });
    }

    // Add a new workout day
    user.workoutPlan.push({ day, exercises: [] });
    await user.save();

    res.status(201).json(user.workoutPlan);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;