import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Exercise, Params } from "@/app/types";

const ITEMS_PER_PAGE = 15;

export const fetchExercises = createAsyncThunk<Exercise, Params>(
  "exercises/fetchExercises",
  async ({ offset }, { getState }) => {
    const options = {
      method: "GET",
      url: "https://exercisedb.p.rapidapi.com/exercises",
      params: {
        limit: "15",
        offset: `${offset}`,
      },
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
      },
    };
    const state: any = getState();
    if (state.items.pages[offset]) {
      return state.items.pages[offset];
    }

    const response = await axios.request(options);
    return response.data;
  }
);

type ExerciseState = {
  exercises: Exercise[];
  pages: { [offset: number]: Exercise };
  currentOffset: number;
  loading: boolean;
  error: string | null | undefined;
};

const initialState: ExerciseState = {
  exercises: [],
  pages: {},
  currentOffset: 0,
  loading: false,
  error: null,
};

export const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    loadMore: (state) => {
      state.currentOffset += ITEMS_PER_PAGE;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchExercises.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchExercises.fulfilled, (state, action) => {
      state.loading = false;
      const { offset } = action.meta.arg;
      state.pages[offset] = action.payload;
    });
    builder.addCase(fetchExercises.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { loadMore } = exerciseSlice.actions;
export default exerciseSlice.reducer;
