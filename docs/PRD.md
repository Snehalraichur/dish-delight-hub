# SnapDish - Product Requirements Document (PRD)

**Version:** 1.0  
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

## 4. Feature Requirements

### 4.1 Customer App Features (35 pages)

#### 4.1.1 Core Discovery
| Feature | Description | Priority |
|---------|-------------|----------|
| **Home Feed** | Personalized feed of food posts with deals | P0 |
| **Search** | Search restaurants, dishes, hashtags with filters | P0 |
| **Restaurant Profile** | View menu, deals, reviews, UGC | P0 |
| **Stories** | 24-hour ephemeral content from users/restaurants | P1 |

#### 4.1.2 Deals & Wallet
| Feature | Description | Priority |
|---------|-------------|----------|
| **Deal Wallet** | View claimed, active, and expired deals | P0 |
| **Deal Redemption** | QR code scanning for in-store redemption | P0 |
| **Deal Sharing** | Share deals with friends for bonus points | P1 |
| **Auto-attached Deals** | Deals auto-attach to qualifying posts | P1 |

#### 4.1.3 Social Features
| Feature | Description | Priority |
|---------|-------------|----------|
| **Create Post** | Photo/video upload with captions, tags, location | P0 |
| **Create Story** | Camera capture with filters, stickers, mentions | P1 |
| **Comments** | Threaded comments on posts | P0 |
| **Likes** | Like posts with visible like counts | P0 |
| **Followers** | Follow users and restaurants | P1 |
| **Direct Messages** | Chat with other users | P2 |
| **Saved Posts** | Bookmark posts for later | P1 |

#### 4.1.4 Gamification & Loyalty
| Feature | Description | Priority |
|---------|-------------|----------|
| **Points System** | Earn points for actions (post, redeem, share) | P0 |
| **Streaks** | Daily engagement streaks with multipliers | P1 |
| **Tier System** | Bronze → Silver → Gold → Platinum tiers | P1 |
| **Leaderboard** | Weekly/monthly streak rankings | P2 |
| **Rewards Catalog** | Redeem points for rewards | P1 |
| **Badges** | Achievement badges for milestones | P2 |

#### 4.1.5 Events & Catering
| Feature | Description | Priority |
|---------|-------------|----------|
| **Events Discovery** | Browse food festivals, pop-ups, tastings | P1 |
| **Event Tickets** | Purchase and manage event tickets | P2 |
| **Catering Requests** | Request catering quotes from restaurants | P2 |

#### 4.1.6 User Account
| Feature | Description | Priority |
|---------|-------------|----------|
| **Profile** | View/edit profile, posts, saved items | P0 |
| **Settings** | Notifications, privacy, account management | P0 |
| **Onboarding** | Guided setup for new users | P0 |
| **Notifications** | Push and in-app notifications | P1 |
| **Support** | Help center and ticket submission | P1 |
| **Invite Friends** | Referral system with bonus points | P2 |

---

### 4.2 Merchant App Features (23 pages)

#### 4.2.1 Dashboard & Analytics
| Feature | Description | Priority |
|---------|-------------|----------|
| **Dashboard** | Overview of key metrics, recent activity | P0 |
| **Deal Analytics** | Performance metrics per deal (views, claims, redemptions) | P0 |
| **Boost Performance** | ROI metrics for paid promotions | P1 |

#### 4.2.2 Deal Management
| Feature | Description | Priority |
|---------|-------------|----------|
| **Create Deal** | Configure discount, limits, expiry, auto-attach | P0 |
| **Deal List** | View, edit, pause, delete deals | P0 |
| **Redemption History** | Log of all QR code scans with timestamps | P0 |
| **Deal Creation Success** | Confirmation and sharing options | P0 |

#### 4.2.3 Content Management
| Feature | Description | Priority |
|---------|-------------|----------|
| **UGC Management** | View user-generated posts mentioning restaurant | P1 |
| **UGC Permission Approval** | Approve/deny UGC usage requests | P1 |
| **Menu Management** | Upload and manage menu items | P1 |
| **Reviews & Ratings** | View and respond to customer reviews | P1 |

#### 4.2.4 Marketing & Promotion
| Feature | Description | Priority |
|---------|-------------|----------|
| **Boost Ads** | Create paid campaigns (CPM/CPC pricing) | P1 |
| **Events Participation** | Join platform events and festivals | P2 |

