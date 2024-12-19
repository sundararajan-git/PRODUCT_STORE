import { configureStore } from "@reduxjs/toolkit";
import user from "./SLICES/useSlice"

const store = configureStore({
  reducer: {
    user: user
  },
});

export default store;
