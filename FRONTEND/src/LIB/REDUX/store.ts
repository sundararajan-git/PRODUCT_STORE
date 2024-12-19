import { configureStore } from "@reduxjs/toolkit";
import user from "./SLICES/useSlice"

const store = configureStore({
  reducer: {
    user: user
  },
});
// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;
