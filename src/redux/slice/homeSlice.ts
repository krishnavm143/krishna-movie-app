import { createSlice } from "@reduxjs/toolkit";
import { constants } from "../../constants";

const initialState = {
  url: {},
  genres: {},
  upcoming: {},
  error: undefined,
  loading: false,
};
const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    getApiConfigurationStart(state, _action) {
      state.loading = true;
    },
    getApiConfigurationSucceedeed(state, action) {
      const { images, ...restOfdata } = action.payload;
      state.loading = false;
      state.url = {
        backdrop: images.secure_base_url + constants?.ORIGINAL,
        poster: images.secure_base_url + constants?.ORIGINAL,
        profile: images.secure_base_url + constants?.ORIGINAL,
      };
    },
    getApiConfigurationError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    getGenres(state, action) {
      state.genres = action.payload;
    },
    getUpcomingStart(state, action) {
      state.loading = true;
    },
    getUpcomingSucceeded(state, action) {
      state.loading = false;
      state.upcoming = action.payload;
    },
    getUpcomingError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getApiConfigurationStart,
  getApiConfigurationError,
  getApiConfigurationSucceedeed,
  getGenres,
  getUpcomingStart,
  getUpcomingSucceeded,
  getUpcomingError,
} = homeSlice.actions;

export default homeSlice.reducer;
