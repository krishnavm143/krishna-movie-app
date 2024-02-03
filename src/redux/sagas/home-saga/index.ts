import { all, call, put, takeLatest } from "redux-saga/effects";
import { fetchMovieFromApi } from "../../../utils";
import {
  getApiConfigurationError,
  getApiConfigurationStart,
  getApiConfigurationSucceedeed,
  getUpcomingStart,
  getUpcomingSucceeded,
} from "../../slice/homeSlice";
import { fetchMoviePayload } from "../../../types";

function* fetchMovieSaga({ payload }) {
  try {
    const { url, params } = payload;
    const movies = yield call(fetchMovieFromApi, { url, params });
    yield put(getApiConfigurationSucceedeed(movies));
  } catch (error) {
    yield put(getApiConfigurationError(error.message));
  }
}
export function* watchFetchMovie() {
  yield takeLatest(getApiConfigurationStart.type, fetchMovieSaga);
}

function* fetchUpcoming({ payload }) {
  try {
    const { url, params } = payload;
    const upcoming = yield call(fetchMovieFromApi, { url, params });
    yield put(getUpcomingSucceeded(upcoming));
  } catch (error) {
    yield put(getUpcomingSucceeded(error.message));
  }
}

export function* watchFetchUpcoming() {
  yield takeLatest(getUpcomingStart.type, fetchUpcoming);
}

export function* rootHomeSaga() {
  yield all([watchFetchMovie(), watchFetchUpcoming()]);
}