#### 4.2.5 Operations
| Feature | Description | Priority |
|---------|-------------|----------|
| **Staff Login** | QR scanner access for staff | P0 |
| **Staff Management** | Add/remove staff accounts | P1 |
| **Catering Proposals** | Respond to catering requests | P2 |

#### 4.2.6 Business & Billing
| Feature | Description | Priority |
|---------|-------------|----------|
| **Subscription Plans** | View/upgrade subscription tier | P0 |
| **Billing & Invoices** | Payment history and invoice downloads | P0 |
| **Payouts & Earnings** | Revenue tracking and payout requests | P1 |
| **Contract & Commission** | View commission rates and terms | P1 |
| **Profile Edit** | Update restaurant info, hours, photos | P0 |
| **Messages** | Communication with platform/customers | P1 |
| **Support** | Help center and ticket submission | P1 |

---

### 4.3 Admin App Features (32 pages)

#### 4.3.1 Platform Overview
| Feature | Description | Priority |
|---------|-------------|----------|
| **Dashboard** | Platform-wide KPIs, alerts, trends | P0 |
| **Revenue Reports** | Financial analytics and breakdowns | P0 |
| **Audit Logs** | Complete action history for compliance | P1 |

#### 4.3.2 User Management
| Feature | Description | Priority |
|---------|-------------|----------|
| **User Management** | Search, filter, view all users | P0 |
| **User Detail View** | Individual user profile, history, actions | P0 |
| **User Incentive Engine** | Configure point rules, multipliers | P1 |

#### 4.3.3 Restaurant Management
| Feature | Description | Priority |
|---------|-------------|----------|
| **Restaurant Management** | List all restaurants with status filters | P0 |
| **Restaurant Detail View** | Full restaurant profile, metrics, deals | P0 |
| **Restaurant Onboarding** | Approval workflow for new restaurants | P0 |
| **Subscription Management** | Manage restaurant subscription plans | P1 |

#### 4.3.4 Content Moderation
| Feature | Description | Priority |
|---------|-------------|----------|
| **Content Moderation** | Review flagged posts, approve/reject | P0 |
| **AI Moderation Settings** | Configure auto-moderation rules | P1 |

#### 4.3.5 Fraud & Security
| Feature | Description | Priority |
|---------|-------------|----------|
| **Fraud Detection** | AI-powered fraud alerts dashboard | P0 |
| **Fraud Case Detail** | Investigation view with evidence | P0 |
| **Fraud Prevention** | Configure detection rules and thresholds | P1 |

#### 4.3.6 Financial Operations
| Feature | Description | Priority |
|---------|-------------|----------|
| **Commission Rules Engine** | Configure commission tiers and rules | P0 |
| **Manual Payout Approval** | Approve high-value payouts | P0 |
| **Refund Management** | Process and track refunds | P1 |

#### 4.3.7 Marketing & Campaigns
| Feature | Description | Priority |
|---------|-------------|----------|
| **Campaign Management** | Create platform-wide promotions | P1 |
| **Ads Boost Engine** | Manage restaurant ad campaigns | P1 |
| **Brand Partnerships** | Manage sponsor deals and integrations | P2 |
| **Notification Engine** | Send push/email campaigns | P1 |

#### 4.3.8 Events & Expansion
| Feature | Description | Priority |
|---------|-------------|----------|
| **Event Management** | Create and manage food events | P1 |
| **Events & Catering Oversight** | Monitor catering requests | P2 |
| **Ticket Sales Dashboard** | Event ticket revenue tracking | P2 |
| **City Launch Manager** | Tools for launching in new cities | P2 |

#### 4.3.9 Platform Settings
| Feature | Description | Priority |
|---------|-------------|----------|
| **Platform Settings** | Global configuration options | P0 |
| **Feature Flags** | Toggle features per environment | P1 |
| **Legal & Compliance** | Terms, privacy policy management | P1 |
| **Support Console** | View and respond to support tickets | P0 |

---

## 5. Database Schema

