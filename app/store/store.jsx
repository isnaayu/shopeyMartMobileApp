import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersSlice";
import productReducer from "./reducers/productsSlice";

export const store = configureStore({
    reducer: {
      users: usersReducer,
      products: productReducer,
    //   stores: storeReducer,
    },
  });