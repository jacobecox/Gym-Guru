/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const isServer = typeof window === "undefined";

// Slice to create account and set token
export const createAccount = createAsyncThunk(
  "auth/create-account",
  async (formProps, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/create-account`,
        formProps
      );

      // Verifying we are requesting on server and not window using Next.js
      if (!isServer) {
        localStorage.removeItem("token");
      }
      return response.data;
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 422) {
          return rejectWithValue("Email is already in use");
        }
      }
      return rejectWithValue("Something went wrong. Please try again.");
    }
  }
);

// Slice to login and set token
export const login = createAsyncThunk(
  "auth/login",
  async (formProps, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, formProps);
      if (!isServer) {
        localStorage.removeItem("token");
      }
      return response.data;
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 401) {
          return rejectWithValue("Incorrect email or password");
        }
        if (err.response.status === 422) {
          return rejectWithValue("Email is already in use");
        }
      }
      return rejectWithValue("Something went wrong. Please try again.");
    }
  }
);

// Slice to use token to get user info
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(`${BASE_URL}/auth/current-user`, config);
      if (!isServer) {
        localStorage.removeItem("token");
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: "authenticate",
  initialState: {
    authenticated: !isServer ? localStorage.getItem("token") : "",
    error: "",
    email: null,
  },
  reducers: {
    // Reducer route to log out user
    logout: (state) => {
      if (!isServer) {
        localStorage.removeItem("token");
      }
      state.authenticated = "";
      state.email = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        state.authenticated = action.payload.token;
        state.email = action.payload.email || null;
        console.log("account created successfully ", action.payload);
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.error = action.payload as string;
        console.log("error creating account:", action.payload);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authenticated = action.payload.token;
        state.email = action.payload.email || null;
        console.log("use logged in successfully ", action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
        console.log("error logging in:", action.payload);
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.authenticated = action.payload.token;
        state.email = action.payload.email || null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
