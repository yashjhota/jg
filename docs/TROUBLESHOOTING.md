# Troubleshooting Guide

## Overview
This document provides solutions to common issues encountered when developing, deploying, or using the Jain Genius website.

## Development Issues

### Installation Problems

#### "Command not found: bun"
**Problem**: The Bun package manager is not installed or not in PATH
**Solution**:
1. Install Bun: https://bun.sh
2. Verify installation: `bun --version`
3. Restart your terminal after installation

#### "Cannot find module" errors after installation
**Problem**: Dependencies not installed correctly
**Solution**:
1. Delete `node_modules` folder and lock file (`bun.lock`)
2. Reinstall dependencies: `bun install`
3. Try the development server again

#### Port already in use
**Problem**: Port 3000 (or configured port) is already occupied
**Solution**:
1. Check what's using the port: `netstat -ano | findstr :3000` (Windows) or `lsof -i :3000` (Mac/Linux)
2. Either stop the conflicting process or change the port:
   ```bash
   bun run dev --port=3001
   ```
   Or modify the dev script in package.json

### TypeScript Errors

#### TS Errors during development
**Problem**: TypeScript compilation errors preventing development
**Solution**:
1. Check the specific error messages in the terminal
2. Common fixes:
   - Missing imports: Add required import statements
   - Type mismatches: Check variable types against interface definitions
   - Missing properties: Ensure all required properties are provided
3. Run type check separately: `bun run lint` or `tsc --noEmit`
4. Fix errors one by one, starting with the first error reported

