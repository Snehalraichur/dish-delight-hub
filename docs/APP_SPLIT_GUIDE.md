# SnapDish 3-App Split Guide

## Overview

This guide provides the complete file structure and setup instructions for splitting the monolithic SnapDish app into **3 separate Lovable projects** that share the same backend.

## Backend Connection (Same for All 3 Apps)

All three apps connect to the **same Supabase backend**. Add these to each project's `.env`:

```
VITE_SUPABASE_URL=https://hmedlhhcpoltalyxhaqr.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtZWRsaGhjcG9sdGFseXhoYXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MzczNDUsImV4cCI6MjA4MjMxMzM0NX0.avUfGCtrs9EdBrrBvfbh64O3UhKNhbMB8QvOOypaBio
VITE_SUPABASE_PROJECT_ID=hmedlhhcpoltalyxhaqr
```

---

## App 1: Customer App

**Expected Role**: `user`
**Main Route**: `/feed`
**Pages**: 33 customer-facing pages

### File Structure

```
src/
├── App.tsx                    # Customer-only routes
├── App.css
├── main.tsx
├── index.css                  # Shared design tokens
├── vite-env.d.ts
├── lib/
│   └── utils.ts
├── types/
│   ├── auth.ts
│   └── stories.ts
├── contexts/
│   └── AuthContext.tsx
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   └── useStories.ts
├── integrations/
│   └── supabase/
│       ├── client.ts
│       └── types.ts
├── components/
│   ├── layouts/
│   │   └── UserLayout.tsx     # Customer bottom nav layout
│   ├── ui/                    # All shadcn components
│   ├── social/                # PostCard, CommentList, etc.
│   ├── stories/               # Story components
│   ├── media/                 # Camera, ImageEditor
│   └── gamification/          # Rewards, Streaks
└── pages/
    ├── Landing.tsx            # Customer landing
    ├── NotFound.tsx
    ├── RoleNotSupported.tsx   # NEW - shows if wrong role
    └── auth/
    │   ├── Login.tsx          # Customer login (no role selector)
    │   ├── Signup.tsx         # Customer signup only
    │   ├── ForgotPassword.tsx
    │   ├── ResetPassword.tsx
    │   ├── OTPVerification.tsx
    │   ├── EmailVerification.tsx
    │   ├── PermissionsRequired.tsx
    │   ├── AccountSuspended.tsx
    │   └── Maintenance.tsx
    └── user/                  # All 33 user pages
        ├── HomeFeed.tsx
        ├── Search.tsx
        ├── DealWallet.tsx
        ├── Notifications.tsx
        ├── UserProfile.tsx
        ├── Messages.tsx
        ├── ChatThread.tsx
        ├── StoriesViewer.tsx
        ├── CreatePost.tsx
        ├── CreateStory.tsx
        ├── PostDetail.tsx
        ├── CommentsFullView.tsx
        ├── RestaurantProfile.tsx
        ├── SavedRestaurants.tsx
        ├── SavedPosts.tsx
        ├── DealRedemption.tsx
        ├── RedemptionSuccess.tsx
        ├── RedemptionFailed.tsx
        ├── ShareDeal.tsx
        ├── Events.tsx
        ├── EventDetail.tsx
        ├── BuyEventTicket.tsx
        ├── MyTickets.tsx
        ├── CateringDiscovery.tsx
        ├── CateringRequest.tsx
        ├── CateringRequestStatus.tsx
        ├── Followers.tsx
        ├── InviteFriends.tsx
        ├── StreaksGamification.tsx
        ├── RewardsPoints.tsx
        ├── LoyaltyTierDetails.tsx
        ├── Onboarding.tsx
        ├── UserSettings.tsx
        └── UserSupport.tsx
```

---

## App 2: Merchant App

**Expected Role**: `restaurant`
**Main Route**: `/dashboard`
**Pages**: 23 merchant-facing pages

### File Structure

```
src/
├── App.tsx                    # Merchant-only routes
├── App.css
├── main.tsx
├── index.css                  # Shared design tokens
├── vite-env.d.ts
├── lib/
│   └── utils.ts
├── types/
│   └── auth.ts
├── contexts/
│   └── AuthContext.tsx
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── integrations/
│   └── supabase/
│       ├── client.ts
│       └── types.ts
├── components/
│   ├── layouts/
│   │   └── RestaurantLayout.tsx  # Merchant sidebar layout
│   └── ui/                       # All shadcn components
└── pages/
    ├── Landing.tsx               # Merchant landing
    ├── NotFound.tsx
    ├── RoleNotSupported.tsx      # NEW - shows if wrong role
    └── auth/
    │   ├── Login.tsx             # Merchant login (no role selector)
    │   ├── RestaurantSignup.tsx  # Restaurant signup
    │   ├── ForgotPassword.tsx
    │   ├── ResetPassword.tsx
    │   ├── OTPVerification.tsx
    │   ├── EmailVerification.tsx
    │   ├── PermissionsRequired.tsx
    │   ├── AccountSuspended.tsx
    │   └── Maintenance.tsx
    └── restaurant/               # All 23 restaurant pages
        ├── Dashboard.tsx
        ├── DealManagement.tsx
        ├── DealCreationSuccess.tsx
        ├── DealAnalytics.tsx
        ├── RedemptionHistory.tsx
        ├── UGCManagement.tsx
        ├── UGCPermissionApproval.tsx
        ├── BoostAds.tsx
        ├── BoostPerformance.tsx
        ├── SubscriptionPlans.tsx
        ├── BillingInvoices.tsx
        ├── ContractCommission.tsx
        ├── Catering.tsx
        ├── CateringProposal.tsx
        ├── EventsParticipation.tsx
        ├── PayoutsEarnings.tsx
        ├── MenuManagement.tsx
        ├── RestaurantProfileEdit.tsx
        ├── ReviewsRatings.tsx
        ├── RestaurantMessages.tsx
        ├── StaffLogin.tsx
        ├── StaffManagement.tsx
        └── RestaurantSupport.tsx
```

