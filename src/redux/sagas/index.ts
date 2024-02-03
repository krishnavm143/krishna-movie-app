import { all } from "redux-saga/effects";
import { rootHomeSaga, watchFetchMovie } from "./home-saga";

export function* rootSaga() {
  yield all([rootHomeSaga()]);
}
