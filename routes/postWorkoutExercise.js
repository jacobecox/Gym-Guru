import express from "express";
import User from "../models/user.js"
import authMiddleware from "../controllers/authMiddleware.js";

const router = express.Router();

app.post("/workout-plan/:userId/:day/exercises", authMiddleware, async (req, res) => {
  const { userId, day } = req.params;
  const { id, name, target, equipment } = req.body;

  if (!id || !name || !target || !equipment) {
    return res.status(400).json({ message: "Exercise details are required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the workout day
    const workoutDay = user.workoutPlan.find((d) => d.day === day);

    if (!workoutDay) {
      return res.status(404).json({ message: "Workout day not found" });
    }

    // Add exercise to that day
    workoutDay.exercises.push({ id, name, target, equipment });
    await user.save();

    res.json(workoutDay);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;