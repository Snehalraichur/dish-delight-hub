# Admin App Conversion Guide

## This Project Becomes the Admin App

This current project will be converted to the **Admin App only**. Follow these steps:

---

## Step 1: Create RoleNotSupported Component

Create `src/pages/RoleNotSupported.tsx`:

```tsx
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldX, LogOut, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function RoleNotSupported() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/login');
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
            Access Denied
          </h1>
          
          <p className="text-muted-foreground mb-6">
            This portal is for <strong>admin</strong> accounts only.
            Please use the correct app for your account type.
          </p>

          <div className="bg-muted rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              Available apps:
            </p>
            <ul className="text-sm text-left mt-2 space-y-1">
              <li>• <strong>Customer App</strong> - For food lovers</li>
              <li>• <strong>Merchant App</strong> - For restaurant owners</li>
              <li>• <strong>Admin Portal</strong> - For platform admins (this app)</li>
            </ul>
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

## Step 2: Update App.tsx (Admin Only Routes)

Replace `src/App.tsx` with:

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Auth Pages
import NotFound from "./pages/NotFound";
import RoleNotSupported from "./pages/RoleNotSupported";
import AdminLogin from "./pages/auth/AdminLogin";
import PermissionsRequired from "./pages/auth/PermissionsRequired";
import AccountSuspended from "./pages/auth/AccountSuspended";
import Maintenance from "./pages/auth/Maintenance";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import UserDetailView from "./pages/admin/UserDetailView";
import RestaurantManagement from "./pages/admin/RestaurantManagement";
import RestaurantDetailView from "./pages/admin/RestaurantDetailView";
import RestaurantOnboarding from "./pages/admin/RestaurantOnboarding";
import ContentModeration from "./pages/admin/ContentModeration";
import AIModerationSettings from "./pages/admin/AIModerationSettings";
import FraudDetection from "./pages/admin/FraudDetection";
import FraudCaseDetail from "./pages/admin/FraudCaseDetail";
import FraudPrevention from "./pages/admin/FraudPrevention";
import CampaignManagement from "./pages/admin/CampaignManagement";
import UserIncentiveEngine from "./pages/admin/UserIncentiveEngine";
import AdsBoostEngine from "./pages/admin/AdsBoostEngine";
import BrandPartnerships from "./pages/admin/BrandPartnerships";
import CommissionRulesEngine from "./pages/admin/CommissionRulesEngine";
import SubscriptionManagement from "./pages/admin/SubscriptionManagement";
import RevenueReports from "./pages/admin/RevenueReports";
import ManualPayoutApproval from "./pages/admin/ManualPayoutApproval";
import RefundManagement from "./pages/admin/RefundManagement";
import EventManagement from "./pages/admin/EventManagement";
import TicketSalesDashboard from "./pages/admin/TicketSalesDashboard";
import EventsCatering from "./pages/admin/EventsCatering";
import CateringOversight from "./pages/admin/CateringOversight";
import CityLaunchManager from "./pages/admin/CityLaunchManager";
import NotificationEngine from "./pages/admin/NotificationEngine";
import SupportConsole from "./pages/admin/SupportConsole";
import AuditLogs from "./pages/admin/AuditLogs";
import FeatureFlags from "./pages/admin/FeatureFlags";
import LegalCompliance from "./pages/admin/LegalCompliance";
import PlatformSettings from "./pages/admin/PlatformSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/permissions-required" element={<PermissionsRequired />} />
            <Route path="/account-suspended" element={<AccountSuspended />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/role-not-supported" element={<RoleNotSupported />} />
            
            {/* Admin Routes - No /admin prefix needed */}
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/users/:userId" element={<UserDetailView />} />
            <Route path="/restaurants" element={<RestaurantManagement />} />
            <Route path="/restaurants/:restaurantId" element={<RestaurantDetailView />} />
            <Route path="/restaurants/onboarding" element={<RestaurantOnboarding />} />
            <Route path="/content" element={<ContentModeration />} />
            <Route path="/content/ai-settings" element={<AIModerationSettings />} />
            <Route path="/fraud" element={<FraudDetection />} />
            <Route path="/fraud/:caseId" element={<FraudCaseDetail />} />
            <Route path="/fraud/prevention" element={<FraudPrevention />} />
            <Route path="/campaigns" element={<CampaignManagement />} />
            <Route path="/incentives" element={<UserIncentiveEngine />} />
            <Route path="/ads" element={<AdsBoostEngine />} />
            <Route path="/partnerships" element={<BrandPartnerships />} />
            <Route path="/commission" element={<CommissionRulesEngine />} />
            <Route path="/subscriptions" element={<SubscriptionManagement />} />
            <Route path="/revenue" element={<RevenueReports />} />
            <Route path="/payouts" element={<ManualPayoutApproval />} />
            <Route path="/refunds" element={<RefundManagement />} />
            <Route path="/events" element={<EventManagement />} />
            <Route path="/events/tickets" element={<TicketSalesDashboard />} />
            <Route path="/events/catering" element={<EventsCatering />} />
            <Route path="/catering" element={<CateringOversight />} />
            <Route path="/cities" element={<CityLaunchManager />} />
            <Route path="/notifications" element={<NotificationEngine />} />
            <Route path="/support" element={<SupportConsole />} />
            <Route path="/audit" element={<AuditLogs />} />
            <Route path="/features" element={<FeatureFlags />} />
            <Route path="/legal" element={<LegalCompliance />} />
            <Route path="/settings" element={<PlatformSettings />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
```

