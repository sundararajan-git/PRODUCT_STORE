import { configureStore } from "@reduxjs/toolkit";
import user from "./SLICES/useSlice"
import products from "./SLICES/productSlice";

const store = configureStore({
  reducer: {
    user: user,
    products: products
  },
});
// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;
