# VlogHub Project Report

## 1. Project Summary

VlogHub is a full-stack vlogging website built as a hybrid application with a Next.js frontend and a Django backend API. The project presents itself as a creator-focused video platform with home discovery, category browsing, video playback, shorts, live streaming UI, authentication, profile management, watch history, watch later, likes/dislikes, tracking analytics, contact/about pages, and password recovery.

The frontend is the user-facing experience. The backend stores user profiles, password reset tokens, tracking events, and user video state. The data layer is split between static demo content for the media catalog and backend-backed data for auth, profile, and tracking.

## 2. Technologies Used

### 2.1 Languages

- TypeScript
- JavaScript
- Python
- HTML and JSX/TSX
- CSS

### 2.2 Frontend Frameworks and Libraries

- Next.js 16.2.1
- React 19.2.4
- Tailwind CSS 4
- Framer Motion for animations and page transitions
- Embla Carousel for the homepage hero slider
- Lucide React for icons
- Zustand for client state management
- next-themes for dark/light theme control
- date-fns for relative time formatting
- Radix UI and shadcn-style UI primitives
- tailwind-merge and clsx for class composition

### 2.3 Backend Frameworks and Libraries

- Django 6.0.4
- django-cors-headers
- WhiteNoise for static file serving
- gunicorn for production deployment
- dj-database-url for environment-based database configuration
- Pillow for image uploads
- PyJWT for Apple token verification support
- google-auth for Google token verification support
- requests and sqlparse as backend dependencies

### 2.4 Database and Storage

- SQLite for local development
- PostgreSQL is supported through `DATABASE_URL` for production
- Media uploads are stored under `profile_pics/`
- Static files are collected into `staticfiles/`

### 2.5 Development and Build Tools

- npm scripts for frontend and full-stack dev runs
- concurrently for running frontend and backend together
- ESLint for frontend linting
- TypeScript compiler support
- Django migrations for backend schema management

### 2.6 Deployment Clues

- Frontend deployment target: Vercel
- Backend deployment target: Render or Railway
- Production database target: managed PostgreSQL such as Render, Railway, Neon, or Supabase
- Backend start command uses gunicorn
- Backend collectstatic and migrate steps are documented

## 3. Project Structure Overview

### 3.1 Root Level

- `package.json` orchestrates both frontend and backend development
- `DEPLOYMENT.md` documents deployment flow
- `README.md` and `PROJECT_REPORT.md` provide project documentation

### 3.2 Django Backend

- Project folder: `django-backend/`
- Django project module: `vlogging_django/`
- App module: `api/`
- Database file: `db.sqlite3`
- Media folder: `profile_pics/`
- Static build output: `staticfiles/`

### 3.3 Next.js Frontend

- Project folder: `next-vlogging/`
- App Router structure in `src/app/`
- Shared components in `src/components/`
- Shared utilities in `src/lib/`
- Client stores in `src/store/`

## 4. What The Website Currently Has

### 4.1 Homepage and Discovery

- A branded landing page with animated hero sections and a strong visual design
- A hero carousel with featured vlogs
- Creator badge / author introduction section
- Category filter pills
- Latest videos section
- Trending videos section
- Newsletter signup block
- Responsive layout and motion effects
- Light/dark theme switching

### 4.2 Video Browsing and Playback

- Category pages for `Travel`, `Tech`, and `Lifestyle`
- A video detail page with embedded YouTube playback
- Related video recommendations
- Video metadata such as views, publish date, category, tags, and description
- A gear/equipment section on the video page
- Video cards and card-based discovery layouts

### 4.3 Social Interaction Features

- Like and dislike controls
- Save / watch later functionality
- Share options with copy link and social share targets
- Comment section on video pages
- Live stream chat UI
- Live stream reactions and super chat ticker UI

### 4.4 Shorts and Mobile-First Viewing

- Vertical shorts feed
- Auto-playing embedded YouTube Shorts content
- Swipe/scroll-based feed navigation
- Per-short like, comment, share, and more actions
- Category-themed visual treatment for shorts

### 4.5 Library and Personalization

- Library home page
- Watch history page
- Watch later page
- Liked videos page
- Personalized tracking dashboard backed by the Django API

### 4.6 Authentication and Account Management

- Register page
- Login page
- Forgot password page
- Reset password page
- Profile page with editable display name, username, email, and avatar upload
- Local session persistence through browser cookie and localStorage on the frontend
- Backend-backed login, registration, and password reset endpoints

### 4.7 Backend Integration Features

- Django API root health message
- Hello test endpoint for integration checks
- Tracking events endpoint
- Tracking snapshot endpoint
- Backend profile lookup and update endpoint
- Password reset token generation and validation
- Email sending flow for password reset codes

### 4.8 Information and Utility Pages

- About page
- Contact page
- Privacy policy page
- Terms of service page
- Django test integration page
- Search page and search overlay

## 5. What Is Missing, Disabled, Or Only Partially Implemented

### 5.1 Disabled or Removed Features

- Community feature is disabled as a route file marked `.disabled.tsx`
- Community navigation is commented out in the main layout
- Shop / merch navigation is not active in the current frontend navigation
- There is no active `shop` route in the app folder
- Google sign-in is shown in the UI but disabled in the register page
- Apple sign-in is shown in the UI but disabled in the register page
- Backend social login endpoints currently return disabled responses

### 5.2 Mock or Demo-Only Features

