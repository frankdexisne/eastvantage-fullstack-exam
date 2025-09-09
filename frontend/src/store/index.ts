import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user";
import selectSlice from "./slices/select";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    select: selectSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
