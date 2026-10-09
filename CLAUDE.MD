# Claude Code Guidance for Jain Genius Project

## Project Overview
This is a React-based website for "Jain Genius - The Change Makers", a youth organization focused on holistic development. The site features:
- Multi-language support (English/Hindi)
- Firebase-powered real-time CMS
- Admin dashboard with live editing capabilities
- Content management for events, gallery, news, testimonials
- Registration system and social media integration

## Key Technologies
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **State Management**: Custom CMS store with Firebase Firestore synchronization
- **Build**: Vite with React plugin
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **PDF Generation**: jsPDF
- **Environment**: dotenv for configuration

## Project Structure
```
/src
  /components
    /layout       - Header, Footer, CTASection, AdminLiveBar
    /home         - Home page sections (Hero, LiveMetrics, PillarsSection, etc.)
    /about        - AboutView
    /admin        - Admin dashboard and customization components
    /common       - Shared components (Logo)
    /contact      - ContactView
    /events       - EventsView and related modals
    /gallery      - GalleryView
    /impact       - ImpactView
    /membership   - MembershipView
    /news         - NewsView
    /programmes   - ProgrammesView
    /walkthrough  - WalkthroughView
    /forms        - RegistrationModal
  /services       - Firebase services (cmsStore.ts, firebase.ts)
  /data           - Static data (events, gallery, testimonials, etc.)
  /types          - TypeScript interfaces
  App.tsx         - Main application component
  index.html      - Entry point
  vite.config.ts  - Vite configuration
  tsconfig.json   - TypeScript configuration
```

## Development Workflow

### Getting Started
1. Install dependencies: `bun install` or `npm install`
2. Copy `.env.example` to `.env` and configure Firebase credentials
3. Start development server: `bun run dev` or `npm run dev`
4. Access admin features by logging in with credentials from environment variables

### Common Tasks

#### Adding New Content Types
1. Define TypeScript interfaces in `src/types.ts`
2. Add initial data to `src/data/` if needed
3. Update CMS store in `src/services/cmsStore.ts` with CRUD operations
4. Create components in appropriate `/src/components/` directory
5. Add routes in `src/App.tsx`

#### Modifying Styling
- Tailwind CSS is used throughout
- Modify classes directly in JSX for component-specific styling
- For global styles, edit `index.html` or create a CSS file in `public/`

#### Working with Firebase
- Firebase configuration is in `src/services/firebase.ts`
- CMS store handles real-time synchronization automatically
- To add new collections, follow the pattern in `cmsStore.ts`
- Remember to update both local storage and Firestore

#### Internationalization
- Content is managed in English and Hindi
- Language toggling is handled in `App.tsx`
- When adding new content, provide both language versions
- Use the `Language` type and `lang` state for conditional rendering

#### Admin Features
- Admin dashboard accessible at `/admin` route
- Live edit mode allows in-place customization
- Authentication via PIN/password from environment variables
- Changes sync to Firebase in real-time

### Claude Code Specific Tips

#### Using the RTK Tool
This project uses the RTK (Rust Token Killer) tool to reduce token usage:
- All bash commands are automatically prefixed with `rtk` via hooks
- Use `rtk gain` to see token savings analytics
- Use `rtk discover` to find missed optimization opportunities

#### Efficient Navigation
- Use `/` followed by a skill name to invoke skills (e.g., `/design` for visual designs)
- Use `@filepath` to reference specific files in your prompts
- Use `/websearch` for current information when needed

#### Code Understanding
- The codebase is well-organized by feature/domain
- Follow the pattern of existing components when adding new features
- Pay attention to the CMS store patterns for data management
- Notice how live editing is implemented in components like `AdminLiveBar`

#### Best Practices
1. Always handle loading and error states for asynchronous operations
2. Follow the existing patterns for Firebase operations in the CMS store
3. Keep components small and focused
4. Use TypeScript interfaces consistently
5. Remember to clean up event listeners and subscriptions
6. Test both languages when modifying UI content
7. Validate environment variables are set before deploying

#### Common Issues to Watch For
- Firebase permission rules when deploying
- Environment variable configuration for different environments
- Image optimization and loading performance
- Mobile responsiveness of custom components
- Proper cleanup of real-time listeners to prevent memory leaks

## Available Claude Code Skills
This project benefits from several Claude Code skills:
- `/dataviz` - For creating charts and data visualizations
- `/artifact-design` - For designing HTML/Markdown artifacts
- `/code-review` - For reviewing code changes
- `/simplify` - For code simplification and cleanup
- `/fewer-permission-prompts` - To reduce permission interruptions
- `/loop` - For recurring tasks like checking deployment status
- `/run` - To launch and test the application

## Deployment
1. Build for production: `bun run build` or `npm run build`
2. Preview build: `bun run preview` or `npm run preview`
3. Deploy to platforms like Netlify, Vercel, or Firebase Hosting
4. Ensure Firebase hosting rules are configured if using Firebase Hosting

## Environment Variables
Create a `.env` file based on `.env.example` with:
- VITE_ADMIN_PIN - Admin PIN for login
- VITE_ADMIN_PASSWORD - Admin password for login
- Firebase configuration values (if not using auto-detection)

---
*This guidance helps you effectively use Claude Code with the Jain Genius project. Remember to ask for clarification when needed and follow the established patterns in the codebase.*