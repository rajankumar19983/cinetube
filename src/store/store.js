import { configureStore } from "@reduxjs/toolkit";
import homePageSlice from "./homePageSlice";

export const store = configureStore({
  reducer: {
    home: homePageSlice,
  },
});
