import { configureStore } from "@reduxjs/toolkit";
import cities from "./slices/citiesSlice";

const store: any = configureStore({
  reducer: { cities },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
