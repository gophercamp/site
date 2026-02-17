/**
 * Shared types for section components
 */

/**
 * Background variant options for sections
 * - 'primary': Primary background color (light in light mode, dark in dark mode)
 * - 'secondary': Secondary/alternate background color
 * - 'accent': Go blue accent background (darker blue)
 */
export type SectionBackground = 'primary' | 'secondary' | 'accent';

/**
 * Maps background variant to Tailwind CSS class
 */
export const sectionBackgroundClasses: Record<SectionBackground, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-go-blue-darker',
};

/**
 * Common props shared by section components
 */
export interface SectionProps {
  /** Background color variant for the section */
  background?: SectionBackground;
}

/**
 * Helper function to get the background class for a section
 * @param background - The background variant
 * @param defaultBg - Default background if none specified
 * @returns Tailwind CSS class for the background
 */
export function getSectionBackgroundClass(
  background: SectionBackground | undefined,
  defaultBg: SectionBackground = 'primary'
): string {
  return sectionBackgroundClasses[background ?? defaultBg];
}
