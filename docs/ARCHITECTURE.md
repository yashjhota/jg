# Jain Genius Website Architecture

## Overview
The Jain Genius website is a modern React-based platform built with TypeScript and Vite, featuring a Firebase-powered real-time CMS for dynamic content management. The architecture follows a modular, component-based approach organized by feature/domain.

## Framework & Build Tools

### Core Framework
- **React 19**: Modern React with hooks and functional components
- **TypeScript**: Static typing for enhanced developer experience and code safety
- **Vite**: Next-generation frontend build tool providing fast development server and optimized builds

### Key Configuration Files
- `vite.config.ts`: Vite configuration with React and Tailwind CSS plugins
- `tsconfig.json`: TypeScript configuration with path aliases (@/* -> ./*)
- `index.html`: Entry point with root div for React rendering
- `main.tsx`: React application entry point rendering `<App />`

## Folder Structure

```
/src
  /assets              - Static assets (images, icons, etc.)
  /components          - Reusable UI components organized by feature
    /layout            - Header, Footer, CTASection, AdminLiveBar
    /home              - Home page sections (Hero, LiveMetrics, PillarsSection, etc.)
    /about             - AboutView
    /admin             - Admin dashboard and customization components
    /common            - Shared components (Logo)
    /contact           - ContactView
    /events            - EventsView and related modals
    /gallery           - GalleryView
    /impact            - ImpactView
    /membership        - MembershipView
    /news              - NewsView
    /programmes        - ProgrammesView
    /walkthrough       - WalkthroughView
    /forms             - RegistrationModal
  /services            - Firebase services and business logic
    cmsStore.ts        - Centralized CMS store with Firebase synchronization
    firebase.ts        - Firebase initialization and configuration
    googleFormService  - Google Forms integration service
    pdfReportGenerator - PDF generation utilities
  /data                - Static data and initial seed data
    events.ts          - Events data
    gallery.ts         - Gallery items
    testimonials.ts    - Testimonial data
    siteConfig.ts      - Site configuration and constants
    i18n.ts            - Internationalization (English/Hindi) translations
    ...other data files
  /types               - TypeScript interfaces and types
    PageId, Language, EventItem, GalleryItem, etc.
  App.tsx              - Main application component with routing
  index.css            - Global CSS styles
  vite-env.d.ts        - Vite environment type declarations
```

## Pages & Routing

The application uses hash-based routing managed in `App.tsx`:

### Available Pages (PageId Type)
- `home` - Landing page with hero section, live metrics, and content sections
- `about` - Organization overview and mission
- `what-we-do` - Detailed explanation of holistic development approach
- `programmes` - Career, finance, digital, health, and spiritual development tracks
- `events` - Upcoming and past events with registration capabilities
- `gallery` - Visual showcase of activities and events
- `impact` - Measurable outcomes and community benefits
- `membership` - Information about joining the organization
- `news` - Latest updates and announcements
- `contact` - Contact information and inquiry forms
- `admin` - Secure admin dashboard with live edit capabilities
- `walkthrough` - Interactive guided tour of the platform
- `exploration` - Future campus exploration mode (coming soon)

### Routing Mechanism
- Hash-based navigation (`window.location.hash`)
- `handleNavigate()` function in App.tsx manages route changes
- Navigation components (Header, AdminLiveBar, Footer) call `onNavigate` callbacks
- URL hash changes trigger page updates via useEffect listener

## Component Architecture

### Component Organization
Components are organized by feature/domain in `/src/components`, promoting:
- **Separation of Concerns**: Each feature has its own component folder
- **Reusability**: Shared components in `/common` and `/layout`
- **Scalability**: Easy to add new features following established patterns

### Key Component Types

#### Layout Components
- **Header**: Sticky navigation with branding, language toggle, and CTAs
- **Footer**: Site-wide footer with navigation and contact info
- **CTASection**: Call-to-action banner for membership registration
- **AdminLiveBar**: Floating admin dashboard for live site customization

#### Page Components
Each page (`/src/components/*/PageView.tsx`) typically includes:
- Sectional breakdown of content
- Integration with CMS store for dynamic data
- Language switching support (English/Hindi)
- Admin editing capabilities (when authenticated)
- Registration modals and call-to-action buttons

#### Reusable UI Elements
- **Logo**: Brand logo component with size variants
- **Modals**: RegistrationModal, InPageSectionEditorModal, ConfirmDialog
- **Sections**: Reusable section components used across multiple pages
- **Icons**: Lucide React icons for visual enhancement

## State Management & Data Flow

### CMS Store (`src/services/cmsStore.ts`)
The central state management system featuring:

#### Real-time Firebase Synchronization
- **Firestore Listeners**: Real-time subscriptions to events, gallery, news, testimonials, social posts, and settings
- **Automatic Status Sync**: Events automatically transition from 'upcoming' to 'past' based on date/time
- **Local Storage Caching**: Offline support with localStorage persistence
- **Conflict Resolution**: Server state takes precedence with local fallback

#### State Structure (`CMSState`)
```typescript
{
  events: EventItem[],
  gallery: GalleryItem[],
  news: NewsArticle[],
  testimonials: TestimonialSlot[],
  settings: SiteSettings,
  socialPosts: SocialPost[],
  logs: AdminActivityLog[],
  isAuthenticated: boolean,
  isLiveEditMode: boolean,
  firebaseSyncStatus: 'connected' | 'syncing' | 'offline' | 'error',
  lastSyncedAt: string | null
}
```

#### Key Features
- **Reactive Updates**: Components re-render when state changes via `useSyncExternalStore`
- **Action Logging**: All admin actions logged to Firestore for audit trail
- **Backup/Restore**: JSON export/import functionality for data migration
- **Trash Management**: Soft delete with restore/permanent delete options
- **Live Edit Mode**: In-place content customization for administrators

### Firebase Integration (`src/services/firebase.ts`)
- **Singleton Pattern**: Ensures single Firebase app instance
- **Firestore Configuration**: Experimental long polling for iframe/compatibility
- **Authentication**: Email/password auth via environment variables
- **Error Handling**: Centralized error handling with detailed logging
- **Connection Testing**: Boot-time connectivity verification

## Integrations

### Firebase Services
- **Firestore**: NoSQL database for all dynamic content (events, gallery, etc.)
- **Authentication**: Secure admin login via PIN/password from environment variables
- **Real-time Updates**: Live synchronization across all connected clients

### Third-party Services
- **Google Forms**: Integrated registration system via branded wrapper
- **jsPDF**: Client-side PDF generation for reports and certificates
- **Lucide React**: Consistent, lightweight icon set
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

### Environment Variables
Required in `.env` file:
- `VITE_ADMIN_PIN`: Admin PIN for login
- `VITE_ADMIN_PASSWORD`: Admin password for login
- Firebase configuration values (auto-detected from config files)

## Data Flow

1. **Initial Load**
   - App loads static data from `/src/data` as fallback
   - CMS Store initializes Firebase listeners
   - Data hydrated from localStorage or Firebase

2. **Real-time Updates**
   - Firebase listeners detect changes in collections
   - CMS Store updates reactive state
   - Components re-render via `useCMS()` hook
   - LocalStorage synchronized for offline support

3. **User Interactions**
   - Admin actions trigger CMS Store methods
   - Optimistic UI updates for immediate feedback
   - Changes persisted to Firebase with error handling
   - Activity logged for audit trail

4. **Language Switching**
   - Language state managed in App.tsx
   - Translation data from `/src/data/i18n.ts`
   - Components re-render with selected language content

## Security Considerations

### Authentication
- Admin access controlled via environment variable credentials
- Session state stored in localStorage
- Live edit mode requires authentication

### Data Protection
- Firestore security rules recommended for production
- Input sanitization before Firestore writes
- XSS prevention through React's automatic escaping
- Secure handling of user-generated content

### Environment Safety
- Firebase configuration isolated from client-side code
- Environment variables prevent credential exposure
- Development/production environment separation

## Performance Optimizations

### Code Splitting
- Vite's native code splitting for efficient loading
- Dynamic imports for route-based component loading
- Lazy loading of non-critical components

### Asset Optimization
- Image compression utilities in cmsStore.ts
- Lazy loading of non-visible content
- Efficient rendering with React's reconciliation

### Caching Strategies
- LocalStorage persistence for offline support
- Memory-efficient state updates
- Selective re-rendering via React hooks

## Extensibility Patterns

### Adding New Content Types
1. Define TypeScript interface in `src/types.ts`
2. Add initial data to `src/data/` if needed
3. Update CMS store in `src/services/cmsStore.ts` with CRUD operations
4. Create components in appropriate `/src/components/` directory
5. Add routes in `src/App.tsx`

### Styling Approach
- Tailwind CSS utility classes in JSX
- Global styles in `index.css` or `public/`
- Theme extension through Tailwind configuration
- Dark/light mode support via CSS variables

### Internationalization
- Content managed in English and Hindi
- Language toggling via `App.tsx` lang state
- Translation data in `src/data/i18n.ts`
- Conditional rendering based on language selection

## Development Workflow

### Local Development
```bash
# Install dependencies
bun install  # or npm install

# Configure environment
cp .env.example .env
# Edit .env with Firebase credentials

# Start development server
bun run dev  # or npm run dev
```

### Production Build
```bash
# Build for production
bun run build  # or npm run build

# Preview build
bun run preview  # or npm run preview
```

### Deployment Targets
- Netlify
- Vercel
- Firebase Hosting
- Any static site hosting service

## Architectural Benefits

### Maintainability
- Clear separation of concerns
- Consistent patterns across features
- Centralized state management reduces complexity
- Well-defined extension points

### Scalability
- Modular structure accommodates growth
- Firebase scales automatically with usage
- Component reusability reduces duplication
- Clear data flow patterns

### Developer Experience
- TypeScript provides compile-time safety
- Hot module replacement via Vite
- Clear folder structure aids navigation
- Comprehensive documentation in code

### User Experience
- Real-time updates keep content fresh
- Responsive design works on all devices
- Multi-language support increases accessibility
- Intuitive navigation and clear information architecture