import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "weather",
  initialState: {
    currentWeather: null,
    forecast: null,
    loading: false,
    error: null,
  },
  reducers: {
    weatherRequested: (state) => {
      state.loading = true;
      state.error = null;
    },
    weatherReceived: (state, action) => {
      state.loading = false;
      state.currentWeather = action.payload;
    },
    weatherRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    forecastRequested: (state) => {
      state.loading = true;
      state.error = null;
    },
    forecastReceived: (state, action) => {
      state.loading = false;
      state.forecast = action.payload;
    },
    forecastRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  weatherRequested,
  weatherReceived,
  weatherRequestFailed,
  forecastRequested,
  forecastReceived,
  forecastRequestFailed,
} = slice.actions;

export default slice.reducer;

// Action Creators
const apiKey = "538882fc8387290c6cee83f313a6acf5";

export const fetchCurrentWeather = (cityId) =>
  apiCallBegan({
    url: `/weather?id=${cityId}&appid=${apiKey}`,
    method: "get",
    onStart: weatherRequested.type,
    onSuccess: weatherReceived.type,
    onError: weatherRequestFailed.type,
  });

export const fetchForecast = (cityId) =>
  apiCallBegan({
    url: `/forecast?id=${cityId}&appid=${apiKey}`,
    method: "get",
    onStart: forecastRequested.type,
    onSuccess: forecastReceived.type,
    onError: forecastRequestFailed.type,
  });
