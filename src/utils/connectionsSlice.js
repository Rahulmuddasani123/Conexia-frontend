import { createSlice } from "@reduxjs/toolkit";

const ConnectionsSlice = createSlice({
  name: "Connections",
  initialState: [],
  reducers: {
    addConnection: (state, action) => action.payload,
    removeConnection: (state, action) => {
      const newArray = state.filter((e) => e.requestId !== action.payload);
      return newArray;
    },
  },
});

export const { addConnection, removeConnection } = ConnectionsSlice.actions;

export default ConnectionsSlice.reducer;
