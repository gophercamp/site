# Developer Guide

This guide provides instructions for developers working on the Gophercamp 2026 website.

## Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd gophercamp2026
```

2. **Install dependencies**

```bash
npm install
```

3. **Run development server**

```bash
npm run dev
```

This will start the development server at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── public/           # Static assets (favicon, logos, images)
├── src/
│   ├── app/          # Next.js App Router structure
│   │   ├── layout.tsx  # Root layout with shared UI
│   │   ├── page.tsx    # Landing page component
│   │   └── globals.css # Global styles
│   ├── components/   # Reusable UI components
│   │   ├── layout/     # Layout components (Header, Footer)
│   │   ├── sections/   # Page sections (Hero, About, Newsletter)
│   │   └── ui/         # UI components (Button, etc)
│   └── lib/          # Utility functions
└── package.json      # Dependencies and scripts
```

## Component Development

### Creating New Components

1. Create a new file in the appropriate folder under `src/components/`
2. Export the component as the default export
3. Import and use in your pages or other components

### Component Structure Example

```tsx
import React from 'react';

type ExampleProps = {
  title: string;
};

export default function Example({ title }: ExampleProps) {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}
```

## Styling Guidelines

We use Tailwind CSS for styling with a custom color palette for Go branding:

- Primary Blue: `#00ADD8` (go-blue)
- Light Blue: `#5DC9E2` (go-blue-light)
- Dark Blue: `#007D9C` (go-blue-dark)
- Darker Blue: `#00526A` (go-blue-darker)

### Example Usage

```tsx
<div className="bg-go-blue text-white">Go-branded content</div>
```

## State Management

For simple components, use React's built-in state management:

```tsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

## Deployment

The site is deployed to Netlify. Push changes to the main branch to trigger a production deployment.

Preview deployments are automatically created for pull requests.

## Testing

Run tests with:

```bash
npm run test
```

## Building for Production

```bash
npm run build
```

This will generate the production-ready files in the `.next` directory.

## Code Formatting and Linting

We use Prettier for code formatting and ESLint for code quality. This ensures a consistent code style across the codebase.

### Available Commands

```bash
# Format all files with Prettier
npm run format

# Check if all files are properly formatted
npm run format:check

# Run ESLint to check for code quality issues
npm run lint

# Run both format and lint together
npm run fix
```

### Pre-commit Hook

We use Husky with lint-staged to automatically format files before commits. This means:

1. When you stage files with `git add`, they're prepared for commit
2. When you run `git commit`, the pre-commit hook will:
   - Format all staged files with Prettier
   - Lint all staged JavaScript/TypeScript files with ESLint
   - Only if both steps pass, your commit will succeed

### VS Code Integration

If you're using VS Code (recommended), install these extensions:

- Prettier - Code formatter (esbenp.prettier-vscode)
- ESLint (dbaeumer.vscode-eslint)

The project includes VS Code settings that enable:

- Format on save
- ESLint auto-fix on save

For more detailed information, see the [Code Formatting Guide](docs/CODE_FORMATTING.md).
