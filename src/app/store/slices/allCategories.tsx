import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  MuscleCategory,
  EquipmentCategory,
  FilterCategory,
} from "@/app/types";

export const fetchMuscleCategories = createAsyncThunk(
  "muscleCategories, fetchMuscleCategories",
  async () => {
    const response = await fetch("http://localhost:8000/muscle-categories");
    return response.json();
  }
);

export const fetchEquipmentCategories = createAsyncThunk(
  "equipmentCategories, fetchEquipmentCategories",
  async () => {
    const response = await fetch("http://localhost:8000/equipment-categories");
    return response.json();
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
    setMuscleFilter: (state, action) => {
      state.filters.muscle = action.payload;
      console.log("muscle filter:", action.payload);
    },
    setEquipmentFilter: (state, action) => {
      state.filters.equipment = action.payload;
      console.log("equipment filter:", action.payload);
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

export const { setMuscleFilter, setEquipmentFilter } = categoriesSlice.actions;
export default categoriesSlice.reducer;
