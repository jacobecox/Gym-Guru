import express from "express";
import User from "../models/user"

const router = express.Router();

router.post('/saved-exercises', async (req, res) => {
  try {
    const { username, exerciseId } = req.body;
    if (!username || !exerciseId) {
      return res.status(400).json({ message: "Missing userId or exerciseId" });
    }

    // Finds user by id and adds a saved exercise by id to saved exercises if it is a new id to prevent duplicates
    const user = await User.findByIdAndUpdate(
      username,
      { $addToSet: { savedExercises: exerciseId } },
      { new: true }
    ).populate("savedExercises");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Exercise saved", savedExercises: user.savedExercises });
  } catch (err) {
    console.error("Error saving exercise:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

export default router;