import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Grid, Bookmark, Heart, MapPin, Calendar, Award, Edit2, Share2, MoreHorizontal, Flame } from 'lucide-react';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

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

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('posts');

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

        {/* Gamification Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <div className="bg-card rounded-2xl p-4 border border-border text-center">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Flame className="w-5 h-5 text-primary" />
            </div>
            <p className="text-lg font-bold text-foreground">{userProfile.streak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border text-center">
            <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-lg font-bold text-foreground">{userProfile.points}</p>
            <p className="text-xs text-muted-foreground">Points</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border text-center">
            <div className="w-10 h-10 bg-accent/30 rounded-xl flex items-center justify-center mx-auto mb-2">
              <span className="text-lg">🥈</span>
            </div>
            <p className="text-lg font-bold text-foreground">{userProfile.tier}</p>
            <p className="text-xs text-muted-foreground">Tier</p>
          </div>
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
