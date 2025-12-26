import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Plus, MapPin, Star, Clock, Tag } from 'lucide-react';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock data
const stories = [
  { id: '1', name: 'Your Story', image: null, isAdd: true },
  { id: '2', name: 'Pizza Palace', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop' },
  { id: '3', name: 'Sushi Master', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100&h=100&fit=crop' },
  { id: '4', name: 'Burger Joint', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop' },
  { id: '5', name: 'Taco Town', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&fit=crop' },
  { id: '6', name: 'Pasta House', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=100&h=100&fit=crop' },
];

const posts = [
  {
    id: '1',
    restaurant: 'The Golden Fork',
    location: 'Downtown, NYC',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop',
    dish: 'Truffle Risotto',
    rating: 4.8,
    likes: 1234,
    comments: 89,
    deal: { discount: '25% OFF', expires: '2h left' },
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    restaurant: 'Sakura Sushi',
    location: 'Midtown, NYC',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=600&fit=crop',
    dish: 'Chef\'s Special Omakase',
    rating: 4.9,
    likes: 2456,
    comments: 156,
    deal: { discount: '15% OFF', expires: '5h left' },
    isLiked: true,
    isSaved: true,
  },
  {
    id: '3',
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
  },
];

export default function HomeFeed() {
  const [feedPosts, setFeedPosts] = useState(posts);

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
    setFeedPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, isSaved: !post.isSaved }
          : post
      )
    );
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
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                    {post.restaurant.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{post.restaurant}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {post.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{post.rating}</span>
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-square">
                <img
                  src={post.image}
                  alt={post.dish}
                  className="w-full h-full object-cover"
                />
                {post.deal && (
                  <div className="absolute top-4 right-4 bg-coral text-primary-foreground px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                    <Tag className="w-4 h-4" />
                    <span className="font-bold text-sm">{post.deal.discount}</span>
                    <span className="text-xs opacity-80 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.deal.expires}
                    </span>
                  </div>
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
                    <button className="flex items-center gap-1">
                      <MessageCircle className="w-6 h-6 text-foreground" />
                    </button>
                    <button className="flex items-center gap-1">
                      <Share2 className="w-6 h-6 text-foreground" />
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

                <p className="text-sm font-semibold text-foreground mb-1">
                  {post.likes.toLocaleString()} likes
                </p>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">{post.restaurant}</span>{' '}
                  <span className="text-muted-foreground">featured their {post.dish}</span>
                </p>
                <button className="text-sm text-muted-foreground mt-1">
                  View all {post.comments} comments
                </button>
              </div>

              {/* Deal CTA */}
              {post.deal && (
                <div className="px-4 pb-4">
                  <Button variant="coral" size="sm" className="w-full">
                    Claim Deal - {post.deal.discount}
                  </Button>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </UserLayout>
  );
}