- Homepage media catalog uses static demo content from `src/lib/data.ts`
- Comments are stored in browser localStorage, not in the Django database
- Search overlay uses local static data and filters it client-side
- Search page itself is a static mock layout rather than a real query-driven result system
- Newsletter signup is simulated and does not call a backend API
- Category page loading-more behavior is mocked with a timeout
- Live chat, super chat ticker, and live stream view are mostly interface demos
- Some profile statistics are static display values rather than live backend metrics

### 5.3 Incomplete or Placeholder Logic

- The navbar sign-in modal is a lightweight fake auth flow and does not perform the real login request
- The navbar treats authentication via a browser cookie and localStorage rather than a full server session
- Download action on the video ribbon is present visually but not implemented as a real file download
- The shop store and cart logic exist, but the full storefront route is not exposed
- The community feed exists as disabled code, not as a live route

### 5.4 Data Gaps

- Video duration is not consistently populated in the demo data
- Some backend models exist without full CRUD screens in the UI
- No admin-facing content management dashboard is exposed in the frontend
- No real upload pipeline for video publishing exists in the user interface

## 6. Backend Data Model Context

The Django backend currently defines the following core models:

- `Profile` for avatar and user profile data
- `Video` for cataloged videos
- `Comment` for video comments
- `TrackingEvent` for event logging
- `UserVideoState` for saved state per client and video
- `PasswordResetToken` for password recovery

This means the backend already supports profile storage, video metadata, comments as a data concept, user tracking, and password recovery. However, the frontend currently uses a mix of backend and local mock behavior, so the report should clearly distinguish between stored backend data and simulated UI state.

## 7. Diagram Context You Can Use In The Report

### 7.1 Level 0 Architecture Diagram Context

Use this as the high-level system boundary:

- External User
- Next.js Frontend UI
- Django Backend API
- Database layer
- File storage for avatars and static assets
- External services like YouTube embeds, email service, Google auth, and Apple auth

Suggested data flow:

1. The user interacts with the Next.js interface.
2. The frontend loads static content and sends requests to the Django API.
3. The Django backend reads and writes user, profile, password reset, and tracking data.
4. Media and static files are served through the app and filesystem pipeline.
5. External services provide YouTube video playback, email delivery, and social login verification support.

### 7.2 Level 0 Data Flow Diagram Context

Suggested entities:

- User
- Frontend Web App
- Django Backend API
- Database
- Local browser storage
- YouTube service
- Email service

Suggested processes:

- Register user
- Login user
- Reset password
- View profile
- Watch video
- Track watch progress
- Save to watch later
- Like or dislike video
- Submit comments
- Search videos

Suggested data stores:

- User account records
- Profile records
- Password reset tokens
- Tracking events and user video state
- Static video catalog data
- Browser-local persisted data for demo-only behavior

### 7.3 Use Case Diagram Context

Primary actors:

- Visitor
- Registered User
- Creator / Profile Owner
- Backend Service

Main use cases:

- Browse home page
- Search videos
- Open category pages
- Watch a video
- View related content
- Like or dislike a video
- Save a video to watch later
- Add a comment
- Join live stream experience
- Sign up
- Log in
- Request password reset
- Reset password
- Update profile details
- Upload profile avatar
- View tracking dashboard

Optional actor relationship ideas:

- Visitor can browse content and open public pages
- Registered User can perform all visitor actions plus account actions
- Backend Service supports authentication, password reset, and tracking persistence
- Email Service supports forgot-password delivery

### 7.4 Activity Diagram Context

You can model the main user journey as:

1. Open homepage
2. Browse featured or trending videos
3. Select category or search a title
4. Open video page
5. Watch video
6. Like, dislike, share, save, or comment
7. Optionally open profile or library
8. Optionally sign in or register
9. If password is forgotten, request reset code and complete reset
10. Return to login and continue using the platform

Alternative activity flow for tracking:

1. User watches video
2. Frontend sends progress event to backend
3. Backend stores tracking event and updates state
4. Tracking dashboard reads snapshot from backend
5. UI displays history, likes, and watch later status

## 8. Suggested Project Report Points

These are useful to include in a graduation report if you need extra narrative:

- Problem statement: build a modern creator-focused vlog platform
- Objective: enable discovery, playback, personalization, and account management in one interface
- Scope: hybrid frontend/backend platform for browsing and account workflows
- Architecture: decoupled frontend and backend with API integration
- State management: client-side state for likes, watch later, and tracking sync
- Security considerations: CSRF, CORS, secure cookies in production, password reset tokens, external auth verification support
- UX considerations: responsive design, dark mode, animated interactions, mobile navigation, and accessible content sections
- Data persistence: SQLite for development, PostgreSQL support for deployment
- Limitations: several features are demo or mock implementations and should be documented as future work

## 9. Future Work / Improvements

- Replace mock comments with backend persistence
- Turn the search overlay into a real query service
- Implement a real community feed route
- Activate and fully wire the shop / merch store
- Replace navbar fake auth with the actual backend login flow
- Add real social login flows for Google and Apple
- Add real video upload and creator publishing tools
- Add admin/moderation screens for content, comments, and users
- Expand analytics and reporting for watch behavior

## 10. Final Notes

This project is already strong for a graduation report because it combines frontend design, backend API development, authentication, password recovery, profile management, tracking, responsive UI, and deployment planning. The main thing to be careful about in the written report is not to describe mock/demo features as if they are fully production-backed. Distinguish clearly between implemented UI behavior and persistent backend functionality.
