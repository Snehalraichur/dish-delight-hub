# Customer App - Complete Setup Guide

This document contains all the code needed to set up the Customer App in a new Lovable project.

## Environment Setup

After creating a new Lovable project, add these environment variables in the project settings:

```
VITE_SUPABASE_URL=https://hmedlhhcpoltalyxhaqr.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtZWRsaGhjcG9sdGFseXhoYXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MzczNDUsImV4cCI6MjA4MjMxMzM0NX0.avUfGCtrs9EdBrrBvfbh64O3UhKNhbMB8QvOOypaBio
```

## File Structure

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── App.css
├── lib/
│   └── utils.ts
├── types/
│   └── auth.ts
├── contexts/
│   └── AuthContext.tsx
├── integrations/
│   └── supabase/
│       ├── client.ts
│       └── types.ts (copy from main project)
├── components/
│   ├── layouts/
│   │   └── UserLayout.tsx
│   ├── ui/ (copy all from main project)
│   └── ... (customer-specific components)
├── pages/
│   ├── Landing.tsx
│   ├── NotFound.tsx
│   ├── RoleNotSupported.tsx
│   └── auth/
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── ResetPassword.tsx
│   │   └── EmailVerification.tsx
│   └── user/
│       ├── HomeFeed.tsx
│       ├── Search.tsx
│       ├── DealWallet.tsx
│       ├── ... (all user pages)
```

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

// System & Auth Pages
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import RoleNotSupported from "./pages/RoleNotSupported";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import EmailVerification from "./pages/auth/EmailVerification";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

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
            {/* System Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/role-not-supported" element={<RoleNotSupported />} />
            
            {/* User Routes */}
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

### src/pages/RoleNotSupported.tsx

```tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

export default function RoleNotSupported() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
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
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Role Not Supported
          </h1>
          
          <p className="text-muted-foreground mb-6">
            This app is for customers only. Your account has a different role.
            Please use the appropriate app for your account type.
          </p>
          
          <div className="space-y-3">
            <Button onClick={handleLogout} variant="outline" className="w-full">
              Logout
            </Button>
            <Link to="/login">
              <Button variant="hero" className="w-full">
                Try Different Account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
```

### src/pages/auth/Login.tsx

```tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const EXPECTED_ROLE = 'user';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const userRole = await login(email, password);
      
      // Validate role
      if (userRole !== EXPECTED_ROLE) {
        toast.error('This app is for customers only');
        navigate('/role-not-supported');
        return;
      }
      
      toast.success('Welcome back!');
      navigate('/feed');
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
        </Link>

        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">Sign in to continue</p>
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

### src/contexts/AuthContext.tsx

```tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser, AuthState, UserRole } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<UserRole>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

      const role = (roleData?.role as UserRole) || 'user';

      const authUser: AuthUser = {
        id: userId,
        email: profile?.email || '',
        name: profile?.name || '',
        role,
        avatar: profile?.profile_image_url || undefined,
      };

      setAuthState({
        user: authUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const login = async (email: string, password: string): Promise<UserRole> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }

    // Fetch role to return for validation
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', data.user.id)
      .maybeSingle();

    return (roleData?.role as UserRole) || 'user';
  };

  const signup = async (email: string, password: string, name: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { name },
      },
    });
    
    if (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

---

## Files to Copy from Main Project

Copy these files/folders directly from the main project:

### 1. UI Components (entire folder)
```
src/components/ui/*
```

### 2. User Layout
```
src/components/layouts/UserLayout.tsx
```

### 3. User Pages (entire folder)
```
src/pages/user/*
```

### 4. Social Components
```
src/components/social/*
```

### 5. Gamification Components
```
src/components/gamification/*
```

### 6. Media Components
```
src/components/media/*
```

### 7. Stories Components
```
src/components/stories/*
```

### 8. Shared Auth Pages
```
src/pages/auth/Signup.tsx
src/pages/auth/ForgotPassword.tsx
src/pages/auth/ResetPassword.tsx
src/pages/auth/EmailVerification.tsx
```

### 9. Config Files
```
tailwind.config.ts
src/index.css
src/lib/utils.ts
src/hooks/use-mobile.tsx
src/hooks/use-toast.ts
```

### 10. Types
```
src/integrations/supabase/types.ts (entire file)
src/types/stories.ts
src/types/auth.ts
```

---

## Landing Page (Customer Version)

```tsx
// src/pages/Landing.tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, Tag, Trophy, ArrowRight, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Utensils,
    title: 'Discover Dishes',
    description: 'Find amazing food from local restaurants near you',
  },
  {
    icon: Tag,
    title: 'Exclusive Deals',
    description: 'Save with special offers and limited-time promotions',
  },
  {
    icon: Trophy,
    title: 'Earn Rewards',
    description: 'Collect points and unlock exclusive perks',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen gradient-warm">
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gradient">SnapDish</h1>
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

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>The #1 Food Discovery Platform</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6"
          >
            Discover. Share.
            <br />
            <span className="text-gradient">Save on Food.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Join millions of food lovers discovering the best dishes, exclusive deals, and earning rewards.
          </motion.p>
          
          <Link to="/signup">
            <Button variant="hero" size="xl">
              Start Exploring
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-md border border-border"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## Installation Commands

Run these in your new Lovable project terminal or let Lovable install them:

```bash
# These should auto-install, but if not:
npm install @supabase/supabase-js framer-motion react-router-dom sonner
```
