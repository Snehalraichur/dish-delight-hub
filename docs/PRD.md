# SnapDish - Product Requirements Document (PRD)

**Version:** 2.0 (Comprehensive Edition)  
**Last Updated:** January 2026  
**Status:** Development

---

## 1. Executive Summary

**SnapDish** is a food discovery and loyalty platform that connects consumers with local restaurants through user-generated content, exclusive deals, and gamified rewards. The platform operates as a three-sided marketplace serving consumers, restaurant merchants, and platform administrators.

### Vision
To become the go-to platform for food discovery by combining social engagement with tangible savings and rewards.

### Mission
Empower food lovers to discover amazing dining experiences while helping restaurants grow their customer base through authentic user-generated content and strategic promotions.

---

## 2. Product Overview

### 2.1 Platform Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SHARED BACKEND                            │
│                   (Lovable Cloud)                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐ │
│  │   Auth   │  │ Database │  │ Storage  │  │ Edge Funcs  │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
         │                │                │
         ▼                ▼                ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ Customer App│  │ Merchant App│  │  Admin App  │
│  (Mobile)   │  │  (Desktop)  │  │  (Desktop)  │
└─────────────┘  └─────────────┘  └─────────────┘
```

### 2.2 Target Users

| User Type | Description | Primary Goals |
|-----------|-------------|---------------|
| **Consumers** | Food enthusiasts aged 18-45 | Discover deals, earn rewards, share experiences |
| **Restaurant Owners** | Local restaurant operators | Acquire customers, manage promotions, boost visibility |
| **Platform Admins** | SnapDish operations team | Monitor platform, moderate content, manage revenue |

---

## 3. User Roles & Personas

### 3.1 Consumer (Role: `user`)

**Persona: "Foodie Fiona"**
- Age: 28, urban professional
- Goals: Find great food deals, share dining experiences, earn rewards
- Pain Points: Too many food apps, no unified loyalty program
- Behavior: Posts food photos, redeems deals weekly, compares restaurants

### 3.2 Restaurant Merchant (Role: `restaurant`)

**Persona: "Owner Oliver"**
- Age: 42, owns a mid-sized restaurant
- Goals: Increase foot traffic, manage online presence, reduce marketing costs
- Pain Points: High commission fees, fake reviews, complex marketing tools
- Behavior: Creates weekly deals, monitors analytics, responds to UGC

### 3.3 Platform Administrator (Role: `admin`)

**Persona: "Admin Alex"**
- Age: 35, operations manager
- Goals: Ensure platform health, maximize revenue, maintain quality
- Pain Points: Fraud detection, content moderation at scale
- Behavior: Reviews flagged content, approves restaurants, monitors KPIs

---

## 4. Customer App - Complete Feature Breakdown (35 Pages)

### 4.1 Home Feed (`/feed`)

**Primary Features:**
| Feature | Sub-Feature | Description | UI Element |
|---------|-------------|-------------|------------|
| **Stories Bar** | Your Story | Create new story with "+" icon | Dashed circle border |
| | User Stories | Horizontal scroll of user avatars with gradient rings | Avatar circles |
| | Restaurant Stories | Partner restaurant content | Avatar with verified badge |
| | Story Tap Navigation | Navigate to story viewer on tap | Full-screen overlay |
| **Pull-to-Refresh** | Touch gesture | Pull down to refresh feed content | Loading spinner |
| | Toast notification | "Feed refreshed" confirmation | Sonner toast |
| **Post Cards** | User header | Avatar, name, restaurant tag, location | Row with links |
| | Media display | Image or video with aspect ratio | 1:1 container |
| | Double-tap like | Heart animation on double-tap | Framer Motion heart |
| | Rating badge | Star rating display | Top-right badge |
| | **Deal Tag (AutoDealTag)** | Auto-attached deal overlay | Bottom-left card |
| | | - Discount percentage | Bold text |
| | | - Expiry countdown | Clock icon + text |
| | | - Remaining count | "X left" indicator |
| | | - Sold out state | Grayed badge |
| **Action Bar** | Like button | Toggle like with count | Heart icon + number |
| | Comment button | Link to comments with count | Message icon + number |
| | Share button | Open share modal | Send icon + number |
| | Bookmark button | Save/unsave post | Bookmark icon toggle |
| **Likes Modal** | User list | Avatars, names, usernames | Scrollable list |
| | Live update | Add current user immediately | Optimistic update |
| **Share Modal** | Friends list | Searchable friend selector | Multi-select list |
| | Copy link | Copy post URL | Button with confirmation |
| | External share | Native share API | System sheet |
| **Friends Claimed** | Avatar stack | Overlapping friend avatars | Up to 4 + "more" |
| | Modal view | Full list of friends who claimed | Dialog |
| **Grab Deal** | Add to wallet | Toast notification | Action button |
| | Sold out handling | Error toast if no stock | Disabled state |

### 4.2 Stories System

#### 4.2.1 Story Viewer (`/stories/:userId`)
| Feature | Sub-Feature | Description |
|---------|-------------|-------------|
| **Navigation** | Tap zones | Left/right to navigate stories |
| | Progress bars | Segmented bar per story |
| | Auto-advance | 5-second timer |
| | Pause on hold | Touch and hold pauses |
| **Story Content** | Full-screen media | Image or video fill |
| | User info | Name, avatar, timestamp |
| | Profile link | Navigate to user profile |
| **Reactions** | Emoji selector | Quick emoji reactions |
| | Reaction bubbles | Floating emoji animations |
| **Viewers List** | View count | Number of views |
| | Viewer avatars | Who watched (own stories only) |

#### 4.2.2 Create Story (`/create-story`)
| Feature | Sub-Feature | Description |
|---------|-------------|-------------|
| **Capture Mode** | Camera button | Open camera capture |
| | Photo/Video toggle | Switch between modes |
| | Gallery upload | Select from device |
| **Story Editor** | Crop tool | Content-only zoom (100-300%) |
| | Filter presets | 12+ Instagram-style filters |
| | | - Original, Vivid, Warm, Cool |
| | | - Mono, Sepia, Vintage, Dramatic |
| | | - Fade, Film, Noir, Chrome |
| | Text overlay | Dynamic text with fonts |
| | Emoji stickers | Drag-and-drop emojis |
| | Music overlay | Custom audio upload |
| | Drawing tool | Pencil and brush presets |
| | | - Color picker |
| | | - Brush size slider |
| | Mention tagging | @username mentions |
| **Save/Publish** | Database insert | Stories table with expiry |
| | Real-time update | Query invalidation |

#### 4.2.3 Story Highlights (Profile)
| Feature | Description |
|---------|-------------|
| Highlight circles | Named collections on profile |
| Cover image | Custom or first story |
| Add to highlight | From story viewer |
| Highlight editor | Rename, reorder, delete |
| Story archives | Expired stories storage |

### 4.3 Create Post (`/create-post`)

| Feature | Sub-Feature | Description |
|---------|-------------|-------------|
| **Media Capture** | Take Photo | Camera capture modal |
| | Gallery Select | File picker (image/*) |
| | Re-edit | Open editor for selected image |
| | Remove | Delete selected media |
| **Story Editor Integration** | Crop | Aspect ratio adjustment |
| | Filters | 12+ filter presets |
| | Music | Audio overlay |
| **Caption** | Text area | 500 character limit |
| | Character count | Live counter |
| | AI Suggest | AI-powered caption suggestions |
| **Tag Friends** | Search modal | Filter by name/username |
| | Multi-select | Toggle friend selection |
| | Tag display | Badge chips with remove |
| | Overlay indicator | "X tagged" on image |
| **Tag Restaurant** | Search modal | Filter by name/cuisine/location |
| | Restaurant selection | Single select |
| | Location display | Name + address |
| **Hashtags** | Input field | Add custom hashtags |
| | Suggestions | Quick-add common hashtags |
| | Hashtag chips | Removable badge list |
| **Publish** | Validation | Require image |
| | Success toast | Navigate to feed |

### 4.4 Search & Discovery (`/search`)

| Feature | Sub-Feature | Description |
|---------|-------------|-------------|
| **Search Input** | Text field | Query restaurants, dishes, deals |
| | Filter toggle | Slide-out filter panel |
| **Category Tabs** | All | Show all results |
| | Deals | Filter to deal-attached items |
| | Restaurants | Restaurant profiles only |
| | Dishes | Individual menu items |
| **Filter Panel** | Cuisine types | Multi-select (Italian, Japanese, etc.) |
| | Price range | $, $$, $$$, $$$$ toggles |
| | Clear all | Reset filters |
| **Active Filters** | Filter chips | Removable tags above results |
| **Results Grid** | Restaurant cards | Image, name, cuisine, rating |
| | | - Distance indicator |
| | | - Price level badge |
| | | - Deal overlay if active |
| | Dish cards | Image, name, restaurant, price |
| | Deal countdown | Time remaining |

### 4.5 Deal Wallet (`/wallet`)

| Feature | Sub-Feature | Description |
|---------|-------------|-------------|
| **Streak Tracker** | Current streak | Day count with fire icon |
| | Longest streak | Personal best |
| | Streak points | Bonus earned |
| | Risk indicator | Warning if at risk |
| | Click action | Open leaderboard modal |
| **Tier Progress Bar** | Current tier | Bronze/Silver/Gold/Platinum |
| | Progress indicator | Points to next tier |
| | Visits count | Restaurant visits |
| | Redemptions count | Deals redeemed |
| | Perks list | Locked/unlocked benefits |
| **Points Summary Card** | Gradient design | Visual prominence |
| | Total points | Large number |
| | Redeem button | Open rewards modal |
| **Tabs: Active/Redeemed** | Active deals | Claimed but unused |
| | Redeemed deals | Used with savings |
| **Active Deal Card** | Restaurant image | Thumbnail |
| | Deal title | "25% Off Dinner" |
| | Discount badge | Percentage overlay |
| | Expiry countdown | Time remaining |
| | **Deal Counter** | Friends who claimed |
| | | - Avatar stack |
| | | - Total count |
| | Expand/collapse | Show QR section |
| | **QR Code Section** | QR display | Generated code |
| | | Code text | "GOLD25" |
| | | Redemption button | Mark as used |
| **QR Redemption Modal** | Full-screen QR | Scannable code |
| | Deal details | Restaurant, discount, location |
| | Expiry timer | Countdown |
| | Confirm button | Complete redemption |
| **Redeemed Section** | Deal history | Past redemptions |
| | Savings total | "You saved $X" |
| **Streak Leaderboard Modal** | User rankings | Top 10 + current user |
| | Avatar, name, streak | Ranking display |
| | Unlocked deals | Streak-based rewards |
| | Use deal button | Activate reward |
| **Redeem Points Modal** | Available rewards | Points cost grid |
| | Category icons | Visual differentiation |
| | Insufficient points | Disabled state |

### 4.6 Gamification System

#### 4.6.1 Streaks (`StreakTracker`)
| Feature | Description |
|---------|-------------|
| Current streak | Consecutive days of activity |
| Longest streak | Personal record |
| Streak points | Bonus points for maintaining |
| At-risk warning | If no activity today |
| Multipliers | 7-day: 1.25x, 14-day: 1.5x, 30-day: 2x |

#### 4.6.2 Tiers (`TierProgressBar`)
| Tier | Points Required | Benefits |
|------|-----------------|----------|
| Bronze | 0 | Base rewards |
| Silver | 500 | 10% off, priority support, early access |
| Gold | 2,000 | 1.5x points, exclusive deals, free delivery |
| Platinum | 5,000 | 2x points, VIP events, concierge service |

#### 4.6.3 Points & Badges (`PointsBadgeCard`)
| Feature | Description |
|---------|-------------|
| Total points | Accumulated balance |
| Points to next tier | Progress indicator |
| Badges earned | Achievement icons |
| Badge descriptions | Unlock criteria |
| Recent activity | Points history |

#### 4.6.4 Reward Catalog (`RewardCatalog`)
| Feature | Description |
|---------|-------------|
| Category filters | Discounts, Freebies, Experiences, Exclusive |
| Reward cards | Name, cost, stock, restaurant |
| Affordable indicator | Based on user points |
| Limited badges | Scarcity markers |
| Redemption flow | Confirm and deduct points |
| Redeemed state | Greyed with checkmark |

### 4.7 Events & Catering (`/events`)

#### 4.7.1 Events Tab
| Feature | Sub-Feature | Description |
|---------|-------------|-------------|
| **Location Filters** | State dropdown | Select state |
| | City dropdown | Filter by city (depends on state) |
| | "All" option | Clear filters |
| **Category Filters** | All | No filter |
| | Festival | Large food events |
| | Tasting | Wine/food tastings |
| | Class | Cooking classes |
| | Pop-up | Temporary restaurants |
| **Event Cards** | Event image | Cover photo |
| | Category badge | Top-left label |
| | Price badge | "From $X" |
| | Title | Event name |
| | Date | Calendar icon + date |
| | Location | Map pin + venue |
| | Attendees | User icon + count |
| | Get Tickets | CTA button |

#### 4.7.2 Catering Tab (4-Step Wizard)
| Step | Features |
|------|----------|
| **1. Location** | State selector |
| | City selector |
| | Range slider (miles) |
| **2. Restaurant** | Filtered restaurant list |
| | Cuisine, rating, price per plate |
| | Min order requirement |
| | Select button |
| **3. Menu** | Category grouping (Main, Starter, Side, Dessert) |
| | Checkbox selection |
| | Price per item |
| | Running total |
| **4. Details** | Event name input |
| | Event date picker |
| | Number of plates |
| | Dietary requirements |
| | Additional notes |
| | Submit request |

#### 4.7.3 My Tickets Tab
| Feature | Description |
|---------|-------------|
| Ticket cards | Event name, date, quantity |
| Ticket code | QR code identifier |
| Empty state | "No tickets" illustration |

### 4.8 Catering Request Form (`/catering-request`)

| Field | Type | Options/Validation |
|-------|------|-------------------|
| Event Type | Select | Wedding, Corporate, Birthday, Private Dinner, Office Lunch, Festival, Other |
| Date | Date picker | Required |
| Time | Time picker | Optional |
| Guest Count | Number input | Required, min 1 |
| Location | Text input | Venue address |
| Budget Range | Radio group | $500-1K, $1K-2.5K, $2.5K-5K, $5K+ |
| Dietary Requirements | Checkbox group | Vegetarian, Vegan, Gluten-Free, Halal, Kosher, Nut-Free, Dairy-Free |
| Additional Details | Textarea | Free-form notes |

### 4.9 User Profile (`/profile`)

| Section | Features |
|---------|----------|
| **Header** | Avatar (from auth) |
| | Display name (from auth) |
| | Username (@email prefix) |
| | Tier badge (🥈 Silver Member) |
| **Bio** | Editable description |
| **Stats Row** | Posts count |
| | Followers count (clickable) |
| | Following count (clickable) |
| **Streak Tracker** | Compact view |
| **Tier Progress** | Compact view |
| **Points & Badges** | Expandable/collapsible |
| **Tabs** | Posts grid (3 columns) |
| | Saved posts grid |
| **Member Since** | Join date |

### 4.10 Restaurant Profile (`/restaurant/:id`)

| Section | Features |
|---------|----------|
| Cover image | Restaurant hero |
| Profile info | Name, cuisine, rating |
| Action buttons | Follow, Share, Directions |
| Tabs | Menu, Deals, Photos, Reviews |
| Active deals | Deal cards with claim |
| UGC gallery | User photos tagged here |

### 4.11 Additional Customer Pages

| Page | Route | Key Features |
|------|-------|--------------|
| **Post Detail** | `/post/:id` | Full post view, comments, like, share |
| **Comments** | `/post/:id/comments` | Threaded comments, add new |
| **Deal Redemption** | `/deal/:id/redeem` | QR display, instructions |
| **Redemption Success** | `/redemption-success` | Confirmation, points earned |
| **Redemption Failed** | `/redemption-failed` | Error message, retry |
| **Share Deal** | `/deal/:id/share` | Friends selection, share link |
| **Event Detail** | `/events/:id` | Full event info, ticket options |
| **Buy Ticket** | `/events/:id/tickets` | Quantity, payment |
| **My Tickets** | `/my-tickets` | All purchased tickets |
| **Catering Status** | `/catering-status` | Request tracking |
| **Messages** | `/messages` | Thread list |
| **Chat Thread** | `/messages/:threadId` | Individual conversation |
| **Notifications** | `/notifications` | All notifications |
| **Followers** | `/followers/:userId` | Follower/following lists |
| **Saved Posts** | `/saved` | Bookmarked posts |
| **Saved Restaurants** | `/saved-restaurants` | Favorited restaurants |
| **Rewards & Points** | `/rewards` | Full rewards page |
| **Loyalty Tier Details** | `/loyalty-tiers` | All tier benefits |
| **Streaks & Gamification** | `/streaks` | Full gamification view |
| **Invite Friends** | `/invite` | Referral code, share |
| **Settings** | `/settings` | Account settings |
| **Support** | `/support` | Help center, tickets |
| **Onboarding** | `/onboarding` | New user setup |

---

## 5. Merchant App - Complete Feature Breakdown (23 Pages)

### 5.1 Dashboard (`/dashboard`)

| Section | Features |
|---------|----------|
| **Stats Grid** | Total Views (with % change) |
| | Active Deals count |
| | New Customers (with % change) |
| | Revenue (with % change) |
| **Active Deals Card** | Top 3 deals with redemptions |
| | Expiry countdown |
| | View All link |
| **Recent Reviews Card** | Latest 3 reviews |
| | Customer name, rating, comment |
| | View All link |
| **Performance Chart** | Placeholder for analytics |

### 5.2 Deal Management (`/deals`)

| Feature | Sub-Feature | Description |
|---------|-------------|-------------|
| **Stats Cards** | Active deals count | Current live deals |
| | Total redemptions | All-time |
| | Total views | All-time |
| | Conversion rate | Redemptions/Views |
| **Search & Filter** | Search input | Filter by name |
| | Status dropdown | All, Active, Paused, Expired, Draft |
| **Deals Table (Desktop)** | Deal name + description | |
| | Status badge | Color-coded |
| | Redemption progress | X/Y with bar |
| | Views count | |
| | Date range | Start - End |
| | Actions dropdown | Edit, Pause/Activate, Analytics, Delete |
| **Deals Cards (Mobile)** | Compact card layout | |
| | Edit and Stats buttons | |
| **Create/Edit Modal** | Deal name | Text input |
| | Description | Textarea |
| | Deal type | Percentage, Fixed, BOGO, Freebie |
| | Value | Number input |
| | Start/End dates | Date pickers |
| | Max redemptions | Number input |
| | Deal image | Upload dropzone |
| | Auto-attach to posts | Toggle |

### 5.3 Deal Analytics (`/deal-analytics`)

| Metric | Visualization |
|--------|---------------|
| Impressions over time | Line chart |
| Clicks over time | Line chart |
| Redemptions over time | Bar chart |
| Conversion funnel | Funnel chart |
| Demographics | Pie charts |
| Peak redemption times | Heatmap |

### 5.4 Redemption History (`/redemptions`)

| Column | Description |
|--------|-------------|
| Timestamp | When redeemed |
| Customer | Name or ID |
| Deal | Which deal |
| Amount saved | Discount value |
| Status | Completed, Voided |

### 5.5 Boost & Ads (`/boost`)

| Feature | Sub-Feature | Description |
|---------|-------------|-------------|
| **Stats Overview** | Total Spent | All campaigns |
| | Impressions | Total reach |
| | Conversions | Deal claims from ads |
| | Conversion Rate | Percentage |
| **Active Campaigns** | Campaign name | |
| | Post thumbnail | |
| | Budget progress | Spent/Total bar |
| | Metrics grid | Impressions, Clicks, Conversions |
| | Status badge | Active, Completed |
| | End date | |
| **Create Campaign Modal** | Post selection | Grid of eligible posts |
| | Budget slider | $10-$500/day |
| | Duration select | 3, 7, 14, 30 days |
| | Target audience | Local, City, Regional, Foodies |
| | Estimated results | Impressions, Clicks, Total Cost |

### 5.6 Boost Performance (`/boost-performance`)

| Metric | Details |
|--------|---------|
| ROI by campaign | Return on investment |
| Cost per click | CPC metrics |
| Cost per conversion | CPA metrics |
| Audience insights | Demographics of converters |

### 5.7 UGC Management (`/ugc`)

| Feature | Description |
|---------|-------------|
| UGC feed | Posts mentioning restaurant |
| Post details | User, media, caption, hashtags |
| Engagement stats | Likes, comments, shares |
| Approval status | Pending, Approved, Rejected |
| Usage request | Ask permission to use |

### 5.8 UGC Permission Approval (`/ugc-permissions`)

| Column | Description |
|--------|-------------|
| User | Who posted |
| Post preview | Thumbnail |
| Request type | Marketing, Social, Website |
| Status | Pending, Approved, Declined |
| Actions | Approve, Decline buttons |

### 5.9 Menu Management (`/menu`)

| Feature | Description |
|---------|-------------|
| Menu categories | Appetizers, Mains, Desserts, Drinks |
| Item cards | Image, name, price, description |
| Add/Edit item | Modal form |
| Reorder | Drag and drop |
| Availability toggle | In stock/Out of stock |

### 5.10 Reviews & Ratings (`/reviews`)

| Feature | Description |
|---------|-------------|
| Overall rating | Average with count |
| Rating distribution | 5-star breakdown |
| Review list | Customer, rating, comment, date |
| Reply function | Respond to reviews |
| Flag inappropriate | Report to admin |

### 5.11 Staff Management (`/staff`)

| Feature | Description |
|---------|-------------|
| Staff list | Name, role, email, status |
| Add staff | Email invite |
| Roles | Owner, Manager, Staff |
| Permissions | Deal creation, Redemption, Analytics |
| Remove staff | Revoke access |

### 5.12 Staff Login (`/staff-login`)

| Feature | Description |
|---------|-------------|
| QR scanner | Camera access |
| Manual code entry | Text input |
| Redemption confirmation | Success/failure feedback |

### 5.13 Additional Merchant Pages

| Page | Route | Key Features |
|------|-------|--------------|
| **Subscription Plans** | `/subscription` | Plan tiers, upgrade, features |
| **Billing & Invoices** | `/billing` | Payment history, invoices |
| **Payouts & Earnings** | `/payouts` | Revenue, pending, completed |
| **Contract & Commission** | `/contract` | Commission rates, terms |
| **Profile Edit** | `/profile/edit` | Restaurant info, hours, photos |
| **Messages** | `/messages` | Customer conversations |
| **Support** | `/support` | Help center, tickets |
| **Catering** | `/catering` | Catering requests list |
| **Catering Proposal** | `/catering/:id` | Respond to request |
| **Events Participation** | `/events` | Join platform events |
| **Deal Creation Success** | `/deals/success` | Confirmation page |

---

## 6. Admin App - Complete Feature Breakdown (32 Pages)

### 6.1 Dashboard (`/dashboard`)

| Section | Features |
|---------|----------|
| **Stats Grid** | Total Users (with % change) |
| | Total Restaurants (with % change) |
| | Fraud Cases (with % change, trend) |
| | Revenue (with % change) |
| **Recent Activity** | Activity type indicators |
| | Action description |
| | Target details |
| | Timestamp |
| **Top Restaurants** | Ranking (1-4) |
| | Restaurant name |
| | Deal count |
| | Revenue generated |
| **Platform Health** | Uptime percentage |
| | Average response time |
| | Active sessions |
| | Critical errors |

### 6.2 User Management (`/users`)

| Feature | Description |
|---------|-------------|
| Search | By name, email, username |
| Filters | Status, Tier, Join date |
| User table | Name, email, tier, status, joined |
| Actions | View, Suspend, Delete |
| Bulk actions | Multi-select operations |

### 6.3 User Detail View (`/users/:id`)

| Section | Details |
|---------|---------|
| Profile info | Avatar, name, email, phone |
| Account status | Active, Suspended, Banned |
| Tier & Points | Current tier, total points |
| Activity stats | Posts, redemptions, referrals |
| Transaction history | Points earned/spent |
| Flagged activity | Any policy violations |
| Admin actions | Suspend, Ban, Reset password |

### 6.4 Restaurant Management (`/restaurants`)

| Feature | Description |
|---------|-------------|
| Search | By name, cuisine, location |
| Filters | Status, Subscription, Join date |
| Restaurant table | Name, owner, status, subscription |
| Actions | View, Approve, Suspend |

### 6.5 Restaurant Detail View (`/restaurants/:id`)

| Section | Details |
|---------|---------|
| Profile info | Name, address, cuisine, hours |
| Owner info | Contact details |
| Subscription | Plan, billing status |
| Performance | Deals, redemptions, revenue |
| UGC | Posts mentioning restaurant |
| Reviews | Rating distribution |
| Admin actions | Approve, Suspend, Terminate |

### 6.6 Restaurant Onboarding (`/onboarding`)

| Stage | Features |
|-------|----------|
| Application queue | Pending applications |
| Document review | Business license, ID |
| Verification checklist | Required documents |
| Approval/Rejection | With notes |

### 6.7 Content Moderation (`/moderation`)

| Feature | Description |
|---------|-------------|
| Moderation queue | Flagged posts |
| Post preview | Media, caption |
| Flag reason | Why reported |
| Flagged by | User or AI |
| Actions | Approve, Remove, Warn user |

### 6.8 AI Moderation Settings (`/moderation/settings`)

| Setting | Options |
|---------|---------|
| Auto-moderation | Enable/Disable |
| Sensitivity levels | Low, Medium, High |
| Category filters | Nudity, Violence, Spam, etc. |
| Auto-actions | Flag, Remove, Notify |

### 6.9 Fraud Detection (`/fraud`)

| Feature | Description |
|---------|-------------|
| **Stats** | Active cases |
| | Under review |
| | Prevented loss |
| | Trend vs last month |
| **Case table** | Case ID |
| | Fraud type |
| | User involved |
| | Severity (Critical, High, Medium) |
| | Status (Pending, Investigating, Confirmed, Resolved) |
| | Amount at risk |
| | Date |
| | View action |

### 6.10 Fraud Case Detail (`/fraud/:id`)

| Section | Details |
|---------|---------|
| Case summary | Type, severity, status |
| User profile | Account info, history |
| Evidence | Transaction logs, patterns |
| Related cases | Similar fraud attempts |
| Actions | Confirm, Dismiss, Escalate |
| Resolution | Outcome, amount recovered |

### 6.11 Fraud Prevention (`/fraud/prevention`)

| Setting | Description |
|---------|-------------|
| Detection rules | Configure thresholds |
| Velocity limits | Max redemptions per hour |
| Location checks | Geofencing rules |
| Device fingerprinting | Multi-account detection |
| Alert thresholds | When to notify |

### 6.12 Financial Operations

#### Commission Rules Engine (`/commission`)
| Feature | Description |
|---------|-------------|
| Commission tiers | Based on volume |
| Rate configuration | Percentage per tier |
| Category rates | Different by cuisine |
| Special agreements | Custom rates |

#### Manual Payout Approval (`/payouts`)
| Feature | Description |
|---------|-------------|
| Pending payouts | Awaiting approval |
| Payout details | Amount, restaurant, bank |
| Approval workflow | Review, Approve, Reject |
| Audit trail | Who approved when |

#### Refund Management (`/refunds`)
| Feature | Description |
|---------|-------------|
| Refund requests | From users/restaurants |
| Request details | Reason, amount |
| Approval process | Verify, Process |
| Reporting | Refund trends |

#### Revenue Reports (`/revenue`)
| Report | Metrics |
|--------|---------|
| GMV | Gross merchandise value |
| Take rate | Platform revenue % |
| MRR | Monthly recurring (subscriptions) |
| By category | Revenue by cuisine |
| By city | Geographic breakdown |

### 6.13 Campaign & Marketing

#### Campaign Management (`/campaigns`)
| Feature | Description |
|---------|-------------|
| Active campaigns | Current promotions |
| Create campaign | Name, dates, rules |
| Target selection | Users, Restaurants, All |
| Performance | Engagement metrics |

#### Ads Boost Engine (`/ads`)
| Feature | Description |
|---------|-------------|
| Active boosts | Restaurant ad campaigns |
| Budget monitoring | Spend vs budget |
| Performance | CPM, CPC, conversions |
| Approval queue | New ad requests |

#### Brand Partnerships (`/partnerships`)
| Feature | Description |
|---------|-------------|
| Partner list | Active sponsors |
| Partnership details | Terms, budget |
| Integration | How displayed |
| Performance | ROI metrics |

#### Notification Engine (`/notifications`)
| Feature | Description |
|---------|-------------|
| Campaign list | Scheduled notifications |
| Create notification | Title, body, audience |
| Scheduling | Immediate or scheduled |
| Analytics | Open rates, CTR |

### 6.14 User Incentive Engine (`/incentives`)

| Feature | Description |
|---------|-------------|
| Reward rules | Actions and points |
| Active rules | Currently enabled |
| Rule editor | Create/modify rules |
| Multipliers | Time-based bonuses |
| Daily limits | Max points per action |

### 6.15 Events & Catering

#### Event Management (`/events`)
| Feature | Description |
|---------|-------------|
| Event list | All platform events |
| Create event | Details, venue, pricing |
| Ticket management | Sales, capacity |
| Participating restaurants | Who's involved |

#### Events & Catering Oversight (`/catering-oversight`)
| Feature | Description |
|---------|-------------|
| Request monitoring | All catering requests |
| Dispute resolution | Issues between parties |

#### Ticket Sales Dashboard (`/ticket-sales`)
| Metric | Details |
|--------|---------|
| Total sales | Revenue from tickets |
| By event | Breakdown per event |
| Trends | Sales over time |

### 6.16 Platform Configuration

#### Platform Settings (`/settings`)
| Setting | Description |
|---------|-------------|
| General | App name, logo |
| Limits | Max deals, post frequency |
| Defaults | New user settings |

#### Feature Flags (`/feature-flags`)
| Feature | Description |
|---------|-------------|
| Flag list | All toggleable features |
| Environment | Dev, Staging, Production |
| Rollout | Percentage-based |

#### Legal & Compliance (`/legal`)
| Document | Management |
|----------|------------|
| Terms of Service | Version, edit |
| Privacy Policy | Version, edit |
| Cookie Policy | Consent settings |

### 6.17 Support Console (`/support`)

| Feature | Description |
|---------|-------------|
| Ticket queue | Open tickets |
| Filters | Priority, Category, Status |
| Ticket detail | Conversation thread |
| Assignment | Assign to agent |
| Resolution | Close with notes |

### 6.18 Additional Admin Pages

| Page | Route | Key Features |
|------|-------|--------------|
| **Subscription Management** | `/subscriptions` | All restaurant plans |
| **City Launch Manager** | `/cities` | New market expansion |
| **Audit Logs** | `/audit` | Complete action history |

---

## 7. Database Schema

### 7.1 Core Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `profiles` | User profile data | id, name, email, points, streak_count, tier_id |
| `user_roles` | Role assignments | user_id, role (enum: user, restaurant, admin) |
| `restaurants` | Restaurant listings | owner_id, name, status, subscription_plan_id |
| `posts` | User-generated content | user_id, restaurant_id, media_url, caption, deal_id |
| `deals` | Restaurant promotions | restaurant_id, title, discount_percent, expiry, max_redemptions |
| `deal_redemptions` | Claimed/redeemed deals | deal_id, user_id, qr_code_data, status |

### 7.2 Social Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `likes` | Post likes | post_id, user_id |
| `comments` | Post comments | post_id, user_id, content |
| `stories` | Ephemeral content | user_id, media_url, expires_at |
| `story_reactions` | Story emoji reactions | story_id, user_id, emoji |
| `story_mentions` | @mentions in stories | story_id, mentioned_user_id, position |
| `story_highlights` | Saved story collections | user_id, name, cover_image_url |
| `highlight_stories` | Stories in highlights | highlight_id, story_id |
| `story_archives` | Expired stories storage | user_id, original_story_id, media_url |

### 7.3 Messaging Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `threads` | Conversation threads | participant_ids (JSONB) |
| `messages` | Individual messages | thread_id, sender_id, content, read_at |

### 7.4 Gamification Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `loyalty_tiers` | Tier definitions | name, points_required, benefits (JSONB) |
| `user_badges` | Earned achievements | user_id, badge_name, date_awarded |
| `reward_rules` | Points configuration | action_type, points_awarded, conditions |

### 7.5 Events & Catering Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `events` | Food events | name, start_datetime, location, organizer_id |
| `ticket_sales` | Event tickets | event_id, user_id, quantity, total_amount |
| `catering_requests` | Catering inquiries | user_id, restaurant_id, details (JSONB) |

### 7.6 Marketing Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `ad_boosts` | Paid promotions | restaurant_id, post_id, budget, metrics |
| `campaigns` | Platform promotions | name, rules, target_filters |
| `brand_partnerships` | Sponsor deals | brand_name, budget, terms |

### 7.7 Operations Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `restaurant_subscription_plans` | Plan definitions | name, price_per_month, features |
| `support_tickets` | Help requests | user_id, subject, status, priority |
| `flagged_content` | Moderation queue | post_id, flagged_by, reason, status |
| `admin_actions` | Audit trail | admin_id, action_type, target_id, details |

---

## 8. Edge Functions

| Function | Purpose | Triggers |
|----------|---------|----------|
| `qr-validation` | Validate QR codes, detect fraud, process redemption | Staff scan |
| `points-engine` | Calculate and award points based on rules | User actions |
| `analytics-aggregation` | Aggregate metrics for dashboards | Scheduled |
| `complex-queries` | Optimized multi-table queries | API calls |

---

## 9. User Flows

### 9.1 Deal Redemption Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  See Deal    │───▶│ Claim Deal   │───▶│  Go to Store │───▶│ Show QR Code │
│  on Post     │    │  (Wallet)    │    │              │    │  to Staff    │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                                                                    │
                                                                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Earn Points  │◀───│   Success    │◀───│ Staff Scans  │◀───│ QR Validated │
│              │    │   Screen     │    │   QR Code    │    │              │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

### 9.2 Story Creation Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Tap "Your    │───▶│   Camera     │───▶│   Apply      │───▶│   Add Text   │
│   Story"     │    │   Capture    │    │   Filters    │    │  & Stickers  │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                                                                    │
                                                                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Story Live   │◀───│   Publish    │◀───│  Add Music   │
│  (24 hours)  │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
```

