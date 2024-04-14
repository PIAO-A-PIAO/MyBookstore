"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import booksReducer from "./booksSlice";
import popupReducer from "./popupSlice";
import alertReducer from "./alertSlice";
import { persistReducer, persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { apiSlice } from "./apiSlice";
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const booksPersistConfig = {
  key: "books",
  storage: storage,
  whitelist: ["books"],
};

const popupPersistConfig = {
  key: "popup",
  storage: storage,
  whitelist: ["popup"],
};

const alertPersistConfig = {
  key: "alert",
  storage: storage,
  whitelist: ["alert"],
};

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["popup", "books", "alert"],
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  books: persistReducer(booksPersistConfig, booksReducer),
  popup: persistReducer(popupPersistConfig, popupReducer),
  alert: persistReducer(alertPersistConfig, alertReducer),
});

export const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
