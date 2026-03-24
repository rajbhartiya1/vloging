# 📄 VlogHub - Extended Pages Architecture

This document provides a comprehensive, component-level breakdown of all current, planned, and conceptual page routes for the VlogHub application. It defines exactly what is needed to build out the full ecosystem. Check these off as you build!

## 🟢 1. Core Content Pages (Roadmap Phase 0)

### **[x] Home Page** (`/`)
* **Purpose:** The main landing page and entry point for users. Maximize click-through rates.
* **Key Components:**
  * [x] `HeroCarousel`: Auto-playing banner of latest/featured vlogs.
  * [x] `CreatorBadge`: Small inline bio linking to the about page.
  * [x] `VideoGrid` (Latest Vlogs): Standard 16:9 card grid.
  * [x] `VideoGrid` (Trending Now 🔥): Filtered by highest views in the last 7 days.
  * [x] `CategoryPills`: Horizontal sliding row of quick-filter tags.
  * [x] `NewsletterSignup`: Embedded block above the footer.

### **[x] Video Detail Page** (`/video/[id]`)
* **Purpose:** The primary consumption view for a single video.
* **Key Components:**
  * [x] `VideoPlayerWrapper`: Custom UI controls built over a YouTube/native iframe.
  * [x] `VideoMetaHeader`: Title, views, upload date (relative time).
  * [x] `ActionRibbon`: Like, Dislike, Share (modal), Save to Watch Later (toast notification).
  * [x] `DescriptionBox`: Expandable "Show More" text area with clickable `#tags` and timestamps.
  * [x] `CommentSection`: 
    * [x] Input field with avatar.
    * [x] Nested thread UI.
    * [x] Sorting dropdown (Top Comments / Newest First).
  * [x] `RelatedVideosSidebar` (Desktop) / `RelatedVideosGrid` (Mobile).

### **[x] Category View** (`/category/[slug]`)
* **Purpose:** Filtering videos by specific genres (e.g., Travel, Tech, Lifestyle).
* **Key Components:**
  * [x] `HeroHeader`: Dynamic background colored to match the category.
  * [x] `FilterBar`: Sort by: Newest, Popular, Duration.
  * [x] `InfiniteScrollGrid`: Video cards that auto-load as user scrolls down.

### **[x] About Page** (`/about`)
* **Purpose:** To share the creator's story and build a personal connection.
* **Key Components:**
  * [x] `ParallaxHero`: Large cover photo of the creator.
  * [x] `MilestoneTimeline`: Vertical visual timeline of channel history/growth.
  * [x] `EquipmentGearList`: Clickable affiliate links to cameras/editing gear used.

### **[x] Contact Page** (`/contact`)
* **Purpose:** For fans and brand sponsors to reach out securely.
* **Key Components:**
  * [x] `ContactForm`: Client-side validation (Zod/React Hook Form).
  * [x] `FAQAccordion`: Expandable answers to common questions.
  * [x] `SocialLinks`: Grid of connected platforms.

---

## 🟡 2. New Engagement Pages (Roadmap Phase 1)

### **[x] Shorts / Reels Feed** (`/shorts`)
* **Purpose:** Bite-sized, mobile-optimized vertical video consumption.
* **Key Components:**
  * [x] `SnapContainer`: Full-screen vertical scrolling.
  * [x] `ShortVideoPlayer`: Auto-plays when fully in view, loops infinitely.
  * [x] `FloatingActionColumn`: Right-side transparent buttons (Like, Comment Drawer, Share).
  * [x] `MusicTicker`: Scrolling text of the audio track used.

### **[x] Community / Blog** (`/community` or `/blog`)
* **Purpose:** Text-based updates, behind-the-scenes content, and audience polling.
* **Key Components:**
  * [x] `PostCard` (Text/Image): Standard feed item.
  * [x] `PollCard`: Interactive voting mechanics showing live percentages after click.
  * [x] `InlineComments`: Expands to show comments directly below the post.

### **[x] Creator Merch Shop** (`/shop`)
* **Purpose:** E-commerce tier to sell creator merchandise.
* **Key Components:**
  * [x] `ProductGrid`: Filters by Apparel, Accessories, Digital.
  * [x] `ProductModal` (`/shop/[item-id]`): Quick view for sizing and adding to cart without leaving the page.
  * [x] `SlideOutCart`: Drawer showing selected items and total price.
  * [x] `CheckoutRedirect`: Hand-off to Stripe/Shopify.

---

## 🔵 3. User Experience & Account Pages (Roadmap Phase 2)

### **[x] User Dashboard** (`/profile`)
* **Purpose:** A centralized personal space for the user's settings.
* **Key Components:**
  * [x] `AvatarUploader`: Change profile picture.
  * [x] `ThemeToggle`: Override system light/dark mode.
  * [x] `NotificationPreferences`: Toggles for email alerts on new videos.

### **[x] Library Hub** (`/library`)
* **Purpose:** User's personal video collections.
* **Sub-routes & Components:**
  * [x] `/library/history`: `HistoryGrid` with red progress bars & "Clear History" button.
  * [x] `/library/watch-later`: Reorderable drag-and-drop list of saved videos.
  * [x] `/library/liked`: Quick access to favorites.

### **[x] Dedicated Search Results** (`/search`)
* **Purpose:** Displaying extensive search results from the global navbar.
* **Key Components:**
  * [x] `QueryHeader`: "Showing results for: 'Paris Vlog'"
  * [x] `AdvancedFilterDrawer`: Refine by Category, Upload Date, Length.
  * [x] `ResultList`: Horizontal card layout (thumbnail left, details right) optimized for scanability.
  * [x] `EmptyState`: Creative illustration and suggested topics if search fails.

---

## 🟣 4. Specialized Content Pages (Future Concepts)

### **[x] Live Stream Hub** (`/live`)
* **Purpose:** Dedicated theatre mode for live events and premieres.
* **Key Components:**
  * [x] `TheatrePlayer`: Expanding video taking up 80% of the screen.
  * [x] `LiveChatWindow`: Auto-scrolling, high-performance chat rendering.
  * [x] `SuperChatTicker`: Sticky section for donations/highlighted messages.

### **[x] Series / Playlists** (`/series/[slug]`)
* **Purpose:** Binge-watching sequential content (e.g., "Japan Trip 2024 - Episodes 1 to 10").
* **Key Components:**
  * [x] `PlaylistSidebar`: Next-up module that auto-plays the next video in the series.
  * [x] `SeriesHero`: Unified branding for that specific set of videos.

---

## 🔴 5. Utility & System Pages

### **[x] Not Found / 404** (`/not-found`)
* **Purpose:** Gracefully handle broken links or missing video IDs.
* **Key Components:**
  * [x] `GlitchEffectLogo`: Stylized 404 graphic.
  * [x] `ReturnHomeButton`.
  * [x] `SuggestedContentGrid`: Random 3 videos to retain user session.

### **[x] Authentication Routes** (`/login`, `/register`)
* **Purpose:** Dedicated pages for sign-in.
* **Key Components:**
  * [x] `AuthForm` (Email/Pass).
  * [x] `OAuthButtons` (Sign in with Google, Apple).
  * [x] `ForgotPasswordLink`.

### **[x] Legal & Policy**
* **Routes:** `/privacy-policy`, `/terms-of-service`
* **Purpose:** Boilerplate legal requirements for cookies and data collection.
* **Key Components:** [x] Standard long-form markdown text rendering.
