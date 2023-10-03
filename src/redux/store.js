// store.js

import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/userSlice.js";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, usersReducer);

export const store = configureStore({
  
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
