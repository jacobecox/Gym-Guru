import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { MuscleCategory, EquipmentCategory } from "@/app/types";
import { PayloadAction } from "@reduxjs/toolkit";

export const fetchMuscleCategories = createAsyncThunk(
  "muscleCategories, fetchMuscleCategories",
  async () => {
    const response = await fetch("http://localhost:8000/muscleCategories");
    return response.json();
  }
);

export const fetchEquipmentCategories = createAsyncThunk(
  "equipmentCategories, fetchEquipmentCategories",
  async () => {
    const response = await fetch("http://localhost:8000/equipmentCategories");
    return response.json();
  }
);

type categoryState = {
  muscleCategories: MuscleCategory[];
  equipmentCategories: EquipmentCategory[];
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
  reducers: {
    setMuscleCategories: (state, action: PayloadAction<MuscleCategory[]>) => {
      state.muscleCategories = action.payload;
    },
  },

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
