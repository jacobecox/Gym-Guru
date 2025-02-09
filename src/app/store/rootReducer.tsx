import { combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/allCategories";
import exerciseDetailReducer from "./slices/exerciseDetail";
import authenticateReducer from "./slices/authenticate";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  exerciseDetail: exerciseDetailReducer,
  authenticate: authenticateReducer,
});

export default rootReducer;
