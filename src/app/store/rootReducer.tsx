import { combineReducers } from "@reduxjs/toolkit";
import exerciseReducer from "./slices/allExercise";
import categoriesReducer from "./slices/allCategories";
import filteredExerciseReducer from "./slices/filterCategories";

const rootReducer = combineReducers({
  exercises: exerciseReducer,
  categories: categoriesReducer,
  filteredExercises: filteredExerciseReducer,
});

export default rootReducer;
