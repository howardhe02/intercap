import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weather";
import apiMiddleware from "./middleware/api";

const createStore = () => {
  return configureStore({
    reducer: {
      weather: weatherReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiMiddleware),
  });
};

export default createStore;
