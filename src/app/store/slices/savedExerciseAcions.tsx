import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Exercise } from "@/app/types";
import { PayloadAction } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchSavedExercises = createAsyncThunk(
  "savedExercises, fetchSavedExercises",
  async (token: string) => {
    try {
      const response = await fetch(`${BASE_URL}/saved-exercises`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
);

type savedExercisesState = {
  savedExercises: Exercise[];
  loading: boolean;
  error?: string | null;
};

const initialState: savedExercisesState = {
  savedExercises: [],
  loading: false,
  error: null,
};

export const savedExercisesSlice = createSlice({
  name: "savedExercises",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchSavedExercises.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchSavedExercises.fulfilled,
      (state, action: PayloadAction<{ savedExercises: Exercise[] }>) => {
        state.loading = false;
        state.savedExercises = action.payload.savedExercises;
      }
    );
    builder.addCase(fetchSavedExercises.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default savedExercisesSlice.reducer;
