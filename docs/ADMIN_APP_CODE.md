# Admin App - Complete Setup Guide

This document contains all the code needed to set up the Admin App in a new Lovable project.

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
│   │   └── AdminLayout.tsx
│   ├── ui/ (copy all from main project)
├── pages/
│   ├── Landing.tsx
│   ├── NotFound.tsx
│   ├── RoleNotSupported.tsx
│   ├── auth/
│   │   └── Login.tsx
│   └── admin/
│       ├── Dashboard.tsx
│       ├── UserManagement.tsx
│       ├── ... (all admin pages)
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

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
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
            {/* System Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/role-not-supported" element={<RoleNotSupported />} />
            
            {/* Admin Routes (no /admin prefix) */}
            <Route path="/dashboard" element={<Dashboard />} />
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

### src/pages/RoleNotSupported.tsx

```tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

export default function RoleNotSupported() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8 text-destructive" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Access Denied
          </h1>
          
          <p className="text-muted-foreground mb-6">
            This portal is for platform administrators only. Your account does not have admin privileges.
          </p>
          
          <div className="space-y-3">
            <Button onClick={handleLogout} variant="outline" className="w-full">
              Logout
            </Button>
            <Link to="/login">
              <Button variant="default" className="w-full">
                Try Different Account
                <ArrowRight className="w-4 h-4 ml-2" />
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
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const EXPECTED_ROLE = 'admin';

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
      
      // Validate role - ADMIN ONLY
      if (userRole !== EXPECTED_ROLE) {
        toast.error('Access denied. Admin privileges required.');
        navigate('/role-not-supported');
        return;
      }
      
      toast.success('Welcome, Admin!');
      navigate('/dashboard');
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
          <h1 className="text-3xl font-bold text-primary-foreground">SnapDish</h1>
          <p className="text-primary-foreground/60 mt-1">Admin Portal</p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Admin Login</h2>
            <p className="text-muted-foreground mt-2">Secure access to platform controls</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
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

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : 'Access Dashboard'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Authorized personnel only. All access is logged.
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
import { supabase } from '@/integrations/supabase/client';
import { AuthUser, AuthState, UserRole } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<UserRole>;
  logout: () => void;
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

  const logout = async () => {
    await supabase.auth.signOut();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
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

### src/components/layouts/AdminLayout.tsx

```tsx
import { ReactNode, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Store, Shield, AlertTriangle,
  Megaphone, CreditCard, Calendar, Bell, Settings,
  Menu, X, ChevronDown, LogOut, Gift, TrendingUp,
  Handshake, HeadphonesIcon, UserPlus, FileText, MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: ReactNode;
}

const navGroups = [
  {
    title: 'Overview',
    items: [
      { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ]
  },
  {
    title: 'Management',
    items: [
      { path: '/users', icon: Users, label: 'Users' },
      { path: '/restaurants', icon: Store, label: 'Restaurants' },
      { path: '/restaurants/onboarding', icon: UserPlus, label: 'Onboarding' },
      { path: '/content', icon: Shield, label: 'Moderation' },
      { path: '/fraud', icon: AlertTriangle, label: 'Fraud Detection' },
    ]
  },
  {
    title: 'Monetization',
    items: [
      { path: '/campaigns', icon: Megaphone, label: 'Campaigns' },
      { path: '/ads', icon: TrendingUp, label: 'Ads & Boost' },
      { path: '/subscriptions', icon: CreditCard, label: 'Subscriptions' },
      { path: '/incentives', icon: Gift, label: 'Incentives' },
      { path: '/partnerships', icon: Handshake, label: 'Brand Partners' },
    ]
  },
  {
    title: 'Operations',
    items: [
      { path: '/events', icon: Calendar, label: 'Events & Catering' },
      { path: '/cities', icon: MapPin, label: 'City Launch' },
      { path: '/support', icon: HeadphonesIcon, label: 'Support' },
      { path: '/audit', icon: FileText, label: 'Audit Logs' },
    ]
  },
  {
    title: 'System',
    items: [
      { path: '/notifications', icon: Bell, label: 'Notifications' },
      { path: '/features', icon: Settings, label: 'Feature Flags' },
      { path: '/settings', icon: Settings, label: 'Settings' },
    ]
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleGroup = (title: string) => {
    setCollapsedGroups(prev =>
      prev.includes(title)
        ? prev.filter(g => g !== title)
        : [...prev, title]
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out');
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
          <h1 className="text-xl font-bold">Admin Portal</h1>
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
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-foreground transition-transform duration-300",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full text-primary-foreground">
          {/* Logo */}
          <div className="p-6 border-b border-primary-foreground/10 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">SnapDish</h1>
              <p className="text-xs text-primary-foreground/60">Admin Portal</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 px-3 overflow-y-auto">
            {navGroups.map((group) => (
              <div key={group.title} className="mb-3">
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/50 hover:text-primary-foreground/70"
                >
                  {group.title}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      collapsedGroups.includes(group.title) && "rotate-180"
                    )}
                  />
                </button>
                {!collapsedGroups.includes(group.title) && (
                  <div className="mt-1 space-y-0.5">
                    {group.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                          )
                        }
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-primary-foreground/10">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pt-0 min-w-0">
        <div className="p-4 lg:p-8">
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

### 2. Admin Pages (entire folder)
Copy and update routes (remove /admin prefix):
```
src/pages/admin/*
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

## Landing Page (Admin Version - Minimal)

```tsx
// src/pages/Landing.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Admin portal redirects directly to login
    navigate('/login');
  }, [navigate]);

  return null;
}
```

---

## Important: Update Route References in Admin Pages

When copying admin pages, update internal navigation links to remove `/admin` prefix:

**Before:**
```tsx
navigate('/admin/dashboard');
<NavLink to="/admin/users">
```

**After:**
```tsx
navigate('/dashboard');
<NavLink to="/users">
```

Also update the AdminLayout navigation paths (already done in the code above).