---

## App 3: Admin App (THIS PROJECT)

**Expected Role**: `admin`
**Main Route**: `/dashboard`
**Pages**: 32 admin-facing pages

### File Structure

```
src/
├── App.tsx                    # Admin-only routes
├── App.css
├── main.tsx
├── index.css                  # Shared design tokens
├── vite-env.d.ts
├── lib/
│   └── utils.ts
├── types/
│   └── auth.ts
├── contexts/
│   └── AuthContext.tsx
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── integrations/
│   └── supabase/
│       ├── client.ts
│       └── types.ts
├── components/
│   ├── layouts/
│   │   └── AdminLayout.tsx    # Admin dark sidebar layout
│   └── ui/                    # All shadcn components
└── pages/
    ├── NotFound.tsx
    ├── RoleNotSupported.tsx   # NEW - shows if wrong role
    └── auth/
    │   ├── AdminLogin.tsx     # Admin login (no role selector)
    │   ├── PermissionsRequired.tsx
    │   ├── AccountSuspended.tsx
    │   └── Maintenance.tsx
    └── admin/                 # All 32 admin pages
        ├── Dashboard.tsx
        ├── UserManagement.tsx
        ├── UserDetailView.tsx
        ├── RestaurantManagement.tsx
        ├── RestaurantDetailView.tsx
        ├── RestaurantOnboarding.tsx
        ├── ContentModeration.tsx
        ├── AIModerationSettings.tsx
        ├── FraudDetection.tsx
        ├── FraudCaseDetail.tsx
        ├── FraudPrevention.tsx
        ├── CampaignManagement.tsx
        ├── UserIncentiveEngine.tsx
        ├── AdsBoostEngine.tsx
        ├── BrandPartnerships.tsx
        ├── CommissionRulesEngine.tsx
        ├── SubscriptionManagement.tsx
        ├── RevenueReports.tsx
        ├── ManualPayoutApproval.tsx
        ├── RefundManagement.tsx
        ├── EventManagement.tsx
        ├── TicketSalesDashboard.tsx
        ├── EventsCatering.tsx
        ├── CateringOversight.tsx
        ├── CityLaunchManager.tsx
        ├── NotificationEngine.tsx
        ├── SupportConsole.tsx
        ├── AuditLogs.tsx
        ├── FeatureFlags.tsx
        ├── LegalCompliance.tsx
        └── PlatformSettings.tsx
```

---

## Key Files to Create in Each App

### 1. RoleNotSupported.tsx (Create in all 3 apps)

```tsx
// src/pages/RoleNotSupported.tsx
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldX, LogOut, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RoleNotSupportedProps {
  expectedRole: 'user' | 'restaurant' | 'admin';
  actualRole?: string;
}

export default function RoleNotSupported({ expectedRole, actualRole }: RoleNotSupportedProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const appNames = {
    user: 'SnapDish Customer App',
    restaurant: 'SnapDish Merchant App',
    admin: 'SnapDish Admin Portal',
  };

  return (
    <div className="min-h-screen gradient-warm flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <ShieldX className="w-8 h-8 text-destructive" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Role Not Supported
          </h1>
          
          <p className="text-muted-foreground mb-6">
            This app is for <strong>{expectedRole}</strong> accounts only.
            {actualRole && (
              <span> Your account has the <strong>{actualRole}</strong> role.</span>
            )}
          </p>

          <div className="bg-muted rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              Please use the correct app for your account type:
            </p>
            <p className="text-sm font-medium text-foreground mt-2">
              {appNames[expectedRole]}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button variant="outline" onClick={() => navigate(-1)} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Button variant="destructive" onClick={handleLogout} className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Logout & Switch Account
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
```

---

## Next Steps

1. **For Customer App**: See `docs/CUSTOMER_APP_CODE.md`
2. **For Merchant App**: See `docs/MERCHANT_APP_CODE.md`
3. **For Admin App**: This project will be converted - see `docs/ADMIN_APP_CONVERSION.md`
