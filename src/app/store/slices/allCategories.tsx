import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  MuscleCategory,
  EquipmentCategory,
  FilterCategory,
} from "@/app/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchMuscleCategories = createAsyncThunk(
  "muscleCategories, fetchMuscleCategories",
  async () => {
    try {
      const response = await fetch(`${BASE_URL}/muscle-categories`);
      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
);

export const fetchEquipmentCategories = createAsyncThunk(
  "equipmentCategories, fetchEquipmentCategories",
  async () => {
    try {
      const response = await fetch(`${BASE_URL}/equipment-categories`);
      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
);

type categoryState = {
  muscleCategories: MuscleCategory[];
  equipmentCategories: EquipmentCategory[];
  filters: FilterCategory;
  loading: boolean;
  error?: string | null;
};

const initialState: categoryState = {
  muscleCategories: [],
  equipmentCategories: [],
  filters: {
    muscle: "",
    equipment: "",
  },
  loading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // Sets filters with what filter is selected
    setMuscleFilter: (state, action) => {
      state.filters.muscle = action.payload;
    },
    setEquipmentFilter: (state, action) => {
      state.filters.equipment = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMuscleCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMuscleCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.muscleCategories = action.payload;
      console.log("muscle category:", action.payload);
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
      console.log("equipment category:", action.payload);
    });
    builder.addCase(fetchEquipmentCategories.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { setMuscleFilter, setEquipmentFilter } = categoriesSlice.actions;
export default categoriesSlice.reducer;
