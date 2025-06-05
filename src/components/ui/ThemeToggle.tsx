"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa6";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md transition-colors bg-secondary hover-bg-opacity-80 cursor-pointer"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <FaSun className="h-4 w-4 text-yellow-400" />
      ) : (
        <FaMoon className="h-4 w-4 text-primary" />
      )}
    </button>
  );
}
