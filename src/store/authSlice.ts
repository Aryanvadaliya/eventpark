import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: "", user: null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    removeAuth: (state) => {
      state.token = ''
      state.user = null
    },
  },
});

export const { setToken, setUser, removeAuth } = authSlice.actions;
export default authSlice.reducer;
