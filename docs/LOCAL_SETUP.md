# Local Development Setup

## Prerequisites
Before setting up the Jain Genius website locally, you need:

1. **Bun Package Manager** (recommended) or Node.js/npm
   - Bun: https://bun.sh (version used in this project)
   - Alternative: Node.js 18+ with npm

2. **Git** for version control
   - https://git-scm.com

3. **Firebase Project** (for full functionality)
   - You'll need a Firebase project to enable the CMS features
   - The website can still run without Firebase, but admin features and dynamic content won't work

## Getting the Code

### Clone the Repository
```bash
git clone https://github.com/your-username/jain-genius-website.git
cd jain-genius-website
```

### Install Dependencies
Using Bun (recommended):
```bash
bun install
```

Using npm (alternative):
```bash
npm install
```

## Environment Setup

### Create Environment File
Copy the example environment file and fill in your values:
```bash
cp .env.example .env
```

Edit the `.env` file with your actual values:
```env
# Get these from your Firebase project settings
# For local development, you can use test values initially

GEMINI_API_KEY="your_gemini_api_key_here"
APP_URL="http://localhost:3000"

# Google Form for registrations (you can use the default or create your own)
NEXT_PUBLIC_REGISTRATION_FORM_URL="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform"

# Admin credentials - CHANGE THESE BEFORE DEPLOYING TO PRODUCTION
VITE_ADMIN_PIN="your_admin_pin"
VITE_ADMIN_PASSWORD="your_admin_password"
```

> **Important**: Never commit your actual `.env` file to GitHub. The `.env.example` file shows the structure but safe values should be used in the example.

## Running the Application

### Start Development Server
```bash
bun run dev
```
or
```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:3000
- **Network**: http://[your-ip-address]:3000

### Preview Production Build
To test what the production build will look like:
```bash
bun run build
bun run preview
```
or
```bash
npm run build
npm run preview
```

### Check for TypeScript Errors
```bash
bun run lint
```
or
```bash
npm run lint
```

## Project Structure Overview
```
/
├── docs/                 # Documentation files
├── src/                  # Source code
│   ├── App.tsx           # Main application with routing
│   ├── main.tsx          # Entry point
│   ├── index.css         # Global styles
│   ├── components/       # UI components organized by feature
│   ├── services/         # Firebase and business logic services
│   ├── data/             # Static data and translations
│   └── types/            # TypeScript interfaces
├── public/               # Static assets
├── .env                  # Environment variables (NOT in Git)
├── netlify.toml          # Netlify configuration
├── package.json          # Dependencies and scripts
├── bun.lock              # Bun lockfile
└── tsconfig.json         # TypeScript configuration
```

## Verifying Your Setup
Once running, you should see:
1. The Jain Genius homepage with hero section and navigation
2. Working navigation between pages (About, Events, Gallery, etc.)
3. Language toggle (English/Hindi) in the header
4. Admin dashboard accessible at `/admin` (requires login)

## Troubleshooting Common Issues

### "Cannot find module" errors
- Ensure you ran `bun install` or `npm install`
- Try deleting `node_modules` and reinstalling
- Check that you're in the project root directory

### Port already in use
- Change the port in package.json or use: `bun run dev --port=3001`
- Stop other processes using port 3000

### Firebase connection issues
- Verify your Firebase configuration in firebase-applet-config.json
- Check that your Firebase project has Firestore Database enabled
- Ensure you've set up proper Firebase security rules (see SECURITY.md if available)

### Environment variables not loading
- Make sure your `.env` file is in the project root
- Restart the development server after changing `.env`
- Variable names must match exactly (case-sensitive)

## Next Steps After Setup
1. Explore the admin dashboard at `http://localhost:3000/admin`
2. Try logging in with your admin credentials
3. Experiment with editing content in live edit mode
4. Check the registration system by clicking "Become a Member"
5. Review the documentation in the `docs/` folder for deeper understanding