#### "Cannot find module './types'" or similar
**Problem**: Path resolution issues with TypeScript
**Solution**:
1. Verify `tsconfig.json` has correct path aliases:
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```
2. Ensure you're using the correct import syntax: `import { Type } from '@/types'` or `import { Type } from './types'`
3. Restart your IDE/TypeScript server after tsconfig changes

### Firebase Issues

#### Firebase initialization errors
**Problem**: Firebase fails to initialize during app startup
**Solution**:
1. Check Firebase configuration in `.env` file
2. Verify Firebase project exists and Firestore API is enabled
3. Check browser console for specific Firebase error messages
4. Ensure internet connectivity (Firebase requires online access)
5. For local development, try using Firebase emulator suite

#### Firestore permission denied errors
**Problem**: Insufficient permissions to read/write to Firestore
**Solution**:
1. Check Firestore security rules in Firebase Console
2. For development, consider using test rules (not recommended for production):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
3. Ensure your Firebase user has appropriate IAM permissions
4. Verify you're using the correct Firebase project (check project ID)

#### Real-time updates not working
**Problem**: Data changes not reflecting in real-time across clients
**Solution**:
1. Check Firebase connection status in CMS store
2. Verify Firestore listeners are properly set up in cmsStore.ts
3. Check for network connectivity issues
4. Ensure multiple clients are connected to the same Firebase project
5. Check browser console for Firestore warning/error messages

### Build and Deployment Issues

#### Build fails with memory errors
**Problem**: Vite build process runs out of memory
**Solution**:
1. Increase memory allocation for Node.js:
   ```bash
   # For bun
   node --max-old-space-size=4096 node_modules/.bin/vite build
   
   # Or modify build script in package.json temporarily
   ```
2. Consider disabling source maps for production build if not needed
3. Close other memory-intensive applications during build

#### Build succeeds but deployed site is blank
**Problem**: Build works locally but shows blank page after deployment
**Solution**:
1. Check browser console for JavaScript errors
2. Verify that all assets (JS, CSS) are loading correctly in Network tab
3. Check if the base URL is configured incorrectly (for non-root deployments)
4. Ensure service workers aren't caching old versions (clear site data or disable PWA features temporarily)
5. Verify that the `dist` folder contents are being deployed correctly

#### Environment variables not working in production
**Problem**: Environment variables appear undefined after deployment
**Solution**:
1. Verify that variables are correctly set in hosting platform dashboard
2. Check build logs to ensure variables were injected during build
3. Remember that Vite only exposes variables prefixed with `VITE_` to client code
4. For non-VITE variables, ensure they're accessed correctly in build scripts
5. Redeploy after adding/changing environment variables

### Runtime Issues

#### White screen or flashing content
**Problem**: Page shows blank briefly before content appears
**Solution**:
1. This is normal during hydration - content flashes while waiting for data
2. Consider adding skeleton loaders or loading states
3. Check if localStorage cache is working properly in cmsStore.ts
4. Optimize initial data loading if delay is excessive

#### Language switching not working
**Problem**: Content doesn't change when toggling language
**Solution**:
1. Verify that translation data exists in `/src/data/i18n.ts` for both languages
2. Check that the `lang` state is properly updating in App.tsx
3. Ensure components are using the `lang` prop correctly for conditional rendering
4. Check console for errors related to missing translation keys

#### Admin live edit mode not functioning
**Problem**: Admin features not working despite login
**Solution**:
1. Verify admin credentials are correct
2. Check that `isAuthenticated` state is properly set in cmsStore.ts
3. Verify that Firestore security rules allow admin operations
4. Check browser console for errors when attempting admin actions
5. Ensure live edit mode toggles correctly in AdminLiveBar component

#### Registration modal not opening
**Problem**: Clicking registration buttons doesn't open modal
**Solution**:
1. Check for JavaScript errors in console when clicking
2. Verify that `handleOpenRegister` function is being called correctly
3. Ensure `isRegisterOpen` state is properly toggling
4. Check that RegistrationModal component is receiving correct props
5. Verify there are no CSS z-index or display issues hiding the modal

## Performance Issues

### Slow initial load
**Problem**: Website takes too long to load initially
**Solution**:
1. Use Chrome DevTools Performance tab to identify bottlenecks
2. Consider implementing code splitting for lazy-loaded routes
3. Optimize image sizes and use appropriate formats (WebP)
4. Enable caching headers on your hosting platform
5. Consider using a CDN for asset delivery
6. Check for large third-party scripts that may be blocking render

### Memory leaks
**Problem**: Memory usage increases over time, especially with frequent navigation
**Solution**:
1. Check for unmounted components with active listeners or intervals
2. Verify Firebase listeners are properly cleaned up in cmsStore.ts
3. Check for closure issues in event handlers
4. Use React DevTools Profiler to identify components that render excessively
5. Ensure timers and intervals are cleared in useEffect cleanup functions

## Console Errors and Warnings

### Common Warning Messages
| Warning | Meaning | Solution |
|---------|---------|----------|
| `Warning: Can't perform a React state update on an unmounted component` | State update attempted after component unmounted | Add cleanup functions in useEffect or check mounted state |
| `Warning: Each child in a list should have a unique "key" prop` | List items missing unique keys | Add unique `key` prop to list items, preferably using stable IDs |
| `Warning: Failed prop type` | Component received prop of incorrect type | Check prop types and ensure correct data is being passed |
| `Warning: Invalid DOM property` | Attempting to set invalid DOM property | Check JSX for incorrect attribute names (use camelCase for React props) |

### Error Messages
| Error | Meaning | Solution |
|-------|---------|----------|
| `FirebaseError: Missing or insufficient permissions` | Firestore security rules blocking operation | Adjust security rules or verify authentication |
| `FirebaseError: App check` | App Check enabled but not configured | Configure App Check or disable for development |
| `TypeError: Cannot read property 'x' of undefined` | Accessing property on undefined/null object | Add null checks or optional chaining (`?.`) |
| `Error: Minified React error` | Production build error (hard to read) | Temporarily disable minification to see full error or check source maps |

## Device-Specific Issues

