import express from "express";
import User from "../models/user.js"
import authMiddleware from "../controllers/authMiddleware.js";

const router = express.Router();

router.delete('/saved-exercises', authMiddleware, async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user._id;

    if (!id) {
      return res.status(400).json({ message: "Missing exerciseId" });
    }

    // Finds user by id and removes a saved exercise by id from saved exercises if it is a new id to prevent duplicates
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedExercises: {id: id} } },
      { new: true }
    ).populate("savedExercises");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Exercise removed", savedExercises: user.savedExercises });
  } catch (err) {
    console.error("Error saving exercise:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

export default router;