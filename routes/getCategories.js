import express from "express";
import axios from "axios";
import dotenv from 'dotenv';
import Category from "../models/category.js";

const router = express.Router();

dotenv.config();

const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY
const API_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST

router.get('/muscleCategories', async (req, res) => {
  console.log('route for muscleCategories called')
  try {
    const response = await axios.get(`https://${API_HOST}/exercises/targetList`, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
      }
    });
    console.log('api key:', API_KEY)
    const muscleCategories = response.data
    const savedMuscleCategories = await Promise.all(
      muscleCategories.map(async (muscleCategoryName) => {
        const existingMuscleCategory = await Category.findOne({ name: muscleCategoryName})
        if (!existingMuscleCategory) {
          return await Category.create({ name: muscleCategoryName });
        }
        return existingMuscleCategory;
      })
    )
    res.json({ message: 'Categories fetched and stored successfully', muscleCategories: savedMuscleCategories})
  } catch (err) {
    console.error('Error fetching data:',err)
    res.status(500).json({ error: 'Failed to fetch data from ExerciseDB API'})
  }
});

export default router;