import { combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/allCategories";

const rootReducer = combineReducers({
  categories: categoriesReducer,
});

export default rootReducer;