---

## Step 3: Update AdminLogin.tsx (With Role Validation)

Replace `src/pages/auth/AdminLogin.tsx` with:

```tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Role validation after login
  useEffect(() => {
    const validateRole = async () => {
      if (isAuthenticated && user) {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (roleData?.role !== 'admin') {
          navigate('/role-not-supported');
        } else {
          navigate('/dashboard');
        }
      }
    };
    validateRole();
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      toast.success('Welcome back, Admin!');
    } catch (error: any) {
      const message = error?.message || 'Invalid credentials';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary-foreground">SnapDish</h1>
          </div>
          <p className="text-primary-foreground/60">Admin Portal</p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Admin Login</h2>
            <p className="text-muted-foreground mt-2">Authorized personnel only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@snapdish.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              🔒 This portal is for authorized administrators only. All access is logged and monitored.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
```

---

## Step 4: Update AdminLayout.tsx (Remove /admin prefix)

Update navigation paths in `src/components/layouts/AdminLayout.tsx`:

**Before:**
```tsx
{ path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
{ path: '/admin/users', icon: Users, label: 'Users' },
// etc.
```

**After:**
```tsx
{ path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
{ path: '/users', icon: Users, label: 'Users' },
// etc.
```

---

## Step 5: Delete Unnecessary Files

Delete these files/folders from the Admin App:

```
src/pages/user/                    # All user pages
src/pages/restaurant/              # All restaurant pages
src/pages/Landing.tsx              # Customer landing
src/pages/auth/Login.tsx           # Generic login
src/pages/auth/Signup.tsx          # Customer signup
src/pages/auth/RestaurantSignup.tsx
src/pages/auth/RoleRouter.tsx
src/pages/auth/ForgotPassword.tsx  # Optional - admins usually have IT support
src/pages/auth/ResetPassword.tsx
src/pages/auth/OTPVerification.tsx
src/pages/auth/EmailVerification.tsx
src/components/layouts/UserLayout.tsx
src/components/layouts/RestaurantLayout.tsx
src/components/social/             # Social features (user only)
src/components/stories/            # Stories (user only)
src/components/media/              # Media components (user only)
src/components/gamification/       # Gamification (user only)
src/hooks/useStories.ts
src/types/stories.ts
```

---

## Summary of Changes

| What | Action |
|------|--------|
| `src/App.tsx` | Replace with admin-only routes |
| `src/pages/RoleNotSupported.tsx` | Create new |
| `src/pages/auth/AdminLogin.tsx` | Update with role validation |
| `src/components/layouts/AdminLayout.tsx` | Remove `/admin` prefix from paths |
| User pages | Delete all |
| Restaurant pages | Delete all |
| Social/Stories/Media components | Delete all |
| Customer auth pages | Delete (Login, Signup, etc.) |

After these changes, this project will be a **standalone Admin Portal** that:
- Only allows admin role accounts to login
- Shows "Role Not Supported" for non-admin users
- Has clean routes without `/admin` prefix
- Connects to the same shared backend
