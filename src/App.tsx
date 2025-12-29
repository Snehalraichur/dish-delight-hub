import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// System & Auth Pages
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import RestaurantSignup from "./pages/auth/RestaurantSignup";
import OTPVerification from "./pages/auth/OTPVerification";
import EmailVerification from "./pages/auth/EmailVerification";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import RoleRouter from "./pages/auth/RoleRouter";
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

// Restaurant Pages
import RestaurantDashboard from "./pages/restaurant/Dashboard";
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
import RestaurantCatering from "./pages/restaurant/Catering";
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

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
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
            {/* ========== System & Auth Routes (13) ========== */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/restaurant" element={<RestaurantSignup />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/role-router" element={<RoleRouter />} />
            <Route path="/permissions-required" element={<PermissionsRequired />} />
            <Route path="/account-suspended" element={<AccountSuspended />} />
            <Route path="/maintenance" element={<Maintenance />} />
            
            {/* ========== User Routes (33) ========== */}
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
            
            {/* ========== Restaurant Routes (23) ========== */}
            <Route path="/restaurant/staff-login" element={<StaffLogin />} />
            <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
            <Route path="/restaurant/deals" element={<DealManagement />} />
            <Route path="/restaurant/deals/success" element={<DealCreationSuccess />} />
            <Route path="/restaurant/deals/analytics" element={<DealAnalytics />} />
            <Route path="/restaurant/deals/history" element={<RedemptionHistory />} />
            <Route path="/restaurant/content" element={<UGCManagement />} />
            <Route path="/restaurant/content/approval" element={<UGCPermissionApproval />} />
            <Route path="/restaurant/boost" element={<BoostAds />} />
            <Route path="/restaurant/boost/performance" element={<BoostPerformance />} />
            <Route path="/restaurant/subscription" element={<SubscriptionPlans />} />
            <Route path="/restaurant/billing" element={<BillingInvoices />} />
            <Route path="/restaurant/commission" element={<ContractCommission />} />
            <Route path="/restaurant/catering" element={<RestaurantCatering />} />
            <Route path="/restaurant/catering/proposal/:requestId" element={<CateringProposal />} />
            <Route path="/restaurant/events" element={<EventsParticipation />} />
            <Route path="/restaurant/payouts" element={<PayoutsEarnings />} />
            <Route path="/restaurant/menu" element={<MenuManagement />} />
            <Route path="/restaurant/profile" element={<RestaurantProfileEdit />} />
            <Route path="/restaurant/reviews" element={<ReviewsRatings />} />
            <Route path="/restaurant/messages" element={<RestaurantMessages />} />
            <Route path="/restaurant/staff" element={<StaffManagement />} />
            <Route path="/restaurant/support" element={<RestaurantSupport />} />
            
            {/* ========== Admin Routes (32) ========== */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/users/:userId" element={<UserDetailView />} />
            <Route path="/admin/restaurants" element={<RestaurantManagement />} />
            <Route path="/admin/restaurants/:restaurantId" element={<RestaurantDetailView />} />
            <Route path="/admin/restaurants/onboarding" element={<RestaurantOnboarding />} />
            <Route path="/admin/content" element={<ContentModeration />} />
            <Route path="/admin/content/ai-settings" element={<AIModerationSettings />} />
            <Route path="/admin/fraud" element={<FraudDetection />} />
            <Route path="/admin/fraud/:caseId" element={<FraudCaseDetail />} />
            <Route path="/admin/fraud/prevention" element={<FraudPrevention />} />
            <Route path="/admin/campaigns" element={<CampaignManagement />} />
            <Route path="/admin/incentives" element={<UserIncentiveEngine />} />
            <Route path="/admin/ads" element={<AdsBoostEngine />} />
            <Route path="/admin/partnerships" element={<BrandPartnerships />} />
            <Route path="/admin/commission" element={<CommissionRulesEngine />} />
            <Route path="/admin/subscriptions" element={<SubscriptionManagement />} />
            <Route path="/admin/revenue" element={<RevenueReports />} />
            <Route path="/admin/payouts" element={<ManualPayoutApproval />} />
            <Route path="/admin/refunds" element={<RefundManagement />} />
            <Route path="/admin/events" element={<EventManagement />} />
            <Route path="/admin/events/tickets" element={<TicketSalesDashboard />} />
            <Route path="/admin/events/catering" element={<EventsCatering />} />
            <Route path="/admin/catering" element={<CateringOversight />} />
            <Route path="/admin/cities" element={<CityLaunchManager />} />
            <Route path="/admin/notifications" element={<NotificationEngine />} />
            <Route path="/admin/support" element={<SupportConsole />} />
            <Route path="/admin/audit" element={<AuditLogs />} />
            <Route path="/admin/features" element={<FeatureFlags />} />
            <Route path="/admin/legal" element={<LegalCompliance />} />
            <Route path="/admin/settings" element={<PlatformSettings />} />
            
            {/* ========== Catch-all ========== */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