### Mobile Responsiveness Problems
**Problem**: Layout breaks or elements overlap on mobile devices
**Solution**:
1. Use responsive design utilities in Tailwind (sm:, md:, lg:, xl: prefixes)
2. Test with actual devices or Chrome DevTools device emulator
3. Check for fixed widths that should be relative
4. Verify meta viewport tag is present in index.html
5. Consider touch-friendly sizes for interactive elements (minimum 44x44px)

### Browser Compatibility Issues
**Problem**: Features not working in specific browsers
**Solution**:
1. Check which browsers are experiencing issues
2. Verify that modern JavaScript features used are supported (consider Babel polyfills if needed)
3. Check CSS feature support (use @supports or fallback styles)
4. Consider adding polyfills for missing features if critical
5. Update browser compatibility documentation if workarounds are implemented

## Debugging Techniques

### Using Browser Developer Tools
1. **Elements Tab**: Inspect DOM and CSS, modify in real-time
2. **Console Tab**: View logs, run JavaScript commands, check errors
3. **Network Tab**: Monitor requests, check loading times, simulate throttling
4. **Application Tab**: Inspect localStorage, sessionStorage, IndexedDB (used by CMS store)
5. **Sources Tab**: Debug JavaScript, set breakpoints, step through code
6. **Performance Tab**: Record and analyze performance profiles
7. **Memory Tab**: Check for memory leaks, take heap snapshots

### Debugging CMS Store Issues
1. Use the CMS store's logging capabilities (check console for CMS-related logs)
2. Monitor localStorage changes in Application tab
3. Check Firebase Console for real-time database activity
4. Temporarily disable localStorage caching to isolate issues
5. Add debug logging to cmsStore.ts methods if needed

### Debugging Firebase Integration
1. Use Firebase Console to monitor Firestore activity
2. Check Firebase project usage and quotas
3. Enable Firebase logging in development:
   ```javascript
   // In firebase.ts or cmsStore.ts during development
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';
   
   // Add debug logging
   const firestore = getFirestore(app);
   // firestore.settings({ host: 'localhost:8080', ssl: false }); // For emulator
   ```

## Getting Help

### When Documentation Doesn't Help
1. **Check Git Issues**: Search existing issues in the repository
2. **Review Recent Commits**: Look for recent changes that might have introduced the issue
3. **Ask Team Members**: Reach out to developers familiar with specific parts of the codebase
4. **Check External Resources**:
   - React documentation: https://react.dev
   - Vite documentation: https://vitejs.dev
   - Firebase documentation: https://firebase.google.com/docs
   - Tailwind CSS documentation: https://tailwindcss.com
   - TypeScript documentation: https://www.typescriptlang.org

### Reporting New Issues
When encountering a new issue not covered in this guide:
1. **Document the Problem**: Clear description of what happens
2. **Steps to Reproduce**: Exact steps to trigger the issue
3. **Expected vs Actual Behavior**: What should happen vs what actually happens
4. **Environment Details**: Browser, OS, device, network conditions
5. **Screenshots/Video**: Visual evidence if applicable
6. **Console Output**: Relevant error messages and warnings
7. **Recent Changes**: Any recent modifications to code or configuration

## Maintenance Tips

### Regular Checks
1. **Dependency Updates**: Periodically check for updates using `bun outdated` or `npm outdated`
2. **Security Audits**: Run `npm audit` or use Snyk for vulnerability scanning
3. **Performance Monitoring**: Use Lighthouse to check performance, accessibility, SEO
4. **Backup Strategy**: Regularly backup Firebase data using export/import functionality
5. **Log Monitoring**: Check admin activity logs for unusual patterns

### When in Doubt
1. **Start Simple**: Try the most obvious solution first
2. **Isolate Variables**: Change one thing at a time to identify root cause
3. **Reproduce Consistently**: Ensure you can reliably reproduce the issue before fixing
4. **Test Thoroughly**: Verify fixes don't break existing functionality
5. **Document Solutions**: Add notes to this guide for future reference