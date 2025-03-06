import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: "" },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },

    removeAuth: (state) => {
      state.token = "";
    },
  },
});

export const { setToken, removeAuth } = authSlice.actions;
export default authSlice.reducer;