### 9.3 Boost Campaign Flow (Merchant)

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Select Post  │───▶│  Set Budget  │───▶│  Choose      │───▶│  Review      │
│  to Boost    │    │  ($/day)     │    │  Duration    │    │  Estimates   │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                                                                    │
                                                                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Track ROI    │◀───│  Campaign    │◀───│   Launch     │
│              │    │   Active     │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## 10. Revenue Model

### 10.1 Revenue Streams

| Stream | Rate | Description |
|--------|------|-------------|
| **Deal Redemption Commission** | 30-50% | Per successful redemption |
| **Restaurant Subscriptions** | $100-300/mo | Tiered plans (Basic, Pro, Premium) |
| **UGC Boost Ads** | CPM/CPC | Promoted posts |
| **Catering Commission** | 10-15% | On catering bookings |
| **Event Ticket Sales** | 5-10% | Per ticket sold |

### 10.2 Subscription Tiers

| Plan | Price | Features |
|------|-------|----------|
| **Basic** | $100/mo | 3 active deals, basic analytics |
| **Pro** | $200/mo | 10 deals, advanced analytics, UGC tools |
| **Premium** | $300/mo | Unlimited deals, priority support, API access |

---

## 11. Technical Stack

### 11.1 Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** TanStack Query
- **Routing:** React Router v6
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod

