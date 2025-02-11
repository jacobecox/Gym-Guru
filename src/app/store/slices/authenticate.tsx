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
          return rejectWithValue("Incorrect email/username or password");
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
    const token = window.localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(`${BASE_URL}/auth/current-user`, config);
      if (!isServer) {
        localStorage.removeItem("token");
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

const authSlice = createSlice({
  name: "authenticate",
  initialState: {
    authenticated: !isServer ? localStorage.getItem("token") : "",
    error: "",
    email: null,
    username: null,
  },
  reducers: {
    // Reducer route to log out user
    logout: (state) => {
      if (!isServer) {
        localStorage.removeItem("token");
      }
      state.authenticated = "";
      state.email = null;
      state.username = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        state.authenticated = action.payload.token;
        state.email = action.payload.email || null;
        state.username = action.payload.username || null;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authenticated = action.payload.token;
        state.email = action.payload.email || null;
        state.username = action.payload.username || null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.authenticated = action.payload.token;
        state.email = action.payload.email || null;
        state.username = action.payload.username || null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
