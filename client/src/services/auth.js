import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authen: localStorage.getItem("authorization"),
};

export const auth = createSlice({
  name: "languageDetect",
  initialState,
  reducers: {
    authForm: (state, action) => {
      if (state.authen !== action.payload) {
        state.authen = action.payload;
      }
    },
  },
});

export const authActions = auth.actions;
export const authReducer = auth.reducer;
