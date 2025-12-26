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
import DealWallet from "./pages/user/DealWallet";
import Search from "./pages/user/Search";
import Messages from "./pages/user/Messages";
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
            <Route path="/search" element={<Search />} />
            <Route path="/wallet" element={<DealWallet />} />
            <Route path="/notifications" element={<HomeFeed />} />
            <Route path="/profile" element={<HomeFeed />} />
            <Route path="/messages" element={<Messages />} />
            
            {/* Restaurant Routes */}
            <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
            <Route path="/restaurant/*" element={<RestaurantDashboard />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
