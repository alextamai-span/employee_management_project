// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmployerProfile } from "../types/employer.types";

interface AuthState {
  token: string | null;
  user: EmployerProfile | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("employerToken"),
  user: localStorage.getItem("employerUser")
    ? JSON.parse(localStorage.getItem("employerUser")!)
    : null,
  isLoggedIn: !!localStorage.getItem("employerToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; user: EmployerProfile }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
      localStorage.setItem("employerToken", action.payload.token);
      localStorage.setItem("employerUser", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("employerToken");
      localStorage.removeItem("employerUser");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
