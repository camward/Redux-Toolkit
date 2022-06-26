import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import { goodsApi } from "./goodsApi";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    [goodsApi.reducerPath]: goodsApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(goodsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
