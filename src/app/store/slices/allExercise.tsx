import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Exercise } from "@/app/types";

const options = {
  method: "GET",
  url: "https://exercisedb.p.rapidapi.com/exercises",
  params: {
    limit: "9",
    offset: "0",
  },
  headers: {
    "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
  },
};

export const fetchExercises = createAsyncThunk<Exercise>(
  "exercises/fetchExercises",
  async () => {
    const response = await axios.request(options);
    return response.data;
  }
);

interface ExerciseState {
  exercises: Exercise[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: ExerciseState = {
  exercises: [],
  loading: false,
  error: null,
};

export const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchExercises.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchExercises.fulfilled, (state, action) => {
      state.loading = false;
      state.exercises.push(action.payload);
    });
    builder.addCase(fetchExercises.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default exerciseSlice.reducer;
