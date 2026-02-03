import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (localStorage.theme) {
      return localStorage.theme === "dark";
    }
    return false; // default claro
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      root.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [isDark]);

  return {
    isDark,
    toggle: () => setIsDark(prev => !prev),
  };
}
