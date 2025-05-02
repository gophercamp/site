# Gophercamp Project Guidelines

This document provides guidelines and instructions for developing and maintaining the Gophercamp website project.

## Build/Configuration Instructions

### Local Development Setup

1. **Prerequisites**:
   - [Hugo](https://gohugo.io/installation/) (version 0.146.5 or compatible)
   - [Node.js](https://nodejs.org/) (for running tests)
   - [npm](https://www.npmjs.com/) (comes with Node.js)

2. **Clone and Install Dependencies**:
   ```bash
   git clone <repository-url>
   cd gophercamp
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   hugo server -D
   ```
   This will start a local development server at http://localhost:1313/ with live reloading enabled.

4. **Build for Production**:
   ```bash
   hugo
   ```
   This will generate the static site in the `public` directory.

### Netlify Deployment

The site is configured for deployment on Netlify with the following settings (defined in `netlify.toml`):

- **Build Command**: `hugo`
- **Publish Directory**: `public`
- **Hugo Version**: 0.146.5

To deploy manually using Netlify CLI:

1. Install Netlify CLI: `npm install netlify-cli -g`
2. Build the site: `hugo`
3. Deploy preview: `netlify deploy`
4. Deploy to production: `netlify deploy --prod`

## Testing Information

### Testing Setup

The project uses [Cypress](https://www.cypress.io/) for end-to-end testing. The testing configuration is defined in `cypress.config.js`.

### Running Tests

1. **Start the Hugo Server** (in one terminal):
   ```bash
   npm run start
   ```

2. **Run Tests** (in another terminal):
   - Run tests in headless mode:
     ```bash
     npm run test
     ```
   - Run tests with Cypress UI:
     ```bash
     npm run test:open
     ```

### Adding New Tests

1. Create a new test file in the `cypress/e2e` directory with a `.cy.js` extension.
2. Follow the Cypress testing pattern as shown in the example below:

```javascript
describe('Test Suite Name', () => {
  it('should test specific functionality', () => {
    cy.visit('/path-to-page');
    cy.get('selector').should('assertion', 'value');
  });
});
```

### Example Test

The project includes a simple test for the homepage in `cypress/e2e/homepage.cy.js`:

```javascript
describe('Homepage', () => {
  it('should load the homepage successfully', () => {
    cy.visit('/');
    cy.get('title').should('contain', 'Gophercamp');
  });

  it('should have navigation menu', () => {
    cy.visit('/');
    cy.get('nav').should('be.visible');
  });
});
```

## Additional Development Information

### Project Structure

- **assets/**: Contains source files for images, event data, and other assets
- **themes/event/**: Contains the Hugo theme for the event website
- **public/**: Contains the generated static site (not committed to version control)
- **cypress/**: Contains end-to-end tests

### Content Management

- Event information is configured in `hugo.yaml`
- Speaker and session data is stored in:
  - `assets/event/speakers.yaml`
  - `assets/event/sessions.yaml`

### Code Style Guidelines

- Follow the existing code structure and formatting
- Use meaningful commit messages
- For Hugo templates, follow the [Hugo templating guidelines](https://gohugo.io/templates/introduction/)

### Useful Commands

- `hugo new content/speakers/speaker-name.md`: Create a new speaker page
- `hugo new content/sessions/session-name.md`: Create a new session page

### Troubleshooting

- If the Hugo server fails to start, check if the port 1313 is already in use
- If Cypress tests fail, ensure the Hugo server is running and accessible at http://localhost:1313/