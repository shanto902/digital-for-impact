// src/store/slices/themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark" | "system";

type ThemeState = {
  mode: ThemeMode;
};

const initialState: ThemeState = {
  mode: "system",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("themeMode", action.payload);
      }
    },
    hydrateThemeFromStorage(state) {
      if (typeof window === "undefined") return;
      const saved = localStorage.getItem("themeMode") as ThemeMode | null;
      if (saved) state.mode = saved;
    },
  },
});

export const { setTheme, hydrateThemeFromStorage } = themeSlice.actions;
export default themeSlice.reducer;
