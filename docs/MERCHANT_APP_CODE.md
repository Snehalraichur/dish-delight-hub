# Merchant App - Complete Code

## Setup Instructions

1. Create a new Lovable project named "SnapDish Merchant"
2. Copy ALL files from this guide to the new project
3. Delete any files that aren't listed below

---

## Core Files

### src/App.tsx

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Auth Pages
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import RoleNotSupported from "./pages/RoleNotSupported";
import Login from "./pages/auth/Login";
import RestaurantSignup from "./pages/auth/RestaurantSignup";
import OTPVerification from "./pages/auth/OTPVerification";
import EmailVerification from "./pages/auth/EmailVerification";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import PermissionsRequired from "./pages/auth/PermissionsRequired";
import AccountSuspended from "./pages/auth/AccountSuspended";
import Maintenance from "./pages/auth/Maintenance";

// Restaurant Pages
import Dashboard from "./pages/restaurant/Dashboard";
import DealManagement from "./pages/restaurant/DealManagement";
import DealCreationSuccess from "./pages/restaurant/DealCreationSuccess";
import DealAnalytics from "./pages/restaurant/DealAnalytics";
import RedemptionHistory from "./pages/restaurant/RedemptionHistory";
import UGCManagement from "./pages/restaurant/UGCManagement";
import UGCPermissionApproval from "./pages/restaurant/UGCPermissionApproval";
import BoostAds from "./pages/restaurant/BoostAds";
import BoostPerformance from "./pages/restaurant/BoostPerformance";
import SubscriptionPlans from "./pages/restaurant/SubscriptionPlans";
import BillingInvoices from "./pages/restaurant/BillingInvoices";
import ContractCommission from "./pages/restaurant/ContractCommission";
import Catering from "./pages/restaurant/Catering";
import CateringProposal from "./pages/restaurant/CateringProposal";
import EventsParticipation from "./pages/restaurant/EventsParticipation";
import PayoutsEarnings from "./pages/restaurant/PayoutsEarnings";
import MenuManagement from "./pages/restaurant/MenuManagement";
import RestaurantProfileEdit from "./pages/restaurant/RestaurantProfileEdit";
import ReviewsRatings from "./pages/restaurant/ReviewsRatings";
import RestaurantMessages from "./pages/restaurant/RestaurantMessages";
import StaffLogin from "./pages/restaurant/StaffLogin";
import StaffManagement from "./pages/restaurant/StaffManagement";
import RestaurantSupport from "./pages/restaurant/RestaurantSupport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<RestaurantSignup />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/permissions-required" element={<PermissionsRequired />} />
            <Route path="/account-suspended" element={<AccountSuspended />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/role-not-supported" element={<RoleNotSupported expectedRole="restaurant" />} />
            
            {/* Restaurant Routes */}
            <Route path="/staff-login" element={<StaffLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/deals" element={<DealManagement />} />
            <Route path="/deals/success" element={<DealCreationSuccess />} />
            <Route path="/deals/analytics" element={<DealAnalytics />} />
            <Route path="/deals/history" element={<RedemptionHistory />} />
            <Route path="/content" element={<UGCManagement />} />
            <Route path="/content/approval" element={<UGCPermissionApproval />} />
            <Route path="/boost" element={<BoostAds />} />
            <Route path="/boost/performance" element={<BoostPerformance />} />
            <Route path="/subscription" element={<SubscriptionPlans />} />
            <Route path="/billing" element={<BillingInvoices />} />
            <Route path="/commission" element={<ContractCommission />} />
            <Route path="/catering" element={<Catering />} />
            <Route path="/catering/proposal/:requestId" element={<CateringProposal />} />
            <Route path="/events" element={<EventsParticipation />} />
            <Route path="/payouts" element={<PayoutsEarnings />} />
            <Route path="/menu" element={<MenuManagement />} />
            <Route path="/profile" element={<RestaurantProfileEdit />} />
            <Route path="/reviews" element={<ReviewsRatings />} />
            <Route path="/messages" element={<RestaurantMessages />} />
            <Route path="/staff" element={<StaffManagement />} />
            <Route path="/support" element={<RestaurantSupport />} />
            
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

### src/pages/auth/Login.tsx (Merchant Version - No Role Selector)

```tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function Login() {
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

        if (roleData?.role !== 'restaurant') {
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
      toast.success('Welcome back!');
    } catch (error: any) {
      const message = error?.message || 'Invalid credentials';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen gradient-warm flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="block text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Store className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gradient">SnapDish</h1>
          </div>
          <p className="text-sm text-muted-foreground">Merchant Portal</p>
        </Link>

        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">Sign in to manage your restaurant</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="restaurant@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
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

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              New restaurant?{' '}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Register here
              </Link>
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-border text-center">
            <Link to="/staff-login" className="text-sm text-primary font-medium hover:underline">
              Staff member? Login here →
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
```

---

### src/pages/Landing.tsx (Merchant Version)

```tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Store, TrendingUp, Users, BarChart3, ArrowRight, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: TrendingUp,
    title: 'Boost Sales',
    description: 'Create irresistible deals that drive foot traffic',
  },
  {
    icon: Users,
    title: 'Grow Customers',
    description: 'Reach millions of hungry food lovers',
  },
  {
    icon: BarChart3,
    title: 'Track Analytics',
    description: 'Real-time insights on deal performance',
  },
  {
    icon: Store,
    title: 'Manage Easy',
    description: 'Simple tools to run your business',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen gradient-warm">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <Store className="w-7 h-7 text-primary" />
              <h1 className="text-2xl font-bold text-gradient">SnapDish</h1>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">Business</span>
            </motion.div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="gradient">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>Trusted by 10,000+ Restaurants</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight mb-6"
            >
              Grow Your
              <br />
              <span className="text-gradient">Restaurant Business</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Join the #1 food discovery platform. Create deals, boost visibility, and attract hungry customers to your restaurant.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/signup">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Register Your Restaurant
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Already registered? Login
                </Button>
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-center justify-center gap-8 text-muted-foreground"
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">10K+</p>
                <p className="text-sm">Restaurants</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">2M+</p>
                <p className="text-sm">Customers</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber text-amber" />
                ))}
                <span className="text-sm font-medium ml-2">4.9</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 SnapDish Business. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
              <Link to="/signup" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Register
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

---

## Files to Copy Directly

Copy these files **exactly as-is** from the original project:

### From src/components/
- `layouts/RestaurantLayout.tsx` ✓
- All files in `ui/` ✓

### From src/pages/restaurant/
- ALL 23 restaurant page files ✓

### From src/pages/auth/
- `RestaurantSignup.tsx` ✓
- `ForgotPassword.tsx` ✓
- `ResetPassword.tsx` ✓
- `OTPVerification.tsx` ✓
- `EmailVerification.tsx` ✓
- `PermissionsRequired.tsx` ✓
- `AccountSuspended.tsx` ✓
- `Maintenance.tsx` ✓

### Core Files
- `src/contexts/AuthContext.tsx` ✓
- `src/types/auth.ts` ✓
- `src/lib/utils.ts` ✓
- `src/hooks/use-mobile.tsx` ✓
- `src/hooks/use-toast.ts` ✓
- `src/index.css` ✓
- `tailwind.config.ts` ✓

---

## Files to DELETE (Not needed in Merchant App)

```
src/pages/admin/*           # All admin pages
src/pages/user/*            # All user pages
src/pages/auth/Signup.tsx   # Customer signup
src/pages/auth/AdminLogin.tsx
src/pages/auth/RoleRouter.tsx
src/components/layouts/AdminLayout.tsx
src/components/layouts/UserLayout.tsx
src/components/social/*
src/components/stories/*
src/components/media/*
src/components/gamification/*
```

---

## Route Updates for Restaurant Pages

Update all restaurant page components to remove the `/restaurant` prefix from navigation:

**Before** (in RestaurantLayout.tsx):
```tsx
{ path: '/restaurant/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
```

**After**:
```tsx
{ path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
```
