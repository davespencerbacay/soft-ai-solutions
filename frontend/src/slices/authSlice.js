import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token") || null;
const userIdFromStorage = localStorage.getItem("userId") || null;

const initialState = {
  token: tokenFromStorage,
  isLoggedIn: !!tokenFromStorage,
  userId: parseInt(userIdFromStorage),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, userId } = action.payload;
      state.token = token;
      state.userId = userId || null;
      state.isLoggedIn = true;
      state.error = null;
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      state.error = null;
      localStorage.removeItem("token");
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setCredentials, logout, setError, clearError } = authSlice.actions;

export default authSlice.reducer;
