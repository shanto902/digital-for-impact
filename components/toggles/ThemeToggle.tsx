// src/components/ThemeDropdown.tsx
"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, ThemeMode } from "@/store/slices/themeSlice";
import type { RootState } from "@/store";
import { Sun, Moon, Laptop2, ChevronDown, Check } from "lucide-react";

const OPTIONS: { value: ThemeMode; label: string; Icon: any; hint?: string }[] =
  [
    { value: "light", label: "Light", Icon: Sun, hint: "Bright UI" },
    { value: "dark", label: "Dark", Icon: Moon, hint: "Dimmed UI" },
    { value: "system", label: "System", Icon: Laptop2, hint: "Follow device" },
  ];

export default function ThemeDropdown() {
  const dispatch = useDispatch();
  const mode = useSelector((s: RootState) => s.theme.mode);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(
    Math.max(
      0,
      OPTIONS.findIndex((o) => o.value === mode)
    )
  );

  const current = useMemo(
    () => OPTIONS.find((o) => o.value === mode) ?? OPTIONS[2],
    [mode]
  );

  // --- Desktop dropdown behaviors ---
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(t) &&
        btnRef.current &&
        !btnRef.current.contains(t)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick, true);
    return () => document.removeEventListener("mousedown", onDocClick, true);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown" || e.key === "j") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % OPTIONS.length);
    } else if (e.key === "ArrowUp" || e.key === "k") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + OPTIONS.length) % OPTIONS.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const opt = OPTIONS[activeIndex];
      dispatch(setTheme(opt.value));
      setOpen(false);
      btnRef.current?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Mobile: segmented control (side-by-side) */}
      <div
        role="tablist"
        aria-label="Theme"
        className="
          md:hidden flex items-center gap-1 rounded-xl border border-neutral-200/70
          bg-white/70 p-1 shadow-sm dark:border-white/10 dark:bg-neutral-900/70
        "
      >
        {OPTIONS.map((o) => {
          const selected = mode === o.value;
          return (
            <button
              key={o.value}
              role="tab"
              aria-selected={selected}
              onClick={() => dispatch(setTheme(o.value))}
              className={`
                flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm
                transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400
                ${
                  selected
                    ? "bg-neutral-900 text-white dark:bg-neutral-800"
                    : "text-neutral-700 hover:bg-white dark:text-neutral-300 dark:hover:bg-neutral-800/70"
                }
              `}
            >
              <o.Icon className="h-4 w-4" aria-hidden />
              <span>{o.label}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop: your original dropdown */}
      <div className="hidden md:block">
        <button
          ref={btnRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="
            group inline-flex items-center gap-2 rounded-xl border border-neutral-200/70
            bg-white/70 px-3 py-2 text-sm font-medium shadow-sm
            hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400
            dark:border-white/10 dark:bg-neutral-900/70 dark:hover:bg-neutral-900
            transition-colors
          "
        >
          <current.Icon className="h-4 w-4" aria-hidden />
          {/* <span className="text-sm">{current.label}</span> */}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
          <span className="sr-only">Select color theme</span>
        </button>

        {open && (
          <div
            ref={menuRef}
            role="listbox"
            tabIndex={-1}
            onKeyDown={onMenuKeyDown}
            className="
              absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl border border-neutral-200/70
              bg-white/90 backdrop-blur shadow-lg ring-1 ring-black/5
              dark:border-white/10 dark:bg-neutral-950/90
              animate-in fade-in zoom-in-95
            "
          >
            <div className="py-1">
              {OPTIONS.map((o, idx) => {
                const selected = mode === o.value;
                const focused = activeIndex === idx;
                return (
                  <button
                    key={o.value}
                    role="option"
                    aria-selected={selected}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => {
                      dispatch(setTheme(o.value));
                      setOpen(false);
                      btnRef.current?.focus();
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm
                      ${focused ? "bg-neutral-100 dark:bg-neutral-800/70" : ""}
                      ${selected ? "font-medium" : "font-normal"}
                      focus:outline-none
                    `}
                  >
                    <div
                      className={`
                        inline-flex h-8 w-8 items-center justify-center rounded-lg
                        ${o.value === "light" ? "bg-yellow-50 ring-1 ring-yellow-200 text-black" : ""}
                        ${o.value === "dark" ? "bg-neutral-800 text-white ring-1 ring-neutral-700" : ""}
                        ${o.value === "system" ? "bg-neutral-100 ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-800" : ""}
                      `}
                    >
                      <o.Icon className="h-4 w-4" aria-hidden />
                    </div>
                    <div className="flex-1">
                      <div className="leading-5">{o.label}</div>
                      {o.hint && (
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          {o.hint}
                        </div>
                      )}
                    </div>
                    {selected && (
                      <Check className="h-4 w-4 opacity-80" aria-hidden />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
