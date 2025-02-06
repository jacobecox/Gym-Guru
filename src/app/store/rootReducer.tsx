import { combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/allCategories";
import exerciseDetailReducer from "./slices/exerciseDetail";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  exerciseDetail: exerciseDetailReducer,
});

export default rootReducer;
