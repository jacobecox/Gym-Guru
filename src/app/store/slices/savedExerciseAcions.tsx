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

export const saveExercise = createAsyncThunk(
  "savedExercises/saveExercise",
  async (
    {
      token,
      exerciseDetail,
    }: {
      token: string;
      exerciseDetail: Exercise;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/saved-exercises`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(exerciseDetail),
      });

      const data = await response.json();

      if (data.message === "Exercise already saved") {
        return rejectWithValue(data.message);
      }

      return data.savedExercise;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const deleteExercise = createAsyncThunk(
  "savedExercises/deleteExercise",
  async (
    {
      token,
      exerciseId,
    }: {
      token: string | null;
      exerciseId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/saved-exercises`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ exerciseId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete exercise");
      }

      return exerciseId;
    } catch (err) {
      console.error(err);
      return rejectWithValue("Failed to delete exercise");
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
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // State to fetch all saved exercises
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
    builder
      .addCase(fetchSavedExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // State to save a new exercise
      .addCase(saveExercise.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        saveExercise.fulfilled,
        (state, action: PayloadAction<Exercise>) => {
          state.loading = false;
          state.savedExercises.push(action.payload);
          state.error = null;
        }
      )
      .addCase(saveExercise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // State to delete exercise
    builder.addCase(deleteExercise.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteExercise.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.savedExercises = state.savedExercises.filter(
          (exercise) => exercise.id !== action.payload
        );
      }
    );
    builder.addCase(deleteExercise.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetError } = savedExercisesSlice.actions;
export default savedExercisesSlice.reducer;
