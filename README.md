# Gophercamp 2026 Website

This is the official website for Gophercamp 2026, the Go conference in Czech Republic. The site is built using modern web technologies to provide a sleek, responsive experience for attendees and speakers.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) - A React framework with hybrid static & server rendering
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - For type-safe code
- **Deployment**: [Netlify](https://netlify.com/) - For continuous deployment and hosting

## Getting Started

### Local Development

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### GitHub Codespaces

This repository includes a devcontainer configuration, allowing you to develop directly in GitHub Codespaces:

1. Click the "Code" button on the GitHub repository
2. Select the "Codespaces" tab
3. Click "Create codespace on main"

Once the Codespace is ready, the development environment will be fully configured with all necessary tools and dependencies.

## Project Structure

The project follows the Next.js App Router pattern:

```
├── public/           # Static assets (favicon, logos, images)
├── src/
│   ├── app/          # Next.js App Router structure
│   ├── components/   # Reusable UI components
│   ├── styles/       # Global styles
│   └── lib/          # Utility functions
└── package.json      # Dependencies and scripts
```

## Design Decisions

- **Modern & Clean Design**: A fresh approach with a contemporary UI focused on simplicity and clarity
- **Responsive First**: Built with mobile-first approach to ensure optimal experience on all devices
- **Go Branding**: Using Go's color palette with primary blue (#00ADD8) and complementary shades
- **Animation & Interactivity**: Subtle animations using Framer Motion to enhance user engagement
- **Consistent Components**: Modular design system with reusable components for maintainability
- **Accessibility**: WCAG compliance with proper contrast, semantic HTML, and keyboard navigation
- **Performance Optimized**: Lightweight assets and optimized rendering for fast page loads

### Design Elements

The landing page includes:

1. **Header**: Minimal navigation with branding and social links
2. **Hero Section**: Bold announcement of the event with date and location
3. **About Section**: Brief overview of Gophercamp and its features
4. **Newsletter Section**: Email signup form for event updates
5. **Footer**: Comprehensive site navigation, social links, and contact info

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Lint code

## Deployment

The site is configured for deployment on Netlify:

- Production deployments happen automatically from the main branch
- Preview deployments are generated for each pull request

## License

All rights reserved. Copyright © 2025-2026 Gophercamp
