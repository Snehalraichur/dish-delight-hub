# Customer App - Complete Code

## Setup Instructions

1. Create a new Lovable project named "SnapDish Customer"
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
import Signup from "./pages/auth/Signup";
import OTPVerification from "./pages/auth/OTPVerification";
import EmailVerification from "./pages/auth/EmailVerification";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import PermissionsRequired from "./pages/auth/PermissionsRequired";
import AccountSuspended from "./pages/auth/AccountSuspended";
import Maintenance from "./pages/auth/Maintenance";

// User Pages
import HomeFeed from "./pages/user/HomeFeed";
import Search from "./pages/user/Search";
import DealWallet from "./pages/user/DealWallet";
import Notifications from "./pages/user/Notifications";
import UserProfile from "./pages/user/UserProfile";
import Messages from "./pages/user/Messages";
import ChatThread from "./pages/user/ChatThread";
import StoriesViewer from "./pages/user/StoriesViewer";
import CreatePost from "./pages/user/CreatePost";
import CreateStory from "./pages/user/CreateStory";
import PostDetail from "./pages/user/PostDetail";
import CommentsFullView from "./pages/user/CommentsFullView";
import RestaurantProfile from "./pages/user/RestaurantProfile";
import SavedRestaurants from "./pages/user/SavedRestaurants";
import SavedPosts from "./pages/user/SavedPosts";
import DealRedemption from "./pages/user/DealRedemption";
import RedemptionSuccess from "./pages/user/RedemptionSuccess";
import RedemptionFailed from "./pages/user/RedemptionFailed";
import ShareDeal from "./pages/user/ShareDeal";
import Events from "./pages/user/Events";
import EventDetail from "./pages/user/EventDetail";
import BuyEventTicket from "./pages/user/BuyEventTicket";
import MyTickets from "./pages/user/MyTickets";
import CateringDiscovery from "./pages/user/CateringDiscovery";
import CateringRequest from "./pages/user/CateringRequest";
import CateringRequestStatus from "./pages/user/CateringRequestStatus";
import Followers from "./pages/user/Followers";
import InviteFriends from "./pages/user/InviteFriends";
import StreaksGamification from "./pages/user/StreaksGamification";
import RewardsPoints from "./pages/user/RewardsPoints";
import LoyaltyTierDetails from "./pages/user/LoyaltyTierDetails";
import Onboarding from "./pages/user/Onboarding";
import UserSettings from "./pages/user/UserSettings";
import UserSupport from "./pages/user/UserSupport";

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
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/permissions-required" element={<PermissionsRequired />} />
            <Route path="/account-suspended" element={<AccountSuspended />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/role-not-supported" element={<RoleNotSupported expectedRole="user" />} />
            
            {/* Customer Routes */}
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/feed" element={<HomeFeed />} />
            <Route path="/search" element={<Search />} />
            <Route path="/wallet" element={<DealWallet />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/followers/:userId" element={<Followers />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:threadId" element={<ChatThread />} />
            <Route path="/stories/:userId" element={<StoriesViewer />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/create-story" element={<CreateStory />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/post/:postId/comments" element={<CommentsFullView />} />
            <Route path="/restaurant/:restaurantId" element={<RestaurantProfile />} />
            <Route path="/saved/restaurants" element={<SavedRestaurants />} />
            <Route path="/saved/posts" element={<SavedPosts />} />
            <Route path="/deal/:dealId/redeem" element={<DealRedemption />} />
            <Route path="/redemption/success" element={<RedemptionSuccess />} />
            <Route path="/redemption/failed" element={<RedemptionFailed />} />
            <Route path="/deal/:dealId/share" element={<ShareDeal />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/events/:eventId/buy" element={<BuyEventTicket />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/catering" element={<CateringDiscovery />} />
            <Route path="/catering/request" element={<CateringRequest />} />
            <Route path="/catering/status/:requestId" element={<CateringRequestStatus />} />
            <Route path="/invite" element={<InviteFriends />} />
            <Route path="/streaks" element={<StreaksGamification />} />
            <Route path="/rewards" element={<RewardsPoints />} />
            <Route path="/loyalty-tier" element={<LoyaltyTierDetails />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/support" element={<UserSupport />} />
            
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

### src/pages/auth/Login.tsx (Customer Version - No Role Selector)

```tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
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

        if (roleData?.role !== 'user') {
          navigate('/role-not-supported');
        } else {
          navigate('/feed');
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
          <h1 className="text-3xl font-bold text-gradient">SnapDish</h1>
          <p className="text-sm text-muted-foreground mt-1">Customer App</p>
        </Link>

        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">Sign in to discover deals</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
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
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
```

---

## Files to Copy Directly

Copy these files **exactly as-is** from the original project:

### From src/components/
- `layouts/UserLayout.tsx` ✓
- All files in `ui/` ✓
- All files in `social/` ✓
- All files in `stories/` ✓
- All files in `media/` ✓
- All files in `gamification/` ✓

### From src/pages/user/
- ALL 33 user page files ✓

### From src/pages/auth/
- `Signup.tsx` (remove restaurant signup link)
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
- `src/types/stories.ts` ✓
- `src/lib/utils.ts` ✓
- `src/hooks/use-mobile.tsx` ✓
- `src/hooks/use-toast.ts` ✓
- `src/hooks/useStories.ts` ✓
- `src/index.css` ✓
- `tailwind.config.ts` ✓

---

## Files to DELETE (Not needed in Customer App)

```
src/pages/admin/*           # All admin pages
src/pages/restaurant/*      # All restaurant pages
src/pages/auth/RestaurantSignup.tsx
src/pages/auth/AdminLogin.tsx
src/pages/auth/RoleRouter.tsx
src/components/layouts/AdminLayout.tsx
src/components/layouts/RestaurantLayout.tsx
```
