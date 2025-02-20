import { combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/allCategories";
import exerciseDetailReducer from "./slices/exerciseDetail";
import authenticateReducer from "./slices/authenticate";
import savedExercisesSlice from "./slices/savedExerciseAcions";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  exerciseDetail: exerciseDetailReducer,
  authenticate: authenticateReducer,
  savedExercise: savedExercisesSlice,
});

export default rootReducer;
