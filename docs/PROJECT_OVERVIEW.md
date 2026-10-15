# Jain Genius - The Change Makers: Website Overview

## Purpose
The Jain Genius website is a React-based platform designed for "Jain Genius - The Change Makers", a youth organization focused on holistic development of individuals aged 15-30. The website serves as the digital presence of the organization, providing information about their programs, facilitating member engagement, and enabling easy content management through an integrated CMS.

## Core Mission
Jain Genius aims to build a generation of Jain change-makers who lead with values by focusing on holistic development across multiple dimensions:
- Spiritual Health
- Financial Health  
- Physical Health
- Mental Health

## Major Features

### 1. Multi-language Support
- Content available in both English and Hindi
- Easy language toggling for accessibility to diverse audiences
- All content managed in both languages for inclusive reach

### 2. Firebase-Powered Real-time CMS
- Custom CMS store with Firebase Firestore synchronization
- Real-time updates across all connected clients
- Admin dashboard with live editing capabilities
- Changes sync automatically to Firebase in real-time

### 3. Comprehensive Content Management
- **Events**: Upcoming and past events with registration capabilities
- **Gallery**: Photo galleries showcasing activities and events
- **News**: Latest updates and announcements
- **Testimonials**: Member experiences and success stories
- **Programmes**: Detailed information about various skill development tracks
- **Impact**: Measurable outcomes and community impact

### 4. Registration System
- Integrated registration for various programs and events
- Track-specific registration for specialized programs
- Secure handling of member information
- Branded Google Forms wrapper for seamless registration

### 5. Admin Dashboard
- Secure admin access via PIN/password authentication
- Live edit mode for in-place customization
- Management interfaces for all content types:
  - Events Manager
  - Gallery Manager
  - News Manager
  - Testimonials Manager
  - Site Settings Manager
  - Social Feed Manager
  - Trash Management
- Real-time preview of changes

### 6. Interactive User Experience
- Modern, responsive design using Tailwind CSS
- Smooth animations with Framer Motion
- Interactive components and engaging UI elements
- Toast notification system for user feedback
- Quick edit capabilities for admins
- Live metrics displaying current statistics

### 7. Key Sections
- **Home**: Landing page with hero section, live metrics, pillars, topics carousel, journey section, DAC section, testimonials, social feed, and CTA
- **About**: Organization overview and mission
- **What We Do**: Detailed explanation of holistic development approach
- **Programmes**: Career, finance, digital, health, and spiritual development tracks
- **Events**: Upcoming and past events with registration
- **Gallery**: Visual showcase of activities
- **Impact**: Measurable outcomes and community benefits
- **Membership**: Information about joining the organization
- **News**: Latest updates and announcements
- **Contact**: Contact information and inquiry forms
- **Walkthrough**: Interactive guided tour of the platform
- **Exploration**: Future campus exploration mode (coming soon)

### 8. Technical Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: Custom CMS store with Firebase Firestore
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **PDF Generation**: jsPDF
- **Build Tool**: Vite with React plugin
- **Environment**: dotenv for configuration

## Target Audience
- Youth aged 15-30 interested in holistic development
- Parents and guardians seeking value-based programs
- Jain community members and supporters
- Educators and mentors
- Potential donors and partners

## Key Benefits
1. **Centralized Information Hub**: Single source for all organizational information
2. **Easy Content Updates**: Real-time CMS enables quick updates without technical expertise
3. **Enhanced Engagement**: Interactive features keep users engaged and informed
4. **Streamlined Registration**: Simplified process for joining programs and events
5. **Multi-lingual Accessibility**: Content available in both English and Hindi
6. **Data-driven Insights**: Live metrics and analytics for tracking impact
7. **Modern User Experience**: Contemporary design with smooth interactions
8. **Secure Administration**: Protected admin features with authentication

## Development Approach
The website follows a modular, component-based architecture organized by feature/domain:
- Components are organized in `/src/components` by feature (home, about, events, gallery, etc.)
- Services handle Firebase operations and business logic in `/src/services`
- Data is managed in `/src/data` (static data) and Firebase (dynamic content)
- TypeScript interfaces in `/src/types` ensure type safety
- Main application logic in `src/App.tsx` handles routing and state management

The project is designed to be extensible, allowing easy addition of new content types, features, and programs following established patterns.