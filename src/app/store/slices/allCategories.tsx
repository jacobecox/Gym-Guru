import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMuscleCategories = createAsyncThunk(
  "muscleCategories, fetchMuscleCategories",
  async () => {
    const muscleCategories = {
      method: "GET",
      url: "https://exercisedb.p.rapidapi.com/exercises/targetList",
      headers: {
        "x-rapidapi-key": "e4ef8a100amsh64365792fac0c97p12ba9ajsna2191e132105",
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    };
    const response = await axios.request(muscleCategories);
    return response.data;
  }
);

export const fetchEquipmentCategories = createAsyncThunk(
  "equipmentCategories, fetchEquipmentCategories",
  async () => {
    const equipmentCategories = {
      method: "GET",
      url: "https://exercisedb.p.rapidapi.com/exercises/equipmentList",
      headers: {
        "x-rapidapi-key": "e4ef8a100amsh64365792fac0c97p12ba9ajsna2191e132105",
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    };
    const response = await axios.request(equipmentCategories);
    return response.data;
  }
);

type categoryState = {
  muscleCategories: string[];
  equipmentCategories: string[];
  loading: boolean;
  error?: string | null;
};

const initialState: categoryState = {
  muscleCategories: [],
  equipmentCategories: [],
  loading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchMuscleCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMuscleCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.muscleCategories = action.payload;
    });
    builder.addCase(fetchMuscleCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchEquipmentCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEquipmentCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.equipmentCategories = action.payload;
    });
    builder.addCase(fetchEquipmentCategories.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default categoriesSlice.reducer;
