import { RootState } from "../slice/rootReducer";

export const selectAllMovies = (state: RootState) =>
  state?.home?.upcoming || {};
export const selectUrl = (state: RootState) => state?.home?.url || {};

export const selectLoadingState = (state: RootState) => state?.home?.loading;

export const selectErrorMessage = (state: RootState) => state?.home?.error;
