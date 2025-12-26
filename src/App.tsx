import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import RestaurantSignup from "./pages/auth/RestaurantSignup";
import HomeFeed from "./pages/user/HomeFeed";
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
            
            {/* User Routes */}
            <Route path="/feed" element={<HomeFeed />} />
            <Route path="/search" element={<HomeFeed />} />
            <Route path="/wallet" element={<HomeFeed />} />
            <Route path="/notifications" element={<HomeFeed />} />
            <Route path="/profile" element={<HomeFeed />} />
            
            {/* Restaurant Routes */}
            <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
            <Route path="/restaurant/deals" element={<RestaurantDashboard />} />
            <Route path="/restaurant/content" element={<RestaurantDashboard />} />
            <Route path="/restaurant/analytics" element={<RestaurantDashboard />} />
            <Route path="/restaurant/messages" element={<RestaurantDashboard />} />
            <Route path="/restaurant/reviews" element={<RestaurantDashboard />} />
            <Route path="/restaurant/menu" element={<RestaurantDashboard />} />
            <Route path="/restaurant/staff" element={<RestaurantDashboard />} />
            <Route path="/restaurant/settings" element={<RestaurantDashboard />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminDashboard />} />
            <Route path="/admin/restaurants" element={<AdminDashboard />} />
            <Route path="/admin/content" element={<AdminDashboard />} />
            <Route path="/admin/fraud" element={<AdminDashboard />} />
            <Route path="/admin/campaigns" element={<AdminDashboard />} />
            <Route path="/admin/subscriptions" element={<AdminDashboard />} />
            <Route path="/admin/events" element={<AdminDashboard />} />
            <Route path="/admin/notifications" element={<AdminDashboard />} />
            <Route path="/admin/settings" element={<AdminDashboard />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
