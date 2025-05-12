import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import requestsReducer from "./requestsSlice";
import connectionsReducer from "./connectionsSlice";

const store = configureStore({
  reducer: {
    User: userReducer,
    Feed: feedReducer,
    Requests: requestsReducer,
    Connections: connectionsReducer,
  },
});

export default store;
