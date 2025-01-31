import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Exercise, CategoryFilter } from "@/app/types";

const ITEMS_PER_PAGE = 15;

export const fetchFilteredMuscleCategories = createAsyncThunk<
  Exercise,
  CategoryFilter
>(
  "filteredMuscleCategories, fetchFilteredMuscleCategories",
  async ({ offset, muscleCategory }, { getState }) => {
    const options = {
      method: "GET",
      url: `https://exercisedb.p.rapidapi.com/exercises/target/${muscleCategory}`,
      params: {
        limit: "15",
        offset: `${offset}`,
      },
      headers: {
        "x-rapidapi-key": "e4ef8a100amsh64365792fac0c97p12ba9ajsna2191e132105",
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    };
    const state = getState() as { muscleFilteredExercises: ExerciseState };
    if (state.muscleFilteredExercises.pages[offset]) {
      return state.muscleFilteredExercises.pages[offset];
    }
    const response = await axios.request(options);
    return response.data;
  }
);

export const fetchFilteredEquipmentCategories = createAsyncThunk<
  Exercise,
  CategoryFilter
>(
  "filteredEquipmentCategories, fetchFilteredEquipmentCategories",
  async ({ offset, equipmentCategory }, { getState }) => {
    const options = {
      method: "GET",
      url: `https://exercisedb.p.rapidapi.com/exercises/equipment/${equipmentCategory}`,
      params: {
        limit: "15",
        offset: `${offset}`,
      },
      headers: {
        "x-rapidapi-key": "e4ef8a100amsh64365792fac0c97p12ba9ajsna2191e132105",
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    };
    const state = getState() as { equipmentFilteredExercises: ExerciseState };
    if (state.equipmentFilteredExercises.pages[offset]) {
      return state.equipmentFilteredExercises.pages[offset];
    }
    const response = await axios.request(options);
    return response.data;
  }
);

type ExerciseState = {
  muscleFilteredExercises: Exercise[];
  equipmentFilteredExercises: Exercise[];
  pages: { [offset: number]: Exercise };
  currentOffset: number;
  loading: boolean;
  error?: string | null;
};

const initialState: ExerciseState = {
  muscleFilteredExercises: [],
  equipmentFilteredExercises: [],
  pages: {},
  currentOffset: 0,
  loading: false,
  error: null,
};

export const filteredExerciseSlice = createSlice({
  name: "filteredExercises",
  initialState,
  reducers: {
    // Reducer that adds current offset and page items to send back new offset in request to api
    loadMore: (state) => {
      state.currentOffset += ITEMS_PER_PAGE;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchFilteredMuscleCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchFilteredMuscleCategories.fulfilled,
      (state, action) => {
        state.loading = false;
        const { offset } = action.meta.arg; // Extracts offset within metadata returned by the action
        state.pages[offset] = action.payload; // Sets the page amount with the current offset to contain the returned payload
        console.log("muscle filter:", action.payload);
      }
    );
    builder.addCase(fetchFilteredMuscleCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchFilteredEquipmentCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchFilteredEquipmentCategories.fulfilled,
      (state, action) => {
        state.loading = false;
        const { offset } = action.meta.arg; // Extracts offset within metadata returned by the action
        state.pages[offset] = action.payload; // Sets the page amount with the current offset to contain the returned payload
        console.log("equipment filter:", action.payload);
      }
    );
    builder.addCase(
      fetchFilteredEquipmentCategories.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }
    );
  },
});

export const { loadMore } = filteredExerciseSlice.actions;
export default filteredExerciseSlice.reducer;
