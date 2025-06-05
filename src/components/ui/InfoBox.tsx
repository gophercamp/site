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
      bg: 'infobox-bg-default',
      border: 'infobox-border-default',
      titleColor: 'infobox-title-default',
      textColor: 'infobox-text-default'
    },
    info: {
      bg: 'infobox-bg-info',
      border: 'infobox-border-info',
      titleColor: 'infobox-title-info',
      textColor: 'infobox-text-info'
    },
    warning: {
      bg: 'infobox-bg-warning',
      border: 'infobox-border-warning',
      titleColor: 'infobox-title-warning',
      textColor: 'infobox-text-warning'
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
