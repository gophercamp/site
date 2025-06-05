# Development Container for Gophercamp Website

This folder contains configuration files for GitHub Codespaces and VS Code Dev Containers.

## What's included?

- Node.js 20
- Git and GitHub CLI
- Essential VS Code extensions for Next.js, TypeScript, and Tailwind CSS development
- Pre-configured settings for ESLint and Prettier

## Using the Dev Container

### GitHub Codespaces
1. Go to the GitHub repository
2. Click the "Code" button
3. Select the "Codespaces" tab
4. Click "Create codespace on main"

### VS Code Dev Containers
1. Install the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension
2. Open the project folder in VS Code
3. Click the green button in the bottom-left corner
4. Select "Reopen in Container"

## Starting the Development Server

Once the container is running, you can start the development server:

```bash
npm run dev
```

The development server will be accessible at http://localhost:3000.
