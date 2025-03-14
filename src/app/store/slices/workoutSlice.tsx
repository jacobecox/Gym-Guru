/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Exercise } from "@/app/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Fetch all workout days
export const fetchWorkoutDays = createAsyncThunk(
  "workoutPlan/fetchWorkoutDays",
  async (token: string | null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/workout-days`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // Assuming it returns an array of workout days
    } catch (err: any) {
      console.error(err);
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch workout days"
      );
    }
  }
);

// Add a new workout day
export const addWorkoutDay = createAsyncThunk(
  "workoutPlan/addWorkoutDay",
  async (
    { token, day }: { token: string | null; day: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/workout-days`,
        { day },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.day; // Return only the added day
    } catch (err: any) {
      console.error(err);
      return rejectWithValue(
        err.response?.data?.message || "Failed to add workout day"
      );
    }
  }
);

// Add an exercise to a workout day
export const addExerciseToDay = createAsyncThunk(
  "workoutPlan/addExerciseToDay",
  async (
    {
      token,
      day,
      exerciseDetail,
    }: {
      token: string | null;
      day: string;
      exerciseDetail: Exercise;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/workout-days/${day}/exercises`,
        exerciseDetail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { day, exercise: response.data.exercise }; // Ensure backend returns saved exercise
    } catch (err: any) {
      console.error(err);
      return rejectWithValue(
        err.response?.data?.message || "Failed to add exercise"
      );
    }
  }
);

// Removes workout day
export const removeWorkoutDay = createAsyncThunk(
  "workoutPlan/removeWorkoutDay",
  async (
    { token, day }: { token: string | null; day: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.delete(`${BASE_URL}/workout/${day}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return { day };
    } catch (err: any) {
      console.error(err);
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete workout day"
      );
    }
  }
);

// Remove an exercise from a workout day
export const removeExerciseFromDay = createAsyncThunk(
  "workoutPlan/removeExerciseFromDay",
  async (
    {
      token,
      day,
      exerciseId,
    }: {
      token: string | null;
      day: string;
      exerciseId: string;
    },
    { rejectWithValue }
  ) => {
    console.log("removing exercise in slice");
    try {
      await axios.delete(
        `${BASE_URL}/workout-days/${day}/exercises/${exerciseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { day, exerciseId };
    } catch (err: any) {
      console.error(err);
      return rejectWithValue(
        err.response?.data?.message || "Failed to remove exercise"
      );
    }
  }
);

// Define the state type
type WorkoutPlanState = {
  workoutPlan: { day: string; exercises: Exercise[] }[];
  loading: boolean;
  error?: string | null;
};

// Initial state
const initialState: WorkoutPlanState = {
  workoutPlan: [],
  loading: false,
  error: null,
};

// Redux Slice
export const workoutPlanSlice = createSlice({
  name: "workoutPlan",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all workout days
    builder
      .addCase(fetchWorkoutDays.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchWorkoutDays.fulfilled,
        (
          state,
          action: PayloadAction<{ day: string; exercises: Exercise[] }[]>
        ) => {
          state.loading = false;
          state.workoutPlan = action.payload;
        }
      )
      .addCase(fetchWorkoutDays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add a new workout day
    builder
      .addCase(addWorkoutDay.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        addWorkoutDay.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.workoutPlan.push({ day: action.payload, exercises: [] });
          state.error = null;
        }
      )
      .addCase(addWorkoutDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add an exercise to a workout day
    builder
      .addCase(addExerciseToDay.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExerciseToDay.fulfilled, (state, action) => {
        state.loading = false;
        const workoutDay = state.workoutPlan.find(
          (wd) => wd.day === action.payload.day
        );
        if (workoutDay) {
          workoutDay.exercises.push(action.payload.exercise); // ✅ Add the saved exercise to Redux
        }
        state.error = null;
      })
      .addCase(addExerciseToDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Remove an exercise from a workout day
    builder
      .addCase(removeExerciseFromDay.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        removeExerciseFromDay.fulfilled,
        (state, action: PayloadAction<{ day: string; exerciseId: string }>) => {
          state.loading = false;
          const workoutDay = state.workoutPlan.find(
            (wd) => wd.day === action.payload.day
          );
          if (workoutDay) {
            workoutDay.exercises = workoutDay.exercises.filter(
              (exercise) => exercise.id !== action.payload.exerciseId
            );
          }
        }
      )
      .addCase(removeExerciseFromDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions & reducer
export const { resetError } = workoutPlanSlice.actions;
export default workoutPlanSlice.reducer;
