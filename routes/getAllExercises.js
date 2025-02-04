import express from "express";
import Exercise from '../models/exercise.js'

const router = express.Router();

router.get('/allExercises', async (req, res, next) => {
  try {
    const { muscle, equipment, page } = req.query

    const query = {};

    if (muscle && muscle !== 'All') {
      query.target = muscle
    }

    if (equipment && equipment !== 'All') {
      query.equipment = equipment
    }

    const perPage = 15;

    const exercises = await Exercise.find(query)
    .skip(perPage * page - perPage)
    .limit(perPage),
    totalExercises = Exercise.countDocuments(query)

    res.json({
      exercises,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalItems / perPage),
      totalExercises: totalExercises,
    });

  } catch (err) {
    next(err)
  }
})