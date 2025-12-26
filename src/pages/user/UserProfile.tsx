import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Grid, Bookmark, Heart, MapPin, Calendar, Award, Edit2, Share2, MoreHorizontal, Flame, Crown, Trophy, Zap } from 'lucide-react';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { StreakTracker, PointsBadgeCard, TierProgressBar } from '@/components/gamification';

const userProfile = {
  name: 'John Doe',
  username: '@johndoe',
  avatar: 'JD',
  bio: 'Food enthusiast 🍕 | Always hunting for the best deals | NYC based',
  posts: 47,
  followers: 1234,
  following: 567,
  streak: 12,
  points: 2450,
  tier: 'Silver',
  joinedDate: 'January 2024',
};

const userPosts = [
  { id: '1', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop', likes: 234 },
  { id: '2', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=400&fit=crop', likes: 156 },
  { id: '3', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=400&fit=crop', likes: 89 },
  { id: '4', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop', likes: 312 },
  { id: '5', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=400&fit=crop', likes: 198 },
  { id: '6', image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=400&h=400&fit=crop', likes: 267 },
];

const savedPosts = userPosts.slice(0, 4);

// User gamification data
const userGamification = {
  streak: {
    currentStreak: 12,
    longestStreak: 18,
    streakPoints: 240,
    lastPostDate: new Date().toISOString(),
    isAtRisk: false,
  },
  pointsBadge: {
    totalPoints: 2450,
    tier: 'silver' as const,
    pointsToNextTier: 2550,
    nextTierRequirement: 5000,
    badges: [
      { id: 'first_post', name: 'First Post', icon: '🎉', earned: true, description: 'Posted your first food photo' },
      { id: 'streak_master', name: 'Streak Master', icon: '🔥', earned: true, description: 'Maintained a 7-day streak' },
      { id: 'deal_hunter', name: 'Deal Hunter', icon: '💰', earned: true, description: 'Redeemed 10 deals' },
      { id: 'social_butterfly', name: 'Social Butterfly', icon: '🦋', earned: true, description: 'Made 50 comments' },
      { id: 'influencer', name: 'Influencer', icon: '⭐', earned: true, description: 'Reached 1000 followers' },
      { id: 'explorer', name: 'Explorer', icon: '🗺️', earned: false, description: 'Visit 20 different restaurants' },
      { id: 'food_critic', name: 'Food Critic', icon: '📝', earned: false, description: 'Write 50 reviews' },
    ],
    recentActivity: [
      { action: 'Posted at The Golden Fork', points: 50, timestamp: '2024-12-24' },
      { action: 'Your post was liked', points: 5, timestamp: '2024-12-24' },
      { action: 'Redeemed 25% off deal', points: 100, timestamp: '2024-12-23' },
    ],
  },
  tierProgress: {
    currentTier: 'silver' as const,
    currentPoints: 2450,
    visits: 28,
    redemptions: 15,
    perks: [
      { name: '10% off all orders', unlocked: true },
      { name: 'Priority support', unlocked: true },
      { name: 'Early access to deals', unlocked: true },
      { name: 'Free delivery (Gold tier)', unlocked: false },
    ],
  },
};

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('posts');
  const [showGamificationDetails, setShowGamificationDetails] = useState(false);

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {userProfile.avatar}
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-foreground">{userProfile.name}</h1>
              <p className="text-muted-foreground">{userProfile.username}</p>
              {/* Tier Badge */}
              <div className="flex items-center gap-1 mt-1">
                <span className="text-lg">🥈</span>
                <span className="text-sm font-medium text-secondary">{userProfile.tier} Member</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-xl">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-xl">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-foreground mb-4"
        >
          {userProfile.bio}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-6 mb-6"
        >
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{userProfile.posts}</p>
            <p className="text-sm text-muted-foreground">Posts</p>
          </div>
          <div className="text-center cursor-pointer hover:opacity-80">
            <p className="text-xl font-bold text-foreground">{userProfile.followers.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          <div className="text-center cursor-pointer hover:opacity-80">
            <p className="text-xl font-bold text-foreground">{userProfile.following}</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
        </motion.div>

        {/* Edit Profile Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Button variant="outline" className="w-full rounded-xl">
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </motion.div>

        {/* Streak Tracker - Collapsible on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-6"
        >
          <StreakTracker
            currentStreak={userGamification.streak.currentStreak}
            longestStreak={userGamification.streak.longestStreak}
            streakPoints={userGamification.streak.streakPoints}
            lastPostDate={userGamification.streak.lastPostDate}
            isAtRisk={userGamification.streak.isAtRisk}
          />
        </motion.div>

        {/* Tier Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <TierProgressBar
            currentTier={userGamification.tierProgress.currentTier}
            currentPoints={userGamification.tierProgress.currentPoints}
            visits={userGamification.tierProgress.visits}
            redemptions={userGamification.tierProgress.redemptions}
            perks={userGamification.tierProgress.perks}
            compact
          />
        </motion.div>

        {/* Points & Badges Card - Collapsible Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-6"
        >
          <PointsBadgeCard
            totalPoints={userGamification.pointsBadge.totalPoints}
            tier={userGamification.pointsBadge.tier}
            pointsToNextTier={userGamification.pointsBadge.pointsToNextTier}
            nextTierRequirement={userGamification.pointsBadge.nextTierRequirement}
            badges={userGamification.pointsBadge.badges}
            recentActivity={userGamification.pointsBadge.recentActivity}
            compact={!showGamificationDetails}
            onClick={() => setShowGamificationDetails(!showGamificationDetails)}
          />
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full h-12 bg-muted rounded-2xl p-1 mb-4">
            <TabsTrigger value="posts" className="flex-1 h-10 rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Grid className="w-4 h-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex-1 h-10 rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Bookmark className="w-4 h-4 mr-2" />
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <div className="grid grid-cols-3 gap-1">
              {userPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg"
                >
                  <img src={post.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex items-center gap-1 text-primary-foreground">
                      <Heart className="w-5 h-5 fill-current" />
                      <span className="font-semibold">{post.likes}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <div className="grid grid-cols-3 gap-1">
              {savedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg"
                >
                  <img src={post.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Bookmark className="w-6 h-6 text-primary-foreground fill-current" />
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Member Since */}
        <div className="mt-6 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4" />
          Member since {userProfile.joinedDate}
        </div>
      </div>
    </UserLayout>
  );
}
