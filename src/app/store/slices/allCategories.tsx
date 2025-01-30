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

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
});
