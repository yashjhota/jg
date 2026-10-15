# Environment Variables Guide

## Overview
This document explains the environment variables used in the Jain Genius website project. These variables configure Firebase connections, admin credentials, and other external service integrations.

## Required Environment Variables

Create a `.env` file in the project root based on `.env.example` with the following variables:

### Application Configuration
| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | API key for Google Gemini AI integration (used for AI-powered features) | `AIzaSyYourActualKeyHere` |
| `APP_URL` | Base URL of the application (used for redirects and external links) | `http://localhost:3000` (development) or `https://yourdomain.com` (production) |

### Registration System
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_REGISTRATION_FORM_URL` | URL of the Google Form used for program registrations | `https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform` |
| `VITE_REGISTRATION_FORM_URL` | Alternative registration form URL (used in some components) | `https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform` |

### Admin Authentication
| Variable | Description | Example | Importance |
|----------|-------------|---------|------------|
| `VITE_ADMIN_PIN` | PIN code for admin login (4-6 digits recommended) | `1234` | **High** - Change before production |
| `VITE_ADMIN_PASSWORD` | Password for admin login | `securePassword123` | **High** - Change before production |

> **Security Note**: Admin credentials should be changed before deploying to production. Never commit actual values to version control.

### Firebase Configuration
The Firebase configuration is typically auto-detected from your Firebase project settings. If not auto-detected, you may need to set these explicitly:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_KEY` | Firebase API key | `AIzaSyYourActualKeyHere` |
| `VITE_AUTH_DOMAIN` | Firebase Auth domain | `your-project.firebaseapp.com` |
| `VITE_PROJECT_ID` | Firebase project ID | `your-project-id` |
| `VITE_STORAGE_BUCKET` | Firebase Storage bucket | `your-project-id.appspot.com` |
| `VITE_MESSAGING_SENDER_ID` | Firebase Messaging sender ID | `1234567890` |
| `VITE_APP_ID` | Firebase App ID | `1:1234567890:web:abcdef123456` |

## Environment File Template (`.env.example`)

```env
# Get these from your Firebase project settings
# For local development, you can use test values initially

GEMINI_API_KEY="your_gemini_api_key_here"
APP_URL="http://localhost:3000"

# Google Form for registrations (you can use the default or create your own)
NEXT_PUBLIC_REGISTRATION_FORM_URL="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform"
VITE_REGISTRATION_FORM_URL="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform"

# Admin credentials - CHANGE THESE BEFORE DEPLOYING TO PRODUCTION
VITE_ADMIN_PIN="your_admin_pin"
VITE_ADMIN_PASSWORD="your_admin_password"

# Firebase configuration (if not auto-detected)
# VITE_API_KEY="your_firebase_api_key"
# VITE_AUTH_DOMAIN="your-project.firebaseapp.com"
# VITE_PROJECT_ID="your-project-id"
# VITE_STORAGE_BUCKET="your-project-id.appspot.com"
# VITE_MESSAGING_SENDER_ID="1234567890"
# VITE_APP_ID="1:1234567890:web:abcdef123456"
```

## Usage in Code

Environment variables are accessed differently based on their prefix:

### Vite Prefixed Variables (`VITE_*`)
Variables prefixed with `VITE_` are exposed to the client-side code and can be accessed via `import.meta.env`:

```typescript
// Example in a React component
const adminPin = import.meta.env.VITE_ADMIN_PIN;
const appUrl = import.meta.env.APP_URL;
```

### Non-Vite Prefixed Variables
Variables without the `VITE_` prefix are only accessible to server-side code or build scripts. In this project, most variables use the `VITE_` prefix for client-side access.

## Development Setup

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your actual values:
   - Get Firebase configuration from your Firebase project settings
   - Create or obtain a Google Form for registrations
   - Set secure admin credentials
   - Obtain a Gemini API key if using AI features

3. Never commit your actual `.env` file to GitHub
   - The `.env` file is listed in `.gitignore`
   - Only commit `.env.example` which shows the structure without sensitive values

## Production Deployment

When deploying to hosting platforms (Netlify, Vercel, Firebase Hosting, etc.):

1. Set environment variables in your hosting platform's dashboard/configuration
2. Use the same variable names as in `.env.example`
3. For platforms that separate build-time and runtime variables:
   - Build-time variables: Needed during the `bun run build` step
   - Runtime variables: Needed when the application runs in the browser
4. In this project, all required variables are build-time since they're embedded during the Vite build process

## Troubleshooting

### Missing Environment Variables
- Check that your `.env` file is in the project root
- Verify variable names match exactly (case-sensitive)
- Restart the development server after changing `.env`
- Check browser console for `undefined` variable errors

### Firebase Connection Issues
- Double-check Firebase configuration values
- Ensure Firestore Database is enabled in your Firebase project
- Verify Firestore security rules allow read/write as expected
- Check browser network tab for failed Firebase requests

### Google Form Integration
- Verify the form URL is correct and accessible
- Ensure the form is accepting responses
- Check that the form fields match what the application expects

## Best Practices

1. **Never commit real credentials**: Always use `.gitignore` to keep `.env` files private
2. **Use environment-specific values**: Different values for development, staging, and production
3. **Rotate credentials periodically**: Change admin PIN/password and API keys regularly
4. **Monitor usage**: Keep track of API usage for services like Gemini AI to avoid unexpected costs
5. **Document changes**: When modifying environment variable usage, update this document accordingly