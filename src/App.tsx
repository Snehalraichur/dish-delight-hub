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

// Restaurant & Admin Pages
import RestaurantDashboard from "./pages/restaurant/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
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
            <Route path="/restaurant/*" element={<RestaurantDashboard />} />
            
            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminDashboard />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
