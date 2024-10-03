import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";

export default configureStore({
   reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer, // Add the cryptoApi reducer to the store
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer, // Add the cryptoNewsApi reducer to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware).concat(cryptoNewsApi.middleware)

})