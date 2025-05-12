import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "Requests",
  initialState: [],
  reducers: {
    addRequest: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const newArray = state.filter((e) => e.requestId !== action.payload);
      return newArray;
    },

  },
});

export const { addRequest, removeRequest } = requestsSlice.actions;

export default requestsSlice.reducer;
