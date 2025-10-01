// src/components/ThemeWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { hydrateThemeFromStorage, ThemeMode } from "@/store/slices/themeSlice";

function resolveEffectiveTheme(mode: ThemeMode): "light" | "dark" {
  if (mode === "light" || mode === "dark") return mode;
  // system
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
}

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const mode = useSelector((s: RootState) => s.theme.mode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // get saved mode before first paint
    dispatch(hydrateThemeFromStorage());
    setMounted(true);
  }, [dispatch]);

  useEffect(() => {
    if (!mounted) return;

    const html = document.documentElement;

    // apply current effective theme
    const apply = () => {
      const effective = resolveEffectiveTheme(mode);
      html.classList.remove("light", "dark");
      html.classList.add(effective);
    };

    apply();

    // if system mode, react to system changes
    if (mode === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => apply();
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
  }, [mode, mounted]);

  return <>{children}</>;
}
