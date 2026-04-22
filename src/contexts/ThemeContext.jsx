import { createContext, useContext, useEffect, useMemo } from "react";

const ThemeContext = createContext(null);

const FIXED_THEME = {
  surface: "light",
  accent: "mist",
};

export function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.dataset.theme = FIXED_THEME.surface;
    document.documentElement.dataset.accent = FIXED_THEME.accent;
  }, []);

  const value = useMemo(
    () => ({
      preferences: FIXED_THEME,
      activeSurface: FIXED_THEME.surface,
      setSurfaceTheme: () => {},
      setAccentTheme: () => {},
    }),
    []
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
