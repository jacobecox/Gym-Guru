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
    // Gets redux global state and searches if items within offset(pages) exist, if items are not in offset it loads new request from api
    const state = getState() as { exercises: ExerciseState };
    if (state.exercises.pages[offset]) {
      return state.exercises.pages[offset];
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
  error?: string | null;
};

const initialState: ExerciseState = {
  exercises: [],
  pages: {},
  currentOffset: 0,
  loading: false,
  error: null,
};

// In this slice we use caching in the redux global state to avoid fetching all data at once and slowing rendering speeds or needing to send a new request to the api for every page updated. This allows us to use caching to display current and past items without having to make new api calls and only calling the api for new items
export const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    // Reducer that adds current offset and page items to send back new offset in request to api
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
      const { offset } = action.meta.arg; // Extracts offset within metadata returned by the action
      state.pages[offset] = action.payload; // Sets the page amount with the current offset to contain the returned payload
    });
    builder.addCase(fetchExercises.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { loadMore } = exerciseSlice.actions;
export default exerciseSlice.reducer;
