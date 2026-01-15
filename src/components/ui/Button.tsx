import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  // Define base classes
  const baseClasses =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-go-blue focus:ring-offset-2';

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-go-blue hover:bg-go-blue-dark text-white border border-transparent',
    secondary: 'bg-primary hover-bg-opacity-90 text-primary border border-primary',
    outline: 'bg-transparent hover:bg-secondary text-go-blue border border-go-blue',
  };

  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  // Combine all classes
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  // Animation properties
  const buttonAnimation = {
    tap: { scale: 0.98 },
  };

  // If it's a link button
  if (href && !disabled) {
    return (
      <motion.div whileTap="tap" variants={buttonAnimation}>
        <Link href={href} className={buttonClasses}>
          {children}
        </Link>
      </motion.div>
    );
  }

  // If it's a disabled link button
  if (href && disabled) {
    return (
      <span className={buttonClasses} aria-disabled={disabled}>
        {children}
      </span>
    );
  }

  // If it's a regular button
  return (
    <motion.button
      onClick={onClick}
      type={type}
      className={buttonClasses}
      disabled={disabled}
      whileTap="tap"
      variants={buttonAnimation}
    >
      {children}
    </motion.button>
  );
}
