# Merchant App - Complete Setup Guide

This document contains all the code needed to set up the Merchant App in a new Lovable project.

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
│   │   └── RestaurantLayout.tsx
│   ├── ui/ (copy all from main project)
├── pages/
│   ├── Landing.tsx
│   ├── NotFound.tsx
│   ├── RoleNotSupported.tsx
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── ForgotPassword.tsx
│   │   └── ResetPassword.tsx
│   └── restaurant/
│       ├── Dashboard.tsx
│       ├── DealManagement.tsx
│       ├── ... (all restaurant pages)
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
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

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
            {/* System Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/role-not-supported" element={<RoleNotSupported />} />
            
            {/* Restaurant Routes (no /restaurant prefix) */}
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
            This app is for restaurant merchants only. Your account has a different role.
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
import { Eye, EyeOff, Mail, Lock, ArrowRight, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const EXPECTED_ROLE = 'restaurant';

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
        toast.error('This app is for restaurant merchants only');
        navigate('/role-not-supported');
        return;
      }
      
      toast.success('Welcome back!');
      navigate('/dashboard');
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
          <h1 className="text-3xl font-bold text-gradient">SnapDish Business</h1>
        </Link>

        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Merchant Login</h2>
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
              Want to list your restaurant?{' '}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Apply here
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

### src/components/layouts/RestaurantLayout.tsx

```tsx
import { ReactNode, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Tag, 
  Image, 
  BarChart3, 
  MessageSquare,
  Star,
  UtensilsCrossed,
  Users,
  Settings,
  Menu,
  X,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RestaurantLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/deals', icon: Tag, label: 'Deals' },
  { path: '/content', icon: Image, label: 'UGC' },
  { path: '/boost', icon: BarChart3, label: 'Boost & Ads' },
  { path: '/messages', icon: MessageSquare, label: 'Messages' },
  { path: '/reviews', icon: Star, label: 'Reviews' },
  { path: '/menu', icon: UtensilsCrossed, label: 'Menu' },
  { path: '/staff', icon: Users, label: 'Staff' },
  { path: '/profile', icon: Settings, label: 'Settings' },
];

export function RestaurantLayout({ children }: RestaurantLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-gradient">SnapDish Business</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-foreground/50 z-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border transition-transform duration-300",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h1 className="text-xl font-bold text-gradient">SnapDish</h1>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <nav className="flex-1 py-6 px-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t border-border space-y-3">
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm font-medium">Need help?</p>
              <p className="text-xs text-muted-foreground mt-1">Contact our support team</p>
              <NavLink to="/support">
                <Button variant="default" size="sm" className="w-full mt-3">
                  Get Support
                </Button>
              </NavLink>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
```

---

## Files to Copy from Main Project

### 1. UI Components (entire folder)
```
src/components/ui/*
```

### 2. Restaurant Pages (entire folder)
Copy and update routes (remove /restaurant prefix):
```
src/pages/restaurant/*
```

### 3. Config Files
```
tailwind.config.ts
src/index.css
src/lib/utils.ts
src/hooks/use-mobile.tsx
src/hooks/use-toast.ts
src/types/auth.ts
```

### 4. Types
```
src/integrations/supabase/types.ts (entire file)
```

---

## Landing Page (Merchant Version)

```tsx
// src/pages/Landing.tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Store, TrendingUp, Users, Tag, ArrowRight, ChartBar, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: TrendingUp,
    title: 'Boost Sales',
    description: 'Increase revenue with targeted promotions and deals',
  },
  {
    icon: Users,
    title: 'Reach Customers',
    description: 'Connect with millions of food lovers in your area',
  },
  {
    icon: Tag,
    title: 'Easy Deals',
    description: 'Create and manage deals in minutes',
  },
  {
    icon: ChartBar,
    title: 'Analytics',
    description: 'Track performance with detailed insights',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen gradient-warm">
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gradient">SnapDish</h1>
              <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">Business</span>
            </div>
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
            <Store className="w-4 h-4" />
            <span>For Restaurant Partners</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6"
          >
            Grow Your Restaurant
            <br />
            <span className="text-gradient">With SnapDish</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Join thousands of restaurants using SnapDish to attract new customers, increase sales, and build loyalty.
          </motion.p>
          
          <Link to="/signup">
            <Button variant="hero" size="xl">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

## Important: Update Route References in Restaurant Pages

When copying restaurant pages, update internal navigation links to remove `/restaurant` prefix:

**Before:**
```tsx
navigate('/restaurant/dashboard');
<NavLink to="/restaurant/deals">
```

**After:**
```tsx
navigate('/dashboard');
<NavLink to="/deals">
```
