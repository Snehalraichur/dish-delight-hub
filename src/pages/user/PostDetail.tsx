import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark, MapPin, Star, Tag, Clock, Send, MoreHorizontal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const post = {
  id: '1',
  restaurant: 'The Golden Fork',
  location: 'Downtown, NYC',
  avatar: 'TGF',
  image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=800&fit=crop',
  dish: 'Truffle Risotto',
  caption: 'Our signature Truffle Risotto is back! Made with the finest Italian arborio rice, finished with aged parmesan and freshly shaved black truffles. A dish that speaks to the soul. 🍝✨',
  rating: 4.8,
  likes: 1234,
  comments: [
    { id: '1', user: 'Sarah M.', avatar: 'SM', text: 'This looks absolutely divine! 😍', time: '2h ago', likes: 24 },
    { id: '2', user: 'John D.', avatar: 'JD', text: 'Had this last week, totally worth it!', time: '1h ago', likes: 12 },
    { id: '3', user: 'Emily R.', avatar: 'ER', text: 'Adding to my must-try list', time: '45m ago', likes: 8 },
  ],
  deal: { discount: '25% OFF', expires: '2h left' },
  isLiked: false,
  isSaved: false,
  hashtags: ['#TruffleRisotto', '#ItalianFood', '#FoodPorn', '#NYC', '#FineDining'],
};

export default function PostDetail() {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likes, setLikes] = useState(post.likes);
  const [newComment, setNewComment] = useState('');

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleComment = () => {
    if (!newComment.trim()) return;
    // Handle comment submission
    setNewComment('');
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center gap-4 p-4 border-b border-border bg-card sticky top-16 z-10">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Post</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-0 md:gap-6 md:p-6">
          {/* Media */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square md:rounded-2xl overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.dish}
              className="w-full h-full object-cover"
            />
            {post.deal && (
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <Tag className="w-4 h-4" />
                <span className="font-bold">{post.deal.discount}</span>
                <span className="text-sm opacity-80 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.deal.expires}
                </span>
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col bg-card md:rounded-2xl md:border md:border-border"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  {post.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{post.restaurant}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {post.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-secondary">
                  <Star className="w-4 h-4 fill-current" />
                  {post.rating}
                </span>
                <button className="p-2 hover:bg-muted rounded-full">
                  <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Caption & Hashtags */}
            <div className="p-4 border-b border-border">
              <h2 className="font-bold text-lg text-foreground mb-2">{post.dish}</h2>
              <p className="text-foreground text-sm leading-relaxed mb-3">{post.caption}</p>
              <div className="flex flex-wrap gap-2">
                {post.hashtags.map((tag) => (
                  <span key={tag} className="text-primary text-sm hover:underline cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="flex-1 p-4 overflow-y-auto max-h-64 space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-semibold text-foreground">{comment.user}</span>{' '}
                      <span className="text-foreground">{comment.text}</span>
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{comment.time}</span>
                      <button className="hover:text-foreground">{comment.likes} likes</button>
                      <button className="hover:text-foreground">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <button onClick={toggleLike} className="transition-transform active:scale-90">
                    <Heart className={cn("w-7 h-7", isLiked ? "fill-primary text-primary" : "text-foreground")} />
                  </button>
                  <button>
                    <MessageCircle className="w-7 h-7 text-foreground" />
                  </button>
                  <button>
                    <Share2 className="w-7 h-7 text-foreground" />
                  </button>
                </div>
                <button onClick={() => setIsSaved(!isSaved)} className="transition-transform active:scale-90">
                  <Bookmark className={cn("w-7 h-7", isSaved ? "fill-secondary text-secondary" : "text-foreground")} />
                </button>
              </div>
              <p className="font-semibold text-foreground text-sm mb-3">{likes.toLocaleString()} likes</p>

              {/* Deal CTA */}
              {post.deal && (
                <Button variant="hero" className="w-full rounded-xl mb-3">
                  Claim Deal - {post.deal.discount}
                </Button>
              )}

              {/* Comment Input */}
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 h-10 rounded-xl"
                />
                <Button
                  variant="gradient"
                  size="icon"
                  onClick={handleComment}
                  disabled={!newComment.trim()}
                  className="h-10 w-10 rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </UserLayout>
  );
}
