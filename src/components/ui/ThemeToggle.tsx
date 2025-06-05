"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon, FaLaptop } from "react-icons/fa6";
import Dropdown from "@/components/ui/Dropdown";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  // Get the appropriate icon based on current theme
  const renderThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <FaMoon className="h-4 w-4 text-primary" />;
      case 'light':
        return <FaSun className="h-4 w-4 text-yellow-400" />;
      default:
        return <FaLaptop className="h-4 w-4 text-primary" />;
    }
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: <FaSun className="h-4 w-4 text-yellow-400" /> },
    { value: 'dark', label: 'Dark', icon: <FaMoon className="h-4 w-4 text-primary" /> },
    { value: 'system', label: 'System', icon: <FaLaptop className="h-4 w-4 text-primary" /> },
  ];
  
  const triggerButton = (
    <button
      className="p-2 rounded-md transition-colors bg-secondary hover-bg-opacity-80 cursor-pointer"
      aria-label="Toggle theme mode"
      title={`Current theme: ${theme}`}
    >
      {renderThemeIcon()}
    </button>
  );
  
  return (
    <Dropdown 
      trigger={triggerButton}
      menuId="theme-menu"
      width="10rem" // 40 in rem units
    >
      {themeOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => setTheme(option.value)}
          className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-secondary transition-colors duration-150 ${theme === option.value ? 'font-medium text-go-blue' : 'text-primary'}`}
          role="menuitem"
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </Dropdown>
  );
}