### 5.1 Core Tables

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    profiles     │     │   restaurants   │     │   user_roles    │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (PK)         │     │ id (PK)         │     │ id (PK)         │
│ name            │     │ name            │     │ user_id (FK)    │
│ email           │     │ owner_id        │     │ role (enum)     │
│ phone           │     │ address         │     └─────────────────┘
│ points          │     │ cuisine_type    │
│ streak_count    │     │ status          │
│ tier_id (FK)    │     │ subscription_id │
│ profile_image   │     │ profile_image   │
└─────────────────┘     └─────────────────┘

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     posts       │     │     deals       │     │ deal_redemptions│
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (PK)         │     │ id (PK)         │     │ id (PK)         │
│ user_id (FK)    │     │ restaurant_id   │     │ deal_id (FK)    │
│ restaurant_id   │     │ title           │     │ user_id (FK)    │
│ caption         │     │ description     │     │ post_id (FK)    │
│ media_url       │     │ discount_pct    │     │ qr_code_data    │
│ hashtags        │     │ expiry_datetime │     │ claimed_at      │
│ deal_id (FK)    │     │ max_redemptions │     │ redeemed_at     │
│ created_at      │     │ auto_attach     │     │ status          │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 5.2 Role Enumeration

```sql
CREATE TYPE app_role AS ENUM ('user', 'restaurant', 'admin');
```

### 5.3 Key Tables Reference

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `profiles` | User profile data | points, streak_count, tier_id |
| `restaurants` | Restaurant listings | status, subscription_plan_id |
| `posts` | User-generated content | media_url, deal_id, hashtags |
| `deals` | Restaurant promotions | discount_percent, expiry, max_redemptions |
| `deal_redemptions` | Claimed/redeemed deals | qr_code_data, status |
| `stories` | Ephemeral content | expires_at, media_url |
| `story_highlights` | Saved story collections | cover_image_url |
| `events` | Food events | start/end_datetime, location |
| `ticket_sales` | Event ticket purchases | quantity, total_amount |
| `loyalty_tiers` | Tier definitions | points_required, benefits |
| `reward_rules` | Points configuration | action_type, points_awarded |
| `user_badges` | Earned achievements | badge_name, date_awarded |
| `ad_boosts` | Paid promotions | budget, pricing_model, metrics |
| `campaigns` | Platform promotions | rules, target filters |
| `support_tickets` | Help requests | status, priority, assigned_to |
| `flagged_content` | Moderation queue | reason, reviewed_by |
| `admin_actions` | Audit trail | action_type, details |

---

## 6. User Flows

### 6.1 Deal Redemption Flow (Customer)

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

### 6.2 Deal Creation Flow (Merchant)

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Dashboard   │───▶│ Create Deal  │───▶│ Set Details  │───▶│ Configure    │
│              │    │   Button     │    │ (%, expiry)  │    │ Auto-attach  │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                                                                    │
                                                                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Deal Active  │◀───│   Success    │◀───│   Preview    │
│ (Analytics)  │    │   Screen     │    │  & Publish   │
└──────────────┘    └──────────────┘    └──────────────┘
```

### 6.3 Content Moderation Flow (Admin)

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ AI Flags     │───▶│ Review Queue │───▶│ View Details │
│ Content      │    │  Dashboard   │    │ + Context    │
└──────────────┘    └──────────────┘    └──────────────┘
        │                                       │
        │                              ┌────────┴────────┐
        ▼                              ▼                 ▼
┌──────────────┐              ┌──────────────┐  ┌──────────────┐
│ Auto-Remove  │              │   Approve    │  │   Remove +   │
│ (High Score) │              │              │  │ Warn/Ban User│
└──────────────┘              └──────────────┘  └──────────────┘
```

---

## 7. Points & Gamification System

### 7.1 Point Actions

| Action | Points | Daily Limit | Conditions |
|--------|--------|-------------|------------|
| Create post | 10 | 5 posts | Must include photo |
| Redeem deal | 25 | Unlimited | First redemption at venue: 50 |
| Share deal | 5 | 3 shares | Per unique friend click |
| Daily login | 2 | 1 | Increases with streak |
| Write review | 15 | 3 reviews | Min 50 characters |
| Refer friend | 100 | Unlimited | When friend signs up |

### 7.2 Tier Structure

| Tier | Points Required | Benefits |
|------|-----------------|----------|
| **Bronze** | 0 | Base rewards |
| **Silver** | 500 | 1.2x point multiplier, early deal access |
| **Gold** | 2,000 | 1.5x multiplier, exclusive deals, priority support |
| **Platinum** | 5,000 | 2x multiplier, VIP events, free delivery credits |

### 7.3 Streak Multipliers

| Consecutive Days | Multiplier |
|------------------|------------|
| 1-6 days | 1x |
| 7-13 days | 1.25x |
| 14-29 days | 1.5x |
| 30+ days | 2x |

