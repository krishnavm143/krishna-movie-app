import {configureStore, } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import createSagaMiddelware from "redux-saga"
import rootReducer from '../slice/rootReducer'
import { rootSaga } from '../sagas'
const sagaMiddelware=createSagaMiddelware()
const middelware=[sagaMiddelware]
export const store=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(middelware).concat(logger)
})

sagaMiddelware.run(rootSaga)

export default store