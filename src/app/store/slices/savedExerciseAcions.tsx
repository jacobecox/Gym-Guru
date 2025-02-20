import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchSavedExercises = createAsyncThunk(
  "savedExercises, fetchSavedExercises",
  async () => {
    console.log("slice called");

    // fix this
    const authenticated = useSelector((state: RootState) => state.authenticate);

    try {
      if (!authenticated) {
        alert("Please log in to view saved exercises.");
        return;
      }
      const response = await fetch(`${BASE_URL}/saved-exercises`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authenticated}`,
        },
      });

      console.log("response:", response);

      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
);

type savedExercisesState = {
  savedExercises: string[];
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
    builder.addCase(fetchSavedExercises.fulfilled, (state, action) => {
      state.loading = false;
      state.savedExercises = action.payload;
      console.log("saved Exercises in state:", action.payload);
    });
    builder.addCase(fetchSavedExercises.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default savedExercisesSlice.reducer;
