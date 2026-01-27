# SnapDish App Split - Complete Guide

## Overview

The SnapDish application has been designed to split into **3 separate Lovable projects**, each serving a specific user role while sharing the same Supabase backend.

| App | Target Role | Purpose |
|-----|-------------|---------|
| **Customer App** | `user` | Food discovery, deals, social features, rewards |
| **Merchant App** | `restaurant` | Restaurant management, deals, analytics |
| **Admin App** | `admin` | Platform operations, moderation, monetization |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    SHARED BACKEND                        │
│                      (Supabase)                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │   Auth   │  │ Database │  │ Storage  │  │ Edge Fn │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
└─────────────────────────────────────────────────────────┘
         │                │                │
         ▼                ▼                ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ Customer App│  │ Merchant App│  │  Admin App  │
│             │  │             │  │             │
│ Role: user  │  │Role:restaur.│  │ Role: admin │
│             │  │             │  │             │
│ - Feed      │  │ - Dashboard │  │ - Dashboard │
│ - Deals     │  │ - Deals     │  │ - Users     │
│ - Rewards   │  │ - Analytics │  │ - Moderation│
│ - Events    │  │ - UGC       │  │ - Revenue   │
└─────────────┘  └─────────────┘  └─────────────┘
```

---

## Setup Steps

### Step 1: Create New Lovable Projects

1. Go to Lovable dashboard
2. Create project: **"SnapDish Customer"**
3. Create project: **"SnapDish Merchant"**
4. Create project: **"SnapDish Admin"**

### Step 2: Add Environment Variables

In each project's settings, add:

```
VITE_SUPABASE_URL=https://hmedlhhcpoltalyxhaqr.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtZWRsaGhjcG9sdGFseXhoYXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MzczNDUsImV4cCI6MjA4MjMxMzM0NX0.avUfGCtrs9EdBrrBvfbh64O3UhKNhbMB8QvOOypaBio
```

### Step 3: Copy Code to Each Project

Use the documentation files:

| Doc File | Use For |
|----------|---------|
| `CUSTOMER_APP_CODE.md` | Customer App setup |
| `MERCHANT_APP_CODE.md` | Merchant App setup |
| `ADMIN_APP_CODE.md` | Admin App setup |
| `SHARED_SUPABASE_FILES.md` | Files needed by all apps |

### Step 4: Copy Required Files

For each project, copy from the main project:

1. **UI Components**: `src/components/ui/*`
2. **Config**: `tailwind.config.ts`, `src/index.css`
3. **Types**: `src/integrations/supabase/types.ts`
4. **Role-specific pages**: See each app's doc

---

## Role Validation Logic

Each app validates the user's role after login. If the role doesn't match, they see a "Role Not Supported" screen.

```typescript
// Customer App
const EXPECTED_ROLE = 'user';

// Merchant App  
const EXPECTED_ROLE = 'restaurant';

// Admin App
const EXPECTED_ROLE = 'admin';

// In Login.tsx
const userRole = await login(email, password);
if (userRole !== EXPECTED_ROLE) {
  navigate('/role-not-supported');
  return;
}
```

---

## Route Changes Summary

### Customer App Routes
- Keep user routes as-is (no prefix changes needed)
- Example: `/feed`, `/wallet`, `/profile`

### Merchant App Routes
- Remove `/restaurant` prefix
- Before: `/restaurant/dashboard` → After: `/dashboard`
- Before: `/restaurant/deals` → After: `/deals`

### Admin App Routes
- Remove `/admin` prefix
- Before: `/admin/dashboard` → After: `/dashboard`
- Before: `/admin/users` → After: `/users`

---

## Page Counts by App

| App | Page Count | Examples |
|-----|------------|----------|
| Customer | ~35 pages | Feed, Search, Wallet, Events, Profile, Settings |
| Merchant | ~23 pages | Dashboard, Deals, Analytics, UGC, Billing |
| Admin | ~32 pages | Dashboard, Users, Restaurants, Moderation, Revenue |

---

## Important Notes

1. **DO NOT modify the Supabase backend** - all apps share it
2. **Keep the same auth flow** - just add role validation
3. **Update internal navigation** - remove role prefixes from routes
4. **Copy UI components** - all apps need the same shadcn components
5. **Test each app independently** - ensure role validation works

---

## Deployment

Each app can be published independently:
- Customer App → `customer.snapdish.app`
- Merchant App → `merchant.snapdish.app`  
- Admin App → `admin.snapdish.app`

All three connect to the same Supabase project.
