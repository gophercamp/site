import React from 'react';

/**
 * InfoBox component for highlighted information in policy pages
 * @param variant - the style variant of the info box (default, info, warning)
 * @param title - optional title of the info box
 * @param children - content of the info box
 */
export interface InfoBoxProps {
  variant?: 'default' | 'info' | 'warning';
  title?: string;
  children: React.ReactNode;
}

export default function InfoBox({ 
  variant = 'default', 
  title, 
  children 
}: InfoBoxProps) {
  const variantStyles = {
    default: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      titleColor: 'text-gray-800',
      textColor: 'text-gray-700'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      titleColor: 'text-blue-800',
      textColor: 'text-blue-700'
    },
    warning: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      titleColor: 'text-red-800',
      textColor: 'text-red-700'
    }
  };
  
  const styles = variantStyles[variant];
  
  return (
    <div className={`${styles.bg} border ${styles.border} rounded-lg p-6`}>
      {title && (
        <h3 className={`text-lg font-semibold ${styles.titleColor} mb-2`}>
          {title}
        </h3>
      )}
      <div className={styles.textColor}>
        {children}
      </div>
    </div>
  );
}
