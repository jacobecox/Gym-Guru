import { combineReducers } from "@reduxjs/toolkit";
import exerciseReducer from "./slices/allExercise";

const rootReducer = combineReducers({
  exercises: exerciseReducer,
});

export default rootReducer;
