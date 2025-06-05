/**
 * Central configuration for all social media links and related data
 */

import { 
  FaXTwitter, 
  FaGithub, 
  FaYoutube, 
  FaLinkedin, 
  FaFacebook
} from 'react-icons/fa6';

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  ariaLabel: string;
  hoverColor: string;
  trackingId: string;
}

export interface ContactInfo {
  email: string;
  location: string;
  privacy: string;
  conduct: string;
  accessibility: string;
}

/**
 * All social media links for Gophercamp
 * Using specific CSS classes for hover effects to ensure consistency
 */
export const socialLinks: SocialLink[] = [
  {
    id: 'x',
    name: 'X',
    url: 'https://x.com/gophercamp',
    icon: FaXTwitter,
    ariaLabel: 'Follow us on X',
    hoverColor: 'social-x', // Custom CSS class for X hover
    trackingId: 'x'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://youtube.com/@gophercamp',
    icon: FaYoutube,
    ariaLabel: 'Subscribe to our YouTube channel',
    hoverColor: 'social-youtube', // Custom CSS class for YouTube hover
    trackingId: 'youtube'
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/gophercamp',
    icon: FaGithub,
    ariaLabel: 'Follow us on GitHub',
    hoverColor: 'social-github', // Custom CSS class for GitHub hover
    trackingId: 'github'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/gophercamp',
    icon: FaLinkedin,
    ariaLabel: 'Follow us on LinkedIn',
    hoverColor: 'social-linkedin', // Custom CSS class for LinkedIn hover
    trackingId: 'linkedin'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://facebook.com/GolangBrno',
    icon: FaFacebook,
    ariaLabel: 'Follow us on Facebook',
    hoverColor: 'social-facebook', // Custom CSS class for Facebook hover
    trackingId: 'facebook'
  }
];

/**
 * Contact information
 */
export const contactInfo: ContactInfo = {
  email: 'info@gophercamp.cz',
  location: 'Brno, Czech Republic',
  privacy: 'privacy@gophercamp.cz',
  conduct: 'conduct@gophercamp.cz',
  accessibility: 'accessibility@gophercamp.cz'
};

/**
 * Get social links for header (subset of all links)
 */
export function getHeaderSocialLinks(): SocialLink[] {
  return socialLinks.filter(link => ['x', 'youtube', 'github'].includes(link.id));
}

/**
 * Get social links for footer (all links)
 */
export function getFooterSocialLinks(): SocialLink[] {
  return socialLinks;
}

/**
 * Get specific social link by ID
 */
export function getSocialLink(id: string): SocialLink | undefined {
  return socialLinks.find(link => link.id === id);
}

/**
 * Get primary social link for main promotional content
 */
export function getPrimarySocialLink(): SocialLink {
  return getSocialLink('youtube')!;
}