### 11.2 Backend
- **Platform:** Lovable Cloud (Supabase)
- **Database:** PostgreSQL
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **Functions:** Deno Edge Functions
- **Real-time:** Supabase Realtime

### 11.3 Security
- Row-Level Security (RLS) on all tables
- Role-based access via `has_role()` function
- JWT validation
- Input sanitization
- Rate limiting

---

## 12. Success Metrics

### 12.1 Customer App KPIs

| Metric | Target |
|--------|--------|
| DAU | 50,000+ |
| Posts/User/Week | 2+ |
| Deal Redemption Rate | 15%+ |
| 7-Day Retention | 40%+ |
| 30-Day Retention | 25%+ |

### 12.2 Merchant App KPIs

| Metric | Target |
|--------|--------|
| Active Restaurants | 5,000+ |
| Deals/Restaurant/Month | 4+ |
| Avg Redemptions/Deal | 50+ |
| Merchant Churn | <5% |

### 12.3 Platform KPIs

| Metric | Target |
|--------|--------|
| GMV | $10M+/month |
| Take Rate | 10-15% |
| Moderation Accuracy | 95%+ |
| Support Resolution | <24h |

---

## 13. Appendix

### A. Role Access Matrix

| Feature | User | Restaurant | Admin |
|---------|------|------------|-------|
| View feed | ✅ | ❌ | ❌ |
| Create posts | ✅ | ❌ | ❌ |
| Claim deals | ✅ | ❌ | ❌ |
| Create deals | ❌ | ✅ | ✅ |
| View analytics | ❌ | ✅ | ✅ |
| Moderate content | ❌ | ❌ | ✅ |
| Manage users | ❌ | ❌ | ✅ |

### B. API Rate Limits

| Endpoint | Limit |
|----------|-------|
| Feed | 100/min |
| Post creation | 10/hour |
| Deal claims | 20/hour |
| Search | 60/min |

### C. Related Documentation

- `docs/APP_SPLIT_GUIDE.md` - Multi-app architecture
- `docs/CUSTOMER_APP_CODE.md` - Customer app code
- `docs/MERCHANT_APP_CODE.md` - Merchant app code
- `docs/ADMIN_APP_CODE.md` - Admin app code
- `docs/SHARED_SUPABASE_FILES.md` - Shared backend

---

*Document Version: 2.0 Comprehensive*
*Total Pages Documented: 90+*
*Last Review: January 2026*
