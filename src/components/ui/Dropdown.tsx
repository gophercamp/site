"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

export interface DropdownProps {
  /**
   * Trigger element that opens the dropdown when clicked
   */
  trigger: ReactNode;
  /**
   * Content of the dropdown menu
   */
  children: ReactNode;
  /**
   * Optional CSS class for the dropdown container
   */
  className?: string;
  /**
   * Optional CSS class for the dropdown menu
   */
  menuClassName?: string;
  /**
   * Dropdown menu position relative to trigger
   * @default "bottom-right"
   */
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  /**
   * Dropdown menu width (CSS width value)
   * @default "auto"
   */
  width?: string;
  /**
   * ID for the dropdown menu element (for accessibility)
   * @default "dropdown-menu"
   */
  menuId?: string;
}

export default function Dropdown({
  trigger,
  children,
  className = "",
  menuClassName = "",
  position = "bottom-right",
  width = "auto",
  menuId = "dropdown-menu",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to close dropdown with animation - using useCallback to avoid dependency cycle
  const closeDropdown = useCallback(() => {
    if (isOpen && !isClosing) {
      setIsClosing(true);
      // Wait for animation to complete before hiding the dropdown
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 200); // Match this with animation duration in globals.css
    }
  }, [isOpen, isClosing]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      setIsOpen(true);
    }
  };

  // Position classes
  const positionClasses = {
    "bottom-right": "right-0 top-full mt-2",
    "bottom-left": "left-0 top-full mt-2",
    "top-right": "right-0 bottom-full mb-2",
    "top-left": "left-0 bottom-full mb-2",
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Using cloneElement to add onClick handler to the trigger */}
      <div onClick={toggleDropdown}>
        {trigger}
      </div>
      
      {isOpen && (
        <div 
          id={menuId}
          className={`absolute ${positionClasses[position]} bg-primary border border-primary rounded-md shadow-lg py-1 z-50 ${isClosing ? 'theme-menu-exit' : 'theme-menu-enter'} ${menuClassName}`}
          role="menu"
          style={{ width }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
