import { useEffect, useState } from "react";

// helper: resolve 'system' to actual light/dark using prefers-color-scheme
export const useResolvedColorMode = (mode: "light" | "dark" | "system") => {
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (mode !== "system") {
      setResolved(mode);
      return;
    }
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setResolved(mq.matches ? "dark" : "light");
    update();

    // add/remove event listener safely across browsers
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, [mode]);

  return resolved;
};
