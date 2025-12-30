import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, Bookmark, Plus, MapPin, Star, Clock, Tag, Users } from 'lucide-react';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AutoDealTag, DealCounter } from '@/components/gamification';
import { LikesListModal, SharePostModal, FriendsClaimedModal } from '@/components/social';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Mock data for stories
const mockStories = [
  { id: 'bella-italia', name: 'Bella Italia', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop' },
  { id: 'taco-fiesta', name: 'Taco Fiesta', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&fit=crop' },
  { id: 'sarah-chen', name: 'Sarah Chen', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100&h=100&fit=crop' },
];

const posts = [
  {
    id: '1',
    user: { id: 'user1', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    restaurant: 'The Golden Fork',
    location: 'Downtown, NYC',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop',
    dish: 'Truffle Risotto',
    rating: 4.8,
    likes: 1234,
    comments: 89,
    deal: { id: 'deal1', discount: '25% OFF', expires: '2h left', expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), claimCount: 45, title: '25% Off Dinner' },
    isLiked: false,
    isSaved: false,
    friendsClaimed: [
      { id: '1', name: 'Sarah', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
      { id: '2', name: 'John', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    ],
    likedBy: [
      { id: 'u1', name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', username: '@sarahchen' },
      { id: 'u2', name: 'Mike Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', username: '@mikej' },
      { id: 'u3', name: 'Emily Rose', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', username: '@emilyrose' },
    ],
  },
  {
    id: '2',
    user: { id: 'user2', name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    restaurant: 'Sakura Sushi',
    location: 'Midtown, NYC',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=600&fit=crop',
    dish: 'Chef\'s Special Omakase',
    rating: 4.9,
    likes: 2456,
    comments: 156,
    deal: { id: 'deal2', discount: '15% OFF', expires: '5h left', expiresAt: new Date(Date.now() + 5 * 60 * 60 * 1000), claimCount: 89, title: '15% Off Any Order' },
    isLiked: true,
    isSaved: true,
    friendsClaimed: [
      { id: '3', name: 'Emily', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
      { id: '4', name: 'Mike', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
      { id: '5', name: 'Lisa', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa' },
      { id: '6', name: 'Tom', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom' },
    ],
    likedBy: [
      { id: 'u4', name: 'Tom Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom', username: '@tomw' },
      { id: 'u5', name: 'Lisa Park', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa', username: '@lisap' },
    ],
  },
  {
    id: '3',
    user: { id: 'user3', name: 'Mike Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
    restaurant: 'Bella Italia',
    location: 'Little Italy, NYC',
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=600&h=600&fit=crop',
    dish: 'Margherita Pizza',
    rating: 4.7,
    likes: 987,
    comments: 45,
    deal: null,
    isLiked: false,
    isSaved: false,
    friendsClaimed: [],
    likedBy: [],
  },
];

// Mock friends list for sharing
const mockFriends = [
  { id: 'f1', name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', username: '@sarahchen' },
  { id: 'f2', name: 'Mike Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', username: '@mikej' },
  { id: 'f3', name: 'Emily Rose', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', username: '@emilyrose' },
  { id: 'f4', name: 'Tom Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom', username: '@tomw' },
  { id: 'f5', name: 'Lisa Park', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa', username: '@lisap' },
];

export default function HomeFeed() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [feedPosts, setFeedPosts] = useState(posts);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFriendsClaimedModal, setShowFriendsClaimedModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);

  // Fetch stories with profile info
  const { data: dbStories = [] } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select(`
          *,
          profiles:user_id (
            id,
            name,
            profile_image_url
          )
        `)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Real-time subscription for new stories
  useEffect(() => {
    const channel = supabase
      .channel('home-stories-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'stories'
        },
        (payload) => {
          console.log('Story change in feed:', payload);
          queryClient.invalidateQueries({ queryKey: ['stories'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  // Transform database stories to display format and combine with mock data
  const stories = [
    { id: 'add', name: 'Your Story', image: null, isAdd: true },
    // Database stories with profile pictures
    ...dbStories.reduce((acc: any[], s: any) => {
      // Check if user already exists in the list
      const existingUser = acc.find(story => story.id === s.user_id);
      if (!existingUser) {
        acc.push({
          id: s.user_id,
          name: s.profiles?.name || 'User',
          image: s.profiles?.profile_image_url || '/placeholder.svg',
          isAdd: false
        });
      }
      return acc;
    }, []),
    // Add mock stories if no database stories
    ...(dbStories.length === 0 ? mockStories : [])
  ];

  const handleStoryClick = (story: typeof stories[0]) => {
    if (story.isAdd) {
      navigate('/create-story');
    } else {
      navigate(`/stories/${story.id}`);
    }
  };

  const toggleLike = (postId: string) => {
    setFeedPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const toggleSave = (postId: string) => {
    const post = feedPosts.find(p => p.id === postId);
    setFeedPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, isSaved: !p.isSaved }
          : p
      )
    );
    if (post && !post.isSaved) {
      toast.success('Post saved to your collection');
    } else {
      toast.info('Post removed from saved');
    }
  };

  const handleGrabDeal = (deal: typeof posts[0]['deal'], restaurant: string) => {
    if (!deal) return;
    toast.success('Deal added to your wallet!', {
      description: `${deal.discount} at ${restaurant}`,
      action: {
        label: 'View Wallet',
        onClick: () => navigate('/wallet'),
      },
    });
  };

  const handleLikesClick = (post: typeof posts[0]) => {
    setSelectedPost(post);
    setShowLikesModal(true);
  };

  const handleShareClick = (post: typeof posts[0]) => {
    setSelectedPost(post);
    setShowShareModal(true);
  };

  const handleFriendsClaimedClick = (post: typeof posts[0]) => {
    setSelectedPost(post);
    setShowFriendsClaimedModal(true);
  };

  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto">
        {/* Stories */}
        <div className="px-4 py-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4">
            {stories.map((story, index) => (
              <motion.button
                key={story.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center gap-2 flex-shrink-0"
                onClick={() => handleStoryClick(story)}
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center",
                    story.isAdd
                      ? "border-2 border-dashed border-muted-foreground"
                      : "p-[2px] gradient-primary"
                  )}
                >
                  {story.isAdd ? (
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  ) : (
                    <img
                      src={story.image!}
                      alt={story.name}
                      className="w-full h-full rounded-full object-cover border-2 border-background"
                    />
                  )}
                </div>
                <span className="text-xs font-medium text-muted-foreground truncate w-16 text-center">
                  {story.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6 pb-6">
          {feedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-md"
            >
              {/* Header */}
              <div className="px-4 py-3 flex items-center justify-between">
                <button 
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  onClick={() => handleUserClick(post.user.id)}
                >
                  <img 
                    src={post.user.avatar} 
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">{post.user.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {post.restaurant} · {post.location}
                    </p>
                  </div>
                </button>
                <div className="flex items-center gap-1 text-amber">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{post.rating}</span>
                </div>
              </div>

              {/* Image with Auto Deal Tag */}
              <div 
                className="relative aspect-square cursor-pointer"
                onClick={() => handlePostClick(post.id)}
              >
                <img
                  src={post.image}
                  alt={post.dish}
                  className="w-full h-full object-cover"
                />
                {post.deal && (
                  <AutoDealTag
                    dealId={post.deal.id}
                    discount={post.deal.discount}
                    restaurantName={post.restaurant}
                    claimCount={post.deal.claimCount}
                    onClick={() => handleGrabDeal(post.deal, post.restaurant)}
                  />
                )}
              </div>

              {/* Actions */}
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-1 transition-transform active:scale-90"
                    >
                      <Heart
                        className={cn(
                          "w-6 h-6 transition-colors",
                          post.isLiked ? "fill-coral text-coral" : "text-foreground"
                        )}
                      />
                    </button>
                    <button 
                      className="flex items-center gap-1"
                      onClick={() => navigate(`/post/${post.id}/comments`)}
                    >
                      <MessageCircle className="w-6 h-6 text-foreground" />
                    </button>
                    <button 
                      className="flex items-center gap-1"
                      onClick={() => handleShareClick(post)}
                    >
                      <Send className="w-6 h-6 text-foreground" />
                    </button>
                  </div>
                  <button
                    onClick={() => toggleSave(post.id)}
                    className="transition-transform active:scale-90"
                  >
                    <Bookmark
                      className={cn(
                        "w-6 h-6 transition-colors",
                        post.isSaved ? "fill-amber text-amber" : "text-foreground"
                      )}
                    />
                  </button>
                </div>

                <button 
                  className="text-sm font-semibold text-foreground mb-1 hover:underline"
                  onClick={() => handleLikesClick(post)}
                >
                  {post.likes.toLocaleString()} likes
                </button>
                <p className="text-sm text-foreground">
                  <button 
                    className="font-semibold hover:underline"
                    onClick={() => handleUserClick(post.user.id)}
                  >
                    {post.user.name}
                  </button>{' '}
                  <span className="text-muted-foreground">featured {post.dish} at {post.restaurant}</span>
                </p>
                <button 
                  className="text-sm text-muted-foreground mt-1 hover:text-foreground"
                  onClick={() => navigate(`/post/${post.id}/comments`)}
                >
                  View all {post.comments} comments
                </button>

                {/* Social Validation - Friends who grabbed */}
                {post.deal && post.friendsClaimed.length > 0 && (
                  <div className="mt-3">
                    <DealCounter
                      dealId={post.deal.id}
                      totalClaims={post.deal.claimCount}
                      friendsClaimed={post.friendsClaimed}
                      onClick={() => handleFriendsClaimedClick(post)}
                    />
                  </div>
                )}
              </div>

              {/* Deal CTA */}
              {post.deal && (
                <div className="px-4 pb-4">
                  <Button 
                    variant="gradient" 
                    size="lg" 
                    className="w-full"
                    onClick={() => handleGrabDeal(post.deal, post.restaurant)}
                  >
                    <Tag className="w-5 h-5 mr-2" />
                    Grab this Deal - {post.deal.discount}
                    <span className="ml-2 text-xs opacity-80 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.deal.expires}
                    </span>
                  </Button>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>

      {/* Likes Modal */}
      <LikesListModal
        isOpen={showLikesModal}
        onClose={() => setShowLikesModal(false)}
        users={selectedPost?.likedBy || []}
        onUserClick={(userId) => {
          setShowLikesModal(false);
          handleUserClick(userId);
        }}
      />

      {/* Share Modal */}
      <SharePostModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        postId={selectedPost?.id || ''}
        friends={mockFriends}
      />

      {/* Friends Claimed Modal */}
      <FriendsClaimedModal
        isOpen={showFriendsClaimedModal}
        onClose={() => setShowFriendsClaimedModal(false)}
        friends={selectedPost?.friendsClaimed || []}
        dealTitle={selectedPost?.deal?.title}
        onUserClick={(userId) => {
          setShowFriendsClaimedModal(false);
          handleUserClick(userId);
        }}
      />
    </UserLayout>
  );
}