import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Exercise } from "@/app/types";

const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
const API_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST;

export const fetchExerciseDetail = createAsyncThunk<Exercise, string>(
  "exerciseDetail, fetchExerciseDetail",
  async (validId) => {
    const response = await axios.get(
      `https://${API_HOST}/exercises/exercise/${validId}`,
      {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
      }
    );
    return response.data;
  }
);

type exerciseState = {
  exerciseDetail: Exercise | null;
  loading: boolean;
  error?: string | null;
};

const initialState: exerciseState = {
  exerciseDetail: null,
  loading: false,
  error: null,
};

export const exerciseDetailSlice = createSlice({
  name: "exerciseDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExerciseDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchExerciseDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.exerciseDetail = action.payload;
    });
    builder.addCase(fetchExerciseDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default exerciseDetailSlice.reducer;
