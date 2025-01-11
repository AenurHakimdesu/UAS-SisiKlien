import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      // Hapus data dari localStorage
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    },
  },
});
export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
