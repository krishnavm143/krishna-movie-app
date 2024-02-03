import { combineReducers } from "redux";
import homeReducer from "./homeSlice"
 const rootReducer=combineReducers({
    home:homeReducer
})

export default rootReducer

export type RootState=ReturnType<typeof rootReducer>