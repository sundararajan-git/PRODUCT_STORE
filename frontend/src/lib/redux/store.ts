import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/useSlice"
import products from "./slices/productSlice";

const store = configureStore({
  reducer: {
    user: user,
    products: products
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;
