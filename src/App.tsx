import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Auth Pages
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import RestaurantSignup from "./pages/auth/RestaurantSignup";
import OTPVerification from "./pages/auth/OTPVerification";
import EmailVerification from "./pages/auth/EmailVerification";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// User Pages
import HomeFeed from "./pages/user/HomeFeed";
import DealWallet from "./pages/user/DealWallet";
import Search from "./pages/user/Search";
import Messages from "./pages/user/Messages";
import PostDetail from "./pages/user/PostDetail";
import UserProfile from "./pages/user/UserProfile";
import Notifications from "./pages/user/Notifications";
import Events from "./pages/user/Events";

// Restaurant Pages
import RestaurantDashboard from "./pages/restaurant/Dashboard";
import DealManagement from "./pages/restaurant/DealManagement";
import UGCManagement from "./pages/restaurant/UGCManagement";
import SubscriptionPlans from "./pages/restaurant/SubscriptionPlans";
import RestaurantCatering from "./pages/restaurant/Catering";
import BoostAds from "./pages/restaurant/BoostAds";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import RestaurantManagement from "./pages/admin/RestaurantManagement";
import ContentModeration from "./pages/admin/ContentModeration";
import CampaignManagement from "./pages/admin/CampaignManagement";
import AdsBoostEngine from "./pages/admin/AdsBoostEngine";
import EventsCatering from "./pages/admin/EventsCatering";
import FraudPrevention from "./pages/admin/FraudPrevention";
import RestaurantOnboarding from "./pages/admin/RestaurantOnboarding";
import UserIncentiveEngine from "./pages/admin/UserIncentiveEngine";
import BrandPartnerships from "./pages/admin/BrandPartnerships";
import SupportConsole from "./pages/admin/SupportConsole";

import NotFound from "./pages/NotFound";

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
            <Route path="/signup/restaurant" element={<RestaurantSignup />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* User Routes */}
            <Route path="/feed" element={<HomeFeed />} />
            <Route path="/search" element={<Search />} />
            <Route path="/wallet" element={<DealWallet />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/events" element={<Events />} />
            
            {/* Restaurant Routes */}
            <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
            <Route path="/restaurant/deals" element={<DealManagement />} />
            <Route path="/restaurant/content" element={<UGCManagement />} />
            <Route path="/restaurant/subscription" element={<SubscriptionPlans />} />
            <Route path="/restaurant/catering" element={<RestaurantCatering />} />
            <Route path="/restaurant/boost" element={<BoostAds />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/restaurants" element={<RestaurantManagement />} />
            <Route path="/admin/content" element={<ContentModeration />} />
            <Route path="/admin/campaigns" element={<CampaignManagement />} />
            <Route path="/admin/ads" element={<AdsBoostEngine />} />
            <Route path="/admin/events" element={<EventsCatering />} />
            <Route path="/admin/fraud" element={<FraudPrevention />} />
            <Route path="/admin/onboarding" element={<RestaurantOnboarding />} />
            <Route path="/admin/incentives" element={<UserIncentiveEngine />} />
            <Route path="/admin/partnerships" element={<BrandPartnerships />} />
            <Route path="/admin/support" element={<SupportConsole />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