---

## 8. Technical Requirements

### 8.1 Frontend Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design tokens
- **UI Components:** shadcn/ui (Radix primitives)
- **State Management:** TanStack Query (React Query)
- **Routing:** React Router v6
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation

### 8.2 Backend Stack

- **Platform:** Lovable Cloud (Supabase)
- **Database:** PostgreSQL
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **Serverless Functions:** Deno Edge Functions
- **Real-time:** Supabase Realtime

### 8.3 Edge Functions

| Function | Purpose |
|----------|---------|
| `qr-validation` | Validate and process QR code redemptions |
| `points-engine` | Calculate and award points for actions |
| `analytics-aggregation` | Aggregate metrics for dashboards |
| `complex-queries` | Handle complex multi-table queries |

### 8.4 Security Requirements

- Row-Level Security (RLS) on all tables
- Role-based access control via `user_roles` table
- JWT token validation for all API calls
- HTTPS-only communication
- Input validation on all forms
- Rate limiting on sensitive endpoints

---

## 9. Non-Functional Requirements

### 9.1 Performance

| Metric | Target |
|--------|--------|
| Page Load Time | < 2 seconds |
| Time to Interactive | < 3 seconds |
| API Response Time | < 200ms (p95) |
| Image Load Time | < 1 second (optimized) |

### 9.2 Scalability

- Support 100,000+ concurrent users
- Handle 1M+ posts per month
- Process 500+ QR scans per minute
- Store 10TB+ of media files

### 9.3 Availability

- 99.9% uptime SLA
- Automatic failover
- Daily database backups
- Geographic redundancy

### 9.4 Accessibility

- WCAG 2.1 AA compliance
- Screen reader support
- Keyboard navigation
- Color contrast ratios

---

## 10. Success Metrics

### 10.1 Customer App KPIs

| Metric | Target |
|--------|--------|
| Daily Active Users (DAU) | 50,000+ |
| Posts per User per Week | 2+ |
| Deal Redemption Rate | 15%+ |
| 7-Day Retention | 40%+ |
| 30-Day Retention | 25%+ |

### 10.2 Merchant App KPIs

| Metric | Target |
|--------|--------|
| Active Restaurants | 5,000+ |
| Deals Created per Restaurant/Month | 4+ |
| Average Redemptions per Deal | 50+ |
| Merchant Churn Rate | < 5% |

### 10.3 Platform KPIs

| Metric | Target |
|--------|--------|
| Gross Merchandise Value (GMV) | $10M+/month |
| Take Rate | 10-15% |
| Content Moderation Accuracy | 95%+ |
| Support Resolution Time | < 24 hours |

---

## 11. Roadmap

### Phase 1: MVP (Current)
- ✅ Core feed and discovery
- ✅ Deal creation and redemption
- ✅ Basic gamification (points, streaks)
- ✅ User authentication
- ✅ Admin moderation tools

### Phase 2: Growth
- 🔲 Push notifications
- 🔲 AI-powered recommendations
- 🔲 Advanced analytics dashboards
- 🔲 Referral program v2
- 🔲 Multi-language support

### Phase 3: Expansion
- 🔲 Native mobile apps (React Native)
- 🔲 Delivery integration
- 🔲 Reservation system
- 🔲 Corporate accounts
- 🔲 Franchise management

### Phase 4: Enterprise
- 🔲 White-label solution
- 🔲 API marketplace
- 🔲 Advanced fraud ML models
- 🔲 Multi-region deployment

---

## 12. Appendix

### A. Deployment URLs

| App | Staging | Production |
|-----|---------|------------|
| Customer | customer-staging.snapdish.app | customer.snapdish.app |
| Merchant | merchant-staging.snapdish.app | merchant.snapdish.app |
| Admin | admin-staging.snapdish.app | admin.snapdish.app |

### B. Environment Variables

```
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=[anon-key]
```

### C. Related Documentation

- `docs/APP_SPLIT_GUIDE.md` - Multi-app architecture
- `docs/CUSTOMER_APP_CODE.md` - Customer app implementation
- `docs/MERCHANT_APP_CODE.md` - Merchant app implementation
- `docs/ADMIN_APP_CODE.md` - Admin app implementation
- `docs/SHARED_SUPABASE_FILES.md` - Shared backend code

---

*Document maintained by SnapDish Product Team*
