# Deployment Guide

## Overview
This document explains how to deploy the Jain Genius website to various hosting platforms. The website is built as a static site using Vite and can be deployed to any static site hosting service.

## Build Process

### Production Build
To create a production-ready build of the website:

```bash
# Using Bun (recommended)
bun run build

# Using npm (alternative)
npm run build
```

This command generates optimized static assets in the `dist/` directory.

### Preview Build Locally
To test the production build locally before deploying:

```bash
# Using Bun
bun run preview

# Using npm
npm run preview
```

This will serve the built application from the `dist/` directory at http://localhost:4173.

## Deployment Targets

The website can be deployed to any static site hosting service. Common options include:

### Netlify
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `bun run build` or `npm run build`
   - Publish directory: `dist`
3. Set environment variables in Netlify dashboard (see ENVIRONMENT_VARIABLES.md)
4. Deploy!

### Vercel
1. Import your GitHub project to Vercel
2. Configure framework preset to "Vite"
3. Set environment variables
4. Deploy

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize project: `firebase init` (choose Hosting)
4. Configure public directory to `dist`
5. Deploy: `firebase deploy`

### GitHub Pages
1. Build the project: `bun run build`
2. Push the contents of the `dist` folder to the `gh-pages` branch
3. Enable GitHub Pages in repository settings

## Netlify Configuration (`netlify.toml`)

The project includes a basic Netlify configuration file:

```toml
[build]
  # Build command and publish directory are commented out 
  # as Netlify can auto-detect Vite projects
  # command = "bun run build"
  # publish = "dist"

[plugins]
  # Netlify plugins can be added here

[[redirects]]
  # Redirects for client-side routing
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  # Environment variables for production context
  # These are typically set in the Netlify UI

[context.deploy-preview.environment]
  # Environment variables for deploy previews

[context.branch-deploy.environment]
  # Environment variables for branch deploys
```

Note: The actual build command and publish directory are left for Netlify to auto-detect, but you can uncomment and set them explicitly if needed.

## Environment Variables
Environment variables must be set in your hosting platform's configuration:
- See `ENVIRONMENT_VARIABLES.md` for required variables
- Never commit actual `.env` files to version control
- Use your platform's secret management system for sensitive values

## Important Notes

### Client-Side Routing
Since the website uses hash-based routing (`window.location.hash`), no special server configuration is needed for client-side routes. All routes work correctly with static hosting.

### Firebase Configuration
The Firebase configuration is automatically detected from your `.env` file during build time. Make sure to:
1. Set all required Firebase environment variables
2. Ensure Firestore Database is enabled in your Firebase project
3. Configure appropriate Firestore security rules for production

### Build Optimization
The production build includes:
- Code splitting for faster initial loads
- Minified JavaScript and CSS
- Optimized asset handling
- Environment-specific variable replacement

## Troubleshooting Deployment Issues

### Blank Page After Deployment
1. Check browser console for errors
2. Verify that the `dist` folder is being served correctly
3. Ensure client-side routing is properly handled (should work with hash-based routing)

### Missing Environment Variables
1. Double-check that all required variables are set in your hosting platform
2. Redeploy after adding missing variables
3. Check build logs for variable-related errors

### Firebase Connection Issues
1. Verify Firebase project configuration
2. Check Firestore security rules
3. Ensure the Firebase project has sufficient quota