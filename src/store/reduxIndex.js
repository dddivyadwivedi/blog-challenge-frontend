import { configureStore ,  } from "@reduxjs/toolkit";
import { combineReducers , } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import saga from "./sagaIndex";
import storage from "redux-persist/lib/storage";
import UserAuth from "./userRedux";
import BlogSlice from './blogRedux';


const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["UserAuth" , "BlogSlice"],
};

const rootReducer = combineReducers({ UserAuth , BlogSlice });
export const persistedReducer = persistReducer(persistConfig, rootReducer);

let sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(saga);

export const persistor = persistStore(store);
